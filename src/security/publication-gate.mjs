// SolarisPKN-IA public blueprint: original, dependency-free release policy.
// This module evaluates declarations. An attestation is not forensic proof.
const SHA256 = /^[a-f0-9]{64}$/;
const ALLOWED = new Set(['.mjs', '.js', '.json', '.md', '.yml', '.yaml', '.ps1', '.css', '.html', '.txt']);
const DENIED_CLASSES = new Set(['personal', 'secret', 'restricted', 'unknown']);
const INSPECTED_KIND = new Set(['source', 'documentation', 'synthetic-test']);

function pathAcceptable(path) {
  if (typeof path !== 'string' || path.length > 260 || !path || path.includes('\\') || path.includes(String.fromCharCode(0))) return false;
  if (path.startsWith('/') || path.startsWith('./') || /^[a-z]:/i.test(path)) return false;
  const parts = path.split('/');
  if (parts.some((part, index) => !part || part === '.' || part === '..' || (part.startsWith('.') && !(index === 0 && part === '.github')))) return false;
  return ALLOWED.has('.' + path.split('.').at(-1).toLowerCase());
}

export function evaluatePublication(entry) {
  const reasons = [];
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return { allowed: false, reasons: ['invalid-entry'] };
  if (!pathAcceptable(entry.path)) reasons.push('invalid-or-unsafe-path');
  if (!SHA256.test(String(entry.sha256 ?? ''))) reasons.push('missing-content-digest');
  if (!INSPECTED_KIND.has(entry.kind)) reasons.push('unsupported-kind');
  if (DENIED_CLASSES.has(entry.dataClass) || entry.dataClass !== 'public') reasons.push('nonpublic-data');
  if (entry.authorship !== 'original') reasons.push('origin-not-confirmed');
  if (entry.license !== 'GPL-3.0-only') reasons.push('license-not-approved');
  if (entry.reviewed !== true || typeof entry.reviewEvidence !== 'string' || entry.reviewEvidence.trim().length < 8) reasons.push('missing-manual-review');
  if (entry.hasPersonalization !== false) reasons.push('personalization-not-excluded');
  if (entry.copiedThirdPartySource !== false) reasons.push('copied-source-not-excluded');
  if (entry.containsCredentials !== false) reasons.push('credential-state-not-excluded');
  if (entry.requiresPrivateRuntime !== false) reasons.push('private-runtime-dependency');
  if (entry.thirdPartyAssets !== false) reasons.push('external-assets-not-excluded');
  return { allowed: reasons.length === 0, reasons };
}

export function evaluatePublicationSet(entries) {
  if (!Array.isArray(entries)) return { allowed: false, results: [], reasons: ['invalid-manifest'] };
  const seen = new Set();
  const results = [];
  for (const item of entries) {
    const result = evaluatePublication(item);
    const path = typeof item?.path === 'string' ? item.path : null;
    const reasons = [...result.reasons];
    if (path && seen.has(path.toLowerCase())) reasons.push('duplicate-file-path');
    if (path) seen.add(path.toLowerCase());
    results.push({ path, allowed: reasons.length === 0, reasons });
  }
  return { allowed: entries.length > 0 && results.every(item => item.allowed), results, reasons: entries.length ? [] : ['empty-manifest'] };
}

export function publicationEntry(path, sha256, reviewEvidence, kind = 'source') {
  return {
    path, sha256, kind, dataClass: 'public', authorship: 'original',
    license: 'GPL-3.0-only', reviewed: false, reviewEvidence,
    hasPersonalization: false, copiedThirdPartySource: false,
    containsCredentials: false, requiresPrivateRuntime: false,
    thirdPartyAssets: false
  };
}
