const DEFAULT={happiness:50,sadness:10,anger:5,curiosity:65,calm:60,frustration:10,confidence:50,energy:60,socialWarmth:55};
const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
export function affectState(seed={}) { return {...DEFAULT,...Object.fromEntries(Object.entries(seed).map(([k,v])=>[k,clamp(v)]))}; }
export function applyAffect(state,event) {
  const next=affectState(state);
  if(event==='success'){next.happiness+=5;next.confidence+=6;next.frustration-=5;next.calm+=2;}
  if(event==='failure'){next.sadness+=2;next.frustration+=7;next.confidence-=3;next.curiosity+=2;}
  if(event==='new-evidence'){next.curiosity+=5;next.energy+=2;}
  if(event==='interrupt'){next.calm-=3;next.frustration+=2;}
  for(const k of Object.keys(next)) next[k]=clamp(next[k]);
  return {metrics:next,authorityChanged:false,truthChanged:false,interpretation:'functional-control-signal'};
}
