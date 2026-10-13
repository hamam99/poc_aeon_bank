import { Text, TouchableOpacity, View } from 'react-native';

import type { QuickAction } from '../types/dashboard';
import { SectionHeading } from './SectionHeading';

type QuickActionsProps = {
  actions: QuickAction[];
  onSelectAction?: (action: QuickAction) => void;
  title?: string;
};

export function QuickActions({
  actions,
  onSelectAction,
  title = 'Quick Actions',
}: QuickActionsProps) {
  return (
    <View>
      <SectionHeading>{title}</SectionHeading>
      <View className="flex-row flex-wrap rounded-2xl bg-slate-200 py-2 mt-3">
        {actions.map(action => (
          <View key={action.id} className="w-1/4 items-center px-1 py-3">
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={action.label}
              onPress={() => {
                if (onSelectAction) {
                  onSelectAction(action);
                }
              }}
              className="items-center"
            >
              {action.iconNode}
              <Text className="mt-2 text-center text-[11px] leading-4 text-slate-800">
                {action.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
