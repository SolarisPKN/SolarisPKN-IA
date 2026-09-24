# M72–M80 generic reference patterns

This public blueprint treats M72–M80 as portable patterns, not a publication of any private runtime or owner-specific setup.

## M72 — Config migration and release defaults
Safe updates apply explicit forward migrations, preserve operator-provided values, seed only missing release defaults, validate required paths, and reject unknown future schemas. See `src/config/migrate.mjs`.

## M73 — Resource-aware bootstrap
First-run profiles (`minimal`, `recommended`, `complete-local`) are constrained by explicit disk/RAM/VRAM budgets and a resource catalog. Planning does not imply that every downloaded resource stays resident. See `src/bootstrap/resource-plan.mjs`.

## M74 — Router mesh with explicit data boundaries
Endpoints are not trust signals: loopback may still proxy remote inference. Eligibility combines health, privacy class, capabilities, cost limits and a declared data boundary. See `src/providers/router-mesh.mjs`.

## M75 — External worker adapters
Coding/automation agents are replaceable workers, not the core. Their permission UI is not treated as a sandbox. Capability policy, environment filtering, mutation approval and an independent sandbox remain outside the worker. See `src/workers/adapter.mjs`.

## M76 — Conversational orchestration
Chat stays primary. Provider/tool/worker selection remains behind capability contracts; technical traces belong to optional advanced surfaces.

## M77 — Idle reflection governance
Reflection/dream cycles pause on user activity, use budgets, have no external effects and emit candidates/proposals only. See `src/cognitive/idle-orchestrator.mjs`.

## M78 — Embodiment remains presentation
Movable desktop avatars, animation assets, visemes and presence are clients of the runtime. Visibility never grants camera/input/policy authority. Private/custom avatar assets are deliberately excluded from the public blueprint.

## M79 — Scoped verification evidence
Evidence names the exact scope it checked. A targeted test cannot be relabeled as proof that an entire repository or release is healthy. See `src/core/evidence.mjs`.

## M80 — Baseline acceptance
A Jarvis-like baseline is an integration checkpoint, not a claim of general autonomy. Capabilities should be classified as locally implemented, adapter-dependent, authorization-dependent or environment-blocked.
