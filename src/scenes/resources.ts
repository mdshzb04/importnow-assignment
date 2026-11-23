import * as THREE from 'three';
export async function loadSceneTexture(path: string, signal: AbortSignal, srgb = false) {
  const response = await fetch(path, { signal });
  if (!response.ok) throw new Error(`Texture request failed: ${path} (${response.status})`);
  const bitmap = await createImageBitmap(await response.blob(), { imageOrientation: 'flipY' });
  if (signal.aborted) { bitmap.close(); throw new DOMException('Scene cancelled', 'AbortError'); }
  const texture = new THREE.Texture(bitmap);
  texture.flipY = false;
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}
export function disposeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer, extra: THREE.Texture[] = []) {
  const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>(extra);
  scene.traverse(object => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) geometries.add(mesh.geometry);
    if (object instanceof THREE.InstancedMesh) object.dispose();
    if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(material => materials.add(material));
  });
  materials.forEach(material => {
    Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); });
    if (material instanceof THREE.ShaderMaterial) Object.values(material.uniforms).forEach(uniform => { if (uniform.value instanceof THREE.Texture) textures.add(uniform.value); });
    material.dispose();
  });
  geometries.forEach(geometry => geometry.dispose());
  textures.forEach(texture => { texture.dispose(); if (typeof ImageBitmap !== 'undefined' && texture.image instanceof ImageBitmap) texture.image.close(); });
  renderer.dispose();
  renderer.forceContextLoss();
  renderer.domElement.remove();
}
export function canvasTexture(width: number, height: number, paint: (context: CanvasRenderingContext2D, width: number, height: number) => void, srgb = true) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable');
  paint(context, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  return texture;
}
