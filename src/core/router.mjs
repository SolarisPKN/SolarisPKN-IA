const RULES = [
  [/(learn|study|teach|explain|practice|quiz)/i, 'learning'],
  [/(build|create|implement|code|app|api|website)/i, 'engineering'],
  [/(image|video|audio|3d|render|timeline|design)/i, 'creative'],
  [/(remember|memory|recall|what did we)/i, 'memory'],
  [/(schedule|remind|every day|when .* happens)/i, 'automation']
];

export function routeIntent(text) {
  for (const [re, intent] of RULES) if (re.test(text)) return intent;
  return 'conversation';
}
