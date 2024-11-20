import { api } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  images: string[];
  tags: string[];
}

export const useProductFormMutations = () => {
  const router = useRouter();

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      router.push("/product");
    },
  });

  return {
    createProduct,
  };
};
