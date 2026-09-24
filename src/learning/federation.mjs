export class LearningFederation {
  #providers = new Map();

  register(provider) {
    if (!provider?.id || typeof provider.supports !== 'function') throw new Error('invalid learning provider');
    this.#providers.set(provider.id, provider);
  }

  choose(intent) {
    return [...this.#providers.values()].find(p => p.supports(intent)) ?? null;
  }

  async ask(intent, payload) {
    const provider = this.choose(intent);
    if (!provider) throw new Error(`no learning provider for ${intent}`);
    const result = await provider.execute(intent, payload);
    return {
      providerId: provider.id,
      state: 'candidate',
      result,
      note: 'External teaching output is evidence, not automatically durable truth.'
    };
  }
}
