import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchX } from 'lucide-react-native';
import { FlatList, View } from 'react-native';

import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import {
  FilterChips,
  type FilterChipOption,
} from '../../components/FilterChips';
import { LoadingState } from '../../components/LoadingState';
import { PullToRefresh } from '../../components/PullToRefresh';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchField } from '../../components/SearchField';
import { TransactionListItem } from '../../components/TransactionListItem';
import ScreenName from '../../navigation/ScreenName';
import type { RootStackParamList } from '../../navigation/types';
import { useTransactionStore } from '../../store/useTransactionStore';
import type {
  Transaction,
  TransactionDirectionFilter,
} from '../../types/transaction';
import {
  filterTransactions,
  sortTransactionsByDateDesc,
} from '../../utils/TransactionUtil';
import { COLORS } from '../../theme/colors';

type TransactionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ScreenName.TransactionScreen
>;

const DIRECTION_OPTIONS: FilterChipOption<TransactionDirectionFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'incoming', label: 'Incoming' },
  { value: 'outgoing', label: 'Outgoing' },
];

const TransactionScreen = ({ navigation }: TransactionScreenProps) => {
  const {
    transactions,
    isLoading,
    isError,
    errorMessage,
    isSuccess,
    fetchTransactions,
    selectTransaction,
  } = useTransactionStore(state => state);

  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<TransactionDirectionFilter>('all');

  const loadTransactions = useCallback(async () => {
    try {
      await fetchTransactions();
    } catch {}
  }, [fetchTransactions]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const visibleTransactions = useMemo(() => {
    const filtered = filterTransactions(transactions, { search, direction });
    const sorted = sortTransactionsByDateDesc(filtered);
    return sorted;
  }, [transactions, search, direction]);

  const SearchInput = useMemo(() => {
    return (
      <View className="mt-4">
        <SearchField
          value={search}
          onChangeText={setSearch}
          placeholder="Search transactions"
        />
      </View>
    );
  }, [search]);

  const FilterChip = useMemo(() => {
    return (
      <View className="mt-3">
        <FilterChips
          options={DIRECTION_OPTIONS}
          value={direction}
          onChange={setDirection}
        />
      </View>
    );
  }, [direction]);

  const Header = useMemo(() => {
    return (
      <View>
        <ScreenHeader title="Transaction History" onBack={navigation.goBack} />
        {SearchInput}
        {FilterChip}
      </View>
    );
  }, [FilterChip, SearchInput, navigation.goBack]);

  const openTransactionDetail = useCallback(
    (transaction: Transaction) => {
      selectTransaction(transaction);
      navigation.navigate(ScreenName.TransactionDetailScreen);
    },
    [navigation, selectTransaction],
  );

  if (transactions.length === 0 && !isSuccess) {
    return (
      <Screen>
        {isError && !isLoading ? (
          <ErrorState message={errorMessage} onRetry={loadTransactions} />
        ) : (
          <LoadingState message="Loading your transactions…" />
        )}
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={visibleTransactions}
        keyExtractor={transaction => transaction.id}
        renderItem={({ item }) => (
          <TransactionListItem
            transaction={item}
            onPress={openTransactionDetail}
          />
        )}
        className="flex-1"
        contentContainerClassName="gap-3 pb-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={PullToRefresh(isLoading, loadTransactions)}
        ListHeaderComponent={Header}
        ListEmptyComponent={
          <EmptyState
            icon={<SearchX size={32} color={COLORS.placeholder} />}
            title="No transactions found"
            description="Try a different keyword or switch the filter."
          />
        }
      />
    </Screen>
  );
};

export default TransactionScreen;
