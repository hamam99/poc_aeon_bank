import { RefreshControl } from 'react-native';

import { brandColor } from '../theme/colors';

export const PullToRefresh = (refreshing: boolean, onRefresh: () => void) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={brandColor}
      colors={[brandColor]}
    />
  );
};
