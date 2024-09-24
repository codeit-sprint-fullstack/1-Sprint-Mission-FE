import styles from "./id.module.css";
import Image from "next/image";
import { getProduct } from "../api/products";
import { useEffect, useState } from "react";
import { getComments, postComment } from "../api/comments";
// import { getProfile } from "../api/user";
import { useRouter } from "next/router";
export async function getServerSideProps(path) {
  const { id } = path.params;
  return {
    props: {
      id,
    },
  };
}
export default function Market({ id }) {
  const [product, setProduct] = useState([]);
  const [comment, setComment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [userData, setUserData] = useState({});
  const [commentData, setCommentData] = useState({});

  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id); // 비동기 API 호출
        setProduct(response.data); // API 호출 후 데이터를 상태로 저장
        // const profile = await getProfile(); // 비동기 함수 호출
        // setUserData(profile); // 프로필 데이터를 상태로 저장
      } catch (error) {
        console.error("제품 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(id, 10); // 비동기 API 호출
        setComment(response.data.list); // API 호출 후 데이터의 data 부분만 상태로 저장
      } catch (error) {
        console.error("댓글 오류", error);
      }
    };

    fetchComments();
  }, []); // 처음 컴포넌트가 마운트될 때 한 번 실행

  const handleContentChange = (event) => {
    setCommentData(event.target.value);
  };

  const handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const getTimeDifference = (createdAt) => {
    const now = new Date(); // 현재 시간
    const createdDate = new Date(createdAt); // createdAt을 Date 객체로 변환

    const diffInMs = now - createdDate; // 밀리초 차이 계산
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60); // 분 차이
    const diffInHours = Math.floor(diffInMinutes / 60); // 시간 차이
    const diffInDays = Math.floor(diffInHours / 24); // 일 차이

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  };

  return (
    <>
      <div className={styles.marketContainer}>
        <div className={styles.marketProductContainer}>
          <div className={styles.itemImg}>
            {product && product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                width={486}
                height={486}
                alt="제품 이미지"
              />
            ) : (
              <p>이미지를 불러오는 중...</p> // 제품 이미지가 없을 경우 처리
            )}
          </div>
          <div className={styles.marketProductTitle}>
            <div className={styles.marketTitle}>
              <p>{product.name}</p>
              <Image
                onClick={handletoggle}
                src="/kebab-btn.svg"
                width={24}
                height={24}
                className={styles.menuBtn}
              ></Image>
              {isOpen && (
                <ul className={styles.menu}>
                  <li onClick={() => handlepatch(data.id)}>수정 하기</li>
                  <li onClick={() => handleDelete(data.id)}>삭제 하기</li>
                </ul>
              )}
            </div>
            <div className={styles.marketPrice}>
              {parseInt(product.price).toLocaleString() + "원"}
            </div>
            <div className={styles.marketContentName}>상품 소개</div>
            <div className={styles.marketContent}>{product.description}</div>
            <div className={styles.marketTagName}>상품태그</div>
            <div className={styles.marketTag}>
              {product.tags && product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <p className={styles.tag} key={index}>
                    #{tag}
                  </p> // 각 태그에 대해 p 태그 생성
                ))
              ) : (
                <p>태그가 없습니다.</p>
              )}
            </div>

            <div className={styles.marketProfile}>
              <div className={styles.marketProfileContainer}>
                <div>
                  <Image src="/MyImg.svg" width={40} height={40}></Image>
                </div>
                <div>
                  <p>{product.ownerNickname}</p>
                  <p>{getTimeDifference(product.createdAt)}</p>
                </div>
              </div>
              <button className={styles.favorite}>
                {product.favoriteCount}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.marketArticle}>
          <p className={styles.marketArticleTitle}>문의하기</p>
          <textarea
            className={styles.marketArticleTextarea}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민협사상 책임을 게시자에게 있습니다."
            onChange={handleContentChange}
          ></textarea>
          <button
            className={styles.marketArticleBtn}
            onClick={() => {
              postComment(product.id, { content: commentData });
              router.push(`/items/${product.id}`);
            }}
          >
            등록
          </button>
          <div>
            {comment.map((comment, index) => (
              <div key={index} className={styles.marketArticleContainer}>
                <div className={styles.marketArticleContent}>
                  <p className={styles.marketArticleContentTitle}>
                    {comment.content}
                  </p>{" "}
                  <Image src="/kebab-btn.svg" width={20} height={20} />
                </div>
                <div className={styles.marketArticleProfileContainer}>
                  <div>
                    <Image src="/MyImg.svg" width={40} height={40} />{" "}
                  </div>
                  <div className={styles.marketArticleProfileInfo}>
                    <p className={styles.marketArticleProfileName}>
                      {comment.writer.nickname}
                    </p>{" "}
                    <p className={styles.marketArticleProfileDate}>
                      {getTimeDifference(comment.updatedAt)}
                    </p>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.marketArticleFooter}>
            <button
              className={styles.marketArticleFooterBtn}
              onClick={() => router.push(`/market`)}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
