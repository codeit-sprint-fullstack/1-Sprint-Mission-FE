import styles from "@/styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";

export default function itemDetail() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return (
    <>
      <Image
        src={data.list.images[0]}
        width={486}
        height={486}
        alt="product_img"
      />
    </>
  );
}
