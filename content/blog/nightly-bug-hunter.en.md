---
title: The only agent I let write code
description: My nightly bug hunter runs at 2am over six repos, fixes what it can prove, and opens a PR. Here is the design, the real numbers, and the four failures that taught me every guardrail.
date: 2026-08-01
tags: AI agents, DevOps, Automation
---

In the [first post of this series](/en/blog/agent-fleet) I described a fleet of about 20 agents that runs my infrastructure. Most of them only observe. One of them writes code and pushes it to my repositories.

This is that one: the nightly bug hunter. It is the agent with the most autonomy and also the one with the most guardrails. This post is the whole design, including the parts that broke.

## What one night looks like

At 2am Buenos Aires time, cron fires a bash script. The script walks a plain text file with one line per repository:

```
https://github.com/nahuelsoria/whatiwish.git   main  auto-merge-trivial
<a fintech platform repo>                      main  pr-only
```

For each repo it resets a persistent local workspace to `origin/main`, hands a headless AI agent the hunting prompt, and gives it a hard budget of 10 minutes. The agent reads, hunts, fixes, and runs the narrowest verification that covers what it touched. Its last line is a single JSON object:

```json
{"bugs_found":2,"bugs_fixed":2,"tests_pass":true,"summary":"...","recommendation":"needs-review"}
```

The script parses that object and decides what happens to the code. Then it moves to the next repo, and when it finishes, one Telegram message per repo tells me what happened; by morning I have all six verdicts together.

The important structural detail is that the agent does not decide whether its work ships: it reports, and the policy is applied by a bash script that cannot be talked out of anything.

## The prompt is a list of negatives

Most of the safety lives in two files: the launcher script and the prompt. The prompt is written as a set of refusals.

It hunts only what it can prove: crashes, broken auth, data loss, wrong API contracts, failing jobs. Style, refactors, dependency bumps and speculative improvements are explicitly out of scope, and noticing one is not a reason to touch it. The instruction I care about most is this one: when unsure, name the bug in the summary and leave the code alone. A finding written in plain English costs me 30 seconds to read, and a confident wrong patch costs me an afternoon.

The scan is bounded on purpose. If the branch is clean, it looks at the risky surface (API handlers, cron jobs, auth helpers, database and state helpers, webhooks, and the tests beside them) and never does a full repo audit. An agent with an unbounded scope produces unbounded noise.

And a small rule that exists because of a real failure: before filing anything, it checks its own open pull requests. More on that below.

## Three modes and one guard that cannot be overridden

Each repo declares how far a fix is allowed to travel:

- **`pr-only`**: commit to a branch, open a PR, a human merges. This is the ceiling for anything touching money.
- **`auto-merge-trivial`**: the agent may recommend auto-merge, but only for the trivially safe.
- **`auto-merge`**: the script merges when verification passed, and the agent is told to verify with extra rigor because of it.

Above all three sits a guard that does not read the config. Any repository whose name matches a fintech pattern is forced to `pr-only` and I get an alert saying the config was wrong. If I fat-finger `repos.txt` at midnight, the mistake cannot reach production. The guard is four lines of bash and it is the single most valuable thing in the file, because it makes the safe path independent of my memory.

There is also a rule about identity that is easy to miss: the bot commits under the email tied to my GitHub account, because my hosting provider matches commits to accounts by author email and silently skips deploys otherwise. An agent that commits with the wrong email produces green pull requests that never deploy.

## The numbers

From the logs on the machine that currently runs it, covering 15 consecutive nights and 6 repos (89 repo-nights):

- **122 bugs reported found, 81 fixed.** The gap is the agent naming something and leaving it alone, which is the behavior I want.
- **23 of 89 repo-nights found nothing at all.** A quarter of the time the honest answer is "clean", and the agent is allowed to say so.
- Over the full life of the PR based repos, **34 of its pull requests are merged** and 3 were closed without merging (duplicates or bugs already fixed upstream).

Those 34 include real ones: an auth bug affecting 24 endpoints in a backoffice, a session cache keyed on a truncated cookie, pagination that silently stopped on a partial page, a Firestore rule that allowed impersonation. None of them were found by me.

## Four failures that wrote the guardrails

**It scanned one repo out of six for eleven days.** After I expanded from one repository to six, every run kept processing only the first one. The cause is a classic: the loop read the repo list on standard input, and the AI CLI, launched inside the loop, also reads standard input, so it swallowed the remaining five lines. Every night the report said success, because for the one repo it did process, it was a success. The fix is one line (read the list on a dedicated file descriptor, and redirect the CLIs from `/dev/null`), but the lesson is the expensive part: an agent that fails loudly is a minor annoyance, and an agent that succeeds partially and silently can waste weeks.

**It broke its own environment.** One night the agent ran a dependency install inside its workspace. That install activated the repository's git hooks, and from then on every push ran the full verification suite, which was failing because of a test that had been broken on the main branch for days. Four nights of good fixes sat stranded on local branches. The workspace an agent lives in is mutable state, and the agent mutates it.

**It found the same bug twice.** Two nights in a row it filed the same fix as two different pull requests, because the first one was still open and it had no idea. Agents have no memory of yesterday unless you give them one. The fix was to add a step zero to the prompt: check your own open PRs and the state of the base branch before filing anything.

**It buried me.** With six repos in PR mode, it opens roughly five pull requests a week that need a human. I stopped reviewing for a few days and came back to 17 open PRs across three repos. All 17 were real, distinct bugs, and none of them were in production yet. I did not expect that failure mode: the bottleneck moves from finding bugs to consuming the output, and unreviewed work piles up as debt.

## What I would tell someone building one

1. The merge gate goes in the harness: the agent reports, deterministic code decides.
2. Make refusal cheap: "name it and leave it alone" should be an easy outcome, and silence on a clean night should be normal.
3. Bound the scope before upgrading the model: ten minutes and a risky-surface list beat a smarter model with the whole repo in view.
4. Guard by repo name, which is the only thing that survives your own typo.
5. Size the fleet to your review capacity.

Next in the series: the read-only error triage agent, the one that diagnoses production incidents and is not allowed to touch a single file. If you are building something similar, or you want this running over your repositories, [write me](mailto:jorgenahuelsoria@gmail.com).
