import { Container, Group } from '@mantine/core';
import { mainPageStyle } from './main-style';
import MainLinks from '../../ui/app-links/MainLinks';

type MainPageProps = {
  userLoggedIn: boolean;
};
const MainPage = ({ userLoggedIn }: MainPageProps) => {
  const { classes } = mainPageStyle();

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
