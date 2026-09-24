# Build your own Solaris-like assistant

This guide describes an implementation order that minimizes rewrites.

## Phase 1 — Define the trust boundary

Before writing agents, decide:

- what data is private;
- which directories are writable;
- whether network access is allowed;
- which actions require human approval;
- where credentials live;
- what is never sent to remote models.

Write these as machine-readable policy, not only documentation.

## Phase 2 — Build durable sessions

Create an append-only event log with:

- session ID;
- monotonic sequence number;
- timestamp;
- event type;
- payload;
- previous hash;
- current hash.

Recover only the valid contiguous prefix after a crash.

## Phase 3 — Create a capability registry

Register providers independently from the agent loop.

Each provider should declare:

```json
{
  "id": "local-text-model",
  "capabilities": ["model.text.generate"],
  "trust": "local",
  "externalEffects": false
}
```

The core should never need provider-specific branching for normal operation.

## Phase 4 — Build the tool pipeline

Start with a very small tool set:

- read a scoped file;
- search a scoped directory;
- run a sandboxed calculation;
- query memory.

Add writes only after approval and receipts exist.

## Phase 5 — Add memory

Store typed records with provenance. Never promote raw conversation text directly into permanent truth.

A simple durable record can contain:

```json
{
  "kind": "knowledge",
  "state": "candidate",
  "content": "...",
  "source": "session:abc",
  "evidence": [],
  "createdAt": "..."
}
```

## Phase 6 — Add natural routing

The user should say:

> inspect this project, fix the bug, run tests, and explain what changed

The runtime should infer code/files/test capabilities itself.

Keep explicit commands only as optional power-user overrides.

## Phase 7 — Add review and verification

Separate:

- generation;
- validation;
- review;
- authorization;
- execution.

Do not let a reviewer mutate the candidate it is reviewing.

## Phase 8 — Add provider failover

A provider failure should not corrupt the session. Record the failure as an event, select another compatible provider if policy allows it, and preserve the same task scope.

## Phase 9 — Add learning

Implement a provider-neutral teacher interface:

```text
explain(topic, context)
requestExercise(topic, difficulty)
evaluate(answer, rubric)
searchCurriculum(query)
getProgress(subject)
```

Every returned knowledge item enters as `candidate`.

## Phase 10 — Add gateway and devices

Only after the core is hardened, add external channels and devices. Pair nodes explicitly and give each one a narrow capability ceiling.

## Phase 11 — Add voice

A continuous conversation loop generally needs:

- microphone permission;
- VAD or push-to-talk;
- speech-to-text;
- the normal conversation runtime;
- text-to-speech;
- barge-in to stop playback when the user speaks;
- queue steering for instructions that arrive while work is active.

## Phase 12 — Add creative/application automation

Treat desktop applications as providers of typed capabilities. Prefer high-level operations such as `timeline.addClip` or `scene.render` to raw arbitrary scripting. Raw script execution should require a stronger policy.

## Phase 13 — Build a doctor

A master diagnostic command should distinguish:

- OK;
- warning;
- failure;
- unavailable on this platform.

Never report “healthy” for a subsystem that could not actually be checked.

## Phase 14 — Keep state documentation generated

Generate a `CURRENT.md` or machine-readable state manifest from code/configuration. Do not hand-maintain hardcoded tool counts.
