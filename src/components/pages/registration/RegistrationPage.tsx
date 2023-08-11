import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
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
import { notifications } from '@mantine/notifications';
import { validation } from '../../../utils/helpers/validation';
import { TbX } from 'react-icons/tb';

type RegistrationPageProps = {
  onSignin: Dispatch<SetStateAction<boolean>>;
};

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const RegistrationPage = ({ onSignin }: RegistrationPageProps) => {
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
    },

    validate: {
      email: validation.email,
      password: validation.password,
      firstName: validation.firstName,
      lastName: validation.lastName,
      dateOfBirth: validation.dateOfBirth,
      shippingAddress: {
        country: validation.country,
        city: validation.city,
        streetName: validation.streetName,
        postalCode: validation.postalCode,
      },
      billingAddress: {
        country: validation.country,
        city: validation.city,
        streetName: validation.streetName,
        postalCode: validation.postalCode,
      },
    },
    validateInputOnBlur: true,
  });

  const setBillingAddress = (isChecked: boolean) => {
    if (isChecked) {
      form.setValues({
        billingAddress: {
          country: form.values.shippingAddress.country,
          city: form.values.shippingAddress.city,
          streetName: form.values.shippingAddress.streetName,
          postalCode: form.values.shippingAddress.postalCode,
        },
      });
    }
  };

  return (
    <Container sx={{ width: 450 }}>
      <Title order={1} align="center" mb={20} sx={{ fontWeight: 800 }}>
        Join 30 Fingers Store
      </Title>

      <form
        onSubmit={form.onSubmit((values) => {
          userService
            .signup(values)
            .then(() => {
              onSignin(true);
            })
            .catch((err: Error) =>
              notifications.show({
                icon: <TbX />,
                color: 'red',
                style: { backgroundColor: 'pink', padding: '25px' },
                message: err.message,
              }),
            );
        })}
      >
        <Paper withBorder shadow="md" p={30} radius="md">
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
          <Checkbox pt={7} label="Set as default billing address" {...form.getInputProps('setDefaultBillingAddress')} />
        </Paper>

        <Stack spacing={5} pt={15} align="center">
          <Button fullWidth type="submit">
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
