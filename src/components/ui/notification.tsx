import { notifications } from '@mantine/notifications';
import { TbX } from 'react-icons/tb';
import { FcApproval } from 'react-icons/fc';
import { FaExclamation } from 'react-icons/fa';

export const notificationSuccess = (message: string) => {
  notifications.show({
    icon: <FcApproval />,
    color: 'green',
    style: { padding: '25px' },
    message,
    autoClose: 2000,
  });
};

export const notificationError = (message: string) => {
  notifications.show({
    icon: <TbX />,
    color: 'red',
    style: { backgroundColor: 'pink', padding: '25px' },
    message,
  });
};
export const notificationWarning = (message: string) => {
  notifications.show({
    icon: <FaExclamation />,
    color: 'yellow',
    style: { padding: '25px' },
    message,
  });
};
