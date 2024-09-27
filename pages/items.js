import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductList from "@/components/ProductList.js";

const queryClient = new QueryClient();

export default function items() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
}
