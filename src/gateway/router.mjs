export function routeInbound({ source, account = 'default', peer, thread = 'root' }, bindings) {
  const key = `${source}:${account}:${peer}:${thread}`;
  const exact = bindings[key];
  const peerDefault = bindings[`${source}:${account}:${peer}:*`];
  const accountDefault = bindings[`${source}:${account}:*:*`];
  const result = exact ?? peerDefault ?? accountDefault;
  if (!result) throw new Error('no inbound binding');
  return { ...result, delivery: { source, account, peer, thread } };
}
