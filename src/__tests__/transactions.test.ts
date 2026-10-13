import type { Transaction } from '../types/transaction';
import {
  filterTransactions,
  getTransactionDirection,
  sortTransactionsByDateDesc,
} from '../utils/transactions';

const buildTransaction = (
  overrides: Partial<Transaction> & Pick<Transaction, 'id' | 'amount'>,
): Transaction => ({
  title: 'Transaction',
  date: '2026-10-01T10:00:00.000Z',
  ...overrides,
});

const transactions: Transaction[] = [
  buildTransaction({
    id: 'newest',
    title: 'Salary Credit',
    description: 'Monthly payroll',
    amount: 4200,
    date: '2026-10-13T09:00:00.000Z',
  }),
  buildTransaction({
    id: 'middle',
    title: 'Utility Bill',
    description: 'TNB electricity',
    amount: -156.2,
    date: '2026-10-10T09:00:00.000Z',
  }),
  buildTransaction({
    id: 'oldest',
    title: 'ATM Withdrawal',
    amount: -300,
    date: '2026-10-02T09:00:00.000Z',
  }),
];

describe('getTransactionDirection', () => {
  it('treats positive amounts as incoming and negative as outgoing', () => {
    expect(
      getTransactionDirection(buildTransaction({ id: 'a', amount: 10 })),
    ).toBe('incoming');
    expect(
      getTransactionDirection(buildTransaction({ id: 'b', amount: -10 })),
    ).toBe('outgoing');
  });

  it('treats a zero amount as incoming, matching formatCurrency', () => {
    expect(
      getTransactionDirection(buildTransaction({ id: 'a', amount: 0 })),
    ).toBe('incoming');
  });
});

describe('filterTransactions', () => {
  it('returns everything when there is no query and no direction', () => {
    expect(
      filterTransactions(transactions, { search: '', direction: 'all' }),
    ).toHaveLength(3);
  });

  it('matches the title and description case-insensitively', () => {
    expect(
      filterTransactions(transactions, {
        search: 'SALARY',
        direction: 'all',
      }).map(transaction => transaction.id),
    ).toEqual(['newest']);

    expect(
      filterTransactions(transactions, {
        search: 'electricity',
        direction: 'all',
      }).map(transaction => transaction.id),
    ).toEqual(['middle']);
  });

  it('ignores surrounding whitespace and returns nothing for no matches', () => {
    expect(
      filterTransactions(transactions, {
        search: '  salary  ',
        direction: 'all',
      }),
    ).toHaveLength(1);

    expect(
      filterTransactions(transactions, {
        search: 'crypto',
        direction: 'all',
      }),
    ).toHaveLength(0);
  });

  it('filters by direction', () => {
    expect(
      filterTransactions(transactions, {
        search: '',
        direction: 'incoming',
      }).map(transaction => transaction.id),
    ).toEqual(['newest']);

    expect(
      filterTransactions(transactions, {
        search: '',
        direction: 'outgoing',
      }).map(transaction => transaction.id),
    ).toEqual(['middle', 'oldest']);
  });

  it('combines the search and the direction filter', () => {
    expect(
      filterTransactions(transactions, {
        search: 'atm',
        direction: 'incoming',
      }),
    ).toHaveLength(0);
  });
});

describe('sortTransactionsByDateDesc', () => {
  it('orders newest first without mutating the input', () => {
    const input = [transactions[2], transactions[0], transactions[1]];
    const sorted = sortTransactionsByDateDesc(input);

    expect(sorted.map(transaction => transaction.id)).toEqual([
      'newest',
      'middle',
      'oldest',
    ]);
    expect(input.map(transaction => transaction.id)).toEqual([
      'oldest',
      'newest',
      'middle',
    ]);
    expect(sorted).not.toBe(input);
  });
});
