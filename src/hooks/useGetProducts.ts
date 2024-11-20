import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";
import { ProductResponse } from "../api/productApi";

export const useGetProducts = (page: number) => {
  const { data, isLoading, error } = useQuery<ProductResponse[], Error>({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await getProducts(page);
      return response;
    },
    staleTime: 5000,
  });

  const products: ProductResponse[] = data || [];

  return { products, isLoading, error };
};

