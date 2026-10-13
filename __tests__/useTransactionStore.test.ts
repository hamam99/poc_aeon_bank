import { MockTransactionRepository } from '../src/api/MockTransactionRepository';
import { useTransactionStore } from '../src/store/useTransactionStore';
import type { Transaction } from '../src/types/transaction';

const resetStore = () =>
  useTransactionStore.setState({
    transactions: [],
    selectedTransaction: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: null,
  });

const transaction: Transaction = {
  id: 'txn-1001',
  title: 'Salary Credit',
  description: 'Monthly payroll',
  amount: 4200,
  date: '2026-10-13T09:00:00.000Z',
};

describe('useTransactionStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetStore();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('fetches the transactions and marks the request as successful', async () => {
    const pending = useTransactionStore.getState().fetchTransactions();

    expect(useTransactionStore.getState().isLoading).toBe(true);

    jest.runAllTimers();

    await expect(pending).resolves.toHaveLength(9);
    expect(useTransactionStore.getState()).toMatchObject({
      isLoading: false,
      isSuccess: true,
      isError: false,
      errorMessage: null,
    });
    expect(useTransactionStore.getState().transactions[0]).toMatchObject({
      id: 'txn-1001',
    });
  });

  it('records the error message when the request fails', async () => {
    jest
      .spyOn(MockTransactionRepository.prototype, 'getTransactions')
      .mockRejectedValueOnce(new Error('Network unavailable'));

    await expect(
      useTransactionStore.getState().fetchTransactions(),
    ).rejects.toThrow('Network unavailable');

    expect(useTransactionStore.getState()).toMatchObject({
      transactions: [],
      isLoading: false,
      isError: true,
      errorMessage: 'Network unavailable',
    });
  });

  it('keeps the transaction the user selected for the detail screen', () => {
    expect(useTransactionStore.getState().selectedTransaction).toBeNull();

    useTransactionStore.getState().selectTransaction(transaction);

    expect(useTransactionStore.getState().selectedTransaction).toEqual(
      transaction,
    );
  });
});
