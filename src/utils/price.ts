export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ko-KR").format(price);
};
