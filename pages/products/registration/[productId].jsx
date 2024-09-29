import ProductForm from "@/components/form/ProductForm";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import { useUpdateMutation } from "@/service/mutations";
import { useGetById } from "@/service/queries";
import { ENTITY } from "@/variables/entities";
import { useRouter } from "next/router";

export default function EditProductPage() {
  const entity = ENTITY.PRODUCT;
  const router = useRouter();
  const { productId } = router.query;

  const {
    isError,
    error,
    data: product,
    isPending,
  } = useGetById({
    entity,
    id: productId,
  });

  const { mutate } = useUpdateMutation({ entity, id: productId });

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
