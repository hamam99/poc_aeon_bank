import { ArrowLeft } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../theme/colors';

type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
};

export const ScreenHeader = ({ title, onBack }: ScreenHeaderProps) => {
  return (
    <View className="flex-row items-center">
      {onBack ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBack}
          hitSlop={8}
          className="-ml-2 mr-2 h-10 w-10 items-center justify-center rounded-full"
        >
          <ArrowLeft size={22} color={COLORS.arrow} />
        </TouchableOpacity>
      ) : null}

      <Text className="flex-1 text-xl font-bold text-slate-900">{title}</Text>
    </View>
  );
};
