# Architecture

## 1. The assistant is a control plane, not a single model

The model is one replaceable reasoning component. The durable product is the orchestration layer around it: sessions, policy, memory, tools, providers, learning, devices, and user experience.

### Main layers

```text
Experience
  chat / voice / notifications / advanced admin

Conversation Runtime
  session events / intent / context / turn state

Executive Layer
  planning / attention / delegation / verification

Capability Layer
  provider-neutral abilities

Action Layer
  tool broker / policy / approval / sandbox

Knowledge Layer
  working context / typed memory / retrieval / learning lifecycle

External Layer
  models / apps / creative software / browser / channels / devices
```

## 2. Event-sourced sessions

A session should be an append-only sequence of typed events rather than an editable chat JSON blob.

Example:

```text
session.started
user.message
route.selected
capabilities.selected
model.requested
tool.requested
policy.checked
approval.requested
approval.granted
tool.completed
memory.proposed
assistant.message
turn.completed
```

Benefits:

- replay and debugging;
- crash recovery;
- auditable decisions;
- forks without rewriting history;
- consistent projections for UI, model context, and logs.

## 3. Capability seams

The core asks for a capability, not a product name.

Examples:

```text
model.text.generate
embedding.create
speech.stt
speech.tts
voice.realtime
web.search
browser.interact
filesystem.read
filesystem.write
code.execute
image.generate
image.edit
video.edit
memory.search
memory.propose
scheduler.create
channel.send
node.notify
```

A provider advertises which capabilities it satisfies and under what policy constraints.

## 4. Tool broker

Do not expose every tool to the model on every turn.

The broker should:

1. inspect the user request;
2. infer required capabilities;
3. filter tools by profile and policy;
4. present only a small relevant set;
5. re-evaluate if the task changes.

This improves safety, tool choice, and prompt size.

## 5. Monotonic policy pipeline

A useful pipeline is:

```text
tool request
  -> schema validation
  -> capability ceiling
  -> profile policy
  -> scope validation
  -> external-effect classification
  -> approval check
  -> sandbox / execution wrapper
  -> execution
  -> post-condition verification
  -> receipt
```

A later layer may restrict an action further, but must never silently widen permissions denied earlier.

## 6. Memory

Separate at least four concerns:

- **working context**: temporary task state;
- **episodic memory**: what happened;
- **curated knowledge**: facts or procedures accepted as durable;
- **prospective memory**: future intentions, reminders, or unresolved work.

Every durable item should have provenance and a lifecycle. Retrieval output is evidence for reasoning, not automatic truth.

## 7. Learning lifecycle

Use an explicit epistemic state machine:

```text
candidate -> validated -> practiced -> verified -> mastered
```

External teachers may propose knowledge, exercises, or evaluations. The local assistant remains the authority that decides what becomes durable.

## 8. Gateway and nodes

The gateway is a local control plane for channels and devices. A node can represent another PC, a phone, a small computer, an IoT controller, or a media workstation.

Each node declares:

- identity;
- pairing state;
- capability manifest;
- command allowlist;
- health/presence;
- policy ceiling.

A node must never imply generic shell access merely because it is paired.

## 9. Chat-first experience

The default product should be one conversation surface. Tool activity appears as collapsible progress, not as a requirement that the user manually selects tools.

Voice mode is a different input/output transport over the same session runtime, not a separate brain.

## 10. Custom personality

A real installation can load a user-owned personality or persona profile, but it must be an optional local layer. The public blueprint contains no private personality definition.
