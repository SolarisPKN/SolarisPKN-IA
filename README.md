# SolarisPKN-IA — Public Blueprint

**English** · [Español](README.es.md)

This repository is the **public architectural idea** behind SolarisPKN-IA.

It is intentionally **not** the private Solaris runtime. It contains no personal memory, personality profile, private project history, credentials, local paths, private conversations, vendor source code, bundled models, or third-party framework files.

The goal is simple: if someone asks **“how could I build an assistant like Solaris?”**, this repository should explain the design well enough to build an independent implementation.

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

1. **Private by default.** Local data does not leave the machine unless an explicit policy allows it.
2. **Capability before provider.** The assistant asks for `speech.tts`, `code.execute`, `memory.search`, or `image.edit`; a provider is selected later.
3. **Deny by default.** Reading and reasoning are separate from actions with external effects.
4. **Approval is bound to the exact action.** An approval for one payload is not reusable for another.
5. **One durable event stream.** Important session state is reconstructible from typed events.
6. **Memory is governed.** New information is not automatically promoted to permanent truth.
7. **Learning is evidence-based.** Knowledge can progress through candidate, validated, practiced, verified, and mastered.
8. **Adapters are replaceable.** Models, speech engines, browsers, creative tools, channels, and devices are optional providers.
9. **UI is chat-first.** Advanced panels are for diagnostics and administration, not normal use.
10. **Third-party systems are references, not the architecture.** This public edition bundles no external framework source.

## What is included

- a vendor-neutral architecture;
- a small original reference implementation using only Node.js built-ins;
- examples of event-sourced sessions, capabilities, tool selection, policy checks, learning state, gateways, nodes, and voice-loop contracts;
- security and privacy rules;
- a step-by-step “build your own” guide;
- a public/private boundary checklist;
- tests that demonstrate the invariants.

## What is deliberately excluded

See [docs/WHAT-IS-NOT-INCLUDED.md](docs/WHAT-IS-NOT-INCLUDED.md).

## Start here

1. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
2. Follow [docs/BUILD-YOUR-OWN.md](docs/BUILD-YOUR-OWN.md).
3. Run `npm test`.
4. Run `npm run demo`.
5. Add your own providers through the generic contracts instead of editing the core.

## Public/private boundary

The real assistant may contain private memory, a custom personality, user projects, account credentials, local paths, device bindings, and personal automation rules. **None of those belong in this repository.**

This repository documents the mechanism, not the owner.


## License

SolarisPKN-IA is released under the **GNU General Public License v3.0 (GPL-3.0)**. See [LICENSE](LICENSE).
