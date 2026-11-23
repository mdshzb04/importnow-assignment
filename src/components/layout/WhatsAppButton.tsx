import { whatsappUrl } from '../../data/site';
export default function WhatsAppButton() {
  return <a className="whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with ImportNow on WhatsApp (opens in new tab)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7.2 19.3 2.8 20.6 4.1 16.4A9 9 0 1 1 7.2 19.3Z" /><path d="m8.2 7.1 1.1 2.7-1.1 1.1c1 2 2.3 3.3 4.3 4.2l1.1-1.2 2.8 1.2c.2 1.2-.8 2.1-2 2-4.5-.5-8.2-4.4-8.4-8.4-.1-1.1.9-1.9 2.2-1.6Z" strokeWidth="1.2" fill="currentColor" /></svg></a>;
}
