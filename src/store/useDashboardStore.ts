import { create } from 'zustand';

import { MockPromoRepository } from '../api/MockPromoRepository';
import { MockUserRepository } from '../api/MockUserRepository';
import type { AccountSummary, Promo } from '../types/dashboard';
import { getErrorMessage, idleRequestState } from './requestState';

const userRepository = new MockUserRepository();
const promoRepository = new MockPromoRepository();

export type DashboardState = {
  accountSummary: AccountSummary | null;
  promos: Promo[];
  isBalanceHidden: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
  toggleBalanceVisibility: () => void;
  fetchUser: () => Promise<AccountSummary>;
  fetchPromos: () => Promise<Promo[]>;
};

export const useDashboardStore = create<DashboardState>(set => ({
  accountSummary: null,
  promos: [],
  isBalanceHidden: true,
  ...idleRequestState,

  toggleBalanceVisibility: () =>
    set(state => ({ isBalanceHidden: !state.isBalanceHidden })),

  fetchUser: async () => {
    set({ ...idleRequestState, isLoading: true });

    try {
      const accountSummary = await userRepository.getUser();
      set({ accountSummary, isLoading: false, isSuccess: true });
      return accountSummary;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMessage: getErrorMessage(error),
      });
      throw error;
    }
  },

  fetchPromos: async () => {
    set({ ...idleRequestState, isLoading: true });

    try {
      const promos = await promoRepository.getPromos();
      set({ promos, isLoading: false, isSuccess: true });
      return promos;
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
