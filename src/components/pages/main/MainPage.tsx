import { Container, Group } from '@mantine/core';
import { mainPageStyle } from './main-style';
import MainLinks from '../../ui/app-links/MainLinks';

const MainPage = () => {
  const { classes } = mainPageStyle();

  return (
    <Container className={classes.container}>
      <Group className={classes.links}>
        <MainLinks />
      </Group>
      <Group className={classes.content}></Group>
    </Container>
  );
};

export default MainPage;
