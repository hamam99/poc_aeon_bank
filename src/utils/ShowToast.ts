import Toast, { ToastType } from 'react-native-toast-message';

type Props = {
  message: string;
  type?: ToastType;
};
const showToast = ({ message, type = 'info' }: Props) => {
  Toast.show({
    type: type,
    text1: message,
  });
};

export default showToast;
