import { Avatar, Col, Grid, Paper, Text, Title, createStyles, Container, Flex } from '@mantine/core';
import React from 'react';

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
      fontSize: '12px',
    },
  },
}));

const ProfilePage: React.FC = () => {
  const { classes } = formStyles();
  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={1} align="center" mb={20}>
        User Profile
      </Title>
      <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
        <Grid gutter="md">
          <Col span={12} md={3}>
            <Flex gap="md" justify="center" align="center" direction="column">
              <Avatar variant="filled" radius="xl" size="lg" src={null}>
                VR
              </Avatar>
              <Text align="center" className={classes.smallTitle}>
                Username dfgdgddfgg
              </Text>
            </Flex>
          </Col>
          <Col span={12} md={9}>
            <Flex gap="md" justify="center" align="center" direction="column">
              <Text size="md" className={classes.smallTitle}>
                Personal information
              </Text>
              <Paper shadow="xs" withBorder style={{ width: '100%' }}>
                <Text size="md" className={classes.smallTitle}>
                  First Name
                </Text>
                <Text size="sm" color="gray">
                  sfsdfdf dgdfgdg
                </Text>
                <Text size="md" className={classes.smallTitle}>
                  Second Name
                </Text>
                <Text size="sm" color="gray">
                  fhfhfghfh
                </Text>
                <Text className={classes.smallTitle}>Date of birth</Text>
                <Text size="sm" color="gray">
                  15.03.1995
                </Text>
                <Text size="md" className={classes.smallTitle}>
                  Email
                </Text>
                <Text size="sm" color="gray">
                  aasasas@mail.com
                </Text>
              </Paper>
              <Text size="md" className={classes.smallTitle}>
                Addresses
              </Text>
              <Paper shadow="xs" withBorder>
                <Text className={classes.smallTitle}>Date of birth</Text>
                <Text size="sm" color="gray">
                  15.03.1995
                </Text>
                <Text size="md" className={classes.smallTitle}>
                  Email
                </Text>
                <Text size="sm" color="gray">
                  aasasas@mail.com
                </Text>
                <Text size="md" className={classes.smallTitle}>
                  Bio
                </Text>
                <Text size="sm" color="gray">
                  Lolus pulvina
                </Text>
              </Paper>
            </Flex>
          </Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
