import { createStyles, Container, Title, Button, Text, Flex } from '@mantine/core';
import { userService } from '../../services/UserService/UserService';
import { UserProfile } from '../../utils/types/serviceTypes';
import { useEffect, useState } from 'react';
import ProfileEdit from './profileModes/ProfileEditMode';
import Profile from './profileModes/ProfileDataMode';
import { Link } from 'react-router-dom';

export const defaultData: UserProfile = {
  version: 0,
  email: 'Loading...',
  password: 'Loading...',
  firstName: 'Loading...',
  lastName: 'Loading...',
  dateOfBirth: 'Loading...',
  addresses: [],
  shippingAddress: [],
  billingAddress: [],
};

const formStyles = createStyles((theme) => ({
  container: {
    width: '80%',
    [theme.fn.smallerThan('xs')]: {
      width: '95%',
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
  smallTitle: {
    fontWeight: 400,
    fontSize: '16px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '10px',
    },
  },
  text: {
    fontWeight: 400,
    fontSize: '15px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '9px',
    },
  },
}));

const ProfilePage = () => {
  const [userData, setProfile] = useState<UserProfile>(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { classes } = formStyles();

  useEffect(() => {
    const profile = async () => {
      const userData = (await userService.getProfile()) as UserProfile;
      setProfile(userData);
    };
    profile();
  }, [isUpdated]);

  const isNeedToUpdate = () => {
    setIsUpdated(!isUpdated);
  };

  if (isEditMode === false) {
    return (
      <Container className={classes.container}>
        <Title className={classes.title} order={1} align="center" mb={20}>
          Your Profile
        </Title>
        <Profile {...userData} />
        <Text color="dimmed" size="sm" align="center" pt={5}>
          Do you want to edit Profile?
        </Text>
        <Flex align="center" justify="center">
          <Button style={{ width: '180px', marginTop: '10px' }} onClick={() => setIsEditMode(true)}>
            Edit
          </Button>
        </Flex>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        Your Profile
      </Title>
      <ProfileEdit userData={userData} updatePage={isNeedToUpdate} />
      <Flex align="center" justify="center" mt={15}>
        <Button style={{ width: '180px' }} mt={5} onClick={() => setIsEditMode(false)} component={Link} to="/profile">
          Go to profile
        </Button>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
