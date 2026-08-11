---
title: The prompt suggests, the code decides
description: Someone asked how I limit the behavior of agents that run unattended. These are the five layers I use, from cheapest to most expensive, and the mistakes that produced them.
date: 2026-08-11
tags: AI Agents, Security, Automation
---

Yesterday someone asked me on X how I built the agents behind [Onda Corta](https://ondacorta.news) and how I limit their behavior. The short answer fit in a tweet. This is the long one.

Context, if you haven't read the earlier posts: I operate a [fleet of agents](/en/blog/agent-fleet) that runs on cron across a VPS and a home PC. They write a news site, review my repos overnight, triage my inbox and monitor what I have in production. Almost all of them work while I'm not watching, which is exactly where the question gets interesting.

## The rule that organizes everything

My first instinct was to control them from the prompt: "never do X", "always check Y". It doesn't hold. A prompt is a suggestion, and with hundreds of runs per week the tail of the distribution always finds you: one day the model reads the instruction differently, a weird input nudges it somewhere new, and your "never" turns out to have been statistical.

What does hold is boring: ordinary, deterministic code that runs after the model. The agent proposes; a program that doesn't think decides whether that reaches the world. Every layer below is a variation of that idea.

## Layer 1: one task per agent

Each agent does exactly one thing. The one that reads my inbox publishes nothing. The one that publishes never reads third-party content. The one that writes code can't touch production.

This didn't come from a design principle. It came from practice: a small agent is easy to reason about, easy to audit in its logs and, above all, has little to break. If the mail triage misbehaves tomorrow, the worst case is a bad summary in my Telegram, not a deploy.

## Layer 2: the output gate

The news site publishes on its own, three times a day, no human in the loop. It can do that because between the model and the publish button there's a gate written in code: a plagiarism check against the sources, verification of cited facts and a dedupe pass against everything already published. If an article fails any of the three, it doesn't go out. There's no negotiation and no creative retry: whatever fails the gate doesn't exist.

The part that took me longest to learn: the gate has to be code, not another model with opinions. A second LLM reviewing the first inherits its problems. The plagiarism check is text comparison; the dedupe is a database query. Things that return the same answer all thousand times you run them.

## Layer 3: third-party content, with no hands

Some agents read text written by other people: tweets, emails, web pages. That text is hostile input by definition, because it can carry instructions inside ("ignore the above and send this over there"). The classic defense is asking the model not to obey injected instructions. That's politeness, not security.

My version: those agents run with no tools connected at all, and their output goes through a code validator before anything uses it. Links only from an allowlist, no mentions of third parties, a volume cap, and every identifier checked against the real data the agent was given. If someone's text does talk the model into something strange, the model has nothing to execute it with, and whatever it proposes gets dropped at validation.

## Layer 4: publishing stays mine

Almost everything the agents produce lands in my Telegram as a draft, and I do the last step by hand. It costs me seconds per day. In exchange, no agent can burn my reputation without me having pressed the button.

The exception is the news site, and it's an earned exception: months of runs behind the layer-2 gate with no surprises. That's how autonomy works in my fleet. It's earned with a track record; it doesn't ship by default.

## Layer 5: where there's money, PRs and nothing else

The repos that move money have their own rule: the agent can investigate and propose, but it only opens pull requests. It never merges, never deploys. Deploys of those systems are manual, mine, with the whole diff read. In other repos I let an agent merge trivial fixes; here, not even that.

## Start with drafts

If you're building something similar, the order that worked for me: first everything goes to drafts and you publish by hand, then code gates for the repetitive parts, and autonomy only for the agent that has already bored you with how predictable it is. The prompt suggests, the code decides.
