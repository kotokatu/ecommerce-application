import { Container, Text, Box } from '@mantine/core';
import { mainPageStyle } from './main-style';
import { Hero } from '../../components/hero/Hero';
import { useEffect, useState, useRef } from 'react';
import { storeService } from '../../services/StoreService/StoreService';
import type { PromoCode } from '../../services/StoreService/StoreService';
import { notificationError } from '../../components/ui/notification';

const MainPage = () => {
  const { classes } = mainPageStyle();
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [height, setHeight] = useState(0);
  const promoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const discount = await storeService.getDiscount();
        if (!discount) return;
        const { code, value } = discount;
        setPromoCode({ code, value });
      } catch (err) {
        if (err instanceof Error) notificationError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!heroRef?.current?.clientHeight) {
      return;
    }
    const height = promoRef?.current?.clientHeight
      ? promoRef?.current?.clientHeight + heroRef?.current?.clientHeight
      : heroRef?.current?.clientHeight;
    if (height) setHeight(height);
  }, [promoCode]);

  return (
    <Box sx={{ height: `${height}px`, width: '100vw' }}>
      <Container className={classes.container}>
        <div ref={promoRef} className={classes.promo}>
          {promoCode && (
            <div>
              <Text className={classes.promoContent}>{`${promoCode.value / 100}% off everything with code: ${
                promoCode.code
              }`}</Text>
              <Text className={classes.promoSub}>Limited time only</Text>
            </div>
          )}
        </div>
        <Hero ref={heroRef} />
      </Container>
    </Box>
  );
};

export default MainPage;
