import { routeIntent } from '../core/router.mjs';
import { selectTools } from '../core/tool-broker.mjs';

export class AgentRuntime {
  constructor({ eventLog, tools = [], allowedCapabilities = null }) {
    this.eventLog = eventLog;
    this.tools = tools;
    this.allowedCapabilities = allowedCapabilities;
  }

  async prepareTurn(text) {
    const intent = routeIntent(text);
    const tools = selectTools({ intent, tools: this.tools, allowedCapabilities: this.allowedCapabilities });
    await this.eventLog.append('user.message', { text });
    await this.eventLog.append('route.selected', { intent });
    await this.eventLog.append('tools.selected', { tools: tools.map(t => t.name) });
    return { intent, tools };
  }
}
