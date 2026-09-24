const PROFILE_TIERS={minimal:new Set(['core']),recommended:new Set(['core','recommended']),'complete-local':new Set(['core','recommended','optional'])};
function eligible(resource,hardware){
  if((resource.minMemoryBytes??0)>(hardware.memoryBytes??Infinity))return'insufficient-memory';
  if((resource.minVramBytes??0)>(hardware.vramBytes??Infinity))return'insufficient-vram';
  if(resource.local===false)return'not-local-resource';
  return null;
}
export function planResources({profile='recommended',catalog=[],hardware={},maxDiskFraction=0.5}={}){
  const tiers=PROFILE_TIERS[profile]; if(!tiers)throw new Error(`unknown bootstrap profile: ${profile}`);
  const diskBudgetBytes=Math.max(0,Math.floor(Number(hardware.diskFreeBytes??0)*maxDiskFraction));
  let plannedBytes=0; const downloads=[],deferred=[];
  const rank={core:0,recommended:1,optional:2};
  const ordered=[...catalog].sort((a,b)=>(rank[a.tier]??9)-(rank[b.tier]??9)||(a.priority??100)-(b.priority??100));
  for(const resource of ordered){
    if(!tiers.has(resource.tier??'optional'))continue;
    const reason=eligible(resource,hardware); if(reason){deferred.push({id:resource.id,reason});continue;}
    const bytes=Number(resource.bytes??0); if(plannedBytes+bytes>diskBudgetBytes){deferred.push({id:resource.id,reason:'disk-budget'});continue;}
    downloads.push({id:resource.id,bytes,capabilities:[...(resource.capabilities??[])],loadPolicy:resource.loadPolicy??'on-demand'}); plannedBytes+=bytes;
  }
  return{profile,diskBudgetBytes,plannedBytes,downloads,deferred};
}
