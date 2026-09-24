import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const root = resolve(process.cwd());
const forbidden = [
  /authorization:\s*bearer\s+[a-z0-9._-]{12,}/i,
  /api[_-]?key\s*[=:]\s*["']?[a-z0-9_-]{16,}/i,
  /password\s*[=:]\s*["']?[^\s"']{8,}/i,
  /private[_-]?key/i,
  /\\Users\\[^\\]+/i,
  /[A-Z]:\\[^\s]+/,
];

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const path = resolve(dir, name), s = await stat(path);
    if (s.isDirectory()) out.push(...await walk(path));
    else out.push(path);
  }
  return out;
}

const hits = [];
for (const path of await walk(root)) {
  const rel = relative(root, path);
  if (/\.(png|jpg|jpeg|gif|zip|ico)$/i.test(path)) continue;
  const text = await readFile(path, 'utf8');
  for (const pattern of forbidden) if (pattern.test(text)) hits.push({ file: rel, pattern: String(pattern) });
}
if (hits.length) {
  console.error(JSON.stringify({ ok: false, hits }, null, 2));
  process.exit(2);
}
console.log(JSON.stringify({ ok: true, checked: (await walk(root)).length }, null, 2));
