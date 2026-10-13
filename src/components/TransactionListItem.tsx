import dayjs from 'dayjs';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import type { Transaction } from '../types/transaction';
import { CurrencyFormatter } from '../utils/CurrencyFormatter';
import { getTransactionDirection } from '../utils/TransactionUtil';
import { COLORS } from '../theme/colors';

type TransactionListItemProps = {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
};

export function TransactionListItem({
  transaction,
  onPress,
}: TransactionListItemProps) {
  const isIncoming = getTransactionDirection(transaction) === 'incoming';
  const DirectionIcon = isIncoming ? ArrowDownLeft : ArrowUpRight;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${transaction.title}, ${CurrencyFormatter(
        transaction.amount,
        true,
      )}`}
      onPress={() => onPress(transaction)}
      activeOpacity={0.7}
      className="flex-row items-center rounded-2xl bg-white p-4"
    >
      <View
        className={`h-11 w-11 items-center justify-center rounded-full ${
          isIncoming ? 'bg-emerald-50' : 'bg-rose-50'
        }`}
      >
        <DirectionIcon
          size={18}
          color={isIncoming ? COLORS.incoming : COLORS.outgoing}
        />
      </View>

      <View className="ml-3 flex-1 pr-3">
        <Text
          className="text-sm font-semibold text-slate-900"
          numberOfLines={1}
        >
          {transaction.title}
        </Text>
        {transaction.description ? (
          <Text className="mt-0.5 text-xs text-slate-500" numberOfLines={1}>
            {transaction.description}
          </Text>
        ) : null}
      </View>

      <View className="items-end">
        <Text
          className={`text-sm font-bold ${
            isIncoming ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {CurrencyFormatter(transaction.amount, true)}
        </Text>
        <Text className="mt-0.5 text-xs text-slate-400">
          {dayjs(transaction.date).format('DD MMM YYYY, HH:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
