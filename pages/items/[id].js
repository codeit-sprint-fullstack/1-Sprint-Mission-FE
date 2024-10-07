import styles from "./id.module.css";
import Image from "next/image";
import {
  getProduct,
  deleteProduct,
  patchProduct,
  postfavorite,
} from "../api/products";
import { useEffect, useState } from "react";
import {
  getComments,
  postComment,
  patchComment,
  deleteComment,
} from "../api/comments";
// import { getProfile } from "../api/user";
import { useRouter } from "next/router";
import { Modal } from "../../components/modal";
import useForm from "@/hook/form";
import { getTimeDifference } from "@/utill/utill";
export async function getServerSideProps(path) {
  const { id } = path.params;
  return {
    props: {
      id,
    },
  };
}
export default function Market({ id }) {
  const { values, handleChange, handleSubmit, resetForm, isSubmitting } =
    useForm({
      name: "",
      description: "",
      price: "",
      tags: "",
      content: "",
    });
  const [product, setProduct] = useState([]);
  const [comment, setComment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openComments, setOpenComments] = useState({});
  // const [userData, setUserData] = useState({});
  const [commentData, setCommentData] = useState({});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [CheckModal, setCheckModal] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState();
  const [isProductDeleteModalOpen, setIsProductDeleteModalOpen] =
    useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id); // 비동기 API 호출
        setProduct(response.data.product); // API 호출 후 데이터를 상태로 저장
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
        const response = await getComments(id, 9); // 비동기 API 호출
        setComment(response); // API 호출 후 데이터의 data 부분만 상태로 저장
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

  const handleDelete = async () => {
    setIsProductDeleteModalOpen(true);
  };

  const commentSubmitForm = async () => {
    console.log(commentId, values.content);
    try {
      const res = await patchComment(product.id, commentId, {
        content: values.content,
      });
      if (res && res.status === 200) {
        resetForm();
        console.log("수정 성공", res.data);
        router.reload();
        setIsCommentsModalOpen(false);
      } else {
        console.log("수정 실패", res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm = async () => {
    try {
      const res = await patchProduct(id, {
        name: values.name || product.name,
        description: values.description || product.description,
        price: values.price || product.price,
        tags: values.tags || product.tags,
      });
      if (res && res.status === 200) {
        setIsProductModalOpen(false);
        setCheckModal(true);
        console.log("수정 성공", res.data);
        resetForm();
        router.reload();
      } else {
        console.log("수정 실패", res.data);
      }
    } catch (e) {
      console.log("에러", e);
    }
  };
  const handleCommentToggle = (index) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 클릭된 인덱스의 상태만 토글
    }));
  };

  return (
    <>
      <Modal
        isModalOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <p>게시글 수정</p>
          <p>게시글 제목</p>
          <textarea
            name="name"
            value={values.name}
            onChange={handleChange}
          ></textarea>
          <p>가격</p>
          <textarea
            name="price"
            value={values.price}
            onChange={handleChange}
          ></textarea>
          <p>내용</p>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
          ></textarea>
          <p>태그</p>
          <textarea
            name="tags"
            value={values.tags}
            onChange={handleChange}
          ></textarea>
          <button>수정</button>
        </form>
      </Modal>
      <Modal
        isModalOpen={isCommentsModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      >
        <form onSubmit={handleSubmit(commentSubmitForm)}>
          <p>댓글 수정</p>

          <p>댓글 내용</p>
          <textarea
            name="content"
            value={values.content}
            onChange={handleChange}
          ></textarea>

          <button>수정</button>
        </form>
      </Modal>
      <Modal
        isModalOpen={CheckModal}
        onClose={() => setCheckModal(!CheckModal)}
      >
        <p>성공 했습니다.</p>
        <button onClick={() => setCheckModal(!CheckModal)}>확인</button>
      </Modal>
      <Modal
        isModalOpen={isProductDeleteModalOpen}
        onClose={() => setIsProductDeleteModalOpen(!isProductDeleteModalOpen)}
      >
        <p>정말 삭제 하시겠습니까!!?</p>
        <button
          style={{ width: "50%", height: "50px" }}
          onClick={async () => {
            try {
              await deleteProduct(id);
              router.push("/market");
            } catch (error) {
              console.error("제품 삭제 오류", error);
            }
          }}
        >
          확인
        </button>
        <button
          style={{ width: "50%", height: "50px" }}
          onClick={() => setIsProductDeleteModalOpen(!isProductDeleteModalOpen)}
        >
          취소
        </button>
      </Modal>
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
                  <li
                    onClick={() => setIsProductModalOpen(!isProductModalOpen)}
                  >
                    수정 하기
                  </li>

                  <li onClick={() => handleDelete(id)}>삭제 하기</li>
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
              <button
                className={styles.favorite}
                onClick={async () => {
                  await postfavorite(product.id);
                  // router.reload();
                }}
              >
                {"♡" + product.favoriteCount}
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
            onClick={async () => {
              await postComment(product.id, { content: commentData });
              // router.push(`/items/${product.id}`);
              // router.reload();
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
                  <Image
                    onClick={() => handleCommentToggle(index)}
                    src="/kebab-btn.svg"
                    width={24}
                    height={24}
                    className={styles.commentMenu}
                  ></Image>
                  {openComments[index] && (
                    <ul className={styles.menu}>
                      <li
                        onClick={() => {
                          setCommentId(comment.id);
                          setIsCommentsModalOpen(!isCommentsModalOpen);
                        }}
                      >
                        수정 하기
                      </li>
                      <li
                        onClick={async () => {
                          await deleteComment(product.id, comment.id);
                          console.log(comment.id);
                          router.reload();
                        }}
                      >
                        삭제 하기
                      </li>
                    </ul>
                  )}
                </div>
                <div className={styles.marketArticleProfileContainer}>
                  <div>
                    <Image src="/MyImg.svg" width={40} height={40} />{" "}
                  </div>
                  <div className={styles.marketArticleProfileInfo}>
                    <p className={styles.marketArticleProfileName}>
                      {comment.user.nickName}
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
