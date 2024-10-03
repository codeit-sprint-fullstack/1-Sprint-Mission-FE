import { useGetBestList } from "@/service/queries";
import styles from "./BestProducts.module.scss";
import ProductList from "./ProductList";
import Message from "../ui/Message";
import Loader from "../ui/Loader";

export default function BestProducts({ entity }) {
  const { data, isError, isPending, error } = useGetBestList(entity, {
    pageSize: 4,
    orderBy: "favorite",
  });
  if (isPending) return <Loader />;
  if (isError) {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }
  return <ProductList data={data} type="best" />;
}
