import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { createSceneLoop } from '../lifecycle';
import { disposeScene, loadSceneTexture } from '../resources';
import { createVoyageModels, setCrane } from './models';
import { clamp, cranePath, journeyCamera, journeyState, transferProgress } from './timeline';

export async function createVoyage(host: HTMLElement, target: { current: number }, signal: AbortSignal, display: (progress: number) => void, unavailable: () => void) {
  const normal = await loadSceneTexture('/textures/water/normal.png', signal);
  if (signal.aborted) { normal.dispose(); (normal.image as ImageBitmap).close(); throw new Error('Voyage cancelled'); }
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' }); }
  catch (error) { normal.dispose(); (normal.image as ImageBitmap).close(); throw error; }
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.5;renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.domElement.setAttribute('aria-hidden','true');host.prepend(renderer.domElement);
  const scene=new THREE.Scene();scene.fog=new THREE.Fog(0xc6d4e2,200,1700);
  const camera=new THREE.PerspectiveCamera(42,1,.5,20000);
  const mobileAtCreation=host.clientWidth<=820;
  const sun=new THREE.Vector3().setFromSphericalCoords(1,THREE.MathUtils.degToRad(77),THREE.MathUtils.degToRad(122));
  const sky=new Sky();sky.scale.setScalar(10000);
  Object.assign(sky.material.uniforms.turbidity,{value:5});Object.assign(sky.material.uniforms.rayleigh,{value:1.4});Object.assign(sky.material.uniforms.mieCoefficient,{value:.004});Object.assign(sky.material.uniforms.mieDirectionalG,{value:.82});sky.material.uniforms.sunPosition.value.copy(sun);
  const pmrem=new THREE.PMREMGenerator(renderer),skyScene=new THREE.Scene();skyScene.add(sky);
  const environment=pmrem.fromScene(skyScene);scene.environment=environment.texture;scene.add(sky);
  normal.wrapS=normal.wrapT=THREE.RepeatWrapping;
  const water=new Water(new THREE.PlaneGeometry(10000,10000),{textureWidth:mobileAtCreation?256:512,textureHeight:mobileAtCreation?256:512,waterNormals:normal,sunDirection:sun,sunColor:0xfff4e0,waterColor:0x0b3a55,distortionScale:2.4,fog:true});
  water.rotation.x=-Math.PI/2;water.material.uniforms.size.value=2.6;scene.add(water);
  scene.add(new THREE.HemisphereLight(0xdde8ff,0x50606c,.35));
  const light=new THREE.DirectionalLight(0xfff0dc,2.6);light.castShadow=true;light.shadow.mapSize.set(2048,2048);Object.assign(light.shadow.camera,{left:-75,right:75,top:75,bottom:-75,near:1,far:500});light.shadow.camera.updateProjectionMatrix();light.shadow.bias=-.0004;light.shadow.normalBias=.03;scene.add(light,light.target);
  const models=createVoyageModels(scene);
  const wakeMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,
    uniforms:{time:{value:0},intensity:{value:0}},
    vertexShader:'varying vec2 coord;void main(){coord=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:'varying vec2 coord;uniform float time;uniform float intensity;void main(){float side=abs(coord.y-.5)*2.0;float spread=mix(.92,.16,coord.x);float waves=sin(coord.x*155.0-time*5.0+sin(coord.y*47.0))*sin(coord.y*79.0+time*2.0);float foam=smoothstep(.1,.75,waves);float edge=1.0-smoothstep(spread-.25,spread,side);float ends=smoothstep(0.0,.15,coord.x)*(1.0-smoothstep(.94,1.0,coord.x));gl_FragColor=vec4(.96,.98,1.0,foam*edge*ends*intensity*.65);}',
  });
  const wake=new THREE.Mesh(new THREE.PlaneGeometry(85,17),wakeMaterial);wake.rotation.x=-Math.PI/2;wake.position.y=.04;scene.add(wake);
  let current=target.current,lastX=journeyState(current).shipX,mobile=mobileAtCreation;
  const temporary=new THREE.Vector3();
  function resize() {
    const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;
    mobile=width<=820;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.5));renderer.setSize(width,height,false);renderer.shadowMap.enabled=!mobile;
    camera.aspect=width/height;camera.fov=mobile?58:42;
    if(mobile)camera.clearViewOffset();else camera.setViewOffset(width,height,-width*.17,0,width,height);
    camera.updateProjectionMatrix();
  }
  const loop=createSceneLoop(host,resize,(elapsed,delta,reduced)=>{
    current=reduced?target.current:current+(target.current-current)*Math.min(1,delta*4);
    const state=journeyState(current),time=reduced?0:elapsed;
    const speed=Math.abs(state.shipX-lastX)/Math.max(delta,.001);lastX=state.shipX;
    const sailing=Math.sin(Math.PI*clamp((current-.4)/.44)),amplitude=.1+.9*sailing;
    models.ship.position.set(state.shipX,reduced?-.04:Math.sin(time*.8)*.14*amplitude-.04,0);
    models.ship.rotation.set(reduced?0:Math.sin(time*.56)*.006*amplitude,0,reduced?0:Math.sin(time*.7)*.008*amplitude);
    models.radar.rotation.y=time*.8;models.ship.updateMatrixWorld(true);
    for(const port of models.ports)port.far.visible=Math.abs(state.shipX-port.x)<120;
    models.cargo.forEach((cargo,index)=>{
      const slot=models.movingSlots[index],shipPoint=models.ship.localToWorld(new THREE.Vector3(slot.x,slot.y,slot.z));
      const source=[slot.x,3.15+(index<4?1.32:0),-14-(index%4)*1.62],destination=[520+slot.x,3.15+(index<4?1.32:0),-14-(index%4)*1.62];
      let path:number[];
      if(current<.4){const phase=transferProgress(current,index);path=phase===1?[shipPoint.x,shipPoint.y,shipPoint.z]:cranePath(phase,source,[slot.x,slot.y,slot.z]);if(phase>0&&phase<1)setCrane(models.ports[0].cranes[slot.x<0?0:1],temporary.set(path[0],path[1],path[2]));}
      else if(current<.86)path=[shipPoint.x,shipPoint.y,shipPoint.z];
      else{const phase=transferProgress(current,11-index,true);path=cranePath(phase,[shipPoint.x,shipPoint.y,shipPoint.z],destination);if(phase>0&&phase<1)setCrane(models.ports[1].cranes[slot.x<0?0:1],temporary.set(path[0],path[1],path[2]));}
      cargo.position.set(path[0],path[1],path[2]);cargo.rotation.copy(models.ship.rotation);
    });
    models.flags.forEach(({mesh,original})=>{const attribute=mesh.geometry.getAttribute('position') as THREE.BufferAttribute;for(let index=0;index<attribute.count;index++){const x=original[index*3],y=original[index*3+1];attribute.setZ(index,reduced?0:Math.sin(time*2.2+x*1.5+y*.8)*.18*(x+2.8)/5.6);}attribute.needsUpdate=true;mesh.geometry.computeVertexNormals();});
    water.material.uniforms.time.value=time*.55;
    wake.position.x=state.shipX-49;wake.visible=!reduced&&state.distance>0&&state.distance<1;wakeMaterial.uniforms.time.value=time;wakeMaterial.uniforms.intensity.value=clamp(speed/40);
    light.target.position.set(state.shipX,0,-8);light.position.copy(light.target.position).addScaledVector(sun,220);
    const framing=journeyCamera(current,mobile,reduced);camera.position.set(state.shipX+framing.offset[0],Math.max(3,framing.offset[1]),framing.offset[2]);camera.lookAt(state.shipX+framing.look[0],framing.look[1],framing.look[2]);
    renderer.render(scene,camera);display(current);
  });
  const lost=(event:Event)=>{event.preventDefault();loop.dispose();if(!signal.aborted)unavailable();};renderer.domElement.addEventListener('webglcontextlost',lost);
  return {invalidate:loop.invalidate,dispose(){loop.dispose();renderer.domElement.removeEventListener('webglcontextlost',lost);environment.dispose();pmrem.dispose();light.shadow.dispose();disposeScene(scene,renderer,[normal]);}};
}
