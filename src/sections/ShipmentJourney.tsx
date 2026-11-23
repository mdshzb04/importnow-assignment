import { useEffect, useRef, useState } from 'react';
import { Ship } from 'lucide-react';
import { journeySteps } from '../data/journey';
import { journeyState } from '../scenes/voyage/timeline';
import { HomeTitle } from '../components/home/HomeUI';
import SceneFlag from '../components/ui/SceneFlag';
export default function ShipmentJourney() {
  const section=useRef<HTMLElement>(null),sticky=useRef<HTMLDivElement>(null),host=useRef<HTMLDivElement>(null),fill=useRef<HTMLDivElement>(null),boat=useRef<HTMLDivElement>(null),target=useRef(0);
  const [ui,setUi]=useState({step:0,day:0}),[phase,setPhase]=useState<'loading'|'ready'|'unavailable'>('loading');
  useEffect(()=>{
    const area=section.current,viewport=sticky.current,canvasHost=host.current;if(!area||!viewport||!canvasHost)return;
    const abort=new AbortController();let scene:{invalidate:()=>void;dispose:()=>void}|undefined,started=false,lastStep=0,lastDay=0;
    const display=(progress:number)=>{if(abort.signal.aborted)return;const state=journeyState(progress);if(fill.current)fill.current.style.width=`${state.distance*100}%`;if(boat.current)boat.current.style.left=`${state.distance*100}%`;if(state.step!==lastStep||state.day!==lastDay){lastStep=state.step;lastDay=state.day;setUi({step:state.step,day:state.day});}};
    const read=()=>{const distance=area.getBoundingClientRect().height-viewport.getBoundingClientRect().height;target.current=Math.max(0,Math.min(1,-area.getBoundingClientRect().top/Math.max(1,distance)));if(scene)scene.invalidate();else display(target.current);};
    const unavailable=()=>{if(!abort.signal.aborted){setPhase('unavailable');display(target.current);}};
    const observer=new IntersectionObserver(entries=>{if(started||!entries.some(entry=>entry.isIntersecting))return;started=true;observer.disconnect();void document.fonts.ready.then(()=>import('../scenes/voyage/createVoyage')).then(async module=>{if(abort.signal.aborted)return;const mounted=await module.createVoyage(canvasHost,target,abort.signal,display,unavailable);if(abort.signal.aborted)mounted.dispose();else{scene=mounted;setPhase('ready');mounted.invalidate();}}).catch(unavailable);},{rootMargin:'400px'});
    observer.observe(area);
    window.addEventListener('scroll',read,{passive:true});window.addEventListener('resize',read);
    const size=new ResizeObserver(read);size.observe(area);size.observe(viewport);
    const initial=requestAnimationFrame(read);
    return()=>{abort.abort();cancelAnimationFrame(initial);observer.disconnect();size.disconnect();window.removeEventListener('scroll',read);window.removeEventListener('resize',read);scene?.dispose();};
  },[]);
  return <section ref={section} id="journey" className="shipment-journey"><div ref={sticky} className="shipment-sticky"><div ref={host} className="voyage-stage" /><div className="voyage-shade" /><div className="voyage-badge"><i />Live shipment view</div>{phase!=='ready'&&<div className="voyage-status" role="status">{phase==='loading'?'Loading 3D scene…':'Shipment view unavailable.'}</div>}<div className="voyage-ui"><div className="wrap voyage-ui-inner"><header className="voyage-heading"><span className="home-eyebrow">How it works</span><HomeTitle before="Watch your order travel from China to India." /></header><ol className="voyage-steps" aria-label="Shipment steps">{journeySteps.map((step,index)=><li key={step.title} className={`voyage-step${index===ui.step?' active':index<ui.step?' done':''}`} aria-current={index===ui.step?'step':undefined}><span className="voyage-step-number">{index+1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol><div className="voyage-route"><div className="voyage-port"><SceneFlag country="cn" /><div><span className="voyage-port-name">Shanghai</span><small>Origin port</small></div></div><div className="voyage-track"><div ref={fill} className="voyage-fill" /><div ref={boat} className="voyage-boat"><Ship size={17} strokeWidth={1.8} aria-hidden="true" /></div></div><div className="voyage-port voyage-destination"><div><span className="voyage-port-name">Chennai</span><small>Destination</small></div><SceneFlag country="in" /></div><span className="voyage-day">Day {ui.day}</span></div></div></div></div></section>;
}
