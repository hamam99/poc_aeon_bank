import { create } from 'zustand';
import { AccountSummary } from '../types/dashboard';

const MOCK_ACCOUNT: AccountSummary = {
  accountNumber: '0460059173',
  holderName: 'Hamam Nasrodin',
  balance: 12480.55,
};
export type DashboardState = {
  accountSummary: AccountSummary;
  isBalanceHidden: boolean;
  toggleBalanceVisibility: () => void;
};

export const useDashboardStore = create<DashboardState>(set => ({
  accountSummary: MOCK_ACCOUNT,
  isBalanceHidden: true,
  toggleBalanceVisibility: () =>
    set(state => ({ isBalanceHidden: !state.isBalanceHidden })),
}));
