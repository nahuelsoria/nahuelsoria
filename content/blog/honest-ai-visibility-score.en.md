---
title: An honest AI visibility score is harder than it looks
description: I built a tool that measures whether ChatGPT, Gemini and Claude recommend a brand. Four measurement problems I hit with data, and what I did about each one.
date: 2026-08-15
tags: AI, SaaS, Measurement
---

I built [LLM Audit](https://llmaudit.app), a tool that answers a question every brand is asking now: when someone asks ChatGPT, Gemini or Claude for a recommendation, do I show up?

The naive version is easy: ask each model, request a 0 to 100 score, render it big on a card. The honest version is a measurement problem, and I ran into it one piece at a time, always the same way: a number that looked reasonable until I checked it against data. These are the four pieces.

## 1. The same audit run three times gives three numbers

I ran the exact same audit for the exact same brand three times in a row, changing nothing. The scores: 45, 30 and 29.

That is not a bug: models are not deterministic, and a single run is a coin flip. If your tool reports one run as if it were a measurement, the customer comparing this month's score against last month's is looking at noise.

What I did: each provider gets queried N times (N=3 today) and the report shows appearance frequency with a confidence interval (Wilson, 95%), not a lone number. "You appeared in 2 of 3 runs" sells worse than "67/100", but it is true.

## 2. Each model scores on a different scale

Over the same set of brands, the average score each provider hands out: OpenAI 11.6, Anthropic 34.9, Gemini 65.1. Same brands, same prompts.

The practical consequence is worse than it sounds: if the headline score is the provider average and one provider drops out (rate limit, timeout), the number moves even though the brand did not change. I measured it over 130+ audits across 45 days: audits where Gemini answered averaged 32.6; audits where it did not, 19.5. Thirteen points that do not measure visibility, they measure which provider was in a good mood.

What I did: complete-basket rules for the comparative dataset (an observation with missing providers stays out of the benchmark), retries on transient errors, and moving off the free tier of the provider that failed the most.

## 3. Models estimating themselves lie exactly where it matters

The first design asked the model to estimate whether it would name the brand. Cheap, and it looked fine. Then I checked it against reality: for 31 brands I also asked the real buyer question, live, and read the answer.

The result was uncomfortable: the estimate is right about unknown brands (20 of 22 genuinely absent) and wrong precisely about the brands with real presence. One brand the estimate scored 8 out of 100 came out fifth in the live answer. That is the worst possible failure mode: telling the brand that does show up "you are invisible".

What I did: every audit now also runs the live query per provider, and the raw answer is kept as visible evidence. The position that gets persisted comes only from that real answer; a test forbids storing estimated positions.

## 4. The scoring rubric breaks from one sentence

The strangest lesson: I added one sentence to the system prompt defining the format of a field that had nothing to do with the score. OpenAI jumped from a historical mean of 7 to runs of 44, 65 and 65, two of them above its all-time maximum. One sentence.

What I did: the scoring rubric lives isolated in the system prompt and is never touched for anything else; everything that describes field formats goes in the user message. And any prompt change gets verified against each provider's historical band before deploying.

## What I take away

Measuring what LLMs say is a statistics problem wearing a feature costume. If you are evaluating tools in this space (or building your own), the questions that separate a measurement from a decorative number are: how many runs sit behind the score, what happens when a provider fails to answer, and whether the position you are shown came from a real answer or from a model estimating itself.

Everything in this post came from measuring my own tool with real users. If you want to see the result, the audit is free at [llmaudit.app](https://llmaudit.app).
