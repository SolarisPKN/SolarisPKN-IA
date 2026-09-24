# Architecture lineage — M00 to M60

This document publishes the **design evolution** of SolarisPKN-IA without publishing the private runtime, private data, or third-party source code. Names tied to external products/frameworks were generalized into vendor-neutral concepts.

| Module | Public design contribution |
|---|---|
| M00 | Immutable baseline, inventory, test baseline and change accounting. |
| M01 | Portable configuration: base/local/env precedence, relative runtime paths and provider/connector mapping. |
| M02 | External-agent privacy boundary: prompt/response persistence controls, sanitized dumps, ephemeral homes and source attestation. |
| M03 | Memory/RAG hardening: real cache hits, source normalization, inverted index use, global atomic writes and lock safety. |
| M04 | Natural routing: ordinary work uses a lightweight explore/apply/verify loop; formal specification mode is explicit. |
| M05 | Bound review: frozen candidates, candidate/scope hashes, independent review receipts, veto/revision and mutation invalidation. |
| M06 | Action consent: capability is not authorization; sensitive external effects require one-time exact-bound approvals. |
| M07 | Durability: workspace quotas, bounded execution, staged checkpoints, verified backups/restores and atomic publication. |
| M08 | Unified doctor: read-only diagnostics with OK/WARN/FAIL/UNAVAILABLE semantics and machine-readable output. |
| M09 | Live state: generated current-state manifest, document authority hierarchy and historical/reference classification. |
| M10 | Organic workflow defaults: large or risky work does not automatically force a different methodology; workflow changes remain explicit. |
| M11 | Review authority v2: explicit review lineage/revision/target identity and deterministic replay/testing. |
| M12 | Event-sourced sessions: append-only typed events, hash chaining and tail recovery. |
| M13 | Session query/compaction/spill: searchable history, non-destructive compaction and bounded private spill storage. |
| M14 | Capability seams and plugin manifests: providers are replaceable; manifests are inspected before runtime loading. |
| M15 | Single tool execution pipeline: validate → guards → policy/approval → execute → post-check → receipt. |
| M16 | Model/provider runtime and failover: provider-neutral selection with task continuity. |
| M17 | Scoped subagents/delegation: isolated context, inherited capability ceilings, bounded depth and cancellation. |
| M18 | Background jobs and queue steering: persistent work, follow-up/collect/interrupt/steer semantics. |
| M19 | Dynamic tool-protocol client: initialize/discover/list tools, allowlists, drift detection and read/write policy separation. |
| M20 | Procedural learning v2: skill drafts, provenance, tests/review and separate activation. |
| M21 | Memory consolidation: deterministic candidate selection plus controlled merge/promotion with provenance and taint rules. |
| M22 | Identity scopes/profiles/bindings: separate users/profiles/projects/channels without permission widening. |
| M23 | Gateway/channels: one typed control plane for inbound/outbound channels and deterministic reply routing. |
| M24 | Device/compute nodes: pairing, presence, capability manifests, command allowlists and policy ceilings. |
| M25 | Production hardening: pinned upstream references, drift detection, final audit and reproducibility checks. |
| M26 | Unified agent chat: the conversation surface dynamically selects a safe subset of tools. |
| M27 | Live conversation: opt-in continuous voice, VAD state, speech loop and barge-in. |
| M28 | Chat-first UX: technical panels move under advanced/admin surfaces; chat is the normal experience. |
| M29 | Requirements coverage: a machine-readable mapping from historical requirements to operational evidence/status. |
| M30 | Language gateway: normalization, canonical intent, localization and personal-lexicon contracts. |
| M31 | Privacy guardian / identity evidence: privacy-first enrollment and evidence contracts for identity-related capabilities. |
| M32 | Digital nervous system: event/signal contracts joining perception, context, action and feedback. |
| M33 | Environment/game runtime: world observations, bounded action vocabularies, interruption and demonstration contracts. |
| M34 | Capability Forge: detect need → draft adapter/skill → sandbox/test → review → activate. |
| M35 | Academy Lab: curriculum, exercises, evaluation, mastery and knowledge-gap workflows. |
| M36 | Fusion Council: independent candidates/reviews, evidence board and synthesis rather than majority-only voting. |
| M37 | Distributed scheduler: resource-aware jobs, node placement and bounded remote execution. |
| M38 | Embodiment timeline: avatar/presence state synchronized from system events without becoming an authority source. |
| M39 | Authorized security scope: explicit scope, defensive analysis, evidence and fail-closed execution boundaries. |
| M40 | Health fabric: privacy-preserving schemas/contracts for optional personal-wellness data sources. |
| M41 | External tool catalog: separate “known capability/provider” from “installed/configured/authorized”. |
| M42 | Executive/attention/temporal layer: priorities, temporal state and interruption-aware work control. |
| M43 | Distributed fabric: node envelopes, locality rules, authenticated exchange and capability ceilings. |
| M44 | Capability ecosystem: provider discovery, comparison and replacement while keeping core contracts stable. |
| M45 | Academy governance: evidence requirements, learning quarantine and controlled promotion. |
| M46 | Defensive assurance: egress checks, secret handling, evidence boards and validation lint. |
| M47 | Knowledge fabric: provenance-linked sources, knowledge graphs/views and typed retrieval boundaries. |
| M48 | Embodiment runtime: runtime adapter contracts for avatar/desktop/game presence. |
| M49 | Health vault: isolated/private storage contract for optional sensitive wellness records. |
| M50 | Acceptance audit: distinguish implemented behavior, adapter-dependent behavior and externally blocked capability. |
| M51 | Architecture/provider intelligence: compare patterns/providers and propose changes without automatic adoption. |
| M52 | Workflow compiler: turn repeatable user workflows into reviewable bounded procedures. |
| M53 | Supply-chain integrity: plugin/code provenance, manifest integrity, quarantine and trust-state transitions. |
| M54 | Sensor fabric: generic sensor streams, units/provenance, sampling and device-bound policies. |
| M55 | Continuity/offline: degraded operation, local-first fallbacks, reconnection and state continuity. |
| M56 | Learning-provider federation: multiple teachers/curricula/progress stores behind one local learning authority. |
| M57 | App engineering runtime: classify → inspect → model → design → build → verify → operate → reflect. |
| M58 | Creative tool fabric: provider-neutral image/3D/video/audio/streaming capabilities through typed adapters. |
| M59 | Creative safety/verification: snapshot before mutation, typed tools first, preview/verify before finalize/publish. |
| M60 | Knowledge packs/final integration: durable local operational playbooks that remain useful even when external teachers/providers are offline. |

## Why publish lineage?

The numbered modules are **not dependencies** that downstream users must reproduce exactly. They show an order that reduced architectural rework: privacy and durability first, external effects second, distributed/creative/device integrations later.
