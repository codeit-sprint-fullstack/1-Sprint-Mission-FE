import styles from './id.module.css';
import Image from 'next/image';
import {
  getProduct,
  deleteProduct,
  patchProduct,
  postfavorite,
} from '../api/products';
import { useEffect, useState } from 'react';
import {
  getComments,
  postComment,
  patchComment,
  deleteComment,
} from '../api/comments';
// import { getProfile } from "../api/user";
import { useRouter } from 'next/router';
import { Modal } from '../../components/modal';
import useForm from '../../hook/form';
import { getTimeDifference } from '../../utill/utill';
import { AxiosResponse, isAxiosError } from 'axios';
import { Product, ErrorResponse } from '../../pages/api/types/productTypes';
import { Comment } from '../../pages/api/types/commentTypes';

interface MarketProps {
  id: string;
}

export async function getServerSideProps(path: { params: { id: string } }) {
  const { id } = path.params;
  return {
    props: {
      id,
    },
  };
}

function isAxiosResponse<T>(response: any): response is AxiosResponse<T> {
  return response && 'data' in response && 'status' in response;
}

export default function Market({ id }: MarketProps) {
  const { values, handleChange, handleSubmit, resetForm, isSubmitting } =
    useForm({
      name: '',
      description: '',
      price: '',
      tags: '',
      content: '',
    });

  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  const [commentData, setCommentData] = useState<string>('');
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] =
    useState<boolean>(false);
  const [commentId, setCommentId] = useState<string | undefined>();
  const [isProductDeleteModalOpen, setIsProductDeleteModalOpen] =
    useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id); // 비동기 API 호출

        if (isAxiosResponse<{ product: Product }>(response)) {
          setProduct(response.data.product); // product 데이터를 올바르게 설정
        } else {
          console.error('제품 정보를 가져오는 중 오류 발생:', response);
        }
      } catch (error) {
        console.error('제품 정보를 가져오는 중 알 수 없는 오류 발생:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(id, 9); // 비동기 API 호출

        if (
          isAxiosResponse<{ message: string; comments: Comment[] }>(response)
        ) {
          // response가 AxiosResponse<{ message: string; comments: Comment[] }>인 경우
          setComments(response.data.comments); // `comments`에 접근해서 상태로 설정
        } else {
          console.error('댓글을 가져오는 중 오류 발생:', response);
        }
      } catch (error) {
        console.error('댓글을 가져오는 중 알 수 없는 오류 발생:', error);
      }
    };

    fetchComments();
  }, [id]);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentData(event.target.value);
  };

  const handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    setIsProductDeleteModalOpen(true);
  };

  const commentSubmitForm = async () => {
    try {
      if (!commentId) return;
      const res = await patchComment(commentId, {
        content: values.content,
      });
      if (isAxiosResponse<Comment>(res)) {
        if (res.status === 200) {
          resetForm();
          console.log('수정 성공', res.data);
          router.push(`/items/${id}`);
          setIsCommentsModalOpen(false);
        } else {
          console.log('수정 실패', res.data);
        }
      } else {
        console.error('댓글 수정 중 오류 발생:', res?.response?.data?.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm = async () => {
    if (!product) return;

    try {
      const tags = values.tags
        ? values.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean) // `filter(Boolean)`으로 undefined나 빈 문자열 필터링
        : product.tags;

      const res = await patchProduct(id, {
        name: values.name || product.name,
        description: values.description || product.description,
        price: values.price ? Number(values.price) : product.price,
        tags: tags.length ? tags : product.tags, // `tags`가 비어 있으면 기존 태그 유지
      });

      if (isAxiosResponse<Product>(res)) {
        if (res.status === 200) {
          setIsProductModalOpen(false);
          console.log('수정 성공', res.data);
          resetForm();
          router.reload();
        } else {
          console.log('수정 실패', res.data);
        }
      } else {
        console.error('수정 실패', res);
      }
    } catch (e) {
      console.error('에러', e);
    }
  };

  const handleCommentToggle = (index: number) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
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
        onClose={() => setIsCommentsModalOpen(false)}
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
        isModalOpen={checkModal}
        onClose={() => setCheckModal(!checkModal)}
      >
        <p>성공 했습니다.</p>
        <button onClick={() => setCheckModal(!checkModal)}>확인</button>
      </Modal>
      <Modal
        isModalOpen={isProductDeleteModalOpen}
        onClose={() => setIsProductDeleteModalOpen(!isProductDeleteModalOpen)}
      >
        <p>정말 삭제 하시겠습니까!!?</p>
        <button
          style={{ width: '50%', height: '50px' }}
          onClick={async () => {
            try {
              await deleteProduct(id);
              router.push('/market');
            } catch (error) {
              console.error('제품 삭제 오류', error);
            }
          }}
        >
          확인
        </button>
        <button
          style={{ width: '50%', height: '50px' }}
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
              <p>이미지를 불러오는 중...</p>
            )}
          </div>
          <div className={styles.marketProductTitle}>
            <div className={styles.marketTitle}>
              <p>{product?.name}</p>
              <Image
                onClick={handletoggle}
                src="/kebab-btn.svg"
                width={24}
                height={24}
                className={styles.menuBtn}
                alt="menu"
              />
              {isOpen && (
                <ul className={styles.menu}>
                  <li
                    onClick={() => setIsProductModalOpen(!isProductModalOpen)}
                  >
                    수정 하기
                  </li>

                  <li onClick={() => handleDelete()}>삭제 하기</li>
                </ul>
              )}
            </div>
            <div className={styles.marketPrice}>
              {(product?.price || 0) + '원'}
            </div>
            <div className={styles.marketContentName}>상품 소개</div>
            <div className={styles.marketContent}>{product?.description}</div>
            <div className={styles.marketTagName}>상품태그</div>
            <div className={styles.marketTag}>
              {product?.tags && product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <p className={styles.tag} key={index}>
                    #{tag}
                  </p>
                ))
              ) : (
                <p>태그가 없습니다.</p>
              )}
            </div>
            <div className={styles.marketProfile}>
              <div className={styles.marketProfileContainer}>
                <div>
                  <Image src="/MyImg.svg" width={40} height={40} alt="myImg" />
                </div>
                <div>
                  {product ? (
                    <>
                      <h1>{product.name}</h1>
                      <p>{product.description}</p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              <button
                className={styles.favorite}
                onClick={async () => {
                  await postfavorite(product?.id || '');
                  router.reload();
                }}
              >
                {'♡' + product?.favoriteCount}
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
              await postComment(product?.id || '', { content: commentData });
              router.reload();
            }}
          >
            등록
          </button>
          <div>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className={styles.marketArticleContainer}>
                  <div className={styles.marketArticleContent}>
                    <p className={styles.marketArticleContentTitle}>
                      {comment.content}
                    </p>{' '}
                    <Image
                      onClick={() => handleCommentToggle(index)}
                      src="/kebab-btn.svg"
                      width={24}
                      height={24}
                      className={styles.commentMenu}
                      alt="menu"
                    />
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
                            await deleteComment(comment.id);
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
                      <Image
                        src="/MyImg.svg"
                        width={40}
                        height={40}
                        alt="myImg"
                      />
                    </div>
                    <div className={styles.marketArticleProfileInfo}>
                      <p className={styles.marketArticleProfileName}>
                        {comment.nickname}
                      </p>{' '}
                      <p className={styles.marketArticleProfileDate}>
                        {getTimeDifference(comment.updatedAt)}
                      </p>{' '}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
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
