import { MockUserRepository } from '../src/api/MockUserRepository';
import { useDashboardStore } from '../src/store/useDashboardStore';

const resetStore = () =>
  useDashboardStore.setState({
    accountSummary: null,
    promos: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: null,
  });

describe('useDashboardStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetStore();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('fetches the user and marks the request as successful', async () => {
    const pending = useDashboardStore.getState().fetchUser();

    expect(useDashboardStore.getState().isLoading).toBe(true);

    jest.runAllTimers();

    await expect(pending).resolves.toMatchObject({
      holderName: 'Hamam Nasrodin',
      balance: 12480.55,
    });
    expect(useDashboardStore.getState()).toMatchObject({
      accountSummary: { accountNumber: '0460059173' },
      isLoading: false,
      isSuccess: true,
      isError: false,
      errorMessage: null,
    });
  });

  it('fetches the promos', async () => {
    const pending = useDashboardStore.getState().fetchPromos();

    jest.runAllTimers();

    await expect(pending).resolves.toHaveLength(2);
    expect(useDashboardStore.getState().promos).toHaveLength(2);
  });

  it('records the error message when a request fails', async () => {
    jest
      .spyOn(MockUserRepository.prototype, 'getUser')
      .mockRejectedValueOnce(new Error('Network unavailable'));

    await expect(useDashboardStore.getState().fetchUser()).rejects.toThrow(
      'Network unavailable',
    );

    expect(useDashboardStore.getState()).toMatchObject({
      accountSummary: null,
      isLoading: false,
      isError: true,
      errorMessage: 'Network unavailable',
    });
  });

  it('toggles the balance visibility', () => {
    const { isBalanceHidden, toggleBalanceVisibility } =
      useDashboardStore.getState();

    toggleBalanceVisibility();

    expect(useDashboardStore.getState().isBalanceHidden).toBe(!isBalanceHidden);
  });
});
