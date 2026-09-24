import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { EventLog } from '../src/core/event-log.mjs';
import { AgentRuntime } from '../src/agent/runtime.mjs';
import { demoTools } from '../examples/tools.mjs';

const path = join(tmpdir(), `solaris-public-demo-${process.pid}.jsonl`);
await rm(path, { force: true });
const log = new EventLog(path);
const runtime = new AgentRuntime({ eventLog: log, tools: demoTools });
const prepared = await runtime.prepareTurn('Build a small app and run its tests');
console.log(JSON.stringify({ prepared, events: await log.read() }, null, 2));
await rm(path, { force: true });
