import ProductForm from "@/components/form/ProductForm";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import { useUpdateMutation } from "@/service/mutations";
import { useGetById } from "@/service/queries";
import { ENTITY, IMG_URL } from "@/variables/entities";
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

    data.tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    data.imageUrls?.forEach((image) => {
      formData.append("imageUrls", image);
    });

    data.imageFiles?.forEach((file) => {
      formData.append("imageFiles", file);
    });

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
