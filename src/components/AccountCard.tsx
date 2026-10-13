import { Text, TouchableOpacity, View } from 'react-native';

import type { AccountSummary } from '../types/dashboard';
import { CurrencyFormatter } from '../utils/CurrencyFormatter';
import dayjs from 'dayjs';
import { ChevronRight, EyeClosed, EyeIcon } from 'lucide-react-native';

type AccountCardProps = {
  account: AccountSummary;
  isBalanceHidden: boolean;
  onToggleBalanceVisibility: () => void;
  onOpenAccount?: () => void;
};

const HIDDEN_BALANCE = '••••••••';

export function AccountCard({
  account,
  isBalanceHidden,
  onToggleBalanceVisibility,
  onOpenAccount,
}: AccountCardProps) {
  return (
    <View className="overflow-hidden rounded-3xl bg-brand p-5 pb-9">
      <View className="absolute -right-8 -top-12 h-24 w-24 rounded-full bg-white/10" />
      <View className="absolute -bottom-16 -right-6 h-24 w-24 rounded-full bg-sun" />
      <View className="absolute -bottom-16 -left-12 h-24 w-24 rounded-full bg-white/10" />

      <View className="flex-row justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-xs text-white/90">
            {account.accountNumber} – {account.holderName.toUpperCase()}
          </Text>

          <View className="mt-4 flex-row items-center">
            <Text className="text-sm text-white/90">Available balance</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={
                isBalanceHidden ? 'Show balance' : 'Hide balance'
              }
              onPress={onToggleBalanceVisibility}
              hitSlop={10}
              className="ml-2"
            >
              {isBalanceHidden ? (
                <EyeClosed size={16} color={'white'} />
              ) : (
                <EyeIcon size={16} color={'white'} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            className={`mt-1 text-2xl font-bold text-white ${
              isBalanceHidden ? 'tracking-[6px]' : ''
            }`}
          >
            {isBalanceHidden
              ? HIDDEN_BALANCE
              : CurrencyFormatter(account.balance)}
          </Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Open account"
          onPress={onOpenAccount}
          className="mt-8 h-11 w-11 items-center justify-center rounded-full bg-white/25"
        >
          <ChevronRight size={24} color={'white'} />
        </TouchableOpacity>
      </View>

      <Text className="mt-4 text-right text-[10px] text-white/70">
        {dayjs().format('DD MMM YYYY, HH:mm')}
      </Text>
    </View>
  );
}
