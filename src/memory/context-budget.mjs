// Dependency-free, deterministic context selection without preserving user data.
// The caller supplies and retains source records; this function only selects IDs.
export function selectContext({ items = [], maxChars = 4000, maxItems = 12, allowClasses = ['public'] } = {}) {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  if (!Number.isSafeInteger(maxChars) || maxChars < 0 || maxChars > 1000000) throw new RangeError('invalid character budget');
  if (!Number.isSafeInteger(maxItems) || maxItems < 0 || maxItems > 1000) throw new RangeError('invalid item budget');
  if (!Array.isArray(allowClasses) || allowClasses.some(value => typeof value !== 'string')) throw new TypeError('invalid classes');
  const permitted = new Set(allowClasses);
  const accepted = [];
  const rejected = [];
  const unique = new Set();
  let usedChars = 0;
  const ordered = items.map((item, index) => ({ item, index })).sort((a, b) => {
    const p = Number.isFinite(a.item?.priority) ? a.item.priority : 0;
    const q = Number.isFinite(b.item?.priority) ? b.item.priority : 0;
    return q - p || a.index - b.index;
  });
  for (const { item } of ordered) {
    const id = typeof item?.id === 'string' ? item.id : null;
    const body = typeof item?.text === 'string' ? item.text : null;
    const dataClass = typeof item?.dataClass === 'string' ? item.dataClass : 'unknown';
    const chars = body?.length ?? 0;
    let reason = null;
    if (!id || id.length > 200 || !body || !body.trim()) reason = 'invalid-item';
    else if (!permitted.has(dataClass)) reason = 'data-boundary';
    else if (unique.has(id)) reason = 'duplicate-id';
    else if (accepted.length >= maxItems || usedChars + chars > maxChars) reason = 'budget-exhausted';
    if (reason) { rejected.push({ id, reason }); continue; }
    accepted.push({ id, chars, dataClass });
    unique.add(id);
    usedChars += chars;
  }
  return { selected: accepted, rejected, usedChars, remainingChars: maxChars - usedChars, maxChars, maxItems };
}
