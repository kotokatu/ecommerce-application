import { Center, Loader } from '@mantine/core';

const CenterLoader = () => {
  return (
    <Center h="100%">
      <Loader variant="bars" size="xl" display="block" mx="auto" />
    </Center>
  );
};

export default CenterLoader;
