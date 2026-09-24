import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative, dirname, join, isAbsolute } from 'node:path';

function safe(root, rel) {
  const base = resolve(root), out = resolve(base, rel);
  const r = relative(base, out);
  if (!r || r.startsWith('..') || isAbsolute(r) || !out.toLowerCase().endsWith('.md')) throw new Error('note outside Markdown vault');
  return out;
}
export function wikilinks(text) {
  return [...String(text).matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)].map(m => m[1].trim()).filter(Boolean);
}
export class MarkdownMind {
  constructor({ root, writable = false }) { this.root = resolve(root); this.writable = writable; }
  async read(rel, maxChars = 12000) { return (await readFile(safe(this.root, rel), 'utf8')).slice(0, maxChars); }
  async write({ slug, text, at = new Date() }) {
    if (!this.writable) throw new Error('mind is read-only');
    const yyyy=String(at.getUTCFullYear()), mm=String(at.getUTCMonth()+1).padStart(2,'0'), dd=String(at.getUTCDate()).padStart(2,'0');
    const rel=join(yyyy,mm,dd,slug.replace(/[^a-z0-9._-]+/gi,'-')+'.md');
    const path=safe(this.root,rel); await mkdir(dirname(path),{recursive:true}); await writeFile(path,text,'utf8'); return rel.replaceAll('\\','/');
  }
}
export function suggestConnection(a,b) {
  const words = s => new Set(String(s).toLowerCase().match(/[\p{L}\p{N}_-]{4,}/gu) ?? []);
  const aw=words(a), bw=words(b), shared=[...aw].filter(x=>bw.has(x)).slice(0,12);
  return { suggested: shared.length >= 2, sharedTerms: shared, status:'suggestion-not-fact' };
}
