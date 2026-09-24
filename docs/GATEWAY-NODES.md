# Gateway and nodes

## Gateway

Use one local gateway to normalize messages from channels, applications, and devices.

Routing should be deterministic:

```text
source + account + peer + thread -> profile + project + session
```

The model should not choose where a reply is delivered.

## Nodes

A paired node can expose narrow capabilities such as:

- notifications;
- screen capture;
- microphone/speaker;
- sensors;
- file transfer;
- application control;
- a local model endpoint.

Pairing a device does not grant unrestricted shell access.
