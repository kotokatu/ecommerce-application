import { Container, Group, Image } from '@mantine/core';
import { mainPageStyle } from './main-style';
import MainLinks from '../../components/app-links/MainLinks';
import useAuth from '../../utils/hooks/useAuth';
import HeroImage from '../../assets/img/hero_image.jpg';

const MainPage = () => {
  const { classes } = mainPageStyle();
  const { userLoggedIn } = useAuth();

  return (
    <Container className={classes.container}>
      <Group className={classes.links}>
        <MainLinks userLoggedIn={userLoggedIn} />
      </Group>
      <Group align="flex-start" className={classes.content}>
        <Image src={HeroImage}></Image>
      </Group>
    </Container>
  );
};

export default MainPage;
