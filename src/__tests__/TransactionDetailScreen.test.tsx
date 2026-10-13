import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ScreenName from '../navigation/ScreenName';
import type { RootStackParamList } from '../navigation/types';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import { useTransactionStore } from '../store/useTransactionStore';
import type { Transaction } from '../types/transaction';
import shareReceipt from '../utils/ShareReceipt';

jest.mock('../utils/ShareReceipt', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const shareReceiptMock = shareReceipt as jest.MockedFunction<
  typeof shareReceipt
>;

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ScreenName.TransactionDetailScreen
>;

const goBack = jest.fn();
const navigation = { goBack } as unknown as ScreenProps['navigation'];
const route = {
  key: 'transaction-detail',
  name: ScreenName.TransactionDetailScreen,
} as unknown as ScreenProps['route'];

const incoming: Transaction = {
  id: 'txn-1001',
  title: 'Salary Credit',
  description: 'Monthly payroll',
  amount: 4200,
  date: '2026-10-13T09:00:00.000Z',
};

const outgoing: Transaction = {
  id: 'txn-1004',
  title: 'Card Purchase',
  description: 'AEON BiG Mid Valley',
  amount: -68.4,
  date: '2026-10-13T06:00:00.000Z',
};

/** `Screen` reads insets, which the provider can supply without native measurement. */
const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const textsOf = (renderer: ReactTestRenderer) =>
  renderer.root
    .findAllByType(Text)
    .flatMap(node => node.props.children)
    .filter((child): child is string => typeof child === 'string');

const buttonLabelled = (renderer: ReactTestRenderer, label: string) => {
  const button = renderer.root
    .findAllByType(TouchableOpacity)
    .find(candidate =>
      candidate.findAllByType(Text).some(node => node.props.children === label),
    );

  if (!button) {
    throw new Error(`No button labelled "${label}"`);
  }

  return button;
};

describe('TransactionDetailScreen', () => {
  let mounted: ReactTestRenderer | null = null;

  const render = () => {
    let renderer!: ReactTestRenderer;

    act(() => {
      renderer = create(
        <SafeAreaProvider initialMetrics={METRICS}>
          <TransactionDetailScreen navigation={navigation} route={route} />
        </SafeAreaProvider>,
      );
      mounted = renderer;
    });

    return renderer;
  };

  beforeEach(() => {
    goBack.mockClear();
    shareReceiptMock.mockClear();
  });

  afterEach(() => {
    act(() => {
      mounted?.unmount();
    });
    mounted = null;

    useTransactionStore.setState({ selectedTransaction: null });
  });

  it('tells the user to pick a transaction when nothing is selected', () => {
    const tree = render();

    expect(textsOf(tree)).toContain('No transaction selected');
  });

  it('shows the signed amount and the detail rows for an incoming transfer', () => {
    useTransactionStore.setState({ selectedTransaction: incoming });

    expect(textsOf(render())).toEqual(
      expect.arrayContaining([
        'Salary Credit',
        '+ RM 4,200.00',
        'Incoming',
        'Monthly payroll',
        'txn-1001',
      ]),
    );
  });

  it('shows an outgoing transfer as outgoing with a negative amount', () => {
    useTransactionStore.setState({ selectedTransaction: outgoing });

    expect(textsOf(render())).toEqual(
      expect.arrayContaining([
        'Card Purchase',
        '- RM 68.40',
        'Outgoing',
        'AEON BiG Mid Valley',
        'txn-1004',
      ]),
    );
  });

  it('builds the receipt from the selected transaction when shared', () => {
    useTransactionStore.setState({ selectedTransaction: incoming });
    const tree = render();

    act(() => {
      buttonLabelled(tree, 'Share Receipt').props.onPress();
    });

    expect(shareReceiptMock).toHaveBeenCalledTimes(1);

    const payload = shareReceiptMock.mock.calls[0][0];

    expect(payload).toMatch(/^Receipt\n/);
    expect(payload).toContain('Transaction ID: txn-1001');
    expect(payload).toContain('Title: Salary Credit');
    expect(payload).toContain('Type : Incoming');
    expect(payload).toContain('Amount: + RM 4,200.00');
    expect(payload).toContain('Description: Monthly payroll');
    expect(payload).toMatch(/^Date: \d{2} \w{3} \d{4}, \d{2}:\d{2}$/m);
  });
});
