const ORDER = ['candidate', 'validated', 'practiced', 'verified', 'mastered'];

export class MemoryStore {
  #items = new Map();

  propose({ id, content, kind = 'knowledge', source }) {
    if (!id || !content || !source) throw new Error('id, content and source required');
    const item = { id, kind, content, source, state: 'candidate', evidence: [], createdAt: new Date().toISOString() };
    this.#items.set(id, item);
    return structuredClone(item);
  }

  get(id) { const item = this.#items.get(id); return item ? structuredClone(item) : null; }

  advance(id, state, evidence) {
    const item = this.#items.get(id);
    if (!item) throw new Error('memory item not found');
    const from = ORDER.indexOf(item.state), to = ORDER.indexOf(state);
    if (to < 0 || to > from + 1) throw new Error('memory states advance one step at a time');
    if (!evidence) throw new Error('evidence required');
    item.state = state;
    item.evidence.push({ at: new Date().toISOString(), state, evidence });
    return structuredClone(item);
  }

  search(query) {
    const q = query.toLowerCase();
    return [...this.#items.values()].filter(x => x.content.toLowerCase().includes(q)).map(structuredClone);
  }
}
