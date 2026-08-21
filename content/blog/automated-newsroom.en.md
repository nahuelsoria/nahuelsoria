---
title: I built a tech news site that publishes itself (writing was not the hard part)
description: Onda Corta publishes daily with nobody pressing buttons. The case study: why quality control lives in code instead of the prompt, and what the human actually does.
date: 2026-08-15
tags: AI Agents, Media, Automation
---

[Onda Corta](https://ondacorta.news) is a Spanish-language tech news site I operate alone. It publishes a short daily selection of articles, each one synthesizing two or more sources that are always cited and linked. Since launching in early July 2026 it has published over 400 articles, and I did not sit down to write a single one of them.

I am writing it up as a case study because the main lesson was not the one I expected. Getting a model to write a decent article is the easy part. The hard part is everything around it: making sure the system does not publish garbage when the model has a bad day, keeping the tone from degrading over time, and being able to sleep while it publishes.

## The pipeline in one line

Source ingestion, selection of what deserves an article, synthesis with citations, quality control, publishing, and distribution (automated X and Instagram, reels rendered with Remotion). Cron, scripts and headless AI agents. No orchestration frameworks: the same philosophy as [my infrastructure agent fleet](/en/blog/agent-fleet), applied to an editorial product.

## The rule that holds it together: the filter lives in code, not in the prompt

The temptation with LLMs is to fix everything with instructions: "avoid cliches", "do not overstate", "cite your sources". That works until it does not, and when it does not, nobody notices, because the output still looks reasonable.

In Onda Corta, quality control is a table of banned patterns that lives in a JSON file and is enforced IN CODE, after generation: AI filler phrases, typographic punctuation that gives away generated text, constructions that read like translations in Rioplatense Spanish. Both the Python pipeline and the JavaScript one read the same table, so no surface publishes without passing through it. If a text fails, it does not ship. The prompt asks for the tone; the code guarantees it.

It is the same lesson from my other tool ([the LLM Audit case study](/en/blog/honest-ai-visibility-score) is about exactly this): the things that matter are not requested from the model, they are verified after the model.

## What the human does

I do not write or approve each article, but the system is not "no human": it is human off the critical path. I review the editorial fixes the weekly review proposes, I set the editorial line, and the social accounts never reply to anyone on their own. Transparency is part of the product: the site's editorial policy states openly how it is made, which few AI-generated outlets dare to publish.

There is a distinction I hold across everything I automate: agents can produce and publish content inside hard rules, but interactions with people (replying, inviting, opining) stay on the human side. An automated outlet that converses on its own is an incident with a future date on it.

## Honest numbers

Over 400 articles in six weeks, with an operator who spends minutes per day, not hours. The marginal cost of each article is cents. Traffic is still small (the site is weeks old and domain authority builds slowly), so this case study is not "look at the traffic": it is "look at how much editorial operation one person can run with the right system".

If your business has a repetitive editorial flow (summaries, product sheets, newsletters, catalogs) and this architecture sounds useful, [let's talk](https://nahuelsoria.com/en#contact).
