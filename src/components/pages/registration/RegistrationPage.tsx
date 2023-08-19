import { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../../services/UserService/UserService';
import {
  TextInput,
  Checkbox,
  Button,
  PasswordInput,
  Text,
  Select,
  Container,
  Title,
  Stack,
  Paper,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { createStyles } from '@mantine/core';
import { emailRegex, passwordRegex, onlyLettersRegex, postalCodeRegex } from '../../../utils/constants/validationRegex';
import { notificationError, notificationSuccess } from '../../ui/notification';
import { getAge } from '../../../utils/helpers/date-helpers';

type RegistrationPageProps = {
  onSignIn: Dispatch<SetStateAction<boolean>>;
};

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const useStyles = createStyles((theme) => ({
  container: {
    width: '450px',
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

const RegistrationPage = ({ onSignIn }: RegistrationPageProps) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      shippingAddress: {
        country: '',
        city: '',
        streetName: '',
        postalCode: '',
      },
      billingAddress: {
        country: '',
        city: '',
        streetName: '',
        postalCode: '',
      },
      setDefaultShippingAddress: false,
      setDefaultBillingAddress: false,
      copyShippingToBilling: false,
    },

    validate: {
      email: (value) => (emailRegex.test(value) ? null : 'Should be a valid email'),
      password: (value) =>
        passwordRegex.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only Latin letters are allowed.',
      firstName: (value) =>
        onlyLettersRegex.test(value) ? null : 'First name should only contain letters and cannot be empty',
      lastName: (value) =>
        onlyLettersRegex.test(value) ? null : 'Last name should only contain letters and cannot be empty',
      dateOfBirth: (value) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal to 13' : null),
      shippingAddress: {
        country: (value) => (value ? null : 'Please choose a country'),
        city: (value) => (onlyLettersRegex.test(value) ? null : 'City should only contain letters and cannot be empty'),
        streetName: (value) => (value.trim() ? null : 'Address cannot be empty'),
        postalCode: (value) => (postalCodeRegex.test(value) ? null : 'Should be a valid postal code (5 digits)'),
      },
      billingAddress: {
        country: (value, values) => (values.copyShippingToBilling ? null : value ? null : 'Please choose a country'),
        city: (value, values) =>
          values.copyShippingToBilling
            ? null
            : onlyLettersRegex.test(value)
            ? null
            : 'City should only contain letters and cannot be empty',
        streetName: (value, values) =>
          values.copyShippingToBilling ? null : value.trim() ? null : 'Address cannot be empty',
        postalCode: (value, values) =>
          values.copyShippingToBilling
            ? null
            : postalCodeRegex.test(value)
            ? null
            : 'Should be a valid postal code (5 digits)',
      },
    },
    validateInputOnChange: true,
  });

  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        Join 30 Fingers Store
      </Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setIsLoading(true);
          try {
            await userService.signup(values);
            onSignIn(true);
            notificationSuccess('Account was succesfully created');
            navigate('/', { replace: true });
          } catch (err) {
            if (err instanceof Error) notificationError(err.message);
          } finally {
            setIsLoading(false);
          }
        })}
      >
        <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
          <TextInput withAsterisk label="First Name" placeholder="First Name" {...form.getInputProps('firstName')} />

          <TextInput
            pt={10}
            withAsterisk
            label="Last Name"
            placeholder="Last Name"
            {...form.getInputProps('lastName')}
          />
          <TextInput
            pt={10}
            withAsterisk
            autoComplete="email"
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            pt={10}
            withAsterisk
            autoComplete="current-password"
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />
          <DatePickerInput
            withAsterisk
            pt={10}
            valueFormat="DD.MM.YYYY"
            label="Date of Birth"
            placeholder="__.__.____"
            {...form.getInputProps('dateOfBirth')}
          />
          <Text size={18} mt={20}>
            Shipping Address
          </Text>
          <Select
            withAsterisk
            label="Country"
            data={countryData}
            placeholder="Choose country"
            {...form.getInputProps('shippingAddress.country')}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="City"
            placeholder="City"
            {...form.getInputProps('shippingAddress.city')}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="Address"
            placeholder="Address"
            {...form.getInputProps('shippingAddress.streetName')}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="Postal Code"
            placeholder="Postal Code"
            {...form.getInputProps('shippingAddress.postalCode')}
          />
          <Checkbox
            pt={7}
            label="Set as default shipping address"
            {...form.getInputProps('setDefaultShippingAddress')}
          />
          <Text size={18} mt={20}>
            Billing Address
          </Text>
          <Checkbox pt={7} label="Same as shipping" {...form.getInputProps('copyShippingToBilling')} />
          <Select
            withAsterisk
            label="Country"
            data={countryData}
            placeholder="Choose country"
            disabled={form.values.copyShippingToBilling}
            {...(form.values.copyShippingToBilling
              ? { ...form.getInputProps('shippingAddress.country') }
              : { ...form.getInputProps('billingAddress.country') })}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="City"
            placeholder="City"
            disabled={form.values.copyShippingToBilling}
            {...(form.values.copyShippingToBilling
              ? { ...form.getInputProps('shippingAddress.city') }
              : { ...form.getInputProps('billingAddress.city') })}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="Address"
            placeholder="Address"
            disabled={form.values.copyShippingToBilling}
            {...(form.values.copyShippingToBilling
              ? { ...form.getInputProps('shippingAddress.streetName') }
              : { ...form.getInputProps('billingAddress.streetName') })}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="Postal Code"
            placeholder="Postal Code"
            disabled={form.values.copyShippingToBilling}
            {...(form.values.copyShippingToBilling
              ? { ...form.getInputProps('shippingAddress.postalCode') }
              : { ...form.getInputProps('billingAddress.postalCode') })}
          />
          <Checkbox pt={7} label="Set as default billing address" {...form.getInputProps('setDefaultBillingAddress')} />
        </Paper>

        <Stack spacing={5} pt={15} align="center">
          <Button fullWidth type="submit" loading={isLoading}>
            Sign up
          </Button>
          <Text color="dimmed" size="sm" align="center" pt={5}>
            Already have an account?
          </Text>
          <Button variant="outline" fullWidth component={Link} to="/login">
            Sign in
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default RegistrationPage;
