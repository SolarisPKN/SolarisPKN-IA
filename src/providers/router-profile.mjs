export function selectRouter({ profile = 'balanced', privacy = 'PUBLIC_ONLY', profiles, bridges }) {
  const order = profiles?.[profile] ?? [];
  const candidates = order.map(id => bridges.find(b => b.id === id)).filter(Boolean);
  const selected = candidates.find(b =>
    b.enabled === true &&
    b.healthy === true &&
    Array.isArray(b.privacyModes) &&
    b.privacyModes.includes(privacy)
  ) ?? null;
  return {
    profile,
    privacy,
    selected: selected ? { id: selected.id, endpoint: selected.endpoint } : null,
    considered: candidates.map(b => ({
      id: b.id,
      eligible: b.enabled === true && b.healthy === true && b.privacyModes?.includes(privacy) === true
    }))
  };
}
