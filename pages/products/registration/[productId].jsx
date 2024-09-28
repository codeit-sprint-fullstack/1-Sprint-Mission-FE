import ProductForm from "@/components/form/ProductForm";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import { useUpdateMutation } from "@/service/mutations";
import { useGetById } from "@/service/queries";

export default function EditProduct() {
  const { productId } = router.query;

  const {
    isError,
    error,
    data: product,
  } = useGetById({
    entity: "product",
    id: productId,
  });

  const { mutate } = useUpdateMutation({ entity: "product", id: productId });

  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  const handleNewProductSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tags", data.title);

    mutate(formData);
  };

  return (
    <ProductForm
      onSubmit={handleNewProductSubmit}
      initialData={product}
      isEditMode={true}
    />
  );
}
