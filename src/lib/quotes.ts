import type { LineItem } from '@/app/providers/CrmProvider';
/** Integer centimes per line. No invented tax, discount, payment or sending rules. */
export function lineTotal(item: Pick<LineItem, 'quantity' | 'unitPrice'>): number {
  if (
    !Number.isFinite(item.quantity) ||
    !Number.isFinite(item.unitPrice) ||
    item.quantity < 0 ||
    item.unitPrice < 0
  )
    throw new RangeError('Quantité et prix doivent être positifs');
  const cents = Math.round(item.quantity * Math.round(item.unitPrice * 100));
  if (!Number.isSafeInteger(cents)) throw new RangeError('Montant trop élevé');
  return cents / 100;
}
export function quoteTotal(items: Pick<LineItem, 'quantity' | 'unitPrice'>[]) {
  return (
    items.reduce((sum, item) => {
      const cents = sum + Math.round(lineTotal(item) * 100);
      if (!Number.isSafeInteger(cents)) throw new RangeError('Total trop élevé');
      return cents;
    }, 0) / 100
  );
}
