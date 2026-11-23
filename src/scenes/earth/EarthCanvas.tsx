import { useEffect, useRef, useState } from 'react';
import { globeCities, labelOrder } from '../../data/globe';
import SceneFlag from '../../components/ui/SceneFlag';
export default function EarthCanvas() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let dispose: (() => void) | undefined;
    const unavailable = () => { if (!controller.signal.aborted) setFailed(true); };
    void document.fonts.ready.then(() => import('./createEarth')).then(async module => {
      if (!host.current || controller.signal.aborted) return;
      const scene = await module.createEarth(host.current, controller.signal, unavailable);
      if (controller.signal.aborted) scene.dispose(); else dispose = scene.dispose;
    }).catch(unavailable);
    return () => { controller.abort(); dispose?.(); };
  }, []);
  return <div ref={host} className="earth-stage"><div className="earth-labels" aria-hidden="true">{labelOrder.map(id => { const city = globeCities.find(item => item.id === id)!; return <div className="earth-city-label" data-city={id} key={id}><SceneFlag country={city.country} />{city.name}</div>; })}</div>{failed && <p className="earth-unavailable" role="status">Globe view unavailable.</p>}</div>;
}
