# SolarisPKN-IA Public Blueprint — Release

This release is intended for a public repository that explains the SolarisPKN-IA architecture without publishing the private assistant itself.

## Release properties

- clean-room reference implementation;
- vendor-neutral architecture;
- no private personality;
- no personal memory or conversations;
- no user-specific projects;
- no credentials or local authentication state;
- no private runtime artifacts;
- no bundled third-party framework/application source;
- no model weights;
- synthetic examples only.

## Reference implementation

The included Node.js skeleton demonstrates:

- hash-chained append-only session events;
- capability registry;
- chat-first intent/tool brokering;
- deny-by-default approval binding;
- typed memory lifecycle;
- learning-provider federation;
- plugin-manifest validation;
- deterministic gateway routing;
- narrow device-node capabilities;
- continuous-voice state contract.

It is educational reference code, not the private production runtime.

## Validation

Run `npm test` and `npm run audit:public` before publishing modifications.

## Licensing

This public edition is licensed under the **GNU General Public License v3.0 only (GPL-3.0-only)**. See `LICENSE`.
