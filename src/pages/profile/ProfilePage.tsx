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
    [theme.fn.smallerThan('sm')]: {
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
  avatarContainer: {
    margin: 'auto',
    height: '100%',
    marginTop: '20px',
    [theme.fn.smallerThan('md')]: {
      marginTop: '10px',
      height: 'auto',
    },
  },
}));

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = formStyles();

  useEffect(() => {
    const profile = async () => {
      const userData = (await storeService.getUserProfile()) as UserProfile;
      setProfile(userData);
    };
    profile();
  }, [isUpdated]);
  //state isLoading, setIsLoading не работает, надо править (нужен, для блокировки кнопок)
  const isNeedToUpdate = () => {
    setIsLoading(true);
    setIsUpdated(!isUpdated);
    setIsLoading(false);
  };

  if (isEditMode === false) {
    return (
      <Container className={classes.container}>
        <Title className={classes.title} order={1} align="center" mb={20}>
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
    );
  }

  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        Your Profile
      </Title>
      <ProfileEdit profile={profile} updatePage={isNeedToUpdate} disableBtn={isLoading} />
      <Flex align="center" justify="center" mt={15}>
        <Button style={{ width: '180px' }} mt={5} onClick={() => setIsEditMode(false)} component={Link} to="/profile">
          Go to profile
        </Button>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
