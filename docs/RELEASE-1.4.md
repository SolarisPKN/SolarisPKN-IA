# SolarisPKN-IA public blueprint 1.4

This update is built **exclusively on the already published public blueprint**, using original, provider-neutral code. It is not a copy or redistribution of the private Solaris installation.

## Included

- **Publication gate** (`src/security/publication-gate.mjs`): evaluates release declarations using default-deny rules for unreviewed origin, nonpublic data, personalization, credentials, binaries, copied source and private runtime dependencies. It operates only on metadata, not on remote services.
- **Context budget** (`src/memory/context-budget.mjs`): deterministic ID-only selection with priority, budget and explicit data-class controls; no persistence, prompts or private memory.
- **Maintenance-window policy** (`src/security/maintenance-window.mjs`): pure policy checking an exact operation digest, scope, expiry, owner permission and destructive action. It does **not** implement privilege escalation, remote access or host modifications.
- Synthetic unit tests; a file-by-file source manifest and local integrity verifier.

## Deliberately excluded

The private engine, models and weights, personal memory, identities, device maps, provider configurations and credentials, confidential notes, reverse-engineered vendor code, installed SDKs, binary tools, employer resources, proprietary adapters, source recovered from executables, and any third-party material not previously part of the public blueprint.

References to external products in historical documentation are **informational**; no implementation, credentials or SDK from those sources was copied into this update.

## Provenance and limitations

Each changed or added file is listed in `docs/release-source-manifest.json` with its SHA-256, declared original authorship, data boundary and a review note. The release verifier checks hashes and scope. This declaration is evidence of the process used for this update, **not absolute proof of copyright ownership**; manual inspection and repository review remain required.

This update adds public reference primitives and tests, not functional parity with the private system.

## Run

```sh
npm run ci
```

Nothing in the public demo needs a private token, a Windows administrator, a cloud account or any third-party backend.
