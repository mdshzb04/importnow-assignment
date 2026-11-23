import { whatsappUrl } from '../data/site.ts';
export interface QuoteFields { name: string; city: string; category: string; quantity: string; budget: string; details: string }
export function buildWhatsAppQuote(fields: QuoteFields): string {
  const entries: [string, string][] = [['Name', fields.name], ['City', fields.city], ['Category', fields.category], ['Quantity', fields.quantity], ['Budget', fields.budget], ['Details', fields.details]];
  const message = "Hi ImportNow, I'd like a sourcing quote.\n\n" + entries.map(([label, value]) => `${label}: ${value.trim()}`).join('\n');
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}
