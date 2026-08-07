#!/usr/bin/env node
/**
 * Baseline / post-change performance measurement via Chrome CDP.
 * Usage: node scripts/perf-measure.mjs <baseUrl> <label> <outDir>
 */
import { spawn } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const baseUrl = process.argv[2] || "http://localhost:3456"
const label = process.argv[3] || "run"
const outDir = process.argv[4] || "/tmp/perf-out"
const LD = `${process.env.HOME}/.native-libs/usr/lib/x86_64-linux-gnu`
const CHROME =
  process.env.CHROME_PATH ||
  `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`

mkdirSync(outDir, { recursive: true })

const pages = [
  { name: "home", path: "/es" },
  { name: "blog", path: "/es/blog/agent-fleet" },
]
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function cdpHttp(port, path) {
  const res = await fetch(`http://127.0.0.1:${port}${path}`)
  return res.json()
}

function cdpSession(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let id = 0
    const pending = new Map()
    const events = []

    ws.addEventListener("open", () => {
      resolve({
        send(method, params = {}) {
          const msgId = ++id
          return new Promise((res, rej) => {
            pending.set(msgId, { res, rej })
            ws.send(JSON.stringify({ id: msgId, method, params }))
          })
        },
        on(eventName, handler) {
          events.push({ eventName, handler })
        },
        close() {
          ws.close()
        },
      })
    })
    ws.addEventListener("error", reject)
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id)
        pending.delete(msg.id)
        if (msg.error) rej(new Error(JSON.stringify(msg.error)))
        else res(msg.result)
      } else if (msg.method) {
        for (const e of events) {
          if (e.eventName === msg.method) e.handler(msg.params)
        }
      }
    })
  })
}

async function launchChrome(port) {
  const args = [
    `--remote-debugging-port=${port}`,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "about:blank",
  ]
  const child = spawn(CHROME, args, {
    env: { ...process.env, LD_LIBRARY_PATH: `${LD}:${process.env.LD_LIBRARY_PATH || ""}` },
    stdio: ["ignore", "pipe", "pipe"],
  })
  let stderr = ""
  child.stderr.on("data", (d) => {
    stderr += d.toString()
  })
  for (let i = 0; i < 50; i++) {
    try {
      await cdpHttp(port, "/json/version")
      return child
    } catch {
      await sleep(100)
    }
  }
  child.kill()
  throw new Error(`Chrome failed to start: ${stderr.slice(-500)}`)
}

function classify(url, mime) {
  const u = url.toLowerCase()
  if (mime?.includes("javascript") || u.endsWith(".js") || u.includes("/_next/static/chunks/"))
    return "js"
  if (mime?.includes("css") || u.endsWith(".css")) return "css"
  if (mime?.includes("font") || u.includes(".woff") || u.includes("font")) return "font"
  if (mime?.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(u)) return "image"
  if (mime?.includes("html") || u === baseUrl || u.startsWith(baseUrl + "/")) {
    if (!u.includes("/_next/") && !u.includes(".")) return "document"
  }
  if (mime?.includes("html")) return "document"
  return "other"
}

async function measurePage(browserWs, page, viewport) {
  const version = await cdpHttp(
    Number(new URL(browserWs).port || 9222),
    "/json/version",
  ).catch(() => null)
  // Create target
  const created = await fetch(
    `http://127.0.0.1:${new URL(browserWs).port}/json/new?${encodeURIComponent("about:blank")}`,
    { method: "PUT" },
  ).catch(async () => {
    // fallback older protocol
    return fetch(
      `http://127.0.0.1:${new URL(browserWs).port}/json/new?${encodeURIComponent("about:blank")}`,
    )
  })
  // Actually use Target.createTarget via browser websocket
  const browser = await cdpSession(browserWs)
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" })
  const { sessionId } = await browser.send("Target.attachToTarget", {
    targetId,
    flatten: true,
  })

  const pageWsList = await cdpHttp(Number(new URL(browserWs).port), "/json/list")
  const target = pageWsList.find((t) => t.id === targetId)
  const session = await cdpSession(target.webSocketDebuggerUrl)

  const requests = new Map()
  session.on("Network.responseReceived", (p) => {
    const rec = requests.get(p.requestId) || {}
    rec.url = p.response.url
    rec.status = p.response.status
    rec.mime = p.response.mimeType
    rec.encodedDataLength = p.response.encodedDataLength
    rec.fromServiceWorker = p.response.fromServiceWorker
    rec.fromCache = p.response.fromDiskCache || p.response.fromPrefetchCache
    requests.set(p.requestId, rec)
  })
  session.on("Network.loadingFinished", (p) => {
    const rec = requests.get(p.requestId) || {}
    rec.encodedDataLength = p.encodedDataLength
    requests.set(p.requestId, rec)
  })
  session.on("Network.requestWillBeSent", (p) => {
    const rec = requests.get(p.requestId) || {}
    rec.url = p.request.url
    rec.method = p.request.method
    requests.set(p.requestId, rec)
  })

  await session.send("Network.enable")
  await session.send("Page.enable")
  await session.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.name === "mobile",
  })
  await session.send("Network.setCacheDisabled", { cacheDisabled: true })
  await session.send("Network.clearBrowserCache").catch(() => {})

  const url = `${baseUrl}${page.path}`
  await session.send("Page.navigate", { url })
  await session.send("Page.loadEventFired").catch(() => {})
  // wait load
  await new Promise((resolve) => {
    const t = setTimeout(resolve, 8000)
    session.on("Page.loadEventFired", () => {
      clearTimeout(t)
      resolve()
    })
  })
  // network idle-ish
  await sleep(1500)

  const metrics = await session.send("Runtime.evaluate", {
    expression: `(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paints = performance.getEntriesByType('paint');
      const resources = performance.getEntriesByType('resource');
      const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth
        || document.body.scrollWidth > document.body.clientWidth;
      const imgs = Array.from(document.images).map(img => ({
        src: img.currentSrc || img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayWidth: img.clientWidth,
        displayHeight: img.clientHeight,
        isNext: !!(img.getAttribute('srcset') || img.closest('[data-nimg]')),
        tag: img.tagName,
        loading: img.loading,
      }));
      const fontFaces = Array.from(document.fonts || []).map(f => ({
        family: f.family, weight: f.weight, style: f.style, status: f.status
      }));
      return {
        overflowHorizontal: overflow,
        scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        clientWidth: document.documentElement.clientWidth,
        title: document.title,
        navigation: nav ? {
          transferSize: nav.transferSize,
          encodedBodySize: nav.encodedBodySize,
          decodedBodySize: nav.decodedBodySize,
          domContentLoaded: nav.domContentLoadedEventEnd,
          loadEventEnd: nav.loadEventEnd,
          responseEnd: nav.responseEnd,
          duration: nav.duration,
        } : null,
        paints: Object.fromEntries(paints.map(p => [p.name, p.startTime])),
        resourceCount: resources.length,
        images: imgs,
        fontsReady: document.fonts ? document.fonts.status : null,
        fontFaces,
        preloadedFonts: Array.from(document.querySelectorAll('link[rel=preload][as=font]')).map(l => l.href),
        stylesheets: Array.from(document.querySelectorAll('link[rel=stylesheet]')).map(l => l.href),
        scripts: Array.from(document.querySelectorAll('script[src]')).map(s => s.src),
      };
    })()`,
    returnByValue: true,
  })

  const shotPath = join(
    outDir,
    `${label}-${page.name}-${viewport.name}.png`,
  )
  const shot = await session.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  })
  writeFileSync(shotPath, Buffer.from(shot.data, "base64"))

  // Resource totals from CDP Network
  const byType = { js: 0, css: 0, font: 0, image: 0, document: 0, other: 0 }
  const assets = []
  for (const rec of requests.values()) {
    if (!rec.url || rec.url.startsWith("data:")) continue
    if (rec.method && rec.method !== "GET") continue
    const bytes = rec.encodedDataLength || 0
    const type = classify(rec.url, rec.mime)
    byType[type] = (byType[type] || 0) + bytes
    assets.push({
      url: rec.url,
      type,
      bytes,
      mime: rec.mime,
      status: rec.status,
    })
  }
  assets.sort((a, b) => b.bytes - a.bytes)
  const total = assets.reduce((s, a) => s + a.bytes, 0)

  await session.send("Page.close").catch(() => {})
  session.close()
  browser.close()

  return {
    page: page.name,
    path: page.path,
    viewport: viewport.name,
    width: viewport.width,
    totalTransferBytes: total,
    byType,
    topAssets: assets.slice(0, 20),
    allAssets: assets,
    metrics: metrics.result?.value,
    screenshot: shotPath,
  }
}

async function main() {
  const port = 9229 + Math.floor(Math.random() * 200)
  const child = await launchChrome(port)
  try {
    const version = await cdpHttp(port, "/json/version")
    const browserWs = version.webSocketDebuggerUrl
    const results = []
    for (const page of pages) {
      for (const vp of viewports) {
        const r = await measurePage(browserWs, page, vp)
        results.push(r)
        console.log(
          JSON.stringify({
            label,
            page: r.page,
            viewport: r.viewport,
            totalKB: +(r.totalTransferBytes / 1024).toFixed(1),
            jsKB: +(r.byType.js / 1024).toFixed(1),
            cssKB: +(r.byType.css / 1024).toFixed(1),
            fontKB: +(r.byType.font / 1024).toFixed(1),
            imageKB: +(r.byType.image / 1024).toFixed(1),
            overflow: r.metrics?.overflowHorizontal,
            top3: r.topAssets.slice(0, 3).map((a) => ({
              bytes: a.bytes,
              url: a.url.replace(baseUrl, ""),
              type: a.type,
            })),
          }),
        )
      }
    }
    writeFileSync(join(outDir, `${label}-results.json`), JSON.stringify(results, null, 2))
    console.log(`WROTE ${join(outDir, `${label}-results.json`)}`)
  } finally {
    child.kill("SIGKILL")
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
