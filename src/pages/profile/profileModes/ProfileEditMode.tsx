import { Paper, Text, createStyles, Container, Flex, Button, TextInput, Modal } from '@mantine/core';
import { userService } from '../../../services/UserService/UserService';
import { UserProfile, UserAddress } from '../../../utils/types/serviceTypes';
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { emailRegex, onlyLettersRegex } from '../../../utils/constants/validationRegex';
import { getAge } from '../../../utils/helpers/date-helpers';
import { notificationError, notificationSuccess } from '../../../components/ui/notification';
import { useDisclosure } from '@mantine/hooks';
import ProfileModal from './profileModalWindow';
import ProfileAddress from './profileAddressForm';

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
      fontSize: '14px',
    },
  },
}));

export const newAddress: UserAddress = {
  country: '',
  city: '',
  streetName: '',
  postalCode: '',
  id: '',
  isDefault: false,
  name: '',
  key: 2,
};

const ProfileEdit = (userData: UserProfile) => {
  const { classes } = formStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const shippingAddress = userData.shippingAddress as UserAddress;
  const billingAddress = userData.billingAddress as UserAddress;

  const [shipAddress, setShipAddress] = useState([shippingAddress]);
  const [addresses, setAddresses] = useState([shippingAddress, billingAddress]);

  const addNewAddress = () => {
    console.log(99999999, newAddress.key);
    newAddress.key = Math.floor(Math.random() * 999999);
    setAddresses([...addresses, newAddress]);
  };

  const removeAddress = (address: UserAddress) => {
    console.log(addresses, address);
    setAddresses(addresses.filter((a) => a.key !== address.key));
  };

  const form = useForm({
    initialValues: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: new Date(userData.dateOfBirth),
    },

    validate: {
      email: (value) => (emailRegex.test(value) ? null : 'Should be a valid email'),
      firstName: (value) =>
        onlyLettersRegex.test(value) ? null : 'First name should only contain letters and cannot be empty',
      lastName: (value) =>
        onlyLettersRegex.test(value) ? null : 'Last name should only contain letters and cannot be empty',
      dateOfBirth: (value) => (!value || getAge(value) < 13 ? 'Age must be greater than or equal to 13' : null),
    },
    validateInputOnChange: true,
  });

  return (
    <Container className={classes.container}>
      <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
        <Text className={classes.smallTitle} align="left" m={20}>
          Personal information
        </Text>
        <Flex gap="md" justify="center" align="center" direction="column">
          <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
            <form
              onSubmit={form.onSubmit(async (values) => {
                if (!opened) {
                  setIsLoading(true);
                  try {
                    await userService.updateCurrentCustomer(values, userData.version);
                    notificationSuccess('Account was succesfully updated');
                  } catch (err) {
                    if (err instanceof Error) notificationError(err.message);
                  } finally {
                    setIsLoading(false);
                  }
                }
              })}
            >
              <TextInput
                className={classes.smallTitle}
                placeholder={userData?.firstName}
                label="First Name"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                className={classes.smallTitle}
                label="Last Name"
                placeholder={userData?.lastName}
                {...form.getInputProps('lastName')}
              />
              <DatePickerInput
                valueFormat="YYYY MMM DD"
                label="Date of birth"
                placeholder={userData.dateOfBirth}
                {...form.getInputProps('dateOfBirth')}
              />
              <TextInput
                className={classes.smallTitle}
                placeholder={userData?.email}
                mb={10}
                label="Email"
                {...form.getInputProps('email')}
              />

              <Flex align="center" mb={20} justify="space-between">
                <Text color="dimmed" size="sm" pt={5}>
                  Do you want to update personal info?
                </Text>
                <Button type="submit" loading={isLoading} style={{ width: '180px' }}>
                  Save
                </Button>
              </Flex>

              <Modal opened={opened} onClose={close} title="Change a Password" centered>
                <ProfileModal userVersion={userData.version} userEmail={userData.email} />
              </Modal>
            </form>
          </Paper>
        </Flex>
        <Flex align="center" m={20} direction="column">
          <Text color="black" size="sm" pt={5}>
            Do you want to change password?
          </Text>
          <Button onClick={open} color="red" style={{ width: '180px' }}>
            Change password
          </Button>
        </Flex>
        <Text className={classes.smallTitle} m={20} align="left">
          Addresses
        </Text>

        <Flex gap="sm" justify="center" align="start" direction="column" style={{ width: '100%' }} mb={15}>
          {addresses.map((address, i) => (
            <ProfileAddress address={address} key={i} remove={removeAddress} />
          ))}
        </Flex>

        <Flex align="center" justify="center" gap="sm" style={{ paddingLeft: '24px' }}>
          <Text className={classes.smallTitle} align="center">
            Add new address
          </Text>
          <Button color="green" size="xs" onClick={addNewAddress}>
            +
          </Button>
        </Flex>
        {/* <Flex align="center" justify="center" style={{ padding: '0 24px 0 24px' }}>
<Button type="submit" loading={isLoading} style={{ width: '180px', marginTop: '10px' }}>
  Save Changes
</Button>
</Flex> */}
      </Paper>
    </Container>
  );
};

export default ProfileEdit;
