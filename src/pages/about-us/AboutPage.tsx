import { SimpleGrid, Container, Title } from '@mantine/core';
import Developer from './components/developer';
import AnimatedLinks from './components/anumatedLinks';
import { developersData } from './data/data';

export function AboutPage() {
  const items = developersData.map((item) => <Developer {...item} key={item.name} />);

  //   <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50} mt={25} h={60}>
  //   {developersData.map((data, i) => (
  //     <a href={data.gitLink} className={'gitLink'} key={i}>
  //       <div className={'gitHub'} />
  //     </a>
  //   ))}
  // </SimpleGrid>

  return (
    <Container mt={10} mb={35} size="lg">
      <Title order={1} align="center" m={10}>
        About Us
      </Title>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
        {items}
      </SimpleGrid>
      <AnimatedLinks />
    </Container>
  );
}

export default AboutPage;
