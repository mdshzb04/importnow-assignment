import { Link } from 'react-router-dom';
export default function Logo() {
  return <Link to="/" className="logo" aria-label="ImportNow home">IMP<svg className="logo-power" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="11.8069" r="9.5" strokeWidth="3.6" strokeDasharray="51.8714 7.8188" transform="rotate(-66.4218 12 11.8069)" /><g strokeWidth="3.2"><line x1="12" y1="1.5" x2="12" y2="11.7" /><polyline points="7.6,8 12,12.6 16.4,8" /></g></svg>RTNOW</Link>;
}
