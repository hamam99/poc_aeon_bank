import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';

import { TransactionListItem } from '../components/TransactionListItem';
import type { Transaction } from '../types/transaction';

const transaction: Transaction = {
  id: 'txn-1001',
  title: 'Salary Credit',
  description: 'Monthly payroll',
  amount: 4200,
  date: '2026-10-13T09:00:00.000Z',
};

const textsOf = (renderer: ReactTestRenderer) =>
  renderer.root
    .findAllByType(Text)
    .flatMap(node => node.props.children)
    .filter((child): child is string => typeof child === 'string');

describe('TransactionListItem', () => {
  let mounted: ReactTestRenderer | null = null;

  const renderItem = (
    overrides: Partial<Transaction> = {},
    onPress = jest.fn(),
  ) => {
    let renderer!: ReactTestRenderer;

    act(() => {
      renderer = create(
        <TransactionListItem
          transaction={{ ...transaction, ...overrides }}
          onPress={onPress}
        />,
      );
      mounted = renderer;
    });

    return { renderer, onPress };
  };

  afterEach(() => {
    act(() => {
      mounted?.unmount();
    });
    mounted = null;
  });

  it('renders the title, description and signed amount', () => {
    const { renderer } = renderItem();

    expect(textsOf(renderer)).toEqual(
      expect.arrayContaining([
        'Salary Credit',
        'Monthly payroll',
        '+ RM 4,200.00',
      ]),
    );
  });

  it('omits the description line when the transaction has none', () => {
    const { renderer } = renderItem({ description: undefined });

    expect(textsOf(renderer)).not.toContain('Monthly payroll');
    expect(textsOf(renderer)).toContain('Salary Credit');
  });

  it('hands the tapped transaction back to the caller', () => {
    const { renderer, onPress } = renderItem();

    act(() => {
      renderer.root.findByType(TouchableOpacity).props.onPress();
    });

    expect(onPress).toHaveBeenCalledWith(transaction);
  });

  it('exposes a readable accessibility label per row', () => {
    const { renderer } = renderItem();

    expect(
      renderer.root.findByType(TouchableOpacity).props.accessibilityLabel,
    ).toBe('Salary Credit, + RM 4,200.00');
  });
});
