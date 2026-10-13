import { create } from 'zustand';

import { MockTransactionRepository } from '../api/MockTransactionRepository';
import type { Transaction } from '../types/transaction';
import { getErrorMessage, idleRequestState } from './requestState';

const transactionRepository = new MockTransactionRepository();

export type TransactionState = {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
  fetchTransactions: () => Promise<Transaction[]>;
  selectTransaction: (transaction: Transaction) => void;
};

export const useTransactionStore = create<TransactionState>(set => ({
  transactions: [],
  selectedTransaction: null,
  ...idleRequestState,

  fetchTransactions: async () => {
    set({ ...idleRequestState, isLoading: true });

    try {
      const transactions = await transactionRepository.getTransactions();
      set({ transactions, isLoading: false, isSuccess: true });
      return transactions;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMessage: getErrorMessage(error),
      });
      throw error;
    }
  },

  selectTransaction: transaction => set({ selectedTransaction: transaction }),
}));
