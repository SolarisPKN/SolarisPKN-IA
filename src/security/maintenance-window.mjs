// Policy-only illustration of time-limited maintenance; no elevation, service,
// scheduled task, machine control, or operating-system API is provided here.
const SCOPE = new Set(['project', 'host']);
const DIGEST = /^[a-f0-9]{64}$/;

export function checkMaintenanceWindow(lease, operation, { now = Date.now() } = {}) {
  const reasons = [];
  if (!Number.isFinite(now)) reasons.push('invalid-clock');
  if (!lease || typeof lease !== 'object' || lease.authorized !== true) reasons.push('no-owner-authorization');
  const start = Date.parse(lease?.issuedAt);
  const end = Date.parse(lease?.expiresAt);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || end - start > 86400000) reasons.push('invalid-lease-window');
  else if (Number.isFinite(now) && (now < start || now >= end)) reasons.push('lease-not-current');
  if (!SCOPE.has(lease?.scope)) reasons.push('invalid-scope');
  if (typeof lease?.operationDigest !== 'string' || !DIGEST.test(lease.operationDigest)) reasons.push('invalid-bound-digest');
  if (!operation || !DIGEST.test(String(operation.digest ?? '')) || operation.digest !== lease?.operationDigest) reasons.push('operation-not-bound');
  if (operation?.scope !== lease?.scope) reasons.push('scope-mismatch');
  if (operation?.destructive === true && lease?.destructiveApproved !== true) reasons.push('destructive-action-not-approved');
  if (operation?.kind === 'admin' && lease?.scope !== 'host') reasons.push('host-authorization-required');
  if (operation?.requiresCredential === true) reasons.push('credential-access-separate');
  return { allowed: reasons.length === 0, reasons };
}
