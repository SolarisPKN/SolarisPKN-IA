const INTENT_CAPABILITIES = {
  conversation: ['memory.search'],
  memory: ['memory.search'],
  learning: ['learning.search', 'learning.explain', 'learning.evaluate'],
  engineering: ['filesystem.read', 'filesystem.search', 'code.execute', 'test.run'],
  creative: ['creative.inspect', 'creative.edit', 'creative.render'],
  automation: ['scheduler.read', 'scheduler.create']
};

export function selectCapabilities(intent) {
  return [...(INTENT_CAPABILITIES[intent] ?? [])];
}

export function selectTools({ intent, tools, allowedCapabilities = null }) {
  const wanted = new Set(selectCapabilities(intent));
  return tools.filter(tool => wanted.has(tool.capability) && (!allowedCapabilities || allowedCapabilities.includes(tool.capability)));
}
