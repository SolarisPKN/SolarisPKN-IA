const validVerdicts=new Set(['accept','reject','abstain']);
export function assessConsensus({reviews,minAgree=2,minFamilies=2}){
  if(!Array.isArray(reviews)||reviews.length===0)throw new Error('reviews required');
  const normalized=reviews.map((review,index)=>{
    if(!validVerdicts.has(review?.verdict))throw new Error('invalid verdict');
    return{id:String(review.id||index),family:String(review.family||'unknown'),verdict:review.verdict,confidence:Math.max(0,Math.min(1,Number(review.confidence)||0)),evidence:Array.isArray(review.evidence)?review.evidence.filter(Boolean).map(String):[]};
  });
  const score=verdict=>normalized.filter(r=>r.verdict===verdict&&r.evidence.length>0);
  const accept=score('accept'),reject=score('reject'),winner=accept.length===reject.length?'inconclusive':accept.length>reject.length?'accept':'reject';
  const winning=winner==='accept'?accept:winner==='reject'?reject:[],families=new Set(winning.map(r=>r.family)),verified=winning.length>=minAgree&&families.size>=minFamilies;
  return{state:verified?'verified':'inconclusive',verdict:verified?winner:null,agreeingReviews:winning.length,distinctFamilies:families.size,averageConfidence:winning.length?Number((winning.reduce((a,b)=>a+b.confidence,0)/winning.length).toFixed(3)):0,evidenceCount:winning.reduce((n,r)=>n+r.evidence.length,0),notice:'Consensus is review evidence, not authority or universal truth.'};
}
