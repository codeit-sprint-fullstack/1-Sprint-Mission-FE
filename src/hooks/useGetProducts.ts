import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: string[];
  likes?: number;
  tags?: string[];
  userId?: number;
}

interface ProductResponse {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string | string[];
  likes?: number;
  tags?: string[];
  userId?: number;
}

export const useGetProducts = (page: number) => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await getProducts(page);

      return Array.isArray(response)
        ? response.map((item: ProductResponse): Product => ({
            id: item.id,
            name: item.name || "이름이 없는 전설의 상품",
            description: item.description || "이 상품은 이름이 없는 전설의 상품입니다.",
            price: item.price || 0,
            images: Array.isArray(item.image) ? item.image : [item.image || ""],
            likes: item.likes || 0,
            tags: item.tags || ["데이터가 없다니... 이런"],
            userId: item.userId,
          }))
        : [];
    },
    staleTime: 5000,
  });

  const products: Product[] = data || [];

  return { products, isLoading, error };
};
