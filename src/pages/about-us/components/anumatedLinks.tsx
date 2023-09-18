import '../about.scss';
import { Flex } from '@mantine/core';
import AnimatedDeveloper from './animatedDeveloper';
import { developersLinks } from '../data/data';

function AnimatedLinks() {
  const data = developersLinks;
  return (
    <Flex align="center" justify="center" direction="column" mt={30}>
      <Flex align="center" justify="center" mb={50} ml={60}>
        {data.map((link) => (
          <a href={link.gitLink} className={link.name} key={link.name}>
            <div className={'gitHub'} />
          </a>
        ))}
      </Flex>
      <Flex align="center" justify="center">
        <AnimatedDeveloper name={'rss-school'} />
        <a className={'rss'} href={'https://rs.school/'}>
          <div />
        </a>
      </Flex>
    </Flex>
  );
}

export default AnimatedLinks;
