import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

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

  const handleChange = (e) => {
    isSetMatch(e.matches);
  };

  const debounceHandleChange = debounce(handleChange, 150);

  useEffect(() => {
    const mediaQueryList = matchMedia(getQueryString(breakpoint));

    mediaQueryList.addEventListener('change', debounceHandleChange);

    return () => {
      mediaQueryList.removeEventListener('change', debounceHandleChange);
      debounceHandleChange.cancel();
    };
  }, [breakpoint, debounceHandleChange]);

  return isMatch;
}
