# Dual Markdown Mind

A Solaris-like assistant can expose two **separate** knowledge spaces without confusing them.

## Mind A — owner vault

The owner controls this vault. The assistant receives **read-only** access by default.

Typical contents:

- notes and ideas;
- journals;
- project thinking;
- links between concepts;
- research notes;
- personal taxonomies.

The assistant can search/retrieve bounded notes and suggest connections, but must not silently rewrite the owner's thinking.

## Mind B — assistant vault

The assistant has a separate writable vault for its own:

- reflections;
- hypotheses;
- learning notes;
- knowledge candidates;
- skill observations;
- project summaries;
- unresolved questions.

Markdown keeps the data human-readable and portable. Wikilinks such as `[[Concept]]` provide a simple graph convention.

## Scale

Do **not** load a large vault into a prompt. Use:

1. recursive/incremental indexing;
2. content hashes + mtimes to detect changes;
3. lexical/vector/graph indexes as derived state;
4. bounded retrieval;
5. date sharding for high-volume generated notes, e.g. `YYYY/MM/DD/note.md`;
6. disk-space monitoring without treating index-cycle limits as disk quotas.

Hundreds of gigabytes can remain on disk while only a handful of relevant notes enter model context.

## Cross-mind suggestions

Connections between owner and assistant notes are **suggestions**, not facts. Store evidence such as shared terms, explicit wikilinks, source paths and scores.

## Obsidian compatibility

No special proprietary format is required. Plain Markdown folders plus wikilinks are enough for Obsidian or other editors to visualize either vault.

## Privacy boundary

The owner vault remains owner-controlled. The assistant vault never grants permission to modify the owner vault, and neither vault grants authority to execute external actions.
