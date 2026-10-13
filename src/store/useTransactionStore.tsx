import { create } from 'zustand';

import { MockTransactionRepository } from '../api/MockTransactionRepository';
import type { Transaction } from '../types/transaction';
import { getErrorMessage, idleRequestState } from './requestState';

const transactionRepository = new MockTransactionRepository();

export type TransactionState = {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
  fetchTransactions: () => Promise<Transaction[]>;
};

export const useTransactionStore = create<TransactionState>(set => ({
  transactions: [],
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
}));
