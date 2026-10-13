import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <View className="items-center px-6 py-12">
      {icon ?? <Inbox size={32} color={COLORS.inboxColor} />}

      <Text className="mt-4 text-center text-base font-semibold text-slate-900">
        {title}
      </Text>

      {description ? (
        <Text className="mt-1 text-center text-sm text-slate-500">
          {description}
        </Text>
      ) : null}
    </View>
  );
};
