import styles from "@/styles/itemDetail.module.css";
import Image from "next/image";
import {
  getProductDetail,
  getProductComment,
  createProductComment,
} from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import formatDate from "@/utils/formatDate";
import Comment from "@/components/comment";
import Link from "next/link";
import { useState } from "react";

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  });

  const { data: commentData } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getProductComment(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (newComment) => createProductComment(id, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      setComment("");
    },
  });

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      mutation.mutate({ content: comment });
    }
  };

  return (
    <>
      <div className={styles.itemDetailContainer}>
        {productData && (
          <>
            <Image
              src={productData.images[0]}
              width={486}
              height={486}
              alt="product_img"
              priority
              className={styles.itemDetailImg}
            />
            <div className={styles.itemDetailInfoContainer}>
              <div className={styles.itemDetailNameContainer}>
                <p className={styles.itemDetailName}>{productData.name}</p>
                <p className={styles.itemDetailPrice}>
                  {productData.price.toLocaleString("en-US") + "원"}
                </p>
              </div>
              <p className={styles.itemDetailDescriptionTitle}>상품 소개</p>
              <p className={styles.itemDetailDescription}>
                {productData.description}
              </p>
              <p className={styles.itemDetailTagsTitle}>상품 태그</p>
              <div className={styles.itemDetailTagsContainer}>
                {productData.tags &&
                  productData.tags.map((tag, index) => (
                    <p key={index} className={styles.itemDetailTags}>
                      #{tag}
                    </p>
                  ))}
              </div>
              <div className={styles.itemDetailUserInfoContainer}>
                <div className={styles.itemDetailUserInfo}>
                  <Image
                    src="/ic_profile.png"
                    width={40}
                    height={40}
                    alt="user_profile"
                  />
                  <div>
                    <p className={styles.itemDetailNickname}>총명한판다</p>
                    <p className={styles.itemDetailDate}>
                      {formatDate(productData.createdAt)}
                    </p>
                  </div>
                </div>
                <div className={styles.itemDetailFavoriteContainer}>
                  <Image
                    src="/ic_heart.png"
                    width={32}
                    height={32}
                    alt="icon_heart"
                  />
                  <p className={styles.itemDetailFavoriteCount}>
                    {productData.favoriteCount}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.itemDetailCommentWrap}>
        <p className={styles.itemDetailCommentTitle}>문의하기</p>
        <div className={styles.itemDetailCommentInputContainer}>
          <textarea
            className={styles.itemDetailCommentInput}
            placeholder="개인정보를 공유 및 요청하거나, 명예훼손, 무단 광고, 불법 정보 유포시 모니털이 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={`${styles.itemDetailCommentBtn} ${
              comment.trim() ? styles.itemDetailCommentBtnActive : ""
            }`}
            onClick={handleCommentSubmit}
            disabled={!comment.trim()}
          >
            등록
          </button>
        </div>
        <div className={styles.itemDetailCommentListContainer}>
          {commentData && commentData.list && commentData.list.length > 0 ? (
            <div className={styles.itemDetailCommentList}>
              {commentData.list.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
              <Link
                href="/items"
                className={styles.itemDetailCommentListBtnWrapper}
              >
                <Image
                  src="/btn_medium.png"
                  alt="route_list"
                  width={240}
                  height={48}
                  className={styles.itemDetailCommentListBtn}
                />
              </Link>
            </div>
          ) : (
            <div className={styles.itemDetailNoComment}>
              <Image
                src="/no_comment.png"
                alt="no_comment"
                width={151}
                height={208}
                className={styles.itemDetailNoCommentImage}
              />
              <Link
                href="/items"
                className={styles.itemDetailNoCommentListBtnWrapper}
              >
                <Image
                  src="/btn_medium.png"
                  alt="route_list"
                  width={240}
                  height={48}
                  className={styles.itemDetailNoCommentListBtn}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
