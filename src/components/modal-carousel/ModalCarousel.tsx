import { Carousel, useAnimationOffsetEffect, type Embla } from '@mantine/carousel';
import { Modal } from '@mantine/core';
import { getStylesRef, rem } from '@mantine/core';
import { SetStateAction, useState } from 'react';

type ModalCarouselProps = {
  slides: JSX.Element[] | null;
  opened: boolean;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
};

const ModalCarousel = ({ slides, opened, setOpened }: ModalCarouselProps) => {
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <Modal
      opened={opened}
      transitionProps={{ duration: TRANSITION_DURATION }}
      onClose={() => setOpened(false)}
      size={1200}
      styles={{
        header: {
          paddingBottom: '5px',
          paddingTop: '5px',
        },
        content: {
          paddingBottom: '15px',
        },
      }}
    >
      <Carousel
        getEmblaApi={setEmbla}
        loop
        controlSize={30}
        controlsOffset={10}
        styles={{
          root: {
            maxWidth: rem(800),
            marginLeft: 'auto',
            marginRight: 'auto',
          },
          control: {
            ref: getStylesRef('controls'),
            transition: 'opacity 150ms ease',
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
          indicator: {
            backgroundColor: '#DEE2E6',
          },
          slide: {
            height: '80vh',
            backgroundPosition: 'center center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          },
        }}
      >
        {slides}
      </Carousel>
    </Modal>
  );
};

export default ModalCarousel;
