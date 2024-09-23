import ImageContainer from "../ui/ImgContainer";
import KebabMenu from "../ui/KebabMenu";
import Message from "../ui/Message";
import LikeButton from "../user/LikeButton";
import UserInfo from "../user/UserInfo";
import styles from "./ProductDetail.module.scss";

export default function ProductDetail({ product }) {
  if (!product) return <Message msg="product data가 없나봄." />;

  return (
    <article className={styles.ProductDetail}>
      <ImageContainer
        src={product?.images[0]}
        width="486px"
        height="486px"
        alt={product?.name}
        radius="16px"
        borderColor="g.$grey-200"
      />
      <div className={styles.details}>
        <div className={styles.title}>
          <h1>{product?.name}</h1>
          <KebabMenu idPath={product?.id} entity="product" />
        </div>
        <p className={styles.price}>{product?.price}</p>
        <div className={styles.line}></div>
        <div className={styles.description}>
          <h2>상품소개</h2>
          <p>{product?.description}</p>
          <h2>상품 태그</h2>
          <ul className={styles.tags}>
            {product?.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>;
            })}
          </ul>
        </div>
        <div className={styles.writer}>
          <UserInfo date={product?.createdAt} /> <LikeButton data={product} />
        </div>
      </div>
    </article>
  );
}
