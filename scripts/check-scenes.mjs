import assert from 'node:assert/strict';
import { log } from 'node:console';
import { journeySteps, stepThresholds } from '../src/data/journey.ts';
import { globeCities, globeRoutes, labelOrder } from '../src/data/globe.ts';
import { cranePath, journeyCamera, journeyState, transferProgress } from '../src/scenes/voyage/timeline.ts';
assert.equal(journeySteps.length,6);
for(const [progress,day,distance,step] of [[0,0,0,0],[.4,7,0,3],[.62,19,.5,3],[.84,30,1,4],[1,35,1,5]]){
  const state=journeyState(progress);assert.equal(state.day,day);assert.ok(Math.abs(state.distance-distance)<1e-10);assert.equal(state.step,step);
}
assert.equal(journeyState(-1).progress,0);assert.equal(journeyState(2).progress,1);
let previous=journeyState(0);
for(let index=1;index<=1000;index++){const next=journeyState(index/1000);assert.ok(next.day>=previous.day&&next.distance>=previous.distance&&next.step>=previous.step);assert.ok(next.day<=35&&next.shipX<=520);previous=next;}
previous=journeyState(1);
for(let index=999;index>=0;index--){const next=journeyState(index/1000);assert.ok(next.day<=previous.day&&next.distance<=previous.distance&&next.step<=previous.step);previous=next;}
for(let index=0;index<stepThresholds.length;index++){assert.equal(journeyState(stepThresholds[index]).step,index);if(index)assert.equal(journeyState(stepThresholds[index]-.00001).step,index-1);}
for(const progress of [0,.12,.24,.4,.52,.64,.76,.84,.92,1])for(const mobile of [false,true])for(const reduced of [false,true]){const camera=journeyCamera(progress,mobile,reduced);assert.ok([...camera.offset,...camera.look].every(Number.isFinite));}
const start=[-6,4,-16],end=[-6,7.62,2.4];assert.deepEqual(cranePath(0,start,end),start);cranePath(1,start,end).forEach((value,index)=>assert.ok(Math.abs(value-end[index])<1e-10));assert.equal(cranePath(.5,start,end)[1],21);
for(let index=0;index<12;index++){assert.equal(transferProgress(0,index),0);assert.equal(transferProgress(.4,index),1);assert.equal(transferProgress(.84,index,true),0);assert.equal(transferProgress(1,index,true),1);}
for(const route of globeRoutes){assert.ok(globeCities.some(city=>city.id===route.from));assert.ok(globeCities.some(city=>city.id===route.to));}
assert.equal(new Set(labelOrder).size,6);assert.equal(globeRoutes.length,6);
log('Scene logic checks passed: six phases, day 0/7/30/35, distance tracker, forward/reverse stateless sampling, camera endpoints/mobile/reduced motion, twelve crane transfers and globe route endpoints.');
