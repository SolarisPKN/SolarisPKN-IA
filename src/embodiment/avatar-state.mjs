const IDLE=['walk','pause','hop','peek'];
export function avatarState({activity='idle',affect={},idleIndex=0}={}) {
  const dominant=Object.entries(affect).sort((a,b)=>b[1]-a[1])[0]?.[0] ?? 'neutral';
  return {
    activity,
    dominantAffect:dominant,
    idleAction:activity==='idle'?IDLE[Math.abs(idleIndex)%IDLE.length]:null,
    presentationOnly:true,
    cameraAuthority:false,
    inputInjectionAuthority:false
  };
}
