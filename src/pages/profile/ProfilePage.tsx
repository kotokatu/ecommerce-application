import { createStyles, Container, Title, Button, Text, Flex } from '@mantine/core';
import { storeService } from '../../services/StoreService/StoreService';
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

export const formStyles = createStyles((theme) => ({
  container: {
    width: '80%',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      padding: '0',
      border: 'none',
    },
  },
  containerEditMode: {
    width: '80%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
      padding: '0',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      padding: '0',
      border: 'none',
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
      border: 'none',
    },
  },
  smallTitle: {
    fontWeight: 400,
    fontSize: '16px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '14px',
    },
  },
  text: {
    fontWeight: 400,
    fontSize: '15px',
    [theme.fn.smallerThan('xs')]: {
      fontSize: '12px',
    },
  },
  avatarContainer: {
    margin: 'auto',
    height: '100%',
    marginTop: '20px',
    [theme.fn.smallerThan('md')]: {
      marginTop: '10px',
      height: 'auto',
    },
  },
  overlay: {
    height: '100%',
    width: '100%',
    position: 'fixed',
  },
}));

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { classes } = formStyles();

  useEffect(() => {
    const profile = async () => {
      const userData = (await storeService.getUserProfile()) as UserProfile;
      setProfile(userData);
    };
    profile();
  }, [isUpdated]);

  const isNeedToUpdate = () => {
    setIsUpdated(!isUpdated);
  };

  return !isEditMode ? (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" m={10}>
        Your Profile
      </Title>
      <Profile {...profile} />
      <Text color="dimmed" size="sm" align="center" pt={5}>
        Do you want to edit Profile?
      </Text>
      <Flex align="center" justify="center">
        <Button style={{ width: '180px', marginTop: '10px' }} onClick={() => setIsEditMode(true)}>
          Edit
        </Button>
      </Flex>
    </Container>
  ) : (
    <Container className={classes.containerEditMode}>
      <Title className={classes.title} order={1} align="center" m={10}>
        Your Profile
      </Title>
      <ProfileEdit profile={profile} updatePage={isNeedToUpdate} />
      <Flex align="center" justify="center" mt={15}>
        <Button style={{ width: '180px' }} mt={5} onClick={() => setIsEditMode(false)} component={Link} to="/profile">
          Go to profile
        </Button>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
