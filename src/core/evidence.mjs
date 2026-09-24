import{createHash}from'node:crypto';
const digest=value=>createHash('sha256').update(String(value)).digest('hex');
export class EvidenceLedger{
  #entries=[];
  record({scope,kind='test',exitCode=0,output='',at=new Date().toISOString()}){if(!scope)throw new Error('evidence scope required');const entry={scope,kind,exitCode:Number(exitCode),outputDigest:digest(output),at};this.#entries.push(entry);return{...entry};}
  forScope(scope){return this.#entries.filter(x=>x.scope===scope).map(x=>({...x}));}
  status(scope){const entries=this.forScope(scope);if(!entries.length)return{scope,state:'unknown',evidenceCount:0};return{scope,state:entries.every(x=>x.exitCode===0)?'verified':'failed',evidenceCount:entries.length};}
}
