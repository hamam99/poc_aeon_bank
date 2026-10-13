import {
  BanknoteArrowDown,
  ChartColumnIcon,
  Receipt,
  WalletCards,
} from 'lucide-react-native';
import type { QuickAction } from '../../types/dashboard';
import { COLORS } from '../../theme/colors';

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'transaction',
    label: 'Transaction',
    iconNode: <ChartColumnIcon size={24} color={COLORS.brandColor} />,
  },
  {
    id: 'transfer',
    label: 'Transfer',
    iconNode: <BanknoteArrowDown size={24} color={COLORS.brandColor} />,
  },
  {
    id: 'pay_bills',
    label: 'Pay Bills',
    iconNode: <Receipt size={24} color={COLORS.brandColor} />,
  },
  {
    id: 'reload',
    label: 'Reload',
    iconNode: <WalletCards size={24} color={COLORS.brandColor} />,
  },
];
