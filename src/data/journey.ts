export const journeySteps = [
  { title: 'Source the right factory', description: 'Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes.' },
  { title: 'Inspect & approve samples', description: 'Our team visits the factory and checks samples. You approve over video call.' },
  { title: 'Quality check & loading', description: 'Every carton is checked and counted. Then the cranes load your container onto the ship.' },
  { title: 'Ocean freight', description: 'Your container sails from Shanghai to India, and we track it the whole way.' },
  { title: 'Customs clearance', description: 'Duties, GST and paperwork are handled at the Indian port, so the container is released quickly.' },
  { title: 'Delivered to your door', description: 'The container is unloaded and trucked to your shop, warehouse or site.' },
] as const;
export const stepThresholds = [0, .12, .24, .4, .84, .92] as const;
export const cameraFrames = [
  { progress: 0, offset: [58,34,74], look: [-2,10,-8] },
  { progress: .13, offset: [24,42,84], look: [0,10,-10] },
  { progress: .27, offset: [-52,30,64], look: [0,8,-6] },
  { progress: .4, offset: [-74,16,42], look: [6,5,0] },
  { progress: .52, offset: [-50,10,40], look: [8,4,0] },
  { progress: .64, offset: [38,9,56], look: [0,4,0] },
  { progress: .76, offset: [66,16,46], look: [-4,4,0] },
  { progress: .84, offset: [44,32,76], look: [0,9,-8] },
  { progress: .92, offset: [-22,42,88], look: [0,10,-10] },
  { progress: 1, offset: [-50,54,104], look: [4,7,-14] },
] as const;
