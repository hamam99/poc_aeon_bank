import { Text } from 'react-native';

type SectionHeadingProps = {
  children: string;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return <Text className="text-lg font-bold text-slate-900">{children}</Text>;
}
