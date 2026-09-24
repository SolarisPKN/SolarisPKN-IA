# Capability catalog

This catalog describes the **idea-space** of SolarisPKN-IA. A real installation can implement only the parts it needs.

## Conversation and presence

- text chat;
- push-to-talk voice;
- continuous opt-in conversation;
- speech interruption / barge-in;
- notifications;
- conversation history projection;
- accessibility modes;
- desktop/mobile-friendly UI.

## Executive functions

- intent classification;
- goal decomposition;
- attention and priority management;
- task continuity;
- uncertainty tracking;
- verification before declaring completion;
- bounded delegation;
- queue steering while a task is running;
- interruption and resumption.

## Model/provider mesh

- local and remote text models;
- embeddings;
- speech models;
- vision/media understanding;
- image/video generation;
- failover between compatible providers;
- resource-aware selection;
- privacy-aware routing;
- cost/latency/quality metadata.

## Memory and knowledge

- working memory;
- episodic memory;
- curated knowledge;
- prospective/future memory;
- lexical and vector retrieval;
- provenance;
- consolidation;
- forgetting/deletion boundaries;
- import/export with hashes;
- project-scoped knowledge views.

## Learning and skills

- external teacher interface;
- curricula and subjects;
- concept explanations;
- exercises and projects;
- evaluations;
- mastery tracking;
- knowledge-gap detection;
- procedural skill drafts;
- review before activation;
- evidence-based skill improvement.

## Software engineering

- project inspection;
- planning and architecture;
- code generation/editing;
- dependency analysis;
- build/test/debug loops;
- database/schema work;
- API design;
- web/mobile/desktop/game projects;
- portability checks;
- deployment preparation;
- health checks;
- reproducibility verification.

## System administration and infrastructure

- filesystem inspection;
- process/service status;
- resource monitoring;
- logs;
- network diagnostics;
- container/service orchestration through scoped adapters;
- backup/recovery workflows;
- configuration auditing.

## Browser and research

- web search;
- page extraction;
- structured research;
- citation/provenance capture;
- browser interaction through an explicit capability;
- comparison and verification workflows.

## Creative/media production

- image generation/editing;
- graphic design;
- 3D scene/model/render capabilities;
- video timeline editing;
- color/audio/render operations;
- captions/transcription;
- avatars/voiceovers;
- streaming scenes/sources/overlays;
- asset catalogs;
- export/render verification.

## Games and interactive environments

- game-specific adapters;
- telemetry/state observation;
- bounded action vocabularies;
- modding/dev assistance;
- server administration;
- in-game assistant/avatar presence;
- no generic unrestricted control by default.

## Devices, IoT and home automation

- paired device nodes;
- sensors;
- switches/relays;
- energy/water/environment measurements;
- local controllers;
- presence/heartbeat;
- command allowlists;
- offline/local operation;
- explicit safety interlocks.

## Embodiment/avatar

- desktop avatar state;
- expression/action events;
- lip-sync hooks;
- voice output;
- game/avatar adapters;
- optional vision/camera inputs;
- identity is separate from the private personality profile.

## Personal data domains

The architecture can support private domains such as activity, wellness, schedules, or personal records through dedicated providers. These should be isolated, opt-in, minimally exposed, and never bundled in a public repository.

## Authorized security work

- security posture checks;
- dependency/configuration audits;
- local network diagnostics;
- log analysis;
- binary/application inspection in authorized environments;
- packet/protocol analysis on systems the operator is allowed to inspect;
- explicit scope and authorization required.

## Communication and publishing

- channel adapters;
- drafts;
- approval before external sending/publishing;
- attachment/media handling;
- retry/idempotency;
- origin-bound reply routing;
- scheduling.

## Scheduler and background work

- reminders;
- recurring jobs;
- conditional checks;
- maintenance tasks;
- bounded background sessions;
- result/event delivery;
- cancellation and retry policies.

## Multi-agent/fusion

- scoped subagents;
- independent reviewers;
- multiple-model comparison;
- role/tool/capability ceilings;
- parent-child cancellation;
- immutable candidate review;
- no permission widening by children.

## Observability and recovery

- unified doctor;
- machine-readable health report;
- checkpoints;
- atomic publication;
- workspace quotas;
- history integrity;
- current-state manifest;
- stale-document detection;
- public/private residue scans.

## Capability Forge

A mature deployment can support creating new adapters or skills from observed needs, but the process should be:

```text
need detected -> draft -> sandbox/test -> review -> human/policy approval -> activation
```

Never silently self-install arbitrary code.
