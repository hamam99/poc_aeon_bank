import { formatCurrency } from '../utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats an amount without a sign by default', () => {
    expect(formatCurrency(4200)).toBe('RM 4,200.00');
    expect(formatCurrency(-68.4)).toBe('RM 68.40');
  });

  it('prefixes the direction when a sign is requested', () => {
    expect(formatCurrency(4200, true)).toBe('+ RM 4,200.00');
    expect(formatCurrency(-68.4, true)).toBe('- RM 68.40');
  });

  it('always shows two decimals and groups thousands', () => {
    expect(formatCurrency(12.5, true)).toBe('+ RM 12.50');
    expect(formatCurrency(1234567.891, true)).toBe('+ RM 1,234,567.89');
  });

  it('treats a zero amount as incoming', () => {
    expect(formatCurrency(0, true)).toBe('+ RM 0.00');
  });
});
