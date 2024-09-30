import ProductForm from "@/components/form/ProductForm";
import { useCreateMutation } from "@/service/mutations";
import Loader from "@/components/ui/Loader";
import { ENTITY, IMG_URL } from "@/variables/entities";

export default function CreateProductPage() {
  const entity = ENTITY.PRODUCT;
  const { isPending, mutate } = useCreateMutation({
    entity,
  });

  const handleNewProductSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tags", data.tags);
    formData.append("images", IMG_URL);

    data.tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    mutate(formData);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}`, value);
    }
  };

  if (isPending) return <Loader />;

  return <ProductForm onSubmit={handleNewProductSubmit} />;
}
