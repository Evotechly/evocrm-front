import { describe, it, expect } from 'vitest';
import { lineTotal, quoteTotal } from '@/lib/quotes';
import { initialData } from '@/app/providers/CrmProvider';
describe('Quote calculations in centimes', () => {
  it('preserves every approved fixture amount', () => {
    for (const q of initialData.quotes) expect(quoteTotal(q.items)).toBe(q.amount);
  });
  it('sums quantity × price and rounds each line to centimes', () => {
    expect(
      quoteTotal([
        { quantity: 3, unitPrice: 0.1 },
        { quantity: 2, unitPrice: 12.35 },
      ]),
    ).toBe(25);
    expect(lineTotal({ quantity: 1.5, unitPrice: 10.01 })).toBe(15.02);
  });
  it('handles empty and zero-price quotes', () => {
    expect(quoteTotal([])).toBe(0);
    expect(lineTotal({ quantity: 2, unitPrice: 0 })).toBe(0);
  });
  it('rejects invalid or unsafe monetary input', () => {
    for (const v of [-1, NaN, Infinity])
      expect(() => lineTotal({ quantity: 1, unitPrice: v })).toThrow(RangeError);
    expect(() => lineTotal({ quantity: 1e20, unitPrice: 1e20 })).toThrow(RangeError);
  });
});
