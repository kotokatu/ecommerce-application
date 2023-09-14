export const formatPrice = (num: number) => {
  return num.toFixed(2).replace(/[.,]00$/, '');
};
