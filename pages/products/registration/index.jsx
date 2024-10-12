import ProductForm from "@/components/form/ProductForm";
import { useCreateMutation } from "@/service/mutations";
import Loader from "@/components/ui/Loader";
import { ENTITY } from "@/variables/entities";

export default function CreateProductPage() {
  const entity = ENTITY.PRODUCT;
  const { isPending, mutate } = useCreateMutation({
    entity,
  });

  const handleNewProductSubmit = (data) => {
    console.log(data);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);

    data.tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    data.tags.forEach((image) => {
      formData.append("images", image);
    });

    mutate(formData);
  };

  if (isPending) return <Loader />;

  return <ProductForm onSubmit={handleNewProductSubmit} />;
}
