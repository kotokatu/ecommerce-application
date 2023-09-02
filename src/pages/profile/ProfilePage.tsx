import { createStyles, Container, Title } from '@mantine/core';
import { userService } from '../../services/UserService/UserService';
import { UserProfile } from '../../utils/types/serviceTypes';
import { useEffect, useState } from 'react';
import ProfileEdit from './profile components/ProfileEditMode';
import Profile from './profile components/ProfileData';

export const defaultData: UserProfile = {
  email: 'Loading...',
  password: 'Loading...',
  firstName: 'Loading...',
  lastName: 'Loading...',
  dateOfBirth: 'Loading...',
  shippingAddress: { country: 'Loading...', streetName: 'Loading...', postalCode: 'Loading...', city: 'Loading...' },
  billingAddress: { country: 'Loading...', streetName: 'Loading...', postalCode: 'Loading...', city: 'Loading...' },
  shippingAddressAsDefault: false,
  billingAddressAsDefault: false,
};

const formStyles = createStyles((theme) => ({
  container: {
    width: '700px',
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
    marginTop: 65,
    [theme.fn.smallerThan('md')]: {
      marginTop: 10,
    },
  },
}));

const ProfilePage = () => {
  const [userData, setProfile] = useState<UserProfile>(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);
  const { classes } = formStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const userData = (await userService.getProfile()) as UserProfile;
      setProfile(userData);
    };
    getProfile();
  }, []);

  if (isEditMode === false) {
    return (
      <Container className={classes.container}>
        <Title className={classes.title} order={1} align="center" mb={20}>
          Your Profile
        </Title>
        <Profile {...userData} />
      </Container>
    );
  }
  //   return (
  //     <Container className={classes.container}>
  //       <Title className={classes.title} order={1} align="center" mb={20}>
  //         Your Profile
  //       </Title>
  //       <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
  //         <Grid gutter="md">
  //           <Col span={12} md={3}>
  //             <Flex gap="md" justify="center" align="center" direction="column" className={classes.avatarContainer}>
  //               <Avatar variant="filled" radius="xl" size="lg" src={null}>
  //                 {avatarLetters}
  //               </Avatar>
  //               <Text align="center" className={classes.smallTitle}>
  //                 {userData?.firstName} {userData?.lastName}
  //               </Text>
  //               <Button type="submit" fullWidth onClick={() => setIsEditMode(true)}>
  //                 Edit
  //               </Button>
  //             </Flex>
  //           </Col>
  //           <Col span={12} md={9}>
  //             <Flex gap="md" justify="center" align="center" direction="column">
  //               <Text className={classes.smallTitle}>Personal information</Text>
  //               <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
  //                 <Text className={classes.smallTitle}>First Name</Text>
  //                 <Text className={classes.text} color="gray">
  //                   {userData?.firstName}
  //                 </Text>
  //                 <Text className={classes.smallTitle}>Last Name</Text>
  //                 <Text className={classes.text} color="gray">
  //                   {userData?.lastName}
  //                 </Text>
  //                 <Text className={classes.smallTitle}>Date of birth</Text>
  //                 <Text className={classes.text} color="gray">
  //                   {userData?.dateOfBirth}
  //                 </Text>
  //                 <Text className={classes.smallTitle}>Email</Text>
  //                 <Text className={classes.text} color="gray">
  //                   {userData?.email}
  //                 </Text>
  //               </Paper>
  //             </Flex>
  //           </Col>
  //         </Grid>
  //         <Text className={classes.smallTitle} m={20} align="center">
  //           Addresses
  //         </Text>
  //         <Flex gap="sm" justify="center" align="start" direction="row" style={{ width: '100%' }}>
  //           <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
  //             <Text className={classes.smallTitle} align="center">
  //               Shipping Address
  //             </Text>
  //             <Text className={classes.smallTitle}>Country</Text>
  //             <Text className={classes.text} color="gray">
  //               {userData?.shippingAddress.country}
  //             </Text>
  //             <Text className={classes.smallTitle}>City</Text>
  //             <Text className={classes.text} color="gray">
  //               {userData?.shippingAddress.city}
  //             </Text>
  //             <Text className={classes.smallTitle}>Address</Text>
  //             <Text className={classes.text} color="gray">
  //               {userData?.shippingAddress.streetName}
  //             </Text>
  //             <Text className={classes.smallTitle}>Postal Code</Text>
  //             <Text color="gray">{userData?.shippingAddress.postalCode}</Text>
  //             <Text className={classes.text} color="red" align="center">
  //               {userData?.shippingAddressAsDefault ? '* Used as default' : 'Not default'}
  //             </Text>
  //           </Paper>
  //           <Paper shadow="xs" withBorder style={{ width: '100%', padding: '0 1rem' }}>
  //             <Text className={classes.smallTitle} align="center">
  //               Billing Address
  //             </Text>
  //             <Text className={classes.smallTitle}>Country</Text>
  //             <Text className={classes.text} color="gray">
  //               {userData?.billingAddress.country}
  //             </Text>
  //             <Text className={classes.smallTitle}>City</Text>
  //             <Text className={classes.text} color="gray">
  //               {userData?.billingAddress.city}
  //             </Text>
  //             <Text className={classes.smallTitle}>Address</Text>
  //             <Text className={classes.text} color="gray">
  //               {userData?.billingAddress.streetName}
  //             </Text>
  //             <Text className={classes.smallTitle}>Postal Code</Text>
  //             <Text className={classes.text} color="gray">
  //               {userData?.billingAddress.postalCode}
  //             </Text>
  //             <Text className={classes.text} color="red" align="center">
  //               {userData?.billingAddressAsDefault ? '* Used as default' : 'Not default'}
  //             </Text>
  //           </Paper>
  //         </Flex>
  //       </Paper>
  //     </Container>
  //   );
  // }
  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        Your Profile
      </Title>
      <ProfileEdit {...userData} />
    </Container>
  );
};

export default ProfilePage;
