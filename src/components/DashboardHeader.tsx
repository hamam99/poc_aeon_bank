import { Text, TouchableOpacity, View } from 'react-native';

import { LogOut } from 'lucide-react-native';

type DashboardHeaderProps = {
  greeting: string;
  holderName: string;
  onSignOut?: () => void;
};

export function DashboardHeader({
  greeting,
  holderName,
  onSignOut,
}: DashboardHeaderProps) {
  return (
    <View className="flex-row items-start justify-between">
      <View className="flex-1 pr-4">
        <Text className="text-base text-slate-600">{greeting}</Text>
        <Text className="mt-1 text-xl font-bold uppercase tracking-wide text-slate-900">
          {holderName}
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          onPress={onSignOut}
          hitSlop={8}
          className="h-11 w-11 items-center justify-center "
        >
          <LogOut size={20} color={'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
