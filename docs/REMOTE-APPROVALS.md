# Remote critical approvals

A remote-control client must not turn a broad host lease into an unrestricted bypass.

## Reference flow

1. The host computes the exact digest of a critical operation.
2. The host persists a short-lived approval request containing only safe metadata.
3. A previously paired mobile client retrieves that request through an encrypted authenticated session.
4. The user confirms the exact request with a local device-authentication gesture.
5. The client signs a canonical statement containing request id, digest, counter, nonce and expiry.
6. The host verifies device identity, freshness, anti-replay state, active lease scope and the exact digest.
7. The guardian creates a short-lived one-shot grant for that digest.
8. The next matching operation consumes the grant.
9. Reuse, changed payloads, expired requests and mismatched digests are denied.

## Required invariants

- Reading a digest is never approval.
- Pairing is not authorization for arbitrary host actions.
- A full-host lease is still bounded by critical-operation rules.
- Approval must be exact-bound, expiring and one-shot.
- Replay counters and nonces are mandatory for remote approval messages.
- The host guardian remains the final authority.
- Revoking a device invalidates future remote approval proofs.
- Logs may record safe metadata and digests, never secret material.

The public ApprovalLedger module demonstrates the state machine and exact binding. Production cryptographic identity, mobile keystore integration and host-specific elevation remain deployment concerns.
