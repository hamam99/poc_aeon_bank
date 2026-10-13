export type AccountSummary = {
  accountNumber: string;
  holderName: string;
  balance: number;
};

export type QuickAction = {
  id: string;
  label: string;
  iconNode?: React.ReactNode;
};

export type Promo = {
  id: string;
  title: string;
  description: string;
};
