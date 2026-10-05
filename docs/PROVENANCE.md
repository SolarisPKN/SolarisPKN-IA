# Provenance, clean-room implementation and attribution

SolarisPKN-IA combines original implementation work with architectural research.

## Authorship boundary

Code in this public blueprint is a new, minimal clean-room reference implementation written for SolarisPKN-IA. The repository does not claim authorship over third-party projects, protocols, products, documentation, SDKs, models, or source trees.

Using an external idea as a reference does not make that external work part of this codebase. When a design was informed by another project, the relationship is described as inspiration, interoperability research, or a compatibility target.

## Referenced systems

Research during the private design included public material from projects and standards such as Model Context Protocol, Hermes Agent, DeepSeek Harness, OmniRoute, OpenRouter and OpenClaw documentation.

These names identify external sources of ideas or interoperability research. Their source code is not bundled here and their licenses continue to govern their own work.

## Original Solaris patterns

The public implementation specifically expresses SolarisPKN-IA decisions including capability-before-provider routing, monotonic deny-by-default policy, exact-bound one-shot approvals, evidence-scoped verification, governed memory and skill lifecycles, chat-first orchestration, functional affect/telemetry that cannot modify truth or permissions, durable jobs with revision-aware control, explicit egress boundaries and public/private architectural separation.

Common software-engineering ideas such as event sourcing, DAGs, typed schemas and optimistic concurrency are industry patterns and are not claimed as inventions.

## Contributions

Contributions should preserve this boundary: explain external inspiration, avoid copied third-party source unless its license and inclusion are explicitly reviewed, and never add private runtime data to the public repository.
