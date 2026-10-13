import type { PropsWithChildren } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
  className?: string;
  scrollable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}>;

const HORIZONTAL_PADDING = 20;
const BRAND_COLOR = '#0091EA';

export function Screen({
  children,
  className,
  scrollable = false,
  refreshing = false,
  onRefresh,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const rootClassName = `flex-1 bg-surface ${className ?? ''}`;

  if (scrollable) {
    return (
      <ScrollView
        className={rootClassName}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: HORIZONTAL_PADDING,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={BRAND_COLOR}
              colors={[BRAND_COLOR]}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      className={rootClassName}
      style={{
        paddingTop: insets.top + 16,
        paddingHorizontal: HORIZONTAL_PADDING,
      }}
    >
      {children}
    </View>
  );
}
