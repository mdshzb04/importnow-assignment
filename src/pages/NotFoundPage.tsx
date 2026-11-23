import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <div className="wrap route-shell"><p className="eyebrow">404</p><h1>Page not found</h1><p>The page you requested could not be found.</p><Link className="button" to="/">Back to home</Link></div>; }
