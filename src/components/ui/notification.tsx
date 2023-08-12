import { notifications } from '@mantine/notifications';
import { TbX } from 'react-icons/tb';
import { FcApproval } from 'react-icons/fc';

export const notificationSuccess = (message: string) => {
  notifications.show({
    icon: <FcApproval />,
    withCloseButton: false,
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
