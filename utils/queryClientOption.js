export const OPTIONS = {
  defaultOptions: {
    queries: {
      // 클라이언트 사이드에서 바로 다시 데이터를 refetch 하는 것을 피한다.
      staleTime: 60 * 1000,
    },
  },
};
