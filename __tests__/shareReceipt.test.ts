import { Share } from 'react-native';

import shareReceipt from '../src/utils/ShareReceipt';
import showToast from '../src/utils/ShowToast';

jest.mock('../src/utils/ShowToast', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const showToastMock = showToast as jest.MockedFunction<typeof showToast>;

describe('shareReceipt', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    showToastMock.mockClear();
  });

  it('shares the receipt and confirms it to the user', async () => {
    const share = jest.spyOn(Share, 'share').mockResolvedValue({
      action: Share.sharedAction,
      activityType: undefined,
    });

    await shareReceipt('Receipt\nAmount: + RM 4,200.00');

    expect(share).toHaveBeenCalledWith({
      message: 'Receipt\nAmount: + RM 4,200.00',
    });
    expect(showToastMock).toHaveBeenCalledWith({
      message: 'Share successfully',
      type: 'success',
    });
  });

  it('reports a dismissed share sheet', async () => {
    jest.spyOn(Share, 'share').mockResolvedValue({
      action: Share.dismissedAction,
      activityType: undefined,
    });

    await shareReceipt('Receipt');

    expect(showToastMock).toHaveBeenCalledWith({
      message: 'Share dismissed',
      type: 'info',
    });
  });

  it('surfaces the failure when sharing throws', async () => {
    jest
      .spyOn(Share, 'share')
      .mockRejectedValue(new Error('Share sheet unavailable'));

    await shareReceipt('Receipt');

    expect(showToastMock).toHaveBeenCalledWith({
      message: 'Share sheet unavailable',
      type: 'error',
    });
  });

  it('falls back to a generic message for a non-error rejection', async () => {
    jest.spyOn(Share, 'share').mockRejectedValue('nope');

    await shareReceipt('Receipt');

    expect(showToastMock).toHaveBeenCalledWith({
      message: 'Something went wrong',
      type: 'error',
    });
  });
});
