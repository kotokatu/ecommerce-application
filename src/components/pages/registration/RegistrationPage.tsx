import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/UserService/UserService';
import { TextInput, Checkbox, Button, PasswordInput, Text, Select, Container, Title, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { getAge } from '../../../utils/helpers/getAge';

type RegistrationPageProps = {
  onSignup: Dispatch<SetStateAction<boolean>>;
};

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
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 2 ? 'Password is too short' : null),
      firstName: (value) => (value.length < 2 ? 'First name is too short' : null),
      lastName: (value) => (value.length < 2 ? 'Last name is too short' : null),
      dateOfBirth: (value) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal 13' : null),
    },
  });

  const countryData = [
    { value: 'IT', label: 'Italy' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
  ];

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   userService
  //     .signup(email, password)
  //     .then(() => {
  //       onSignup(true);
  //     })
  //     .catch((err: Error) => console.log(err.message));
  // };

  const setBillingAddress = (isChecked: boolean) => {
    if (isChecked) {
      form.setFieldValue('billingAddress.country', form.values.shippingAddress.country);
      form.setFieldValue('billingAddress.city', form.values.shippingAddress.city);
      form.setFieldValue('billingAddress.streetName', form.values.shippingAddress.streetName);
      form.setFieldValue('billingAddress.postalCode', form.values.shippingAddress.postalCode);
    } else {
      form.setFieldValue('billingAddress.country', '');
      form.setFieldValue('billingAddress.city', '');
      form.setFieldValue('billingAddress.streetName', '');
      form.setFieldValue('billingAddress.postalCode', '');
    }
  };

  return (
    <Container size={400}>
      <Title order={3}>Welcome to 30 Fingers Store</Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

        <Checkbox pt={7} label="Set as default shipping address" />

        <Text size={18} pt={20}>
          Billing Address
        </Text>

        <Checkbox
          pt={7}
          label="Same as shipping"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillingAddress(e.target.checked)}
        />

        <Select
          withAsterisk
          label="Country"
          data={countryData}
          placeholder="Choose country"
          {...form.getInputProps('billingAddress.country')}
        />

        <TextInput
          withAsterisk
          pt={10}
          label="City"
          placeholder="City"
          {...form.getInputProps('billingAddress.city')}
        />

        <TextInput
          withAsterisk
          pt={10}
          label="Address"
          placeholder="Address"
          {...form.getInputProps('billingAddress.streetName')}
        />

        <TextInput
          withAsterisk
          pt={10}
          label="Postal Code"
          placeholder="Postal Code"
          {...form.getInputProps('billingAddress.postalCode')}
        />

        <Checkbox pt={7} label="Set as default billing address" />

        <Stack pt={15} align="center">
          <Button fullWidth type="submit">
            Sign up
          </Button>
          <Button variant="outline" fullWidth component={Link} to="/login">
            To Login
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default RegistrationPage;
