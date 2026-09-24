# Personalization without publishing a personality

The public blueprint deliberately contains **no Solaris personality**.

A private installation may add a local profile with fields such as:

```json
{
  "displayName": "My Assistant",
  "language": "en",
  "tone": "neutral",
  "voiceProfile": "local-default",
  "interactionRules": [],
  "private": true
}
```

The important architectural rule is that persona is a presentation/interaction layer. It must not grant permissions, bypass policy, or redefine factual memory.

Keep the real profile outside the public repository.
