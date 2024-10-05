import Image from "next/image";
import Link from "next/link";
import CommentList from "@/components/CommentComponent/CommentList";
import PostComment from "@/components/CommentComponent/PostComment";
import borderLine from "@/images/borderLine.png";
import defaultItemImg from "@/images/defaultItem.png";
import defaultUserImg from "@/images/defaultUserImg.png";
import goBack from "@/images/ic_back.png";
import styles from "@/styles/ItemsDetail.module.css";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/productApi";

export default function ItemsDetail() {
  const router = useRouter();
  const { id } = router.query; // URL에서 상품 ID 가져오기
  const productId = id;

  // useQuery를 사용하여 데이터 가져오기
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId, // productId가 있을 때만 쿼리 실행
  });

  // 로딩 중일 때
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 발생 시
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  // 데이터가 없을 때
  if (!data) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  const { name, price, description, tags, images, createdAt, favoriteCount } =
    data;

  console.log(data);
  console.log(images);
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <Image
          src={images[0]}  // images[0] defaultItemImg
          className={styles.itemImg}
          alt="item"
          width={486}
          height={486}
        />
        <div className={styles.itemInfo}>
          <div className={styles.item}>
            <div className={styles.header}>
              <div className={styles.titleHeader}>
                <span className={styles.title}>{name}</span>
                {/* DropDown 넣을 공간 */}
              </div>
              <div className={styles.price}>{price.toLocaleString()}원</div>
              {/* line */}
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.contentTitle}>상품 소개</div>
              <span className={styles.content}>{description}</span>
              <div className={styles.contentTitle}>상품 태그</div>
              <div className={styles.tag}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tags}>#{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.itemUserInfoContainer}>
            <div className={styles.itemUserInfo}>
              <Image src={defaultUserImg} alt="user" />
              <div className={styles.itemUserInfoContent}>
                <span className={styles.user}>총명한판다</span>
                <span className={styles.date}>{createdAt}</span>
              </div>
            </div>
            <div className={styles.favoriteBorder}>
              <button className={styles.favorite}>🤍 {favoriteCount}</button>
            </div>
          </div>
        </div>
        {/* line */}
      </div>
      <PostComment
        title={"문의하기"}
        placehorder={
          "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        }
      />
      {/* <CommentList /> */}
      <Link href={"/items"} className={styles.goBackLink}>
        <button className={styles.button}>
          <span className={styles.goBack}>목록으로 돌아가기</span>
          <Image src={goBack} alt="goBack" />
        </button>
      </Link>
    </div>
  );
}
