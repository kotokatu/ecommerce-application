import { Paper, Text, Container, Flex, Button, TextInput, Modal, LoadingOverlay } from '@mantine/core';
import { storeService } from '../../../services/StoreService/StoreService';
import { UserProfile, FullAddressInfo } from '../../../utils/types/serviceTypes';
import { useState, useEffect } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { emailRegex, onlyLettersRegex } from '../../../utils/constants/validationRegex';
import { getAge } from '../../../utils/helpers/date-helpers';
import { notificationError, notificationSuccess } from '../../../components/ui/notification';
import { useDisclosure } from '@mantine/hooks';
import ProfileModal from './passwordWindow';
import ProfileAddress from './addressEditForm';
import { formStyles } from '../ProfilePage';

export const newAddress: FullAddressInfo = {
  country: '',
  city: '',
  streetName: '',
  postalCode: '',
  id: '',
  isDefault: false,
  name: '',
  key: 999,
};

const ProfileEdit = (props: { profile: UserProfile; updatePage: () => void }) => {
  const { profile, updatePage } = props;
  const { classes } = formStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [addresses, setAddresses] = useState([...profile.addresses]);
  const [userData, setUserData] = useState({ ...profile });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setUserData({ ...profile });
    setAddresses([...profile.addresses]);
  }, [profile]);

  const addNewAddress = () => {
    newAddress.key = Math.floor(Math.random() * 999999);
    setAddresses([...addresses, newAddress]);
  };

  const setUpdateState = (isNeedUpdate: boolean) => {
    setIsUpdating(isNeedUpdate);
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
        <Text className={classes.smallTitle} align="left" m={10}>
          Personal information
        </Text>
        <Flex gap="md" justify="center" align="center" direction="column">
          <Paper shadow="xs" withBorder style={{ width: '100%', padding: '1rem' }}>
            <form
              onSubmit={form.onSubmit(async (values) => {
                if (!opened) {
                  try {
                    setIsLoading(true);
                    await storeService.updateCurrentCustomer(values, userData.version);
                    notificationSuccess('Account was succesfully updated');
                  } catch (err) {
                    if (err instanceof Error) {
                      notificationError(err.message);
                    }
                  } finally {
                    updatePage();
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

              <Flex align="center" justify="space-between" direction="column">
                <Text color="dimmed" size="sm" pt={5} pl={12} align="center">
                  Do you want to update personal info?
                </Text>
                <Button type="submit" loading={isLoading} style={{ width: '180px' }}>
                  Save
                </Button>
              </Flex>

              <Modal opened={opened} onClose={close} centered title="Change a Password">
                <ProfileModal userVersion={userData.version} userEmail={userData.email} />
              </Modal>
            </form>
          </Paper>
        </Flex>
        <Flex align="center" m={20} direction="column">
          <Text color="black" size="sm" pt={5} align="center">
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
            <ProfileAddress
              address={address}
              key={i}
              version={userData.version}
              needUpdate={updatePage}
              updateState={setUpdateState}
            />
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
      </Paper>
      <LoadingOverlay
        className={classes.overlay}
        loaderProps={{ size: 'xl', color: 'black', variant: 'bars' }}
        overlayOpacity={0.4}
        overlayColor="black"
        visible={isUpdating}
      />
    </Container>
  );
};

export default ProfileEdit;
