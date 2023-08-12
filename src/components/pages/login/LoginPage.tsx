import { Paper, Title, Text, Container, TextInput, PasswordInput, Button, Box } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Dispatch, SetStateAction } from 'react';
import { userService } from '../../../services/UserService/UserService';
import { notificationSuccessful, notificationError } from '../../ui/notification';
//import { validation } from '../../../utils/helpers/validation';

type LoginPageProps = {
  onSignIn: Dispatch<SetStateAction<boolean>>;
};

const LoginPage = ({ onSignIn }: LoginPageProps) => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value) ? null : 'Invalid password'),
    },
    validateInputOnChange: ['email', 'password'],
  });

  return (
    <Container size={420}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 800,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5} mb={10}>
        Do not have an account yet?
        <Link to="/registration" style={{ color: 'red' }}>
          Create account
        </Link>
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Box maw={320} mx="auto">
          <form
            onSubmit={form.onSubmit((userData) => {
              userService
                .login(userData)
                .then(() => {
                  onSignIn(true);
                  navigate('/');
                  notificationSuccessful('message');
                })
                .catch((err: Error) => notificationError(err.message));
            })}
          >
            <TextInput label="Email" placeholder="example@gmail.com" required {...form.getInputProps('email')} />
            <PasswordInput
              mt="md"
              label="Password"
              placeholder="Password"
              required
              {...form.getInputProps('password')}
            />
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
