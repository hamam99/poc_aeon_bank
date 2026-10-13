import type { Promo, QuickAction } from '../../types/dashboard';

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'transaction', label: 'Transaction', icon: 'chart' },
  { id: 'transfer', label: 'Transfer', icon: 'transfer' },
  { id: 'pay_bills', label: 'Pay Bills', icon: 'cardTopUp' },
  { id: 'reload', label: 'Reload', icon: 'wallet' },
];

export const PROMOS: Promo[] = [
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
