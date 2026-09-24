export class NodeRegistry {
  #nodes = new Map();

  pair({ id, capabilities = [], commandAllowlist = [] }) {
    if (!id) throw new Error('node id required');
    if (this.#nodes.has(id)) throw new Error('node already paired');
    const node = { id, paired: true, capabilities: [...new Set(capabilities)], commandAllowlist: [...new Set(commandAllowlist)], lastSeenAt: null };
    this.#nodes.set(id, node);
    return structuredClone(node);
  }

  heartbeat(id) {
    const node = this.#nodes.get(id);
    if (!node) throw new Error('unknown node');
    node.lastSeenAt = new Date().toISOString();
    return structuredClone(node);
  }

  can(id, capability) {
    return Boolean(this.#nodes.get(id)?.capabilities.includes(capability));
  }

  executeAllowed(id, command) {
    return Boolean(this.#nodes.get(id)?.commandAllowlist.includes(command));
  }
}
