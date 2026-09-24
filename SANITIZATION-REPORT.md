# Sanitization report

This artifact is a **clean-room public blueprint**, not a filtered copy of the private runtime.

## Explicitly excluded

The public package contains none of the following private-runtime categories:

- personality/persona definitions;
- personal memory or conversation history;
- personal/project knowledge graphs;
- user-specific project files;
- local filesystem inventories;
- credentials or secret vaults;
- provider authentication state;
- device pairing secrets;
- health/biometric information;
- runtime checkpoints, request dumps, caches, locks, or logs;
- historical private baselines/releases;
- private integration notes.

## Third-party material excluded

No third-party agent/framework source tree, vendor adapter implementation, vendor SDK source, model weight, external application plugin, or copied vendor documentation is bundled.

The architecture uses generic concepts only: capabilities, providers, adapters, typed tool contracts, HTTP/WebSocket/CLI transports, OAuth/OIDC-style authentication, and MCP-compatible tool discovery where desired.

## Clean-room approach

The public code was written as a new minimal reference implementation from the **architectural ideas** only. Private implementation files were not copied into this package.

## Verification

The release is checked for:

- common secret/token patterns;
- personal Windows/macOS/Linux path fragments;
- private owner-name patterns;
- named external framework/vendor residue;
- test failures.

Run:

```bash
npm test
npm run audit:public
```
