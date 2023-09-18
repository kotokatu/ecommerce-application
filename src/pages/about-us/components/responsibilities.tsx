import { Text, Title, Flex } from '@mantine/core';
import AnimatedDeveloper from './animatedDeveloper';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  name: string;
  resp: string[];
}

function Responsibilities({ name, resp }: Props) {
  return (
    <Flex key={name} align="center" justify="center" direction="column">
      <Title order={5} m={10} color="white">
        {resp[0]}
      </Title>
      <Title order={5} m={10} color="white">
        {resp[1]}
      </Title>
      <Title order={5} m={10} color="white" mb={20}>
        {resp[2]}
      </Title>
      <AnimatedDeveloper name={name} />
    </Flex>
  );
}

export default Responsibilities;
