import { Text } from 'react-native';

/**
 * Single source of truth for iconography.
 *
 * The glyphs are emoji stand-ins so the project stays free of an icon dependency for
 * now; swapping in a vector icon set only requires changing this map.
 */
export const ICON_GLYPHS = {
  signOut: '🚪',
  reward: '🎁',
  eye: '👁️',
  chevronRight: '›',
  transfer: '💸',
  purchase: '🛒',
  payment: '📄',
  wallet: '💳',
  gold: '💰',
  cardless: '📱',
  cardTopUp: '🎫',
  more: '➕',
  currency: '💱',
  chart: '📊',
} as const;

export type IconName = keyof typeof ICON_GLYPHS;

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className = 'text-xl' }: IconProps) {
  return <Text className={className}>{ICON_GLYPHS[name]}</Text>;
}
