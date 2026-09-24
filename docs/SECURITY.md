# Security model

## Default stance

- local/private context stays local unless explicitly released;
- external effects are denied by default;
- authorization is separate from capability possession;
- approvals are one-time and bound to the exact target/payload;
- credentials never enter prompts or event payloads;
- high-risk execution runs inside an OS boundary when possible.

## Never-implicit capability examples

These should normally require explicit policy and often human approval:

- arbitrary shell execution;
- writes outside the current task scope;
- publishing or deployment;
- sending messages to other people;
- deleting data;
- reading credentials;
- payments;
- remote device execution;
- changing security controls.

## Approval binding

An approval record should bind at least:

```text
task/session
capability
target
payload digest
scope digest
expiry
single-use nonce
```

Changing the action invalidates the approval.

## Third-party content

Treat external websites, tools, teachers, model output, files, and device messages as untrusted data until validated. A system prompt cannot make untrusted content trustworthy.
