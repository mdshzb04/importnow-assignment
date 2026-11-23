export const globeCities = [
  { id: 'shanghai', name: 'Shanghai', latitude: 31.23, longitude: 121.47, country: 'cn', side: 'right' },
  { id: 'yiwu', name: 'Yiwu', latitude: 29.31, longitude: 120.08, country: 'cn', side: 'left' },
  { id: 'guangzhou', name: 'Guangzhou', latitude: 23.13, longitude: 113.26, country: 'cn', side: 'right' },
  { id: 'shenzhen', name: 'Shenzhen', latitude: 22.54, longitude: 114.06, country: 'cn', side: 'right' },
  { id: 'mumbai', name: 'Nhava Sheva', latitude: 18.95, longitude: 72.95, country: 'in', side: 'left' },
  { id: 'chennai', name: 'Chennai', latitude: 13.08, longitude: 80.27, country: 'in', side: 'right' },
  { id: 'hyderabad', name: 'Hyderabad', latitude: 17.39, longitude: 78.49, country: 'in', side: 'right' },
  { id: 'vizag', name: 'Vizag', latitude: 17.69, longitude: 83.22, country: 'in', side: 'right' },
] as const;
export const labelOrder = ['hyderabad', 'shanghai', 'guangzhou', 'mumbai', 'chennai', 'yiwu'] as const;
export const globeRoutes = [
  { from: 'shanghai', to: 'chennai', color: '#e3241b', phase: 0 },
  { from: 'yiwu', to: 'mumbai', color: '#ff3b30', phase: .33 },
  { from: 'guangzhou', to: 'vizag', color: '#ffffff', phase: .66 },
  { from: 'shenzhen', to: 'hyderabad', color: '#ffffff', phase: .15 },
  { from: 'shanghai', to: 'hyderabad', color: '#e3241b', phase: .5 },
  { from: 'guangzhou', to: 'chennai', color: '#ff3b30', phase: .82 },
] as const;
export const tradeRoutes = [['Yiwu', 'Adilabad'], ['Foshan', 'Hyderabad'], ['Shenzhen', 'Siddipet'], ['Guangzhou', 'Chennai'], ['Shanghai', 'Nhava Sheva'], ['Guzhen', 'Vizag'], ['Ningbo', 'Mumbai']] as const;
