import type { IconName } from '../components/Icon';

export type AccountSummary = {
  accountNumber: string;
  holderName: string;
  balance: number;
};

export type QuickAction = {
  id: string;
  label: string;
  icon: IconName;
};

export type Promo = {
  id: string;
  title: string;
  description: string;
};
