# Runtime parity and operational status

The public repository is a clean-room reference implementation. It is not a dump of the private Solaris runtime.

## October 2026 snapshot

A private reference deployment was compared against the public blueprint on 2026-10-05. Its conservative internal acceptance matrix reported:

- 793 represented capability/requirement points;
- 93 COVERED: an executable contract or evidence path exists;
- 548 PARTIAL: architecture or implementation exists but the requirement is not fully demonstrated;
- 19 BLOCKED_EXTERNAL: completion depends on hardware, accounts, services, authorization, or another external condition.

These numbers describe that observed deployment at that date. They are not promises that this public repository implements all 793 points.

## What this release adds

The public reference now includes executable patterns for exact-bound expiring one-shot approvals, durable DAG-style job state with optimistic revisions, evidence/diversity consensus, host telemetry feeding functional state without changing truth or authority, explicit network egress policy, sanitized MCP exposure, and a secure remote-approval design for paired mobile clients.

The objective is architectural parity: important mechanisms should have a small inspectable public analogue, while private data, private behavior, machine-specific bindings and production implementation details stay private.

## Status language

COVERED means an executable contract/evidence path exists. It does not mean every external dependency is connected.

PARTIAL means useful implementation exists but evidence or integration is incomplete.

BLOCKED_EXTERNAL means the code cannot honestly finish the requirement without something outside the repository.

A test that verifies one module must never be relabeled as proof that the whole system works.
