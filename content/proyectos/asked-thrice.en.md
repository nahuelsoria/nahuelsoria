---
title: Asked Thrice, measuring whether AI recommends your brand
description: An audit that asks ChatGPT, Gemini and Claude a buyer's questions and shows whether they name your brand or your competitors, with the answers as evidence.
---

[Asked Thrice](https://askedthrice.com) measures whether AI assistants recommend a brand. It asks OpenAI, Gemini and Anthropic the questions a buyer in the category would ask, several times each, and shows who appears in the answers: the brand or its competitors. The raw answers go into the report so anyone can read them.

It started measuring in May 2026 under the name LLM Audit and was renamed Asked Thrice at the end of August. I wrote about the measurement problems I ran into along the way in [an honest AI visibility score](/en/blog/honest-ai-visibility-score).

## Three runs per model

I ran the same audit for the same brand three times in a row, changing nothing, and got 45, 30 and 29. With that much variance, a single number says nothing. Each provider is queried three times and the report shows how often the brand appeared, with its 95% Wilson confidence interval. "You showed up in 2 of 3 runs" is less flashy than a score, but it holds up.

## No score on screen

The product shows a banded verdict instead of a number from 0 to 100. So nobody adds one back by accident, a test fails if a score shows up in the interface.

## Live answers only

The first version asked the model to estimate whether it would name the brand. It was cheap, and checked against real answers for 31 brands it failed exactly on the ones that did have a presence. Today every position comes from asking the question live, and another test blocks storing estimated positions.

## A number that doesn't depend on who answered

Each provider scores the same brands differently, so when one dropped out the average moved even though the brand hadn't changed. Across more than 130 audits, the ones that included Gemini averaged 13 points higher than the ones that didn't. Now a measurement missing a provider stays out of comparisons, and transient errors are retried.

## For people and for agents

The audit runs on the web, with payment in pesos through Mercado Pago or in dollars through Polar. It is also published as an MCP server in the official registry and on npm, and as a CLI, so an agent can run it without a browser.

The rename used 308 redirects that keep every path, except `/api`: payment webhooks don't follow redirects and would have been lost.
