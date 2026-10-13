import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { DetailRow } from '../../components/DetailRow';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeading } from '../../components/SectionHeading';
import ScreenName from '../../navigation/ScreenName';
import type { RootStackParamList } from '../../navigation/types';
import { useTransactionStore } from '../../store/useTransactionStore';
import { COLORS } from '../../theme/colors';
import { CurrencyFormatter } from '../../utils/CurrencyFormatter';
import { getTransactionDirection } from '../../utils/TransactionUtil';
import shareReceipt from '../../utils/ShareReceipt';

type TransactionDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ScreenName.TransactionDetailScreen
>;

const TransactionDetailScreen = ({
  navigation,
}: TransactionDetailScreenProps) => {
  const selectedTransaction = useTransactionStore(
    state => state.selectedTransaction,
  );

  const header = (
    <ScreenHeader title="Transaction Detail" onBack={navigation.goBack} />
  );

  if (!selectedTransaction) {
    return (
      <Screen>
        {header}
        <EmptyState
          title="No transaction selected"
          description="Open a transaction from the history list to see its details."
        />
      </Screen>
    );
  }

  const isIncoming =
    getTransactionDirection(selectedTransaction) === 'incoming';
  const DirectionIcon = isIncoming ? ArrowDownLeft : ArrowUpRight;
  const amountClassName = isIncoming ? 'text-emerald-600' : 'text-rose-600';

  const onShareReceipt = () => {
    const content = [
      'Receipt',
      `Transaction ID: ${selectedTransaction.id}`,
      `Title: ${selectedTransaction.title}`,
      `Type : ${isIncoming ? 'Incoming' : 'Outgoing'}`,
      `Amount: ${CurrencyFormatter(selectedTransaction.amount, true)}`,
      `Date: ${dayjs(selectedTransaction.date).format('DD MMM YYYY, HH:mm')}`,
      `Description: ${selectedTransaction.description ?? 'No description'}`,
    ].join('\n');

    shareReceipt(content);
  };
  return (
    <Screen scrollable>
      {header}

      <View className="mt-6 items-center rounded-2xl bg-white px-4 py-8">
        <View
          className={`h-14 w-14 items-center justify-center rounded-full ${
            isIncoming ? 'bg-emerald-50' : 'bg-rose-50'
          }`}
        >
          <DirectionIcon
            size={24}
            color={isIncoming ? COLORS.incoming : COLORS.outgoing}
          />
        </View>

        <Text className="mt-4 text-base font-semibold text-slate-900">
          {selectedTransaction.title}
        </Text>

        <Text className={`mt-1 text-3xl font-bold ${amountClassName}`}>
          {CurrencyFormatter(selectedTransaction.amount, true)}
        </Text>

        <Text className="mt-1 text-sm text-slate-500">
          {dayjs(selectedTransaction.date).format('DD MMM YYYY, HH:mm')}
        </Text>
      </View>

      <View className="mt-8">
        <SectionHeading>Details</SectionHeading>

        <View className="mt-3 gap-3 rounded-2xl bg-white p-4">
          <DetailRow label="Transaction ID" value={selectedTransaction.id} />

          <DetailRow
            label="Type"
            value={isIncoming ? 'Incoming' : 'Outgoing'}
            valueClassName={amountClassName}
          />
          <DetailRow
            label="Description"
            value={selectedTransaction.description ?? '-'}
          />
        </View>
      </View>

      <TouchableOpacity
        className="mt-8 flex-row items-center justify-center gap-2 rounded-lg py-3 bg-blue-400"
        onPress={onShareReceipt}
      >
        <Text className="text-white tex-lg font-bold">Share Receipt</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default TransactionDetailScreen;
