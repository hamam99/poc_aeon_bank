import { ActivityIndicator, Text, View } from 'react-native';

type LoadingStateProps = {
  message?: string;
};

export const LoadingState = ({
  message = 'Loading your dashboard…',
}: LoadingStateProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#0091EA" />
      <Text className="mt-4 text-sm text-slate-500">{message}</Text>
    </View>
  );
};
