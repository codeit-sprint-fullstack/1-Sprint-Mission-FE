import { useEffect } from "react";

function useResize(handleResize) {
  return useEffect(() => {
    // 초기 사이즈 설정
    handleResize();

    // 윈도우 리사이즈 이벤트 핸들러 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
}

export default useResize;
