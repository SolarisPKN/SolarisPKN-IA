# Operations

## Private installation layout

A real deployment can separate code and data:

```text
app/                  # public-capable source
private-data/         # ignored, never published
  sessions/
  memory/
  credentials/
  profiles/
  nodes/
  runtime/
```

## Startup

1. load base configuration;
2. load local overrides;
3. load secrets from a credential mechanism;
4. validate provider manifests;
5. open session/memory stores;
6. run health checks;
7. start local UI/gateway;
8. enable optional adapters only after successful checks.

## Shutdown

- stop accepting new work;
- cancel or checkpoint bounded jobs;
- flush event logs;
- persist durable state;
- close external connections;
- leave no temporary credentials or dumps.
