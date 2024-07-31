import { useEffect, useState } from 'react';

function getQueryString(breakpoint) {
  switch (breakpoint) {
    case 'tabletSize':
      return 'only screen and (max-width: 1199px)';
    case 'mobileSize':
      return 'only screen and (max-width: 743px)';

    default:
      return '';
  }
}

export default function useMediaQuery(breakpoint) {
  const [isMatch, isSetMatch] = useState(
    () => window.matchMedia(getQueryString(breakpoint)).matches
  );

  useEffect(() => {
    const mediaQueryList = matchMedia(getQueryString(breakpoint));

    const handleChange = (e) => {
      isSetMatch(e.matches);
    };
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return isMatch;
}
