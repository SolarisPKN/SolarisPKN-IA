# Testing strategy

Test invariants, not only happy paths.

Recommended adversarial tests:

- corrupted event-log tail is ignored or repaired safely;
- a node cannot widen its capability ceiling;
- a tool outside the active scope is denied;
- an expired approval cannot be replayed;
- changing an approved payload invalidates authorization;
- external teacher output remains `candidate`;
- a plugin manifest is validated before runtime code loads;
- provider failure preserves task state;
- unavailable platform features report `unavailable`, not `healthy`;
- private paths and secrets never appear in public reports.
