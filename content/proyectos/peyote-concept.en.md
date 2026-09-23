---
title: Peyote Concept, a site for a creative agency
description: A single page that scrolls sideways through rooms, the agency's brand applied to the letter, and one measurable goal, getting the visitor to write on WhatsApp.
---

Peyote Concept is an agency that does Google Ads, branding and design. When we started it had no site and no presence anyone could find on Google.

The brief had two conditions. The site had to feel like the work of a creative agency, because it is their calling card, and every visit had to end in a WhatsApp conversation.

## How it is built

The page is four rooms side by side. On a computer, the mouse wheel moves you sideways with inertia and each room snaps into place when you let go. On a phone it is a swipe with `scroll-snap`, which is what people already know how to use.

The move between rooms lasts according to distance: 950 ms plus 380 ms per panel travelled, capped at 2.2 seconds. I timed it by clock instead of by frame so the snap lands exactly on any screen, 60 Hz or 144 Hz.

There is no framework: one `index.html` with the CSS and JavaScript inside, an animated canvas in the background and no build step. For a page like this, any dependency added weight without adding anything else.

## The brand, to the letter

The agency gave me its brand manual and logos, and the site follows them without adaptations: the four palette colors, the logo mark never rotated or distorted, and headlines in Widescreen, the brand typeface.

Widescreen is extremely wide, and a large headline overflowed any narrow window. I solved it with a script that measures the headline's real width and shrinks the type until it fits. The hero looks just as full on a phone as on a 27-inch monitor.

## QA with numbers

The agency itself reported a bug: in short landscape windows, or with a high browser zoom, the tagline covered the "swipe" hint. The hero was centered on the full screen height without subtracting the header or the band at the bottom.

After fixing it I measured element positions with Playwright at 11 screen sizes, from 390x844 to 1920x1080. They overlap in zero of them. Checking on my own monitor was not enough, because the bug only appeared at sizes I don't use.

## Where it stands

The site has been live on its own domain since August 31, 2026, with complete technical SEO: canonical, sitemap, `robots.txt` and structured data for the organization. Both contact buttons open the agency's WhatsApp with a message already written, and `prefers-reduced-motion` is respected for anyone who wants less movement.
