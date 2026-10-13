import { Share } from 'react-native';
import showToast from './ShowToast';
import { getErrorMessage } from '../store/requestState';

const shareReceipt = async (content: string) => {
  try {
    const result = await Share.share({
      message: content,
    });

    if (result.action === Share.dismissedAction) {
      showToast({
        message: 'Share dismissed',
        type: 'info',
      });
      return;
    }

    showToast({
      message: 'Share successfully',
      type: 'success',
    });
  } catch (error) {
    const errorMessage =
      getErrorMessage(error) || 'Failed to share. Please try again.';
    showToast({
      message: errorMessage,
      type: 'error',
    });
  }
};

export default shareReceipt;
