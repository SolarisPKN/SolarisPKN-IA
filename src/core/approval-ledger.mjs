const DIGEST=/^[a-f0-9]{64}$/;
const clone=value=>structuredClone(value);
const expired=(record,now)=>Date.parse(record.expiresAt)<=now;
export class ApprovalLedger{
  #requests=new Map();
  request({id,operationDigest,kind='critical-operation',ttlMs=10*60*1000,now=Date.now()}){
    if(!id||this.#requests.has(id))throw new Error('approval id required and unique');
    if(!DIGEST.test(String(operationDigest||'').toLowerCase()))throw new Error('invalid operation digest');
    if(!Number.isSafeInteger(ttlMs)||ttlMs<1000||ttlMs>60*60*1000)throw new Error('invalid approval ttl');
    const record={id,operationDigest:String(operationDigest).toLowerCase(),kind:String(kind).slice(0,120),state:'pending',createdAt:new Date(now).toISOString(),expiresAt:new Date(now+ttlMs).toISOString()};
    this.#requests.set(id,record);return clone(record);
  }
  get(id){const record=this.#requests.get(id);return record?clone(record):null;}
  grant({id,operationDigest,actorId,proof,verifyProof,now=Date.now()}){
    const record=this.#requests.get(id);if(!record)throw new Error('approval request not found');
    if(record.state!=='pending')throw new Error('approval request is not pending');
    if(expired(record,now))throw new Error('approval request expired');
    if(record.operationDigest!==String(operationDigest||'').toLowerCase())throw new Error('approval binding mismatch');
    if(!actorId||typeof verifyProof!=='function')throw new Error('actor and verifier required');
    const statement={id:record.id,operationDigest:record.operationDigest,kind:record.kind,expiresAt:record.expiresAt,actorId};
    if(verifyProof(statement,proof)!==true)throw new Error('approval proof rejected');
    Object.assign(record,{state:'granted',actorId:String(actorId),grantedAt:new Date(now).toISOString(),proofAccepted:true});
    return clone(record);
  }
  consume({id,operationDigest,now=Date.now()}){
    const record=this.#requests.get(id);if(!record)throw new Error('approval request not found');
    if(record.state!=='granted')throw new Error('approval is not granted');
    if(expired(record,now))throw new Error('approval request expired');
    if(record.operationDigest!==String(operationDigest||'').toLowerCase())throw new Error('approval binding mismatch');
    record.state='consumed';record.consumedAt=new Date(now).toISOString();return clone(record);
  }
}
