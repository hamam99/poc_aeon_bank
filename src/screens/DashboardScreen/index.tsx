import { View } from 'react-native';

import { Screen } from '../../components/Screen';
import { AccountCard } from '../../components/AccountCard';
import { DashboardHeader } from '../../components/DashboardHeader';
import { PromoSection } from '../../components/PromoSection';
import { QuickActions } from '../../components/QuickActions';
import { QUICK_ACTIONS } from './data';
import { useDashboardStore } from '../../store/useDashboardStore';
import showToast from '../../utils/ShowToast';

const DashboardScreen = () => {
  const { isBalanceHidden, toggleBalanceVisibility, accountSummary, promos } =
    useDashboardStore(state => state);

  const onSignOut = () => {
    showToast({ message: 'Features are in progress' });
  };

  const onOpenAccount = () => {
    showToast({ message: 'Features are in progress' });
  };

  return (
    <Screen scrollable>
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
        <QuickActions actions={QUICK_ACTIONS} />
      </View>

      <View className="mt-8">
        <PromoSection promos={promos} />
      </View>
    </Screen>
  );
};

export default DashboardScreen;
