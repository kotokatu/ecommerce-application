import { SimpleGrid, Container, Title, Flex } from '@mantine/core';
import Developer from './components/developer';
import AnimatedLinks from './components/anumatedLinks';
import Responsibilities from './components/responsibilities';
import { developersData, developersResponsible } from './data/data';

export function AboutPage() {
  const items = developersData.map((item) => <Developer {...item} key={item.name} />);
  const responsibles = developersResponsible.map((item) => <Responsibilities key={item.name} {...item} />);

  return (
    <Container mt={10} mb={35} size="lg" p={0}>
      <Title order={1} align="center" m={10}>
        About Us
      </Title>
      <Title order={3} align="left" m={20}>
        Info:
      </Title>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50} pl={20} pr={20} mt={20}>
        {items}
      </SimpleGrid>
      <div id="black">
        <Title order={3} align="left" m={20} color="white" pt={10}>
          Responsibilities:
        </Title>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
          {responsibles}
        </SimpleGrid>
      </div>
      <Title order={3} align="left" m={20}>
        Links:
      </Title>
      <AnimatedLinks />
    </Container>
  );
}

export default AboutPage;
