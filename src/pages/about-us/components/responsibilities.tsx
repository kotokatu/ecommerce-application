import { Title, Flex } from '@mantine/core';
import AnimatedDeveloper from './animatedDeveloper';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  name: string;
  resp: string[];
  role: string;
}

function Responsibilities({ name, resp, role }: Props) {
  return (
    <Flex key={name} align="center" justify="center" direction="column" pb={10} className="container">
      <div className="mssg">
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
      <div id="skills" className={name}>
        Skills:
        <div>Sass</div>
        <div>React</div>
        <div>Mantine</div>
      </div>
      <AnimatedDeveloper name={name} />
      <Title order={3} m={0} align="center" color="white" mb={20} className="role">
        {role}
      </Title>
    </Flex>
  );
}

export default Responsibilities;
