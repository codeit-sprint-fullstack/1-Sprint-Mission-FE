import ProductForm from "@/components/form/ProductForm";
import { useCreateMutation } from "@/service/mutations";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";

export default function CreateProductPage() {
  const { isPending, isError, mutate, error } = useCreateMutation({
    entity: "product",
  });

  const handleNewProductSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tags", data.title);

    mutate(formData);
  };

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }
  return <ProductForm onSubmit={handleNewProductSubmit} />;
}
