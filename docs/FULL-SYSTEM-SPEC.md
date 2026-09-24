# Full system idea specification

This document connects the detailed capability matrix to one coherent assistant design.

## 1. Experience layer

The default surface is a conversation. Text, push-to-talk, and continuous voice all feed the same session runtime. Tool activity is visible but does not require the user to manually choose tools. The assistant supports interruption, steering, resumption, attachments, activity receipts, approvals, and optional notifications.

## 2. Executive layer

The executive runtime maintains goals, task state, priorities, temporal context, uncertainty, resource budgets, interruptions, and verification criteria. It can delegate bounded subtasks to isolated workers, compare independent hypotheses, and resume durable jobs after interruptions.

## 3. Provider/model mesh

Reasoning, embeddings, speech, vision, image/video generation, browsing, and other capabilities are provider-neutral. Providers advertise capabilities, cost/latency/privacy/resource metadata and health. Routing may prefer local/free/private resources, but must never equate “listed” with “available”. Failover preserves task identity and policy scope.

## 4. Tool and action system

Tools are typed, schema-validated capabilities. A broker selects only a relevant subset for each turn. Every invocation passes one monotonic policy pipeline. Sensitive actions require exact-bound, expiring, single-use authorization. Raw shell/script execution is a distinct high-authority capability, not an implicit fallback.

## 5. Memory and knowledge

The design separates working context, episodic history, curated knowledge, procedural skills and prospective/future memory. Retrieval can combine lexical, vector and relation-aware signals. Durable facts preserve provenance. Consolidation produces candidates; promotion requires evidence. Contradictions and superseded records remain explainable rather than silently overwritten.

## 6. Learning/Academy

The assistant can consult external or local teachers, curricula, exercise generators and evaluators through a provider-neutral learning interface. Teacher output is never automatically true. Knowledge moves through candidate → validated → practiced → verified → mastered. Procedural knowledge becomes a draft skill, is tested/reviewed, and only then can be activated.

## 7. Software/application engineering

The assistant can inspect, architect, implement, test and explain projects. The portable default avoids hidden dependence on the environment that generated the app. A project should include reproducible build/start instructions, tests, health checks, safe configuration, persistence documentation, error handling and declared external dependencies.

## 8. Creative/media production

Creative applications expose typed capabilities such as image editing, 3D scene operations, timeline editing, audio mixing, rendering, captions, streaming scenes and asset management. The core does not depend on a particular application. High-level typed operations are preferred over arbitrary embedded scripting. Mutating workflows use snapshot → plan → edit → preview → verify → finalize.

## 9. Games and interactive environments

Game/environment adapters expose observations and bounded actions instead of unrestricted input control. The architecture can support game state, spatial/temporal models, NPC-like memory, demonstrations, skill learning and social behavior, but concrete games require explicit adapters and authorization.

## 10. Gateway, channels and distributed nodes

One gateway normalizes inbound/outbound channels. Reply delivery is deterministic and origin-bound. Paired nodes expose only declared capabilities and command allowlists. Nodes can represent PCs, phones, small computers, servers, controllers, sensors or media workstations. Scheduling is resource/locality-aware and cannot widen permissions.

## 11. IoT/sensor fabric

Sensors produce typed measurements with source, units, timestamps and quality metadata. Controllers expose narrow actions with safety interlocks. Automation must remain local-first where possible, support degraded/offline modes and never infer safety-critical authority merely from a natural-language request.

## 12. Embodiment/avatar

An avatar is an observable presentation layer over assistant state: speech, expression, presence, lip-sync, game/desktop representation and optional camera/vision hooks. It is not the identity authority and cannot bypass policy.

## 13. Authorized security work

Security capabilities require explicit scope and authorization. The system can support posture checks, dependency/configuration analysis, logs, protocols, binaries and incident response in authorized environments. Capability possession is not target authorization; network/egress/credential boundaries stay enforced.

## 14. Optional sensitive personal domains

Health/wellness or biometric inputs are isolated, opt-in and minimally exposed. They require dedicated stores, provenance/units and explicit user authorization. The public blueprint contains no real personal data or diagnostic logic.

## 15. Capability Forge and architecture intelligence

When a missing ability is detected, the system may propose a new adapter, tool or skill. The lifecycle is need → draft → sandbox/test → review → approval → activation. It may study public patterns/providers, but never auto-import third-party code or silently install new authority.

## 16. Continuity and offline behavior

The assistant distinguishes local, remote and unavailable capabilities. Loss of internet/provider/node connectivity triggers documented degraded behavior, not fabricated success. Jobs can checkpoint, retry, reconnect and continue with the same provenance and scope.

## 17. Doctor, evidence and state

A unified doctor reports configuration, providers, memory, indexes, sandboxes, tools, plugins, jobs, nodes and privacy state using OK/WARN/FAIL/UNAVAILABLE. Current documentation is generated from live registries/configuration where possible, avoiding stale hard-coded counts.

## 18. Public/private split

The public project contains the architecture, schemas, synthetic tests and generic reference implementation. A real personal installation keeps persona, memories, projects, conversations, credentials, node identities, private skills and local runtime state outside the public repository.

For the exhaustive inventory, read [FULL-CAPABILITY-MATRIX.md](FULL-CAPABILITY-MATRIX.md) and [FOUNDATION-CAPABILITIES.md](FOUNDATION-CAPABILITIES.md).
