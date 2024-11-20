import styles from './id.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getArticleId, deleteArticle, postFavorite } from '../api/articles';

import {
  postArticleComment,
  deleteArticleComment,
  patchArticleComment,
} from '../api/comments';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Modal from '../../components/articles/articleModal';
import CommentModal from '../../components/articles/articleCommentModal';

interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  name: string;
  articleId: string;
  userId: string;
}

interface Article {
  id: string;
  name: string; // `title`에서 `name`으로 변경됨
  userId: string; // `authorId`에서 `userId`로 변경됨
  content: string;
  createdAt: string;
  updatedAt?: string;
  favoriteCount: number;
  comment: CommentType[]; // `comments`에서 `comment`로 변경됨
}

interface ModalDataType {
  id: string;
  commentsId: string;
}

interface PostProps {
  id: string;
}

let pageSize = 3;

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}

export default function Post({ id }: PostProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalDataType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  const [data, setData] = useState<Article | null>(null);
  const [date, setDate] = useState<string>(''); // 바로 추가하려고했으나 {.slice(0, 10)}에서 오류가 발생.. 이유 못찾음
  const [commentContent, setCommentContent] = useState<string>('');
  const [commentData, setCommentData] = useState<CommentType[]>([]);
  const [btnState, setBtnState] = useState<string>('commentBtn');
  const router = useRouter();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    // 스크롤 이벤트 핸들러 추가
    window.addEventListener('scroll', handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 핸들러 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY === document.body.offsetHeight &&
      !isFetching
    ) {
      // 끝에 도달했는지 확인
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) return;

    // 여기서 데이터를 로드하거나 API 호출 가능
    pageSize += 3;

    // 데이터 로드가 끝나면 isFetching 상태를 false로 설정
    setTimeout(() => {
      setIsFetching(false);
    }, 2000); // 임의의 지연 시간 추가
  }, [isFetching]);

  const article = async () => {
    const response = await getArticleId(id, pageSize);
    if ('data' in response) {
      const articleData = response.data.article;
      setDate(articleData.createdAt.slice(0, 10));
      setData(articleData as Article);
      setCommentData(articleData.comment);
    }
  };

  useEffect(() => {
    article();
  }, [commentData]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
  };

  const commentPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      content: commentContent,
    };

    try {
      await postArticleComment(id, data);
      setCommentContent('');
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCommentToggle = (index: number) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 클릭된 인덱스의 상태만 토글
    }));
  };

  const movePage = () => {
    router.push(`/`);
  };

  const handlePatch = () => {
    setIsModalOpen(true);
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    await deleteArticle(id);
    setIsOpen(!isOpen);
    movePage();
  };

  const handlePatchComment = (index: number) => {
    const comment = commentData[index];
    setIsModalOpen2(true);
    setModalData({ id: comment.articleId, commentsId: comment.id });

    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleDeleteComment = async (index: number) => {
    const commentId = commentData[index].id;
    const res = await deleteArticleComment(commentId);
    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    if ('status' in res && (res.status === 200 || res.status === 204)) {
      setOpenComments((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    } else if (
      'response' in res &&
      (res.response?.status === 500 || res.response?.status === 404)
    ) {
      console.log('error:', res.response?.data?.message || 'Unknown error');
    }
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  useEffect(() => {
    if (commentContent.length > 1) {
      setBtnState('commentBtntrue');
    } else {
      setBtnState('commentBtn');
    }
  }, [commentContent]);

  return (
    <>
      <div className={styles.postContainer}>
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          id={data?.id || ''}
        />
        <CommentModal
          isOpen={isModalOpen2}
          closeModal={closeModal}
          id={modalData?.id || ''}
          commentsId={modalData?.commentsId || ''}
        />
        <div className={styles.pstInfo}>
          <div className={styles.posttop}>
            <p>{data?.name}</p>
            <Image
              onClick={handleToggle}
              src="/kebab-btn.svg"
              width={24}
              height={24}
              className={styles.menuBtn}
              alt="Menu Button"
            />
            {isOpen && (
              <ul className={styles.menu}>
                <li onClick={handlePatch}>수정 하기</li>
                <li onClick={handleDelete}>삭제 하기</li>
              </ul>
            )}
          </div>
          <div className={styles.postmiddle}>
            <div className={styles.posttitle}>
              <Image
                className={styles.postImg}
                src="/MyImg.svg"
                width={40}
                height={40}
                alt="My Profile"
              />
              <p className={styles.titlename}>{data?.userId}</p>
              <p className={styles.titledate}>{date}</p>
            </div>
            <div>
              <button
                className={styles.likebtn}
                onClick={() => postFavorite(data?.id || '')}
              >
                ♡ {data?.favoriteCount}
              </button>
            </div>
          </div>
          <div className={styles.postcontent}>
            <p>{data?.content}</p>
          </div>
        </div>
        <div className={styles.commentContainer}>
          <p className={styles.commentTitle}>댓글 달기</p>
          <form className={styles.commentForm} onSubmit={commentPost}>
            <div className={styles.commentContent}>
              <textarea
                value={commentContent}
                onChange={handleComment}
                className={styles.commentInput}
                placeholder="댓글을 입력해주세요"
              />
              <button
                type="submit"
                className={styles[btnState]}
                disabled={btnState === 'commentBtn'}
              >
                등록
              </button>
            </div>
          </form>
        </div>
        <div className={styles.commentList}>
          {commentData.map((comment, index) => (
            <div className={styles.commentItemStyle} key={comment.id}>
              <div className={styles.commenttop}>
                <p>{comment.content}</p>
                <Image
                  onClick={() => handleCommentToggle(index)}
                  src="/kebab-btn.svg"
                  width={24}
                  height={24}
                  className={styles.commentmenu}
                  alt="Comment Menu"
                />
                {openComments[index] && (
                  <ul className={styles.menu}>
                    <li onClick={() => handlePatchComment(index)}>수정 하기</li>
                    <li onClick={() => handleDeleteComment(index)}>
                      삭제 하기
                    </li>
                  </ul>
                )}
              </div>
              <div className={styles.commentItem}>
                <Image
                  className={styles.commentImg}
                  src="/MyImg.svg"
                  width={32}
                  height={32}
                  alt="My Profile"
                />
                <div className={styles.commentmiddle}>
                  <p className={styles.commentname}>{comment.name}</p>
                  <p className={styles.commentdate}>
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.commentbottom}>
          <button onClick={movePage} className={styles.commentbottomBtn}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
