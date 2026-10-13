export type TransactionDirection = 'incoming' | 'outgoing';

/** `all` is the unfiltered default for the transaction list. */
export type TransactionDirectionFilter = TransactionDirection | 'all';

export type Transaction = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  date: string;
};

export type TransactionFilter = {
  search: string;
  direction: TransactionDirectionFilter;
};
