---
title: A fleet of AI agents runs my infrastructure while I sleep
description: How I designed a fleet of ~20 AI agents that monitors, diagnoses and repairs my production infrastructure, and why none of them can touch money.
date: 2026-07-23
tags: AI agents, DevOps, Automation
---

I am a solo developer running several products of my own plus the infrastructure of two fintech platforms. A few months ago, operations work (reading logs, watching production, chasing security alerts, writing reports) was eating the hours I needed for building and selling.

Today that work is done by a fleet of about 20 agents running on cron on a VPS. None of them can touch money. This is the design.

## Cron, bash and little else

No orchestration frameworks: cron, bash and headless AI agents (Claude Code as the primary, with fallback to other providers). Each agent is a folder with its script, its logs and its prompts. Three shared pieces:

- `env.sh`: secrets with 600 permissions, never committed.
- `notify.sh`: everything reports to Telegram, with topics per area.
- `log.sh`: a daily log per agent.

The most important convention is that almost all of them are alert-only: silence means everything is fine, and a system that pings you all day ends up ignored.

## What the fleet does

Three levels, based on how much autonomy each agent has earned:

**Monitors (every 5 minutes, observe only).** Health of the production sites, errors in deploy logs, login failures on the database pooler, out-of-memory events on the server, verification of the daily Postgres backup. They detect and alert; they decide nothing.

**AI workers (read and diagnose, never write).** When a monitor catches a production error, it queues a job. A worker picks it up, gathers context (recent logs, a local checkout of the repo) and runs a headless agent restricted to read-only tools that sends the diagnosis to Telegram: what broke, where, and what it would do to fix it. I decide whether it ships.

**The nightly bug hunter (writes, with earned permissions).** At 2am it sweeps my repos, hunts for bugs, fixes them on a branch and opens a PR that waits for me in the morning. It is the only agent with write access, and the one with the most guardrails.

Around that, the routine layer: a daily digest of about 46 RSS feeds, follow-ups on sales leads (it drafts, it never sends an email on its own), a weekly digest of GitHub security alerts, and a weekly review that lists the manual pending items that are blocking revenue.

## What the agents are not allowed to do

This works in production, with real fintech clients, because of everything the agents are forbidden from doing:

- **Fintech never auto-merges.** An explicit guard by repo name: any fintech client repo can only receive PRs. There are no exceptions and no flag to bypass it.
- **Read-only by default.** Error triage runs with an allowlist of read tools and a blocklist of write tools. An agent earns write access only after months of read-only runs have proven good judgment.
- **Cost and resource caps.** A daily cap on AI runs (today: 8 for triage), a RAM gate that defers work when the server is under pressure (learned from a real crash), a hard timeout per run, and a flock lock so two instances never run at once.
- **Provider health before trusting it.** A smoke test on the model before giving it a job; if it fails, the chain falls back to the next provider.
- **Opportunistic compute.** Heavy nightly work tries my home PC first over Tailscale; if the PC is unreachable, it falls back to the VPS. Cron remains the source of truth.

## Results

No invented numbers; what actually changed:

- Production incidents reach my Telegram already diagnosed, often before a user notices.
- Many mornings start with a nightly PR ready to review instead of a bug to find.
- No incident caused by an agent so far. Each guardrail exists because of something that happened, or something that cannot be allowed to happen.
- My manual operations time shrank to reviewing Telegram messages and approving or rejecting.

## What I learned

1. Autonomy goes in levels: observe, then diagnose, and only then write.
2. A monitoring system is worth as much as how little it talks when everything is fine.
3. My job now is deciding what deserves attention and within which limits, more than typing code.
4. Cheap guardrails prevent expensive incidents: flock, a daily cap and a forbidden-repos regex are 20 lines of bash that hold up everything else.

I will be breaking the fleet down agent by agent in future posts: the nightly bug hunter, the read-only error triage, the fintech watchdog. If you are building something similar, [write me](mailto:jorgenahuelsoria@gmail.com).
