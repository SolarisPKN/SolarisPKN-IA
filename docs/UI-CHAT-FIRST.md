# Chat-first UX

The main interface should not be a tool catalog.

A normal conversation looks like:

```text
User: inspect this project, fix the failing test, and explain the change

Assistant:
  working...
  ▸ searched project
  ▸ read 4 files
  ▸ ran tests
  ▸ edited 1 file
  ▸ verified 42 tests

  I found ...
```

Tool activity is visible for transparency but collapsible.

## Advanced area

Administrative screens can expose:

- tools;
- skills;
- memory;
- providers;
- nodes;
- scheduler;
- approvals;
- doctor;
- event logs.

These are not the primary interaction model.
