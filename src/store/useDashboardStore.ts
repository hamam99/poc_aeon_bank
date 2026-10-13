import { create } from 'zustand';
import { AccountSummary, Promo } from '../types/dashboard';

const MOCK_ACCOUNT: AccountSummary = {
  accountNumber: '0460059173',
  holderName: 'Hamam Nasrodin',
  balance: 12480.55,
};

const MOCK_PROMOS: Promo[] = [
  {
    id: '1',
    title: 'Cashback eWallet',
    description:
      'Topup and you will get cashback up to RM 10 for every transaction.',
  },
  {
    id: '2',
    title: 'Gold Financing',
    description:
      'Get gold financing without processing fees throughout this month.',
  },
];

export type DashboardState = {
  accountSummary: AccountSummary;
  isBalanceHidden: boolean;
  toggleBalanceVisibility: () => void;
  promos: Promo[];
};

export const useDashboardStore = create<DashboardState>(set => ({
  accountSummary: MOCK_ACCOUNT,
  isBalanceHidden: true,
  toggleBalanceVisibility: () =>
    set(state => ({ isBalanceHidden: !state.isBalanceHidden })),
  promos: MOCK_PROMOS,
}));
