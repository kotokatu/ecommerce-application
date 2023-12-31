import {
  Paper,
  Title,
  Text,
  Container,
  TextInput,
  PasswordInput,
  Button,
  Box,
  createStyles,
  Center,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { storeService } from '../../services/StoreService/StoreService';
import { notificationSuccess, notificationError } from '../../components/ui/notification';
import { successfullLoginMessage } from './../../utils/constants/messages';
import { emailRegex, passwordRegex } from '../../utils/constants/validationRegex';
import useAuth from '../../utils/hooks/useAuth';

const formStyles = createStyles((theme) => ({
  container: {
    width: '450px',
    [theme.fn.smallerThan('xs')]: {
      width: '300px',
    },
  },
  title: {
    fontWeight: 800,
    fontSize: '30px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '20px',
    },
  },
  formWrapper: {
    padding: '1.5rem',
    [theme.fn.smallerThan('xs')]: {
      padding: '1rem',
    },
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const { classes } = formStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLoggedIn } = useAuth();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (emailRegex.test(value) ? null : 'Invalid email'),
      password: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase Latin letter, 1 lowercase Latin letter, and 1 number',
    },
    validateInputOnChange: ['email', 'password'],
  });

  return (
    <Center h="100%">
      <Container className={classes.container}>
        <Title className={classes.title} order={1} align="center" mb={20}>
          Welcome back!
        </Title>
        <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
          <Box maw={320} mx="auto">
            <form
              onSubmit={form.onSubmit(async (userData) => {
                setIsLoading(true);
                await storeService
                  .loginUser(userData.email, userData.password)
                  .then(() => {
                    setUserLoggedIn(true);
                    navigate('/');
                    notificationSuccess(successfullLoginMessage);
                  })
                  .catch((err: Error) => notificationError(err.message));
                setIsLoading(false);
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
              <Button type="submit" fullWidth mt="xl" loading={isLoading}>
                Sign in
              </Button>
              <Text color="dimmed" size="sm" align="center" pt={5}>
                Do not have an account yet?
              </Text>
              <Button variant="outline" fullWidth mt={5} component={Link} to="/registration">
                Sign up
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Center>
  );
};

export default LoginPage;
