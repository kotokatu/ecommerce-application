import { Paper, Text, createStyles, Checkbox, TextInput, Select, Button, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Address } from '../../../services/UserService/UserService';
import { onlyLettersRegex, postalCodeRegex } from '../../../utils/constants/validationRegex';
import { userService } from '../../../services/UserService/UserService';
import { UserAddress } from '../../../utils/types/serviceTypes';
import { newAddress } from './ProfileEditMode';

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
    marginTop: '10px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '14px',
    },
  },
}));

const countryData = [
  { value: 'IT', label: 'Italy' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
];

type Props = {
  key: number;
  address: UserAddress;
  remove: (address: UserAddress) => void;
};

const ProfileAddress = (props: Props) => {
  //const [isLoading, setIsLoading] = useState(false);
  const { classes } = formStyles();
  const address: UserAddress = props.address;

  const [checked, setChecked] = useState(props.address.isDefault);

  const addressform = useForm({
    initialValues: {
      country: address.country,
      city: address.city,
      streetName: address.streetName,
      postalCode: address.postalCode,
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
      <form
        onSubmit={addressform.onSubmit(async (values) => {
          console.log('save');
        })}
      >
        <Text className={classes.smallTitle} align="center">
          {props.address.name} Address
        </Text>
        <Text className={classes.smallTitle} color="red" align="right">
          {props.address.isDefault ? '* Used as default' : 'Not default'}
        </Text>
        <Select
          withAsterisk
          label="Country"
          data={countryData}
          placeholder="Choose country"
          {...addressform.getInputProps('country')}
        />
        <TextInput withAsterisk pt={10} label="City" placeholder="City" {...addressform.getInputProps('city')} />
        <TextInput
          withAsterisk
          pt={10}
          label="Address"
          placeholder="Address"
          {...addressform.getInputProps('streetName')}
        />
        <TextInput
          withAsterisk
          pt={10}
          label="Postal Code"
          placeholder="Postal Code"
          {...addressform.getInputProps('postalCode')}
        />
        <Checkbox
          m={10}
          label="Set as default address"
          {...addressform.getInputProps('setDefault')}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <Flex align="center" justify="space-around" m={20}>
          <Button type="submit" style={{ width: '100px' }} color="green">
            Save
          </Button>
          <Button type="button" style={{ width: '100px' }} color="red" onClick={() => props.remove(address)}>
            Remove address
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
export default ProfileAddress;
