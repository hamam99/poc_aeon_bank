import { Text, View } from 'react-native';

type DetailRowProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

export const DetailRow = ({
  label,
  value,
  valueClassName = '',
}: DetailRowProps) => {
  return (
    <View className="flex-row items-start justify-between gap-4">
      <Text className="text-sm text-slate-500">{label}</Text>
      <Text
        className={`flex-1 text-right text-sm font-semibold text-slate-900 ${valueClassName}`}
      >
        {value}
      </Text>
    </View>
  );
};
