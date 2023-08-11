import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/UserService/UserService';
import { TextInput, Checkbox, Button, PasswordInput, Text, Select, Container, Title, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { getAge } from '../../../utils/helpers/dateHelpers';

type RegistrationPageProps = {
  onSignup: Dispatch<SetStateAction<boolean>>;
};

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const RegistrationPage = ({ onSignup }: RegistrationPageProps) => {
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
      copyShippingAddressToBilling: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
          ? null
          : 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      firstName: (value) => (value.length < 2 ? 'First name is too short' : null),
      lastName: (value) => (value.length < 2 ? 'Last name is too short' : null),
      dateOfBirth: (value) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal 13' : null),
    },
  });

  return (
    <Container sx={{ width: '400px' }}>
      <Title order={3}>Welcome to 30 Fingers Store</Title>

      <form
        onSubmit={form.onSubmit((values) =>
          userService
            .signup(values)
            .then(() => {
              onSignup(true);
            })
            .catch((err: Error) => console.log(err.message)),
        )}
      >
        <TextInput
          pt={10}
          withAsterisk
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps('firstName')}
        />

        <TextInput pt={10} withAsterisk label="Last Name" placeholder="Last Name" {...form.getInputProps('lastName')} />

        <TextInput
          pt={10}
          withAsterisk
          autoComplete="email"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          autoComplete="current-password"
          pt={10}
          withAsterisk
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

        <Text size={18} pt={20}>
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

        <Checkbox pt={7} label="Set as default shipping address" {...form.getInputProps('setDefaultShippingAddress')} />

        <Text size={18} pt={20}>
          Billing Address
        </Text>

        <Checkbox pt={7} label="Same as shipping" {...form.getInputProps('copyShippingAddressToBilling')} />

        <Select
          disabled={form.values.copyShippingAddressToBilling}
          withAsterisk
          label="Country"
          data={countryData}
          placeholder="Choose country"
          {...(form.values.copyShippingAddressToBilling
            ? { ...form.getInputProps('shippingAddress.country') }
            : { ...form.getInputProps('billingAddress.country') })}
        />

        <TextInput
          disabled={form.values.copyShippingAddressToBilling}
          withAsterisk
          pt={10}
          label="City"
          placeholder="City"
          {...(form.values.copyShippingAddressToBilling
            ? { ...form.getInputProps('shippingAddress.city') }
            : { ...form.getInputProps('billingAddress.city') })}
        />

        <TextInput
          disabled={form.values.copyShippingAddressToBilling}
          withAsterisk
          pt={10}
          label="Address"
          placeholder="Address"
          {...(form.values.copyShippingAddressToBilling
            ? { ...form.getInputProps('shippingAddress.streetName') }
            : { ...form.getInputProps('billingAddress.streetName') })}
        />

        <TextInput
          disabled={form.values.copyShippingAddressToBilling}
          withAsterisk
          pt={10}
          label="Postal Code"
          placeholder="Postal Code"
          {...(form.values.copyShippingAddressToBilling
            ? { ...form.getInputProps('shippingAddress.postalCode') }
            : { ...form.getInputProps('billingAddress.postalCode') })}
        />

        <Checkbox pt={7} label="Set as default billing address" {...form.getInputProps('setDefaultBillingAddress')} />

        <Stack pt={15} align="center">
          <Button fullWidth type="submit">
            Sign up
          </Button>
          <Button variant="outline" fullWidth component={Link} to="/login">
            Sign in
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default RegistrationPage;
