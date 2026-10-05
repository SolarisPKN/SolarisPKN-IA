const hostOf=url=>new URL(url).hostname.toLowerCase();
export function authorizeEgress(request,{policy={},token=null,now=Date.now()}={}){
  const method=String(request.method||'GET').toUpperCase(),target=String(request.url||'');let host;
  try{host=hostOf(target);}catch{return{allowed:false,reason:'invalid-url'};}
  if(policy.allow!==true)return{allowed:false,reason:'egress-denied'};
  if(Array.isArray(policy.methods)&&!policy.methods.includes(method))return{allowed:false,reason:'method-denied'};
  if(Array.isArray(policy.hosts)&&!policy.hosts.map(String).map(x=>x.toLowerCase()).includes(host))return{allowed:false,reason:'host-denied'};
  if(request.privateData===true&&policy.privateData!==true)return{allowed:false,reason:'private-data-denied'};
  if(policy.requireToken===true){
    if(!token)return{allowed:false,reason:'egress-token-required'};
    if(token.used)return{allowed:false,reason:'egress-token-used'};
    if(Date.parse(token.expiresAt)<=now)return{allowed:false,reason:'egress-token-expired'};
    if(token.method!==method||token.host!==host||token.payloadDigest!==request.payloadDigest)return{allowed:false,reason:'egress-token-binding-mismatch'};
  }
  return{allowed:true,reason:'policy-allowed',host,method};
}
