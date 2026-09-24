import { mkdir, appendFile, readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { sha256, stableJson } from './hash.mjs';

export class EventLog {
  constructor(path) { this.path = path; }

  async read() {
    try {
      const raw = await readFile(this.path, 'utf8');
      const events = [];
      let previous = 'GENESIS';
      for (const line of raw.split(/\r?\n/)) {
        if (!line.trim()) continue;
        let event;
        try { event = JSON.parse(line); } catch { break; }
        const unsigned = { seq: event.seq, at: event.at, type: event.type, payload: event.payload, previousHash: event.previousHash };
        const valid = event.previousHash === previous && sha256(stableJson(unsigned)) === event.hash;
        if (!valid) break;
        events.push(event);
        previous = event.hash;
      }
      return events;
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  }

  async append(type, payload = {}) {
    const events = await this.read();
    const previousHash = events.at(-1)?.hash ?? 'GENESIS';
    const unsigned = { seq: events.length + 1, at: new Date().toISOString(), type, payload, previousHash };
    const event = { ...unsigned, hash: sha256(stableJson(unsigned)) };
    await mkdir(dirname(this.path), { recursive: true });
    await appendFile(this.path, `${JSON.stringify(event)}\n`, { encoding: 'utf8', mode: 0o600 });
    return event;
  }
}
