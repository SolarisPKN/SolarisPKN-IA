const NEVER_IMPLICIT = new Set([
  'shell.execute',
  'filesystem.write.outsideScope',
  'publish',
  'deploy',
  'message.send',
  'data.delete',
  'credential.read',
  'payment.execute',
  'node.execute.remote'
]);

export function classifyAction({ capability, externalEffects = false }) {
  return {
    capability,
    externalEffects,
    approvalRequired: externalEffects || NEVER_IMPLICIT.has(capability)
  };
}

export function authorize(action, { approval = null, now = Date.now() } = {}) {
  const classification = classifyAction(action);
  if (!classification.approvalRequired) return { allowed: true, reason: 'policy-safe' };
  if (!approval) return { allowed: false, reason: 'approval-required' };
  if (approval.used) return { allowed: false, reason: 'approval-already-used' };
  if (Date.parse(approval.expiresAt) <= now) return { allowed: false, reason: 'approval-expired' };
  if (approval.capability !== action.capability || approval.target !== action.target || approval.payloadDigest !== action.payloadDigest) {
    return { allowed: false, reason: 'approval-binding-mismatch' };
  }
  return { allowed: true, reason: 'approved' };
}
