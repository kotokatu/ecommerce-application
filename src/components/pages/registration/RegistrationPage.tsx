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

const RegistrationPage = ({ onSignIn }: RegistrationPageProps) => {
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
          : 'Minimum 8 characters, at least 1 uppercase Latin letter, 1 lowercase Latin letter, and 1 number',
      firstName: (value) =>
        onlyLettersRegex.test(value) ? null : 'First name should only contain Latin letters and cannot be empty',
      lastName: (value) =>
        onlyLettersRegex.test(value) ? null : 'Last name should only contain Latin letters and cannot be empty',
      dateOfBirth: (value) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal to 13' : null),
      shippingAddress: {
        country: (value) => (value ? null : 'Please choose a country'),
        city: (value) => (onlyLettersRegex.test(value) ? null : 'City should only contain Latin letters'),
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
            : 'City should only contain Latin letters',
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
    <Container sx={{ width: 450 }}>
      <Title order={1} align="center" mb={20} sx={{ fontWeight: 800 }}>
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
        <Paper withBorder shadow="md" p={30} radius="md">
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="First Name"
            data-testid="first-name"
            {...form.getInputProps('firstName')}
          />

          <TextInput
            pt={10}
            withAsterisk
            label="Last Name"
            placeholder="Last Name"
            data-testid="last-name"
            {...form.getInputProps('lastName')}
          />
          <TextInput
            pt={10}
            withAsterisk
            autoComplete="email"
            label="Email"
            placeholder="your@email.com"
            data-testid="email"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            pt={10}
            withAsterisk
            autoComplete="current-password"
            label="Password"
            placeholder="Password"
            data-testid="password"
            {...form.getInputProps('password')}
          />
          <DatePickerInput
            withAsterisk
            pt={10}
            valueFormat="DD.MM.YYYY"
            label="Date of Birth"
            placeholder="__.__.____"
            data-testid="date"
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
            data-testid="shipping-country"
            {...form.getInputProps('shippingAddress.country')}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="City"
            placeholder="City"
            data-testid="shipping-city"
            {...form.getInputProps('shippingAddress.city')}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="Address"
            placeholder="Address"
            data-testid="shipping-address"
            {...form.getInputProps('shippingAddress.streetName')}
          />
          <TextInput
            withAsterisk
            pt={10}
            label="Postal Code"
            placeholder="Postal Code"
            data-testid="shipping-postal-code"
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
            data-testid="billing-country"
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
            data-testid="billing-city"
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
            data-testid="billing-address"
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
            data-testid="billing-postal-code"
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
