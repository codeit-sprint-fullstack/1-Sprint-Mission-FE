import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";

export const useGetProducts = (page) => {
  const { data, isLoading, error } = useQuery(
    ['products', page],
    () => getProducts(page),
    { keepPreviousData: true }
  );

  const products = Array.isArray(data?.list) ? data.list : [];

  return { products, isLoading, error };
};

