function includesAll(haystack=[],needles=[]){const set=new Set(haystack);return needles.every(x=>set.has(x));}
export function rankRoutes({request={},candidates=[],weights={}}={}){
  const w={quality:4,locality:2,latency:1,cost:1,...weights};
  const privacy=request.privacy??'PUBLIC_ONLY', required=request.capabilities??[];
  const ranked=candidates.map(candidate=>{
    const reasons=[];
    if(candidate.enabled!==true)reasons.push('disabled');
    if(candidate.healthy!==true)reasons.push('unhealthy');
    if(!candidate.privacyModes?.includes(privacy))reasons.push('privacy-incompatible');
    if(!includesAll(candidate.capabilities,required))reasons.push('missing-capability');
    if(request.localOnly===true&&candidate.dataBoundary!=='local')reasons.push('not-local-boundary');
    if(privacy!=='PUBLIC_ONLY'&&candidate.dataBoundary==='unknown')reasons.push('unknown-data-boundary');
    if(request.maxCost!=null&&Number(candidate.cost??Infinity)>Number(request.maxCost))reasons.push('cost-limit');
    const eligible=reasons.length===0, quality=Number(candidate.quality??0), latency=Number(candidate.latencyMs??1000), cost=Number(candidate.cost??0), locality=candidate.dataBoundary==='local'?1:0;
    const score=eligible?quality*w.quality+locality*w.locality-(latency/1000)*w.latency-cost*w.cost:-Infinity;
    return{id:candidate.id,eligible,reasons,score,protocol:candidate.protocol??null,dataBoundary:candidate.dataBoundary??'unknown'};
  }).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
  return{selected:ranked.find(x=>x.eligible)??null,ranked};
}
