export function reflect({recentEvents=[],memorySnippets=[],connections=[]}={}) {
  const observations=[...recentEvents.slice(-8),...memorySnippets.slice(-8)].map(String);
  const questions=[];
  if(connections.length) questions.push('Which suggested connection is worth validating next?');
  if(observations.length) questions.push('Which recent observation has enough evidence to become a knowledge candidate?');
  const markdown=['# Reflection candidate','',...observations.map(x=>'- '+x),'',...questions.map(x=>'- ? '+x)].join('\n');
  return {status:'candidate',markdown,questions,durablePromotion:false,authorityChange:false};
}
