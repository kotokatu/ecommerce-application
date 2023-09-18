import { Title, Flex } from '@mantine/core';
import AnimatedDeveloper from './animatedDeveloper';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  name: string;
  resp: string[];
}

function Responsibilities({ name, resp }: Props) {
  return (
    <Flex key={name} align="center" justify="center" direction="column" pb={10}>
      <div className="piramid">
        <Title order={5} m={0} align="center" color="white">
          {resp[0]}
        </Title>
        <Title order={5} m={0} align="center" color="white">
          {resp[1]}
        </Title>
        <Title order={5} m={0} align="center" color="white" mb={30}>
          {resp[2]}
        </Title>
      </div>
      <AnimatedDeveloper name={name} />
    </Flex>
  );
}

export default Responsibilities;
