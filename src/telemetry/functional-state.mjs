const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,Number(n)||0));
const thermalPressure=temp=>temp==null?0:clamp((Number(temp)-45)/45*100);
export function deriveFunctionalState({cpuPercent=0,ramPercent=0,gpuPercent=0,temperatureC=null,taskProgress=0}={}){
  const cpu=clamp(cpuPercent),ram=clamp(ramPercent),gpu=clamp(gpuPercent),thermal=thermalPressure(temperatureC),pressure=Math.max(cpu,ram,gpu,thermal),progress=clamp(taskProgress);
  const energy=clamp(75-pressure*.45+progress*.15),focus=clamp(55+progress*.25-pressure*.18),stress=clamp(pressure*.72+(progress<15?8:0));
  const pace=pressure>=90?'degraded':pressure>=75?'conservative':pressure>=55?'balanced':'responsive';
  return{inputs:{cpuPercent:cpu,ramPercent:ram,gpuPercent:gpu,temperatureC:temperatureC==null?null:Number(temperatureC),taskProgress:progress},pressure:Number(pressure.toFixed(2)),functional:{energy:Number(energy.toFixed(2)),focus:Number(focus.toFixed(2)),stress:Number(stress.toFixed(2)),pace},presentationMayAdapt:true,authorityChanged:false,truthChanged:false};
}
