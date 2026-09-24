export class CapabilityRegistry {
  #providers = new Map();

  register(provider) {
    if (!provider?.id || !Array.isArray(provider.capabilities)) throw new Error('invalid provider');
    if (this.#providers.has(provider.id)) throw new Error(`duplicate provider: ${provider.id}`);
    this.#providers.set(provider.id, Object.freeze({ trust: 'external', externalEffects: false, ...provider }));
  }

  list() { return [...this.#providers.values()]; }

  providersFor(capability, { trust } = {}) {
    return this.list().filter(p => p.capabilities.includes(capability) && (!trust || p.trust === trust));
  }
}
