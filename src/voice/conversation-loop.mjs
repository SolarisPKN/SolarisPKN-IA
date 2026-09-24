export class ConversationLoop {
  state = 'idle';

  start() { if (this.state !== 'idle') throw new Error('already running'); this.state = 'listening'; }
  speechStarted() { if (this.state === 'speaking') this.state = 'interrupted'; else this.state = 'capturing'; }
  speechEnded() { if (!['capturing', 'interrupted'].includes(this.state)) throw new Error('invalid speech end'); this.state = 'processing'; }
  responseReady() { if (this.state !== 'processing') throw new Error('invalid response'); this.state = 'speaking'; }
  stop() { this.state = 'idle'; }
}
