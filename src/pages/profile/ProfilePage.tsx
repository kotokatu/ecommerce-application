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
  text: {
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
      <Title className={classes.title} order={1}>
        User Profile
      </Title>
      <Paper withBorder shadow="md" radius="md" className={classes.formWrapper}>
        <Grid gutter="md">
          <Col span={12} md={3}>
            <Flex gap="md" justify="center" align="center" direction="column">
              <Avatar variant="filled" radius="xl" size="lg" src={null}>
                VR
              </Avatar>
              <Text align="center" className={classes.text}>
                Username
              </Text>
            </Flex>
          </Col>
          <Col span={12} md={9}>
            <Paper shadow="xs">
              <Text size="md" className="user-profile-label">
                Bio
              </Text>
              <Text size="sm" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus sed mattis
              </Text>
              <Text size="sm" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus sed mattis
              </Text>
              <Text size="sm" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus sed mattis
              </Text>
              <Text size="sm" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus sed mattis
              </Text>
              <Text size="sm" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus sed mattis
              </Text>
              <Text size="sm" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus sed mattis
              </Text>
            </Paper>
          </Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
