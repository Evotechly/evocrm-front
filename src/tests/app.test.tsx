import { describe, expect, it } from 'vitest';
import { contacts, deals, quotes } from '@/fixtures/crm';
import { formatDzd } from '@/lib/format';

describe('EvoCRM mock contracts', () => {
  it('ships populated fixtures for the foundation screens', () => {
    expect(contacts.length).toBeGreaterThan(0);
    expect(deals.length).toBeGreaterThan(0);
    expect(quotes.length).toBeGreaterThan(0);
  });

  it('formats amounts with the DZD locale contract', () => {
    expect(formatDzd(820000)).toContain('820');
    expect(formatDzd(820000)).toMatch(/DA/);
  });
});
