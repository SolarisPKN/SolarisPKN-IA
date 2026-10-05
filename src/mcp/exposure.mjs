const clean=value=>String(value||'').trim();
export function exposeTools({tools,allowedCapabilities=[],deniedNames=[]}){
  const allowed=new Set(allowedCapabilities),denied=new Set(deniedNames);
  return(tools||[]).filter(tool=>tool&&allowed.has(tool.capability)&&!denied.has(tool.name)).map(tool=>({name:clean(tool.name),description:clean(tool.description),capability:clean(tool.capability),inputSchema:structuredClone(tool.inputSchema||{})}));
}
export function publicServerDescriptor(server={}){
  const descriptor={id:clean(server.id),transport:clean(server.transport),exposure:clean(server.exposure||'private'),toolPolicy:{allow:[...(server.toolPolicy?.allow||[])].map(clean),deny:[...(server.toolPolicy?.deny||[])].map(clean)}};
  if(server.endpointBoundary)descriptor.endpointBoundary=clean(server.endpointBoundary);
  if(server.env)descriptor.envKeys=Object.keys(server.env).sort();
  if(server.headers)descriptor.headerKeys=Object.keys(server.headers).sort();
  return descriptor;
}
