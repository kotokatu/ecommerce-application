import { Container } from '@mantine/core';
import { mainPageStyle } from './main-style';
import { Hero } from '../../components/hero/Hero';

const MainPage = () => {
  const { classes } = mainPageStyle();

  return (
    <Container display="block" className={classes.container}>
      <Hero />
    </Container>
  );
};

export default MainPage;
