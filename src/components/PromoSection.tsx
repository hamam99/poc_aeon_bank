import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';

import { SectionHeading } from './SectionHeading';
import type { Promo } from '../types/dashboard';

type PromoSectionProps = {
  promos: Promo[];
  title?: string;
};

export const PromoSection = ({
  promos,
  title = 'Promo',
}: PromoSectionProps) => {
  const renderItem = ({ item: promo }: ListRenderItemInfo<Promo>) => {
    return (
      <View key={promo.id} className="w-64 rounded-2xl bg-white p-4">
        <View className="h-1 w-10 rounded-full bg-sun" />
        <Text className="mt-3 text-sm font-bold text-slate-900">
          {promo.title}
        </Text>
        <Text className="mt-1 text-xs leading-5 text-slate-600">
          {promo.description}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <SectionHeading>{title}</SectionHeading>

      <FlatList
        data={promos}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerClassName="gap-3"
        className="mt-3"
        ListEmptyComponent={
          <Text className="text-sm text-slate-500">
            No promotions right now.
          </Text>
        }
      />
    </View>
  );
};
