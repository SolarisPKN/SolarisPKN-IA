// Original SolarisPKN-IA release-scope verification.
// Checks content digests and a strict declaration for every changed file.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { lstat, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { evaluatePublicationSet } from '../src/security/publication-gate.mjs';

const root = resolve(process.cwd());
const manifestFile = 'docs/release-source-manifest.json';
const baseCommit = '94cabb15bc248ef9d2f715fa8cfdd877ffdc4754';
function git(...args) {
  return execFileSync('git', ['-c', 'safe.directory=' + root, ...args], { cwd: root, encoding: 'utf8', maxBuffer: 4_000_000 })
    .trim().split(/\r?\n/).filter(Boolean);
}
const manifest = JSON.parse(await readFile(resolve(root, manifestFile), 'utf8'));
if (manifest.schemaVersion !== 1 || manifest.baseCommit !== baseCommit || !Array.isArray(manifest.files)) {
  throw new Error('Invalid versioned source manifest');
}
const checked = evaluatePublicationSet(manifest.files);
if (!checked.allowed) {
  console.error(JSON.stringify({ ok: false, rejected: checked.results.filter(x => !x.allowed) }, null, 2));
  process.exit(2);
}

const changed = new Set([
  ...git('diff', '--name-only', baseCommit, 'HEAD'),
  ...git('diff', '--name-only'),
  ...git('diff', '--cached', '--name-only'),
  ...git('ls-files', '--others', '--exclude-standard')
].map(x => x.replaceAll('\\', '/')).filter(x => x !== manifestFile));
const approved = new Set(manifest.files.map(x => x.path));
const unknown = [...changed].filter(x => !approved.has(x));
const absent = [...approved].filter(x => !changed.has(x));
const issues = [
  ...unknown.map(path => ({ path, reason: 'unreviewed-change' })),
  ...absent.map(path => ({ path, reason: 'unchanged-or-absent-from-release' }))
];
for (const record of manifest.files) {
  const absolute = resolve(root, record.path);
  if (relative(root, absolute).startsWith('..')) {
    issues.push({ path: record.path, reason: 'outside-repository' });
    continue;
  }
  try {
    const info = await lstat(absolute);
    if (!info.isFile() || info.isSymbolicLink()) {
      issues.push({ path: record.path, reason: 'not-a-regular-file' });
      continue;
    }
    // Git can check out text files as CRLF on Windows. The release manifest
    // records the canonical LF source bytes; do not reject equivalent line endings.
    const canonical = (await readFile(absolute, 'utf8')).replace(/\r\n/g, '\n');
    const actual = createHash('sha256').update(canonical, 'utf8').digest('hex');
    if (actual !== record.sha256) issues.push({ path: record.path, reason: 'content-changed' });
  } catch {
    issues.push({ path: record.path, reason: 'missing-or-inaccessible-file' });
  }
}
const summary = {
  ok: issues.length === 0,
  baseCommit,
  reviewedFiles: manifest.files.length,
  changedFiles: changed.size,
  issues
};
console.log(JSON.stringify(summary, null, 2));
if (!summary.ok) process.exitCode = 2;
