# Public-only contribution and release rules

The public SolarisPKN-IA repository is a teaching/reference project. Its release process is **allowlist-first**.

## Review before adding a file

1. The file is newly authored for this repository or already included in the accepted public baseline. Do not import or rewrite unidentified upstream source, decompiled logic, private vendor contracts, or source recovered through reverse engineering.
2. Record original authorship and purpose. If inspired by a third-party project, document only the interoperable idea; do not copy its implementation, test data, generated client, asset or nonpublic API definition.
3. Use only generic constants and synthetic tests. Do not add a real identity, device address, credential, conversation, project record, document, private URL or provider configuration.
4. For an original new or modified file, record its digest and an attestation in `release-source-manifest.json`.
5. Run tests, both security checks and inspect the entire Git diff. If provenance is unknown, **exclude the file**, rather than relying on string replacement.

## What automated checks prove

The verifier checks changed-file scope, checksums, safety declarations and ordinary file types. The public scanner rejects common secret-like patterns. Neither proves that an unknown algorithm was invented independently, that source licenses permit distribution, or that a secret could not be encoded.

An approved GitHub CI result is a prerequisite, not a substitute for a human provenance review.

## Private runtime boundary

Never synchronize whole folders from a live assistant into this repository. In particular, do not ship runtime services, model files, personal profiles, chat archives, provider credentials, private gateway configurations or reverse-engineering workspaces.

The published blueprint may describe architecture and public interfaces; private implementation details remain outside the release.
