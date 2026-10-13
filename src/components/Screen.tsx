import type { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
  className?: string;
  scrollable?: boolean;
}>;

const HORIZONTAL_PADDING = 20;

export function Screen({
  children,
  className,
  scrollable = false,
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
