import { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { AccountCard } from '../../components/AccountCard';
import { DashboardHeader } from '../../components/DashboardHeader';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { PromoSection } from '../../components/PromoSection';
import { QuickActions } from '../../components/QuickActions';
import { Screen } from '../../components/Screen';
import { useDashboardStore } from '../../store/useDashboardStore';
import type { QuickAction } from '../../types/dashboard';
import showToast from '../../utils/ShowToast';
import { QUICK_ACTIONS } from './data';

const DashboardScreen = () => {
  const {
    accountSummary,
    promos,
    isBalanceHidden,
    isLoading,
    isError,
    errorMessage,
    toggleBalanceVisibility,
    fetchUser,
    fetchPromos,
  } = useDashboardStore(state => state);

  const refreshDashboard = useCallback(
    () => Promise.all([fetchUser(), fetchPromos()]),
    [fetchUser, fetchPromos],
  );

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const onSignOut = () => {
    showToast({ message: 'Features are in progress' });
  };

  const onOpenAccount = () => {
    showToast({ message: 'Features are in progress' });
  };

  const onSelectAction = (action: QuickAction) => {
    if (action.id !== 'transaction') {
      showToast({ message: 'Features are in progress' });
      return;
    }

    showToast({ message: 'navigate to transaction list' });
  };

  if (!accountSummary) {
    if (isError) {
      return (
        <Screen>
          <ErrorState message={errorMessage} onRetry={refreshDashboard} />
        </Screen>
      );
    }

    return (
      <Screen>
        <LoadingState />
      </Screen>
    );
  }

  return (
    <Screen scrollable refreshing={isLoading} onRefresh={refreshDashboard}>
      <DashboardHeader
        greeting="Assalamu'alaikum"
        holderName={accountSummary.holderName}
        onSignOut={onSignOut}
      />

      <View className="mt-4">
        <AccountCard
          account={accountSummary}
          isBalanceHidden={isBalanceHidden}
          onToggleBalanceVisibility={toggleBalanceVisibility}
          onOpenAccount={onOpenAccount}
        />
      </View>

      <View className="mt-6">
        <QuickActions actions={QUICK_ACTIONS} onSelectAction={onSelectAction} />
      </View>

      <View className="mt-8">
        <PromoSection promos={promos} />
      </View>
    </Screen>
  );
};

export default DashboardScreen;
