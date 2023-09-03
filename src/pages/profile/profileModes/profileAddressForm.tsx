import { Paper, Text, createStyles, Checkbox, Container, Flex, Button, TextInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Address } from '../../../services/UserService/UserService';
import { onlyLettersRegex, postalCodeRegex } from '../../../utils/constants/validationRegex';

const formStyles = createStyles((theme) => ({
  container: {
    width: '100%',
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
  smallTitle: {
    fontWeight: 400,
    fontSize: '16px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '10px',
    },
  },
}));

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

const ProfileAddress = (props: { addressData: Address; userEmail: string; isDefault: boolean }) => {
  //const [isLoading, setIsLoading] = useState(false);
  const { classes } = formStyles();
  const address: Address = props.addressData;

  const form = useForm({
    initialValues: {
      country: address.country || 'No data',
      city: address.city || 'No data',
      streetName: address.streetName || 'No data',
      postalCode: address.postalCode || 'No data',
      isDefault: props.isDefault,
    },

    validate: {
      country: (value) => (value ? null : 'Please choose a country'),
      city: (value) => (onlyLettersRegex.test(value) ? null : 'City should only contain letters and cannot be empty'),
      streetName: (value) => (value.trim() ? null : 'Address cannot be empty'),
      postalCode: (value) => (postalCodeRegex.test(value) ? null : 'Should be a valid postal code (5 digits)'),
    },
    validateInputOnChange: true,
  });

  return (
    <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
      <Text className={classes.smallTitle} align="center">
        Billing Address
      </Text>
      <Select
        withAsterisk
        label="Country"
        data={countryData}
        placeholder="Choose country"
        {...form.getInputProps('billingAddress.country')}
      />
      <TextInput withAsterisk pt={10} label="City" placeholder="City" {...form.getInputProps('billingAddress.city')} />
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
      <Checkbox m={10} label="Set as default billing address" {...form.getInputProps('setDefaultBillingAddress')} />
    </Paper>
  );
};
export default ProfileAddress;
