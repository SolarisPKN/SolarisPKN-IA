const clone=value=>structuredClone(value);
const terminal=new Set(['completed','failed','cancelled']);
function validateNodes(nodes){
  if(!Array.isArray(nodes)||nodes.length===0)throw new Error('job nodes required');
  const ids=new Set();
  for(const node of nodes){if(!node?.id||ids.has(node.id))throw new Error('node ids must be unique');ids.add(node.id);}
  for(const node of nodes)for(const dep of node.dependsOn||[])if(!ids.has(dep))throw new Error('unknown dependency');
}
export class JobLedger{
  #jobs=new Map();
  submit({id,nodes,metadata={}}){
    if(!id||this.#jobs.has(id))throw new Error('job id required and unique');validateNodes(nodes);
    const job={id,state:'pending',revision:1,metadata:clone(metadata),nodes:nodes.map(n=>({id:n.id,dependsOn:[...(n.dependsOn||[])],state:'pending',resultDigest:null})),events:[]};
    this.#jobs.set(id,job);return clone(job);
  }
  get(id){const job=this.#jobs.get(id);return job?clone(job):null;}
  ready(id){
    const job=this.#must(id),completed=new Set(job.nodes.filter(n=>n.state==='completed').map(n=>n.id));
    return job.nodes.filter(n=>n.state==='pending'&&n.dependsOn.every(dep=>completed.has(dep))).map(n=>n.id);
  }
  startNode({id,nodeId,expectedRevision}){
    const job=this.#must(id);this.#revision(job,expectedRevision);
    if(job.state==='paused'||terminal.has(job.state))throw new Error('job is not runnable');
    const node=this.#node(job,nodeId);if(node.state!=='pending'||!this.ready(id).includes(nodeId))throw new Error('node is not ready');
    node.state='running';job.state='running';this.#event(job,'node.started',{nodeId});return clone(job);
  }
  finishNode({id,nodeId,resultDigest,expectedRevision,ok=true}){
    const job=this.#must(id);this.#revision(job,expectedRevision);const node=this.#node(job,nodeId);
    if(node.state!=='running')throw new Error('node is not running');
    node.state=ok?'completed':'failed';node.resultDigest=resultDigest||null;
    this.#event(job,ok?'node.completed':'node.failed',{nodeId,resultDigest:node.resultDigest});
    if(!ok)job.state='failed';else if(job.nodes.every(n=>n.state==='completed'))job.state='completed';return clone(job);
  }
  pause({id,expectedRevision}){const job=this.#must(id);this.#revision(job,expectedRevision);if(terminal.has(job.state))throw new Error('terminal job cannot pause');job.state='paused';this.#event(job,'job.paused',{});return clone(job);}
  resume({id,expectedRevision}){const job=this.#must(id);this.#revision(job,expectedRevision);if(job.state!=='paused')throw new Error('job is not paused');job.state=job.nodes.some(n=>n.state==='running')?'running':'pending';this.#event(job,'job.resumed',{});return clone(job);}
  #must(id){const job=this.#jobs.get(id);if(!job)throw new Error('job not found');return job;}
  #node(job,id){const node=job.nodes.find(n=>n.id===id);if(!node)throw new Error('node not found');return node;}
  #revision(job,expected){if(expected!==job.revision)throw new Error('job revision mismatch');}
  #event(job,type,data){job.events.push({revision:job.revision,type,...data});job.revision++;}
}
