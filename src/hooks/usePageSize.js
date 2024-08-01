// hooks/usePageSize.js
import { useCallback } from "react";
import useViewportSize from "hooks/useViewportSize";

/**
 * 화면 너비에따라 다른 리턴값을 제공하는 함수 (useViewportSize와 함께 동작함)
 *
 * @param {Object} breakpoints - 화면 너비에 따른 리턴값을 지정합니다
 * @param {number} breakpoints.default - 기본값 
 * @param {number} breakpoints.tablet - 타블렛 분기점 ( 기본값 1199px 이하)
 * @param {number} breakpoints.mobile - 모바일 분기점 (743px 이하)
 * @param {Object} size
 * @param {number} size.default - 기본값 (4)
 * @param {number} size.tablet - 기본값 (2)
 * @param {number} size.mobile - 기본값 (1)
 */
const usePageSize = ({
  breakpoints = { mobile: 743, tablet: 1199, default: 9999 },
  sizes = { mobile: 1, tablet: 2, default: 4 },
} = {}) => {
  const { width } = useViewportSize();

  return useCallback(() => {
    if (width <= breakpoints.mobile) {
      return sizes.mobile;
    } else if (width <= breakpoints.tablet) {
      return sizes.tablet;
    } else {
      return sizes.default;
    }
  }, [width, breakpoints, sizes]);
};

export default usePageSize;
