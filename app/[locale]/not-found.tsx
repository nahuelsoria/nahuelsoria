import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Rendered inside the locale layout (html/body + fonts + theme already applied).
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <span className="eyebrow justify-center">// 404</span>
        <h1 className="display mt-6 text-6xl">Perdido en producción.</h1>
        <p className="lede mx-auto mt-5 text-balance">
          Esta página no existe / This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Volver al inicio / Back home
        </Link>
      </div>
    </main>
  )
}
