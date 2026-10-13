import { Text, TouchableOpacity, View } from 'react-native';

export type FilterChipOption<T extends string> = {
  value: T;
  label: string;
};

type FilterChipsProps<T extends string> = {
  options: FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: FilterChipsProps<T>) {
  return (
    <View className="flex-row gap-2">
      {options.map(option => {
        const isSelected = option.value === value;

        return (
          <TouchableOpacity
            key={option.value}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(option.value)}
            className={`rounded-full px-4 py-2 ${
              isSelected ? 'bg-brand' : 'bg-white'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                isSelected ? 'text-white' : 'text-slate-600'
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
