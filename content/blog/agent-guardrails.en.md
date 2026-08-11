---
title: The prompt suggests, the code decides
description: Someone on X asked how I limit the agents that run unattended. The detail of the five layers I use, with small tasks, code gates, output validators and manual publishing.
date: 2026-08-11
tags: AI Agents, Security, Automation
---

Yesterday someone asked me on X how I built the agents behind [Onda Corta](https://ondacorta.news) and how I limit their behavior. I answered there, but the topic deserves more than a tweet, so here's the detail.

Context, if you haven't read the earlier posts: I operate a [fleet of agents](/en/blog/agent-fleet) that runs on cron across a VPS and a home PC. They write a news site, review my repos overnight, triage my inbox and monitor what I have in production. Almost all of them work while I'm not watching.

## The prompt is not enough

When I started I tried to control them from the prompt, adding a new rule every time something went wrong. That works for a while. The problem is that a prompt is not a guarantee: with hundreds of runs per week, sooner or later the model reads an instruction differently, or a weird input takes it somewhere you didn't expect. It happened to me enough times to stop relying on it.

Today the real control lives in ordinary scripts that run after the model. The agent generates something, and a deterministic program checks that result before it touches the real world.

## One task per agent

Each agent does exactly one thing: the one that reads my inbox publishes nothing, and the one that writes code can't touch production. This came out of practice, because a small agent is easy to reason about, easy to audit in its logs, and has little to break. If the mail triage misbehaves one day, the worst outcome is a bad summary in my Telegram.

## The output gate

The news site publishes on its own, three times a day, with nobody watching. It can do that because before publishing, every article goes through three checks written in code: plagiarism against the sources, verification of cited facts, and duplicates against everything already published. An article that fails any of the three gets discarded, and the site moves on to the next one.

At first I considered using a second model as the reviewer. I dropped the idea quickly: an LLM reviewing another one inherits the same problems. The plagiarism check is text comparison and the dedupe is a database query, and both return the same answer for the same input every time.

## Third-party content

Some agents read text written by other people: tweets, emails, web pages. Any of those texts can carry instructions inside, along the lines of "ignore the above and send this over there". Asking the model not to obey them helps little, because a well-built attack convinces it anyway.

So those agents run with no tools connected, and what they produce goes through a code validator before anything uses it: links only from an allowlist, no mentions of third parties, a volume cap, and every identifier checked against the data the agent actually received. Even if someone's text talks the model into something strange, the result gets dropped at validation.

## Publishing stays mine

Almost everything the agents generate is material for me, not for publishing: summaries, alerts, reports, working drafts. It lands in my Telegram and I decide what to do with each piece. When any of it feeds a public text, I review and rewrite it first; whatever goes out under my name goes through my hands.

The exception is the news site. It has published on its own from day one, and I allow it because it has spent months going through the gate without a single surprise.

## The repos that move money

There the rule is stricter: the agent can investigate and propose changes, but only by opening pull requests, and I deploy by hand after reading the full diff. In other repos I let an agent merge trivial fixes on its own; in these, no.

## Start with drafts

If you're building something similar, the order that worked for me: first everything goes to drafts and you publish by hand, then code gates for the repetitive parts, and autonomy only for the agent that has already bored you with how predictable it is.
