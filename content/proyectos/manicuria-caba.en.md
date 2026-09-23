---
title: Manicuría CABA, a home-visit business people can find on Google
description: A static site with no build step for a home-visit nail service, with neighborhood pages, comments moderated from Telegram and an agent that posts to Instagram.
---

Manicuría CABA is a home-visit manicure and pedicure service in the city of Buenos Aires. It has no storefront, so it doesn't show up on Google Maps like a salon, and the only way to book is a WhatsApp message.

The job was to get found by people searching for "home manicure" in their neighborhood, and to get them to write from there. Every other decision came from one condition: nothing could depend on someone logging in to update the site.

## Static, with no build

The site is plain HTML and CSS, and the repo goes to Vercel exactly as it is, with no framework and no compile step. For a business this size it is the setup least likely to break.

There is one page per neighborhood (Palermo, Belgrano, Recoleta, Caballito and Villa Urquiza) with content specific to each area. Those are the searches a real client makes, and each page answers one of them. Every page also has a markdown version linked with `rel="alternate"`, and the site publishes an `llms.txt`. An assistant like ChatGPT can read the services and the coverage area without fighting the HTML.

## Comments without an admin panel

Clients can leave a comment. It is stored in Vercel Blob, and a serverless function renders it on the server, with no client-side JavaScript.

Moderation arrives on Telegram: each new comment comes with HMAC-signed links to publish, hide or delete it. The link opens a page that asks for confirmation, because a link previewer sends a GET and that must never publish anything by accident. The business never has to open a dashboard.

## Instagram on autopilot

An agent posts every day: feed posts three days a week and stories the rest. The captions come from a hand-curated file rather than from a model, because the site has a zero-invented-facts rule. Pieces that carry photos of real work wait for approval before going out. Instagram's API doesn't allow deleting what was published, so mistakes get stopped before they happen.

## Measuring what matters

Analytics is PostHog, served from the same domain through a proxy so blockers don't cut it off. The only conversion being measured is the click to WhatsApp.
