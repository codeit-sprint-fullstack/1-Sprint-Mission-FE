import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1199px)',
  });

  const isMobile = useMediaQuery({
    query: '(min-width:375px) and (max-width:767px)',
  });

  return { isTablet, isMobile };
};
