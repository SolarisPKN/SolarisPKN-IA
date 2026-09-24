export const localTextProvider = {
  id: 'example-local-text',
  trust: 'local',
  externalEffects: false,
  capabilities: ['model.text.generate']
};

export const externalTeacher = {
  id: 'example-teacher',
  supports(intent) { return ['explain', 'exercise', 'evaluate'].includes(intent); },
  async execute(intent, payload) { return { intent, topic: payload.topic, synthetic: true }; }
};
