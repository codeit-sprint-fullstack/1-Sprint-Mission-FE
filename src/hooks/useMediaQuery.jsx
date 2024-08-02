import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

//사이즈별 media query string breakpoint 지정
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

//matchMedia로 현재 사용자 viewport와 넣은 media query string이 맞는지 boolean 리턴
export default function useMediaQuery(breakpoint) {
  const [isMatch, setIsMatch] = useState(
    () => window.matchMedia(getQueryString(breakpoint)).matches
  );

  useEffect(() => {
    const mediaQueryList = matchMedia(getQueryString(breakpoint));

    //뭔가 느린거 같아서 debounce 해줬는데 속도가 달라진지 모르겠어요..
    //제가 이해를 잘 못하는거 같기두 하고.. resize쓰는게 아니여서 필요없는거 같기도하고..
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
