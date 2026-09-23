---
title: Onda Corta, a tech newsroom that writes itself
description: A Spanish-language tech news site written and published by an agent pipeline. Quality control lives in code, and the publishing cadence is set with Search Console data.
---

[Onda Corta](https://ondacorta.news) is a Spanish-language tech news site I run on my own. It launched in July 2026 and has published every day since without anyone sitting down to write: an agent pipeline reads sources, picks topics, drafts, checks and publishes.

I told the full story on the blog, in [a tech newsroom that publishes itself](/en/blog/automated-newsroom). These are the design decisions that mattered most.

## Quality is enforced in code

Asking the model in the prompt not to plagiarize or make things up is not enough, because on any given day it does it anyway. So every article goes through checks that run after the model and can reject it: n-gram plagiarism detection against the sources, a fact-check, deduplication against what is already published, and a list of banned writing patterns.

That list is a JSON file read by both the Python writer and the JavaScript site, so both sides apply the same rule and never drift apart.

## Fewer articles, decided with data

At first the site published about nine articles a day. In late August I looked at Search Console: Google knew a small share of the URLs and indexed an even smaller fraction. The articles were not short, so length was not the variable.

I changed the format to one article a day and two explainers a week. Explainers are built on topics that already have several published articles in the archive, with a self-plagiarism check so they don't repeat what was already said. The KPI moved from how many articles go out to how many Google indexes.

## A human gate that didn't work

I tried a manual approval step before publishing. It lasted a week: the site went days without articles because nobody approved the drafts. I removed it and let the site publish on its own again, with the code checks as the only gate.

## From site to video

Articles also become reels. The server picks which ones get a video, and the Remotion render happens on another machine. Duplicates left over from the early days were consolidated with 308 redirects, from a single list that both the site config and the sitemap read, covered by tests.
