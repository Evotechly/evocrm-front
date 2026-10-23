import { describe, expect, it } from 'vitest';
import { formatDateDisplay, formatDzd } from '@/lib/format';

describe('Aurora cabinet display contracts', () => {
  it('preserves canonical centimes for zero, whole dinars and fractional amounts', () => {
    expect(formatDzd(0)).toBe('0,00 DA');
    expect(formatDzd(2530000)).toBe('2 530 000,00 DA');
    expect(formatDzd(1234.56)).toBe('1 234,56 DA');
  });
  it('shows ISO and approved fixture dates consistently without timezone shifts', () => {
    expect(formatDateDisplay('2026-11-05')).toBe('05/11/2026');
    expect(formatDateDisplay('08 oct. 2026')).toBe('08/10/2026');
    expect(formatDateDisplay('31 déc. 2026')).toBe('31/12/2026');
  });
  it('retains relative labels and does not silently roll invalid dates forward', () => {
    for (const value of ['Hier', 'À l’instant', '—', '09:42', '2026-02-30'])
      expect(formatDateDisplay(value)).toBe(value);
  });
});
