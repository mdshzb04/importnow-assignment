import * as THREE from 'three';
import { canvasTexture } from '../resources';
export const SHIP = { length: 46, beam: 7.6, deck: 2.6, draft: 2, containerWidth: 3.05, containerHeight: 1.3, containerDepth: 1.52, quay: 2.5 };
const palette = [0xb5362b,0x2b5d8f,0x3f7a4c,0xd98a2b,0x8a9097,0x6b2e2e,0xe1c04a,0xe9ecef,0x1f6f8b,0xb5362b,0x2b5d8f,0x8a9097];
export interface CargoSlot { x: number; y: number; z: number; color: number; branded: boolean }
export interface Crane { group: THREE.Group; trolley: THREE.Group; spreader: THREE.Mesh; cables: THREE.Mesh[]; x: number; portX: number; top: number }
const stableNoise = (value: number) => { const n=Math.sin(value*127.1+19.4)*43758.5453;return n-Math.floor(n); };

export function createVoyageModels(scene: THREE.Scene) {
  const unitBox = new THREE.BoxGeometry(1,1,1), unitPole = new THREE.CylinderGeometry(1,1,1,8), materials = new Map<number,THREE.MeshStandardMaterial>();
  function material(color: number, roughness=.6, metalness=.1) { let value=materials.get(color);if(!value){value=new THREE.MeshStandardMaterial({color,roughness,metalness});materials.set(color,value);}return value; }
  function box(parent: THREE.Object3D, size: number[], position: number[], paint: THREE.Material | THREE.Material[], shadows=true) {
    const mesh=new THREE.Mesh(unitBox,paint);mesh.scale.set(size[0],size[1],size[2]);mesh.position.set(position[0],position[1],position[2]);mesh.castShadow=mesh.receiveShadow=shadows;parent.add(mesh);return mesh;
  }
  function strut(parent: THREE.Object3D, from: number[], to: number[], radius: number, paint: THREE.Material) {
    const start=new THREE.Vector3(...from as [number,number,number]),end=new THREE.Vector3(...to as [number,number,number]),direction=end.clone().sub(start);
    const mesh=new THREE.Mesh(unitPole,paint);mesh.scale.set(radius,direction.length(),radius);mesh.position.copy(start.add(end).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());mesh.castShadow=true;parent.add(mesh);return mesh;
  }
  const corrugated = (brand: boolean) => canvasTexture(512,256,(context,width,height)=>{
    context.fillStyle=brand?'#b93228':'#eeeeee';context.fillRect(0,0,width,height);
    for(let x=10;x<width-10;x+=14){context.fillStyle='rgba(255,255,255,.28)';context.fillRect(x,14,4,height-28);context.fillStyle='rgba(0,0,0,.2)';context.fillRect(x+6,14,5,height-28);}
    context.strokeStyle='rgba(0,0,0,.38)';context.lineWidth=12;context.strokeRect(6,6,width-12,height-12);
    for(let i=0;i<600;i++){context.fillStyle='rgba(90,55,30,.08)';context.fillRect(stableNoise(i)*width,stableNoise(i+700)*height,1,3);}
    if(brand){context.fillStyle='#fff';context.textAlign='center';context.font='800 64px Sora, sans-serif';context.fillText('IMPORTNOW',width/2,height/2+20);context.font='600 22px Inter, sans-serif';context.fillText('importnow.in',width/2,height/2+64);}
  });
  const cargoGeometry=new THREE.BoxGeometry(SHIP.containerWidth,SHIP.containerHeight,SHIP.containerDepth);
  const cargoMaterial=new THREE.MeshStandardMaterial({map:corrugated(false),roughness:.7,metalness:.12});
  const brandedMaterial=new THREE.MeshStandardMaterial({map:corrugated(true),roughness:.7,metalness:.12});
  const dummy=new THREE.Object3D();
  function containers(parent: THREE.Object3D, slots: CargoSlot[]) {
    for(const branded of [false,true]){
      const subset=slots.filter(slot=>slot.branded===branded);if(!subset.length)continue;
      const mesh=new THREE.InstancedMesh(cargoGeometry,branded?brandedMaterial:cargoMaterial,subset.length);
      subset.forEach((slot,index)=>{dummy.position.set(slot.x,slot.y,slot.z);dummy.rotation.set(0,0,0);dummy.scale.setScalar(1);dummy.updateMatrix();mesh.setMatrixAt(index,dummy.matrix);mesh.setColorAt(index,new THREE.Color(branded?0xffffff:slot.color));});
      mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);
    }
  }
  const allSlots: CargoSlot[]=[];
  for(let layer=0;layer<4;layer++)for(let column=0;column<9;column++)for(let row=0;row<4;row++){
    if(layer===3&&(column<1||column>6))continue;
    allSlots.push({x:-12.4+column*3.18,y:3.63+layer*1.33,z:-2.4+row*1.6,color:palette[(column*5+row*7+layer*3)%palette.length],branded:(column*7+row*3+layer*5)%9===0});
  }
  const movingSlots=allSlots.filter(slot=>(Math.abs(slot.x-(-12.4+2*3.18))<.01&&slot.y>6)||(Math.abs(slot.x-(-12.4+5*3.18))<.01&&slot.y>7));
  const staticSlots=allSlots.filter(slot=>!movingSlots.includes(slot));
  function hull(parent: THREE.Group) {
    const vertices:number[]=[],colors:number[]=[],indices:number[]=[],deck:number[]=[],deckIndices:number[]=[],rails:number[]=[];
    const stations=64,points=9;
    for(let station=0;station<=stations;station++){
      const u=station/stations,x=(u-.5)*SHIP.length;
      const front=Math.max(0,(u-.7)/.3),stern=Math.max(0,(.12-u)/.12);
      const beam=Math.max(.015,SHIP.beam/2*(1-Math.pow(front,2.6))*(1-.07*stern));
      const deckY=SHIP.deck+Math.pow(Math.max(0,(u-.8)/.2),2)*1.2;
      const keel=-SHIP.draft+Math.pow(Math.max(0,(u-.9)/.1),1.7)*SHIP.draft*1.2;
      const cross=[[beam,deckY],[beam*.98,.42],[beam*.96,-.05],[beam*.72,Math.max(keel+.35,-1.6)],[0,keel],[-beam*.72,Math.max(keel+.35,-1.6)],[-beam*.96,-.05],[-beam*.98,.42],[-beam,deckY]];
      cross.forEach(([z,y])=>{vertices.push(x,y,z);const color=new THREE.Color(y<-.05?0x8f2a1f:y<.42?0x16181d:0x111214);colors.push(color.r,color.g,color.b);});
      deck.push(x,deckY,beam,x,deckY,-beam);
      if(station<stations){for(let side=0;side<points-1;side++){const a=station*points+side,b=a+points;indices.push(a,b,a+1,a+1,b,b+1);}const d=station*2;deckIndices.push(d,d+2,d+1,d+1,d+2,d+3);}
      if(u>.03&&u<.88){for(const sign of [-1,1]){const z=(beam-.08)*sign;rails.push(x,deckY,z,x,deckY+.7,z);if(station>2){const previous=(station-1)/stations,px=(previous-.5)*SHIP.length;rails.push(px,deckY+.7,z,x,deckY+.7,z);}}}
    }
    // Cap the stern transom independently from the longitudinal loft.
    const center=vertices.length/3;vertices.push(-SHIP.length/2,.3,0);colors.push(.015,.015,.015);
    for(let side=0;side<points-1;side++)indices.push(center,side+1,side);
    const shape=new THREE.BufferGeometry();shape.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));shape.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));shape.setIndex(indices);shape.computeVertexNormals();
    const mesh=new THREE.Mesh(shape,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.5,metalness:.35,side:THREE.DoubleSide}));mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);
    const top=new THREE.BufferGeometry();top.setAttribute('position',new THREE.Float32BufferAttribute(deck,3));top.setIndex(deckIndices);top.computeVertexNormals();const deckMesh=new THREE.Mesh(top,material(0x6a3f33,.85));deckMesh.receiveShadow=true;parent.add(deckMesh);
    const railGeometry=new THREE.BufferGeometry();railGeometry.setAttribute('position',new THREE.Float32BufferAttribute(rails,3));parent.add(new THREE.LineSegments(railGeometry,new THREE.LineBasicMaterial({color:0xcfd5dc})));
  }
  const windows=canvasTexture(256,64,(context,width,height)=>{context.fillStyle='#e9ecef';context.fillRect(0,0,width,height);for(let x=7;x<width;x+=18){context.fillStyle='#1e3446';context.fillRect(x,16,12,20);context.fillStyle='#708ba0';context.fillRect(x,16,12,4);}});
  const windowMaterial=new THREE.MeshStandardMaterial({map:windows,roughness:.4,metalness:.2});
  const white=material(0xf1f3f5,.6),steel=material(0xb9c0c8,.6,.4),dark=material(0x111214,.45,.3);
  function shipBody(background=false) {
    const group=new THREE.Group();hull(group);
    for(let column=0;column<9;column++)box(group,[3.05,.36,6.4],[-12.4+column*3.18,2.78,0],material(0x4b5560,.7,.3));
    for(let column=0;column<8;column++)box(group,[.18,2.6,6.6],[-10.81+column*3.18,4.28,0],steel);
    for(let floor=0;floor<5;floor++)box(group,[5.4-floor*.12,1.25,6.7],[-17.6,SHIP.deck+.625+floor*1.25,0],[windowMaterial,windowMaterial,white,white,windowMaterial,windowMaterial]);
    box(group,[4.6,1.4,10.2],[-17.3,9.55,0],[windowMaterial,windowMaterial,white,white,windowMaterial,windowMaterial]);box(group,[4.9,.16,10.5],[-17.3,10.33,0],white);
    box(group,[.18,3.2,.18],[-18.2,11.95,0],steel);box(group,[.12,.12,2.2],[-18.2,12.75,0],steel);
    const radar=box(group,[1.8,.1,.28],[-17,11.65,0],material(0x2b2f36,.4,.5));
    const funnel=new THREE.Mesh(new THREE.CylinderGeometry(1.05,1.2,4.6,24),dark);funnel.position.set(-21.4,9.2,0);funnel.scale.z=.72;funnel.castShadow=true;group.add(funnel);
    const band=new THREE.Mesh(new THREE.CylinderGeometry(1.08,1.12,.9,24),material(0xc8352a));band.position.set(-21.4,10,0);band.scale.z=.72;group.add(band);
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(1.06,1.06,.4,24),dark);cap.position.set(-21.4,11.55,0);cap.scale.z=.72;group.add(cap);
    for(const sign of [-1,1]){const boat=new THREE.Mesh(new THREE.CapsuleGeometry(.42,1.9,4,10),material(0xff6a1a,.45));boat.rotation.z=Math.PI/2;boat.position.set(-17.4,5.3,sign*4.15);boat.castShadow=true;group.add(boat);box(group,[.12,1.2,.6],[-18.5,5.5,sign*3.9],steel);box(group,[.12,1.2,.6],[-16.3,5.5,sign*3.9],steel);}
    box(group,[.22,4.2,.22],[18.4,5.9,0],steel);
    for(const z of [-1.2,1.2])box(group,[1,.6,1.2],[20.2,4.1,z],material(0x3b4450));
    const wordmark=canvasTexture(768,128,(context,width,height)=>{context.clearRect(0,0,width,height);context.fillStyle='#dfe3e8';context.textAlign='center';context.textBaseline='middle';context.font='800 88px Sora, sans-serif';context.fillText('IMPORTNOW',width/2,height/2);});
    const nameMaterial=new THREE.MeshBasicMaterial({map:wordmark,transparent:true,depthWrite:false});
    for(const sign of [-1,1]){const label=new THREE.Mesh(new THREE.PlaneGeometry(13,2.15),nameMaterial);label.position.set(-.5,1.45,sign*3.81);if(sign<0)label.rotation.y=Math.PI;group.add(label);}
    containers(group,background?allSlots.filter(slot=>slot.y<7):staticSlots);
    return { group, radar };
  }
  const main=shipBody();scene.add(main.group);
  const cargo=movingSlots.map((slot,index)=>{const paint=index%3===0?brandedMaterial:new THREE.MeshStandardMaterial({map:cargoMaterial.map,color:slot.color,roughness:.7,metalness:.12});const mesh=new THREE.Mesh(cargoGeometry,paint);mesh.castShadow=mesh.receiveShadow=true;scene.add(mesh);return mesh;});
  const flags:{mesh:THREE.Mesh<THREE.PlaneGeometry,THREE.MeshStandardMaterial>;original:Float32Array}[]=[];
  function flagTexture(india: boolean) {
    return canvasTexture(300,200,(context,width,height)=>{context.fillStyle=india?'#fff':'#de2910';context.fillRect(0,0,width,height);if(india){context.fillStyle='#ff9933';context.fillRect(0,0,width,height/3);context.fillStyle='#138808';context.fillRect(0,height*2/3,width,height/3);context.strokeStyle='#000080';context.lineWidth=5;context.beginPath();context.arc(width/2,height/2,25,0,Math.PI*2);context.stroke();for(let spoke=0;spoke<24;spoke++){const angle=spoke/24*Math.PI*2;context.beginPath();context.moveTo(width/2,height/2);context.lineTo(width/2+Math.cos(angle)*24,height/2+Math.sin(angle)*24);context.stroke();}}else{context.fillStyle='#ffde00';context.font='54px serif';context.fillText('★',20,67);context.font='20px serif';[[94,24],[113,47],[113,75],[95,98]].forEach(([x,y])=>context.fillText('★',x,y));}});
  }
  function crane(parent: THREE.Group, portX: number, x: number, color: number): Crane {
    const group=new THREE.Group();group.position.x=x;parent.add(group);const paint=material(color,.5,.35),feet=material(0x2a2f36,.6,.5);
    for(const dx of [-3.6,3.6])for(const z of [-9.5,-24]){box(group,[.9,27,.9],[dx,16,z],paint);box(group,[1.6,1.1,2.4],[dx,3.05,z],feet);}
    for(const dx of [-3.6,3.6]){box(group,[.8,.8,14.5],[dx,14.5,-16.75],paint);strut(group,[dx,4,-9.5],[dx,14.5,-24],.22,paint);}
    for(const z of [-9.5,-24])box(group,[8.1,.9,.9],[0,29.1,z],paint);
    const top=30.4;
    for(const dx of [-2.2,2.2])box(group,[.8,1.6,58],[dx,top,-11],paint);
    for(let z=-38;z<=16;z+=5)box(group,[5.2,.25,.25],[0,top-.55,z],paint);
    for(const dx of [-2.2,2.2]){strut(group,[dx,top,-9.5],[dx*.55,top+13,-17],.32,paint);strut(group,[dx,top,-24],[dx*.55,top+13,-17],.32,paint);strut(group,[dx*.55,top+13,-17],[dx,top+.7,17],.08,feet);strut(group,[dx*.55,top+13,-17],[dx,top+.7,-39],.08,feet);}
    box(group,[2.8,.9,1.1],[0,top+13,-17],paint);box(group,[6.6,3.8,8.5],[0,top+2.7,-33],white);box(group,[6.7,.5,8.6],[0,top+4.7,-33],paint);
    const trolley=new THREE.Group();group.add(trolley);box(trolley,[4.6,1,3.2],[0,top-1.2,0],white);box(trolley,[1.8,1.8,2],[1.3,top-2.6,0],material(0x2a3b55,.15,.6));
    const spreader=box(group,[3.3,.42,1.75],[0,14,4],material(0xf2c230,.5,.3));
    const cables=Array.from({length:4},()=>box(group,[.05,1,.05],[0,0,0],feet,false));
    const result={group,trolley,spreader,cables,x,portX,top};setCrane(result,new THREE.Vector3(portX+x,13,4));return result;
  }
  const buildingWindows=canvasTexture(64,256,(context,width,height)=>{context.fillStyle='#fff';context.fillRect(0,0,width,height);context.fillStyle='rgba(40,60,90,.35)';for(let y=6;y<height;y+=10)context.fillRect(0,y,width,5);});
  function port(x: number, india: boolean) {
    const group=new THREE.Group();group.position.x=x;scene.add(group);const color=india?0x2b2b2e:0xc8372d;
    box(group,[300,4,53],[0,.5,-33.5],material(0xa8a49b,.92,0));box(group,[300,4,260],[0,.45,-190],material(0xb4afa4,.95,0));box(group,[300,.3,.7],[0,2.65,-7.35],material(0xe2c046),false);
    for(let xx=-140;xx<=140;xx+=9){const fender=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,2.6,10),material(0x16181b));fender.position.set(xx,1.1,-6.8);group.add(fender);}
    for(const z of [-9.5,-24])box(group,[300,.12,.35],[0,2.56,z],material(0x3a3f46,.5,.7),false);
    const cranes=[crane(group,x,-6,color),crane(group,x,4,color)];
    const yard:CargoSlot[]=[];
    for(let lane=0;lane<8;lane++)for(let column=0;column<56;column++){
      if(column%11===10)continue;const levels=1+Math.floor(stableNoise(column*13+lane*71+x)*4);
      for(let layer=0;layer<levels;layer++)yard.push({x:-92+column*3.35,y:3.15+layer*1.32,z:-31-Math.floor(lane/2)*4.4-(lane%2)*1.62,color:palette[(column*3+lane*5+layer*7)%palette.length],branded:(column+lane)%13===0});
    }
    containers(group,yard);
    for(const [xx,width] of [[-70,44],[-12,36],[46,50]]){box(group,[width,11,26],[xx,8,-74],material(0xd9dde2,.8));const roof=new THREE.Mesh(new THREE.CylinderGeometry(13.6,13.6,width+.4,24,1,false,0,Math.PI),material(india?0x2b2b2e:0xb5463a,.6,.3));roof.rotation.z=Math.PI/2;roof.scale.z=.32;roof.position.set(xx,13.5,-74);roof.castShadow=true;group.add(roof);}
    box(group,[14,16,12],[104,10.5,-40],material(0x9fb7cf,.15,.6));box(group,[14.4,.6,12.4],[104,18.8,-40],white);
    for(const xx of [-100,-50,0,50,100]){box(group,[.5,24,.5],[xx,14.5,-28],steel);box(group,[2.4,.8,1],[xx,26.5,-28],white);}
    box(group,[.22,16,.22],[-40,10.5,-9],steel);
    const flag=new THREE.Mesh(new THREE.PlaneGeometry(5.6,3.7,14,4),new THREE.MeshStandardMaterial({map:flagTexture(india),side:THREE.DoubleSide,roughness:.8}));flag.position.set(-37.2,16.6,-9);group.add(flag);flags.push({mesh:flag,original:new Float32Array(flag.geometry.attributes.position.array)});
    const far=new THREE.Group();group.add(far);const towers=new THREE.MeshStandardMaterial({color:india?0x9aa3ad:0x8c9aab,map:buildingWindows,roughness:.35,metalness:.4});
    for(let index=0;index<46;index++){const width=10+stableNoise(index*3.1+x)*20,height=18+stableNoise(index*7.7+x)**1.8*75;box(far,[width,height,width*.8],[-420+index*18+stableNoise(index)*10,height/2,-950-stableNoise(index*1.3)*150],towers,false);}
    for(let index=0;index<9;index++){const hill=new THREE.Mesh(new THREE.ConeGeometry(140+stableNoise(index)*100,25+stableNoise(index+2)*45,6),material(0x83937e,1,0));hill.scale.z=.6;hill.position.set(-420+index*95,4,-980-stableNoise(index+4)*160);far.add(hill);}
    const moored=shipBody(true);moored.group.position.set(-96,0,1);moored.group.scale.setScalar(.9);group.add(moored.group);
    return {group,cranes,far,x};
  }
  const china=port(0,false),india=port(520,true);
  return { ship:main.group,radar:main.radar,cargo,movingSlots,ports:[china,india],flags };
}

export function setCrane(crane: Crane, cargo: THREE.Vector3) {
  const x=cargo.x-crane.portX-crane.x,z=cargo.z,y=cargo.y+SHIP.containerHeight/2+.3;
  crane.trolley.position.set(x,0,z);crane.spreader.position.set(x,y,z);
  [[-1.3,-.6],[1.3,-.6],[-1.3,.6],[1.3,.6]].forEach(([dx,dz],index)=>{const top=crane.top-1.8;crane.cables[index].position.set(x+dx,(top+y+.2)/2,z+dz);crane.cables[index].scale.y=Math.max(.01,top-y-.2);});
}
