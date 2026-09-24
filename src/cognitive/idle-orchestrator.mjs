export function planIdleCycle({userActive=false,idleMs=0,minIdleMs=60000,budget={},openLoops=[],recentEvents=[]}={}){
  if(userActive||idleMs<minIdleMs)return{state:'paused',jobs:[]};
  const jobs=[],reflectionSteps=Math.max(0,Number(budget.reflectionSteps??1)),dreamSteps=Math.max(0,Number(budget.dreamSteps??0));
  if(reflectionSteps>0&&(openLoops.length||recentEvents.length))jobs.push({type:'reflection',steps:reflectionSteps,externalEffects:false,durablePromotion:false,outputState:'candidate'});
  if(dreamSteps>0)jobs.push({type:'dream',steps:dreamSteps,externalEffects:false,durablePromotion:false,outputState:'proposal'});
  return{state:jobs.length?'scheduled':'idle',jobs};
}
