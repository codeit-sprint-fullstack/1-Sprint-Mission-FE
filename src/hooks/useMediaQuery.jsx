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
  const [isMatch, setIsMatch] = useState(
    () => window.matchMedia(getQueryString(breakpoint)).matches
  );

  useEffect(() => {
    const mediaQueryList = matchMedia(getQueryString(breakpoint));

    //뭔가 느린거 같아서 debounce 해줬는데 속도가 달라진지 모르겠어요..
    //제가 이해를 잘 못하는거 같기두..
    const handleChange = debounce((e) => {
      setIsMatch(e.matches);
    }, 150);

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
      handleChange.cancel();
    };
  }, [breakpoint]);

  return isMatch;
}
