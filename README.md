# SolarisPKN-IA — Public Blueprint

**English** · [Español](README.es.md)

This repository is the **public architectural idea** behind SolarisPKN-IA.

It is intentionally **not** the private Solaris runtime. It contains no personal memory, private personality profile, private project history, credentials, local paths, private conversations, bundled model weights, or source code from third-party frameworks/services.

The goal is simple: if someone asks **“how could I build an assistant like Solaris?”**, this repository should expose the architecture, the complete capability map, and a minimal reference implementation without publishing the private assistant itself.

## Complete idea-space

This repository now documents the full sanitized capability catalog recovered from the design:

- **133** foundation primitives;
- **660** individually named later requirements;
- **793** capability/requirement points total;
- architecture lineage from **M00 through M60**.

Start with:

- [Complete capability inventory](docs/capabilities/README.md)
- [Foundation capabilities](docs/FOUNDATION-CAPABILITIES.md)
- [Full system specification](docs/FULL-SYSTEM-SPEC.md)
- [Architecture lineage M00–M60](docs/MODULE-LINEAGE.md)

## Core idea

Solaris is not one giant model and not a folder full of hundreds of buttons. It is a private-first assistant built from small, replaceable layers:

```text
User (text / voice / UI)
          |
          v
   Intent + Context Router
          |
          v
 Capability / Tool Broker
          |
          v
 Policy + Approval Pipeline
          |
   +------+------+----------------+
   |             |                |
   v             v                v
 Memory       Learning         External adapters
   |             |                |
   +-------> Session/Event Log <---+
                  |
                  v
              Verification
                  |
                  v
             User-facing answer
```

The assistant chooses capabilities automatically. The normal interface should feel like a chat, not a toolbox.

## Design principles

1. **Private by default.** Local data does not leave the machine unless explicit policy allows it.
2. **Capability before provider.** The core asks for a capability; a provider is selected later.
3. **Deny by default.** Reading/reasoning are separate from actions with external effects.
4. **Approval is bound to the exact action.**
5. **One durable event stream.**
6. **Memory is governed and provenance-aware.**
7. **Learning is evidence-based:** `candidate → validated → practiced → verified → mastered`.
8. **Adapters are replaceable.**
9. **UI is chat-first.**
10. **Third-party systems are references, not the architecture.**

## What is included

- vendor-neutral architecture;
- exhaustive sanitized capability inventory;
- a small original reference implementation using Node.js built-ins;
- event-sourced sessions, capability registry, tool brokering, policy checks, learning state, gateway/nodes and voice-loop contracts;
- security/privacy rules;
- step-by-step build guide;
- public/private boundary checklist;
- synthetic tests.

## What is deliberately excluded

See [docs/WHAT-IS-NOT-INCLUDED.md](docs/WHAT-IS-NOT-INCLUDED.md).

## Start here

1. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
2. Read the [complete capability inventory](docs/capabilities/README.md).
3. Follow [docs/BUILD-YOUR-OWN.md](docs/BUILD-YOUR-OWN.md).
4. Run `npm test`.
5. Run `npm run demo`.
6. Add providers through generic contracts instead of rewriting the core.

## Public/private boundary

A real assistant may contain private memory, a custom personality, user projects, credentials, local paths, device bindings, and personal automation rules. **None of those belong in this repository.**

This repository documents the mechanism and idea-space, not the owner.

## License

SolarisPKN-IA is released under the **GNU General Public License v3.0 only (GPL-3.0-only)**. See [LICENSE](LICENSE).
