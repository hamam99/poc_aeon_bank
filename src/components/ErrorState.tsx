import { Text, TouchableOpacity, View } from 'react-native';

import { CircleAlert, RefreshCw } from 'lucide-react-native';

type ErrorStateProps = {
  message?: string | null;
  onRetry: () => void;
};

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <CircleAlert size={32} color="#EF4444" />
      <Text className="mt-4 text-center text-base font-semibold text-slate-900">
        Something went wrong
      </Text>
      <Text className="mt-1 text-center text-sm text-slate-500">
        {message ?? 'Please try again in a moment.'}
      </Text>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Try again"
        onPress={onRetry}
        className="mt-6 flex-row items-center rounded-xl bg-brand px-5 py-3"
      >
        <RefreshCw size={16} color="white" />
        <Text className="ml-2 text-sm font-semibold text-white">Try again</Text>
      </TouchableOpacity>
    </View>
  );
};
