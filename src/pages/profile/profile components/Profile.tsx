import { Button } from '@mantine/core';
const ProfilePage = () => {
  return (
    <div>
      <h2>
        <Button>Get profile</Button>
      </h2>
    </div>
  );
};

export default ProfilePage;

// const ProfilePage: React.FC = () => {
//   const aa = async () => await userService.getProfile();
//   console.log(aa());
//   const { classes } = formStyles();
//   //const userData = userService.getCustomerData() as UserProfile;
//   const avatarLetters = getFirstLetters(userData.firstName, userData.lastName);

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
//               <Button type="submit" fullWidth>
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
//                 <Text className={classes.smallTitle}>Second Name</Text>
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
//             <Text className={classes.smallTitle}>Street</Text>
//             <Text className={classes.text} color="gray">
//               {userData?.shippingAddress.streetName}
//             </Text>
//             <Text className={classes.smallTitle}>Postal Code</Text>
//             <Text color="gray">{userData?.shippingAddress.postalCode}</Text>
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
//             <Text className={classes.smallTitle}>Street</Text>
//             <Text className={classes.text} color="gray">
//               {userData?.billingAddress.streetName}
//             </Text>
//             <Text className={classes.smallTitle}>Postal Code</Text>
//             <Text className={classes.text} color="gray">
//               {userData?.billingAddress.postalCode}
//             </Text>
//             <Text className={classes.text} color="red" align="center">
//               *Used as default
//             </Text>
//           </Paper>
//         </Flex>
//       </Paper>
//     </Container>
//   );
// };

// export default ProfilePage;
