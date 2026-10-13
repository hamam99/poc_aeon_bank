import type {
  Transaction,
  TransactionDirection,
  TransactionFilter,
} from '../types/transaction';

export const getTransactionDirection = (
  transaction: Transaction,
): TransactionDirection => (transaction.amount < 0 ? 'outgoing' : 'incoming');

export const filterTransactions = (
  transactions: Transaction[],
  { search, direction }: TransactionFilter,
): Transaction[] => {
  const query = search.trim().toLowerCase();

  return transactions.filter(transaction => {
    if (
      direction !== 'all' &&
      getTransactionDirection(transaction) !== direction
    ) {
      return false;
    }

    if (query.length === 0) {
      return true;
    }

    return `${transaction.title} ${transaction.description ?? ''} ${
      transaction.id
    }`
      .toLowerCase()
      .includes(query);
  });
};

export const sortTransactionsByDateDesc = (
  transactions: Transaction[],
): Transaction[] =>
  [...transactions].sort(
    (first, second) => Date.parse(second.date) - Date.parse(first.date),
  );
