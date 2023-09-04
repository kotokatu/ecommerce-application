import { Container, Button, PasswordInput } from '@mantine/core';
import { userService } from '../../../services/UserService/UserService';
import { useForm } from '@mantine/form';
import { notificationError, notificationSuccess } from '../../../components/ui/notification';
import { passwordRegex } from '../../../utils/constants/validationRegex';
import { useState } from 'react';

const ProfileModal = (props: { userVersion: number; userEmail: string }) => {
  const version = props.userVersion;
  const [isLoading, setIsLoading] = useState(false);

  const passwordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validate: {
      currentPassword: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
      newPassword: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
      repeatNewPassword: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
    },
    validateInputOnChange: true,
  });

  return (
    <Container>
      <form
        onSubmit={passwordForm.onSubmit(async (values) => {
          if (values.repeatNewPassword === values.newPassword) {
            setIsLoading(true);
            try {
              await userService.changePassword({ version, ...values }, props.userEmail);
              notificationSuccess('Account was succesfully updated');
              window.location.reload();
            } catch (err) {
              if (err instanceof Error) notificationError(err.message);
            }
            setIsLoading(false);
          } else {
            notificationError('You must repeat your password correctly');
          }
        })}
      >
        <PasswordInput
          pt={10}
          withAsterisk
          autoComplete="current-password"
          label="Password"
          placeholder="Password"
          {...passwordForm.getInputProps('currentPassword')}
        />
        <PasswordInput
          pt={10}
          withAsterisk
          autoComplete="new-password"
          label="New Password"
          placeholder="New Password"
          {...passwordForm.getInputProps('newPassword')}
        />
        <PasswordInput
          pt={10}
          withAsterisk
          autoComplete="new-password"
          label="Repeat new Password"
          placeholder="New Password"
          {...passwordForm.getInputProps('repeatNewPassword')}
        />
        <Button type="submit" loading={isLoading} fullWidth mt={20}>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};
export default ProfileModal;
