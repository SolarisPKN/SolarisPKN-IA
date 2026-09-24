const MUTATING_MODES=new Set(['build','edit','apply']);
export function validateWorkerManifest(worker={}){
  if(!/^[a-z0-9][a-z0-9._-]*$/i.test(worker.id??''))throw new Error('invalid worker id');
  if(!Array.isArray(worker.modes)||worker.modes.length===0)throw new Error('worker modes required');
  if(!Array.isArray(worker.capabilities))throw new Error('worker capabilities required');
  return{...worker};
}
export function prepareWorkerInvocation({worker,task={},mode='plan',policy={}}={}){
  const manifest=validateWorkerManifest(worker); if(manifest.enabled!==true)throw new Error('worker disabled');
  if(!manifest.modes.includes(mode))throw new Error(`worker does not support mode: ${mode}`);
  const requested=task.capabilities??[], workerCaps=new Set(manifest.capabilities), allowedCaps=new Set(policy.allowedCapabilities??[]);
  for(const capability of requested){if(!workerCaps.has(capability))throw new Error(`worker lacks capability: ${capability}`);if(!allowedCaps.has(capability))throw new Error(`policy denies capability: ${capability}`);}
  const mutating=MUTATING_MODES.has(mode); if(mutating&&policy.allowMutation!==true)throw new Error('mutation not authorized');
  const allowedEnv=new Set(policy.environmentAllowlist??[]);
  const environment=Object.fromEntries(Object.entries(task.environment??{}).filter(([key])=>allowedEnv.has(key)));
  return{workerId:manifest.id,mode,cwd:task.cwd??null,input:task.input??'',capabilities:requested,environment,mutation:mutating,requiresExternalSandbox:mutating||manifest.trustedSandbox!==true,permissionUiIsNotSandbox:true};
}
