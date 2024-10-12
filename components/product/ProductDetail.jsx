import { ImageContainer } from "../ui/ImgContainers";
import { useLikeMutation } from "@/service/mutations";
import KebabMenu from "../ui/KebabMenu";
import Message from "../ui/Message";
import LikeButton from "../user/LikeButton";
import UserInfo from "../user/UserInfo";
import styles from "./ProductDetail.module.scss";

export default function ProductDetail({ product, entity }) {
  const isLiked = product.isFavorite;
  const { mutate } = useLikeMutation({ id: product.id, entity, isLiked });

  const toggleLikeButton = () => {
    mutate(product.id);
  };

  if (!product) return <Message msg="product data가 없나봄." />;

  return (
    <article className={styles.ProductDetail}>
      <ImageContainer
        src={product?.images[0]}
        width="486px"
        alt={product?.name}
        radius="16px"
        isBorder={true}
        priority={true}
      />
      <div className={styles.details}>
        <div className={styles.top}>
          <div className={styles.title}>
            <h1>{product?.name}</h1>
            <KebabMenu idPath={product.id} entity={entity} />
          </div>
          <p className={styles.price}>{`${product?.price}원`}</p>
          <div className={styles.line}></div>
        </div>
        <div className={styles.description}>
          <h2>상품소개</h2>
          <p>{product?.description}</p>
        </div>
        <div className={styles.tagList}>
          <h2>상품 태그</h2>
          <ul className={styles.tags}>
            {product?.tags.map((tag, index) => {
              return <li key={index}>{`#${tag}`}</li>;
            })}
          </ul>
        </div>
        <div className={styles.writer}>
          <UserInfo entity={entity} data={product} />
          <LikeButton data={product} onClick={toggleLikeButton} />
        </div>
      </div>
    </article>
  );
}
