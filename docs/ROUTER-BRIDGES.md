# Router bridges and provider profiles

A model router is an optional **provider layer**, not the identity of the assistant.

## Generic bridge contract

A bridge can declare:

```json
{
  "id": "local-router",
  "endpoint": "http://127.0.0.1:PORT/v1",
  "protocol": "openai-compatible",
  "privacyModes": ["PUBLIC_ONLY"],
  "capabilities": ["failover", "quota-awareness"],
  "enabled": false
}
```

## Profiles

Profiles describe intent rather than vendors:

- `balanced`
- `coding`
- `cheap`
- `fast`
- `offline`

The runtime selects only bridges that are healthy, enabled, allowed by policy, and compatible with the task's privacy class.

## Privacy rule

A loopback endpoint is **not proof** that inference stays local. A router may forward data upstream. Therefore private context is denied until the effective upstream/privacy behavior is explicitly declared.

## Coding agents

A coding-agent adapter should separate at least:

- read-only planning/exploration;
- mutating build/edit mode.

Mutating code work passes through the same approval/tool pipeline as any other write action.

## No credential automation

The core does not rotate, scrape or manufacture external account credentials. Keys belong to a private credential store outside prompts and public repositories.
