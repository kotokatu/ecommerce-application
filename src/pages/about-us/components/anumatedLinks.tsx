import '../about.scss';
import { Flex } from '@mantine/core';
import AnimatedDeveloper from './animatedDeveloper';

function AnimatedLinks() {
  return (
    <Flex align="center" justify="center" direction="column" mt={30}>
      <Flex align="center" justify="center" mb={50} ml={60}>
        <a href={'https://github.com/kotokatu'} className={'gitLinkNatasha'}>
          <div className={'gitHub'} />
        </a>
        <a href={'https://github.com/Kirich8'} className={'gitLinkMaxim'}>
          <div className={'gitHub'} />
        </a>
        <a href={'https://github.com/vikkitorry'} className={'gitLinkVika'}>
          <div className={'gitHub'} />
        </a>
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
