import * as THREE from 'three';
import { globeCities, globeRoutes, labelOrder } from '../../data/globe';
import { createSceneLoop } from '../lifecycle';
import { canvasTexture, disposeScene, loadSceneTexture } from '../resources';

function location(latitude: number, longitude: number, radius = 2) {
  const lat = THREE.MathUtils.degToRad(latitude), lon = THREE.MathUtils.degToRad(longitude);
  return new THREE.Vector3(radius * Math.cos(lat) * Math.cos(lon), radius * Math.sin(lat), -radius * Math.cos(lat) * Math.sin(lon));
}
function atmosphere(radius: number, strength: number, exponent: number, rim = false) {
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 48), new THREE.ShaderMaterial({
    transparent: true, side: rim ? THREE.FrontSide : THREE.BackSide, depthWrite: false,
    uniforms: { strength: { value: strength }, exponent: { value: exponent }, thinRim: { value: rim }, sunlight: { value: new THREE.Vector3(-.62,.32,.72).normalize() } },
    vertexShader: 'varying vec3 surfaceNormal;varying vec3 worldNormal;varying vec3 eye;void main(){vec4 p=modelViewMatrix*vec4(position,1.0);surfaceNormal=normalize(normalMatrix*normal);worldNormal=normalize(mat3(modelMatrix)*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}',
    fragmentShader: 'uniform float strength;uniform float exponent;uniform bool thinRim;uniform vec3 sunlight;varying vec3 surfaceNormal;varying vec3 worldNormal;varying vec3 eye;void main(){vec3 n=normalize(surfaceNormal);if(thinRim){float facing=max(0.0,dot(n,normalize(eye)));float day=smoothstep(-.35,.4,dot(normalize(worldNormal),sunlight));float opacity=pow(1.0-facing,exponent)*mix(.35,1.0,day);gl_FragColor=vec4(mix(vec3(.25,.45,.9),vec3(.45,.72,1.0),day),opacity*strength);}else{float depth=max(0.0,.58+dot(-n,vec3(0.0,0.0,1.0)));gl_FragColor=vec4(.42,.66,1.0,pow(depth,exponent)*strength);}}',
  }));
}

export async function createEarth(host: HTMLElement, signal: AbortSignal, unavailable: () => void) {
  const prefix = `/textures/earth/${host.clientWidth <= 820 ? '1k/' : ''}`;
  const results = await Promise.allSettled([
    loadSceneTexture(prefix + 'day.jpg', signal, true), loadSceneTexture(prefix + 'night.jpg', signal, true),
    loadSceneTexture(prefix + 'clouds.png', signal), loadSceneTexture(prefix + 'normal.png', signal), loadSceneTexture(prefix + 'specular.png', signal),
  ]);
  const loaded = results.flatMap(result => result.status === 'fulfilled' ? [result.value] : []);
  if (signal.aborted || results.some(result => result.status === 'rejected')) {
    loaded.forEach(texture => { texture.dispose(); (texture.image as ImageBitmap).close(); });
    throw new Error(signal.aborted ? 'Earth cancelled' : 'Earth maps are not ready');
  }
  const [day, night, cloudsMap, normal, specular] = loaded;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); }
  catch (error) { loaded.forEach(texture => { texture.dispose(); (texture.image as ImageBitmap).close(); }); throw error; }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .9;
  renderer.domElement.setAttribute('aria-hidden', 'true'); host.prepend(renderer.domElement);
  loaded.forEach(texture => { texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); });
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, .1, 200);
  camera.position.set(0, 0, 9);
  const tilt = new THREE.Group(), globe = new THREE.Group(); scene.add(tilt); tilt.add(globe);
  const sun = new THREE.Vector3(-.62, .32, .72).normalize();
  scene.add(new THREE.AmbientLight(0x9fb4d8, .06));
  const light = new THREE.DirectionalLight(0xffffff, 2.6); light.position.copy(sun).multiplyScalar(10); scene.add(light);
  // Compensate for the brighter replacement day map without dimming the night lights.
  const earthMaterial = new THREE.MeshPhongMaterial({ color: 0xc8d0dc, map: day, normalMap: normal, normalScale: new THREE.Vector2(.85, -.85), specularMap: specular, specular: 0x5a76a0, shininess: 28, emissiveMap: night, emissive: 0xffc27a, emissiveIntensity: 1.6 });
  earthMaterial.onBeforeCompile = program => {
    program.uniforms.earthSun = { value: sun };
    program.vertexShader = program.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 planetWorldNormal;').replace('#include <defaultnormal_vertex>', '#include <defaultnormal_vertex>\nplanetWorldNormal=normalize(mat3(modelMatrix)*objectNormal);');
    program.fragmentShader = program.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 planetWorldNormal;uniform vec3 earthSun;').replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\nfloat nightWeight=1.0-smoothstep(-.28,.05,dot(normalize(planetWorldNormal),earthSun));totalEmissiveRadiance*=nightWeight;');
  };
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(2, 96, 64), earthMaterial));
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(2.024, 64, 48), new THREE.MeshPhongMaterial({ map: cloudsMap, transparent: true, opacity: .75, depthWrite: false, shininess: 4 }));
  globe.add(clouds); tilt.add(atmosphere(2.04, 1, 3.2, true), atmosphere(2.22, 1.05, 2.4));
  const glow = canvasTexture(128, 128, context => {
    const gradient = context.createRadialGradient(64,64,0,64,64,64);
    gradient.addColorStop(0, '#fff'); gradient.addColorStop(.22, 'rgba(255,190,120,.95)'); gradient.addColorStop(.5, 'rgba(255,110,60,.35)'); gradient.addColorStop(1, 'rgba(255,90,40,0)');
    context.fillStyle = gradient; context.fillRect(0,0,128,128);
  });
  const markers = globeCities.map((city, index) => {
    const position = location(city.latitude, city.longitude, 2.025);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: city.country === 'cn' ? 0xff4c37 : 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    sprite.position.copy(position); sprite.scale.setScalar(city.id === 'hyderabad' ? .095 : .065); globe.add(sprite);
    const ring = new THREE.Mesh(new THREE.RingGeometry(.028, .04, 32), new THREE.MeshBasicMaterial({ color: city.country === 'cn' ? 0xe3241b : 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
    ring.position.copy(position); ring.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), position.clone().normalize()); globe.add(ring);
    return { city, position, ring, phase: index / globeCities.length };
  });
  const arcs = globeRoutes.map(route => {
    const start = markers.find(marker => marker.city.id === route.from)!.position;
    const end = markers.find(marker => marker.city.id === route.to)!.position;
    const control = start.clone().add(end).normalize().multiplyScalar(2 + start.distanceTo(end) * .5);
    const curve = new THREE.QuadraticBezierCurve3(start, control, end);
    const material = new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
      uniforms: { clock: { value: 0 }, hue: { value: new THREE.Color(route.color) }, phase: { value: route.phase } },
      vertexShader: 'varying float along;void main(){along=uv.x;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader: 'varying float along;uniform float clock;uniform float phase;uniform vec3 hue;void main(){float head=fract(clock*.15+phase);float behind=head-along;float tail=step(0.0,behind)*(1.0-smoothstep(0.0,.4,behind));float edge=smoothstep(0.0,.03,along)*(1.0-smoothstep(.97,1.0,along));vec3 light=mix(hue,vec3(1.0,.95,.85),pow(tail,3.2)*.6);gl_FragColor=vec4(light,(.35+.65*pow(tail,1.6))*edge);}',
    });
    globe.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 72, .0065, 6, false), material));
    const head = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); head.scale.setScalar(.15); globe.add(head);
    return { route, curve, material, head };
  });
  const focus = location(22,96,1), baselineYaw = -Math.atan2(focus.x, focus.z), baselineTilt = Math.asin(focus.y);
  globe.rotation.y = baselineYaw - 1.3; tilt.rotation.x = baselineTilt;
  let scale = 1, cropYaw = 0, pointerX = 0, pointerY = 0;
  const pointer = (event: PointerEvent) => { if (event.pointerType !== 'mouse') return; pointerX = event.clientX / innerWidth - .5; pointerY = event.clientY / innerHeight - .5; };
  window.addEventListener('pointermove', pointer, { passive: true });
  const labelElements = new Map(labelOrder.map(id => [id, host.querySelector<HTMLElement>(`[data-city="${id}"]`)!]));
  function resize() {
    const width = host.clientWidth, height = host.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio, width <= 820 ? 1.25 : 1.5));
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
    const halfHeight = 9 * Math.tan(THREE.MathUtils.degToRad(35) / 2), unitsPerPixel = halfHeight * 2 / height;
    if (width <= 820) {
      const screenHeight = Math.min(innerHeight, height), radius = Math.min(screenHeight * .2, width * .42), centerY = Math.max(screenHeight * .27, radius + 84);
      tilt.position.set(0, halfHeight - centerY * unitsPerPixel, 0); scale = radius * unitsPerPixel / 2; cropYaw = 0;
    } else {
      const text = host.parentElement?.querySelector<HTMLElement>('.earth-hero-content');
      const textRight = Math.min((text?.getBoundingClientRect().right ?? width / 2) - host.getBoundingClientRect().left, width * .62);
      const radius = Math.min(height * .4, Math.max((width - textRight) * .78, height * .25));
      const centerX = textRight + .18 / unitsPerPixel + radius * 1.12;
      tilt.position.set((centerX - width / 2) * unitsPerPixel, -.15, 0); scale = radius * unitsPerPixel / 2;
      cropYaw = centerX + radius > width ? -Math.asin(Math.min(1, (centerX + radius - width) / radius)) * .75 : 0;
    }
  }
  const worldCenter = new THREE.Vector3(), normalDirection = new THREE.Vector3(), cameraDirection = new THREE.Vector3();
  function positionLabels() {
    tilt.getWorldPosition(worldCenter); cameraDirection.copy(camera.position).sub(worldCenter).normalize();
    const used: { x: number; y: number; width: number; height: number }[] = [];
    for (const id of labelOrder) {
      const marker = markers.find(item => item.city.id === id)!, element = labelElements.get(id)!;
      const world = globe.localToWorld(marker.position.clone());
      normalDirection.copy(world).sub(worldCenter).normalize();
      if (normalDirection.dot(cameraDirection) <= .15) { element.style.opacity = '0'; continue; }
      const projected = world.project(camera), width = element.offsetWidth, height = element.offsetHeight;
      const x = THREE.MathUtils.clamp((projected.x + 1) / 2 * host.clientWidth + (marker.city.side === 'left' ? -width-10 : 10), 8, Math.max(8, host.clientWidth-width-8));
      const center = (1-projected.y) / 2 * host.clientHeight-height/2;
      let placed = false;
      for (const offset of [0, -height-5, height+5, -2*(height+5), 2*(height+5)]) {
        const y = THREE.MathUtils.clamp(center+offset, 8, Math.max(8, host.clientHeight-height-8));
        if (used.some(box => x < box.x+box.width+4 && x+width+4 > box.x && y < box.y+box.height+4 && y+height+4 > box.y)) continue;
        element.style.transform = `translate(${x}px,${y}px)`; element.style.opacity = '1'; used.push({ x,y,width,height }); placed = true; break;
      }
      if (!placed) element.style.opacity = '0';
    }
  }
  const loop = createSceneLoop(host, resize, (elapsed, delta, reduced) => {
    const time = reduced ? 3 : elapsed, intro = reduced ? 1 : THREE.MathUtils.smootherstep(elapsed, 0, 1.4), response = 1-Math.exp(-delta*3.08);
    const yaw = baselineYaw + cropYaw + (reduced ? 0 : Math.sin(time*.22)*.16 + pointerX*.3) - (1-intro)*1.3;
    globe.rotation.y = reduced ? yaw : THREE.MathUtils.lerp(globe.rotation.y, yaw, response);
    tilt.rotation.x = reduced ? baselineTilt : THREE.MathUtils.lerp(tilt.rotation.x, baselineTilt+pointerY*.12, response);
    tilt.scale.setScalar(scale*(.82+.18*intro)); clouds.rotation.y = time*.012;
    arcs.forEach(({ route, curve, material, head }) => { const p = (time*.15+route.phase)%1; material.uniforms.clock.value=time; head.position.copy(curve.getPoint(p)); head.material.opacity=Math.sin(Math.PI*p); });
    markers.forEach(marker => { const phase = reduced ? .35 : (time*.6+marker.phase)%1; marker.ring.scale.setScalar(1+phase*2.2); marker.ring.material.opacity=(1-phase)*.9; });
    scene.updateMatrixWorld(); renderer.render(scene,camera); positionLabels();
  });
  const lost = (event: Event) => { event.preventDefault(); loop.dispose(); if (!signal.aborted) unavailable(); };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  return { dispose() { loop.dispose(); window.removeEventListener('pointermove', pointer); renderer.domElement.removeEventListener('webglcontextlost', lost); labelElements.forEach(element => { element.style.opacity='0'; }); disposeScene(scene,renderer,loaded); } };
}
