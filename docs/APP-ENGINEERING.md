# Application engineering

The assistant should be able to design, build, test, and explain software without becoming dependent on a specific hosted builder.

## Recommended cycle

```text
classify -> inspect -> model -> design -> build -> verify -> operate -> reflect
```

## Portable defaults

Prefer open interfaces and replaceable infrastructure:

| Need | Portable option |
|---|---|
| small local data | JSON / CSV / SQLite |
| multi-user database | SQL database |
| object storage | filesystem or S3-compatible interface |
| authentication | local session or OIDC-compatible interface |
| scheduled work | process scheduler / cron / queue |
| realtime | polling / SSE / WebSocket |
| deployment | standard process/container/service manager |
| AI | provider interface, local or remote |
| agent tools | typed adapter protocol |

## Definition of done

Before saying a generated application is complete, collect evidence for:

- clean installation/startup;
- reproducible build;
- tests;
- health check;
- configuration documentation;
- `.env.example` without secrets;
- documented persistence;
- error handling;
- port/config overrides;
- no hidden dependency on the environment that generated it.
