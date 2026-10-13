import type { QuickAction } from '../../types/dashboard';

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'transaction', label: 'Transaction', icon: 'chart' },
  { id: 'transfer', label: 'Transfer', icon: 'transfer' },
  { id: 'pay_bills', label: 'Pay Bills', icon: 'cardTopUp' },
  { id: 'reload', label: 'Reload', icon: 'wallet' },
];
