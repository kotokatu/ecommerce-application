import { SimpleGrid, Container, Title } from '@mantine/core';
import Developer from './components/developer';
import { developersData } from './data/data';

export function AboutPage() {
  const items = developersData.map((item) => <Developer {...item} key={item.name} />);

  return (
    <Container mt={10} mb={35} size="lg">
      <Title order={1} align="center" m={10}>
        About Us
      </Title>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}

export default AboutPage;
