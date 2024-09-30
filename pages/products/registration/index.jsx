import ProductForm from "@/components/form/ProductForm";
import { useCreateMutation } from "@/service/mutations";
import Loader from "@/components/ui/Loader";
import { ENTITY } from "@/variables/entities";

export default function CreateProductPage() {
  const entity = ENTITY.PRODUCT;
  const { isPending, mutate } = useCreateMutation({
    entity,
  });

  const imgUrl =
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/214/1727682824059/Screenshot%202024-09-30%20at%203.32.32%C3%A2%C2%80%C2%AFPM.png";

  const handleNewProductSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tags", data.tags);
    formData.append("images", imgUrl);

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
