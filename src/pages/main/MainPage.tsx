import { Container, Group } from '@mantine/core';
import { mainPageStyle } from './main-style';
import MainLinks from '../../components/app-links/MainLinks';
import useAuth from '../../utils/hooks/useAuth';

const MainPage = () => {
  const { classes } = mainPageStyle();
  const { userLoggedIn } = useAuth();

  return (
    <Container className={classes.container}>
      <Group className={classes.links}>
        <MainLinks userLoggedIn={userLoggedIn} />
      </Group>
      <Group className={classes.content}></Group>
    </Container>
  );
};

export default MainPage;
