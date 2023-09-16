import { Container, Text, Box } from '@mantine/core';
import { mainPageStyle } from './main-style';
import { Hero } from '../../components/hero/Hero';
import { useEffect, useState } from 'react';
import { storeService } from '../../services/StoreService/StoreService';
import type { PromoCode } from '../../services/StoreService/StoreService';
import { notificationError } from '../../components/ui/notification';

const MainPage = () => {
  const { classes } = mainPageStyle();
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);

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

  return (
    <Box sx={{ height: 'calc(100dvh - 80px)' }}>
      <Container className={classes.container}>
        <div className={classes.promo}>
          {promoCode && (
            <div>
              <Text className={classes.promoContent}>{`${promoCode.value / 100}% off with code: ${
                promoCode.code
              }`}</Text>
              <Text className={classes.promoSub}>Limited time only</Text>
            </div>
          )}
        </div>
        <Hero />
      </Container>
    </Box>
  );
};

export default MainPage;
