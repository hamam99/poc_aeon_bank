export const formatCurrency = (amount: number, withSign = false): string => {
  const sign = amount < 0 ? '-' : '+';
  const absoluteAmount = Math.abs(amount);
  const formattedAmount = new Intl.NumberFormat('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absoluteAmount);

  return `${withSign ? sign : ''} RM ${formattedAmount}`;
};
