import { TextInput, TouchableOpacity, View } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { COLORS } from '../theme/colors';

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export const SearchField = ({
  value,
  onChangeText,
  placeholder = 'Search',
}: SearchFieldProps) => {
  return (
    <View className="flex-row items-center rounded-2xl bg-white px-4 py-1">
      <Search size={18} color={COLORS.placeholder} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        accessibilityLabel={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        className="ml-3 flex-1 py-3 text-sm text-slate-900"
      />

      {value.length > 0 ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChangeText('')}
          hitSlop={8}
        >
          <X size={18} color={COLORS.placeholder} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
