import { Container, Button, PasswordInput } from '@mantine/core';
import { userService } from '../../../services/UserService/UserService';
import { UserProfile } from '../../../utils/types/serviceTypes';
import { useForm } from '@mantine/form';
//import { getAge } from '../../../utils/helpers/date-helpers';
import { notificationError, notificationSuccess } from '../../../components/ui/notification';
import { passwordRegex } from '../../../utils/constants/validationRegex';
import { useState } from 'react';

const ProfileModal = (userData: UserProfile) => {
  const [isLoading, setIsLoading] = useState(false);

  const passwordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
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
    },
    validateInputOnChange: true,
  });

  return (
    <Container>
      <form
        onSubmit={passwordForm.onSubmit(async (values) => {
          setIsLoading(true);
          try {
            await userService.changePassword({ version: userData.version, ...values }, userData.email);
            notificationSuccess('Account was succesfully updated');
          } catch (err) {
            if (err instanceof Error) notificationError(err.message);
          }
          setIsLoading(false);
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
        <Button type="submit" loading={isLoading} fullWidth mt={20}>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};
export default ProfileModal;
