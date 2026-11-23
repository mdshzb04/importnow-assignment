import { tradeRoutes } from '../data/globe';
export default function RouteTicker() {
  return <div className="trade-ticker" aria-hidden="true"><div className="trade-ticker-track">{[0,1].map(copy=><div className="trade-ticker-copy" key={copy}>{tradeRoutes.map(([from,to])=><span key={from}>{from}<em>→</em>{to}</span>)}</div>)}</div></div>;
}
