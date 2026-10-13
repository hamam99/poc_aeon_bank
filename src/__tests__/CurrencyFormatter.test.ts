import { CurrencyFormatter } from '../utils/CurrencyFormatter';

describe('formatCurrency', () => {
  it('formats an amount without a sign by default', () => {
    expect(CurrencyFormatter(4200)).toBe('RM 4,200.00');
    expect(CurrencyFormatter(-68.4)).toBe('RM 68.40');
  });

  it('prefixes the direction when a sign is requested', () => {
    expect(CurrencyFormatter(4200, true)).toBe('+ RM 4,200.00');
    expect(CurrencyFormatter(-68.4, true)).toBe('- RM 68.40');
  });

  it('always shows two decimals and groups thousands', () => {
    expect(CurrencyFormatter(12.5, true)).toBe('+ RM 12.50');
    expect(CurrencyFormatter(1234567.891, true)).toBe('+ RM 1,234,567.89');
  });

  it('treats a zero amount as incoming', () => {
    expect(CurrencyFormatter(0, true)).toBe('+ RM 0.00');
  });
});
