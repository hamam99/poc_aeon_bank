import { ScrollView, Text, View } from 'react-native';

import { SectionHeading } from './SectionHeading';
import type { Promo } from '../types/dashboard';

type PromoSectionProps = {
  promos: Promo[];
  title?: string;
};

export function PromoSection({ promos, title = 'Promo' }: PromoSectionProps) {
  return (
    <View>
      <SectionHeading>{title}</SectionHeading>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 pt-3 pb-1"
      >
        {promos.map(promo => (
          <View key={promo.id} className="w-64 rounded-2xl bg-white p-4">
            <View className="h-1 w-10 rounded-full bg-sun" />
            <Text className="mt-3 text-sm font-bold text-slate-900">
              {promo.title}
            </Text>
            <Text className="mt-1 text-xs leading-5 text-slate-600">
              {promo.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
