import { useEffect } from 'react'

export const useData = (options) => {
  var data;
  useEffect(async () => {
    data = await getProductList(options);
    // setBestItem(bestLists.list);
  }, [options]);
  return data
}