import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import axios from '@/lib/axios';
import Image from 'next/image';
import styles from '@/styles/Post.module.css';
import formatDate from '@/lib/formatDate';
import formatTimeDifference from '@/lib/formatTimeDifference';
import KebabDropdown from '@/components/KebabDropdown';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import Link from 'next/link';
import Head from 'next/head';
import profile from '@/public/ic_profile.svg';
import emptyComment from '@/public/Img_reply_empty.svg';
import backImg from '@/public/ic_back.svg';
import Spinner from '@/components/Spinner';
import {
  fetchPost,
  fetchComments,
  submitComment,
  updatePost,
  updateComment,
  deletePost,
  deleteComment,
} from '@/lib/api';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const post = await fetchPost(id);

    const initialComments = await fetchComments(id);

    return {
      props: {
        post,
        initialComments,
      },
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다(게시글 상세 페이지).', err);
    return {
      post: null,
      initialComments: [],
      error: '데이터를 불러오는 중 오류가 발생했습니다(게시글 상세 페이지).',
    };
  }
}

export default function Post({ post: initialPost, initialComments, error: initialError }) {
  const [post, setPost] = useState(initialPost); // 게시글 상태
  const [comments, setComments] = useState(initialComments || []); // 댓글 목록 상태
  const [inputComment, setInputComment] = useState(''); // 사용자로부터 입력된 댓글 상태
  const [hasMore, setHasMore] = useState(true); // 더 불로올 댓글이 있는지 확인
  const [loading, setLoading] = useState(false); //  댓글 로딩 상태
  const [error, setError] = useState(initialError || null); // 에러 상태
  const observerRef = useRef(null); // IntersectionObserver 참조
  const lastCommentRef = useRef(null); // 마지막 댓글 요소 참조

  const router = useRouter();
  const { id } = router.query;

  // 댓글 입력 처리 함수
  const handleInputComment = (event) => {
    setInputComment(event.target.value);
  };

  // 댓글 등록 버튼 활성화 여부
  const isFormValid = inputComment.trim() !== '';

  // 목록으로 돌아가기 버튼을 눌렀을 때 자유게시판 페이지로 이동
  const handleBackButton = () => {
    router.push('/freeboard');
  };

  // 댓글 불러오기(무한 스크롤 기반)
  async function getComments(targetId, cursor = null) {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`/comments/free-board/${targetId}`, {
        params: {
          cursor: cursor, // 마지막 댓글 ID
          take: 5, // 한 번에 불러올 댓글 수
        },
      });
      const nextComments = res.data.comments ?? [];

      // 중복된 댓글을 제거하여 댓글 목록을 업데이트
      setComments((prevComments) => {
        // set: 중복 허용하지 않음, 여기서 이전에 불러온 댓글들의 id 값만을 모아서 배열을 만듬
        const commentIds = new Set(prevComments.map((comment) => comment.id));
        // 새롭게 가져온 댓글이 기존 댓글 목록에 있는지 확인, true면 제외, false면 유지
        const newComments = nextComments.filter((comment) => !commentIds.has(comment.id));
        return [...prevComments, ...newComments];
      });

      setHasMore(nextComments.length > 0); // 더 불러올 댓글이 있는지 확인
    } catch (err) {
      console.error('댓글을 불러오는 중 오류 발생:', err);
      setError('댓글을 불러오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  }

  // 무한 스크롤을 위한 IntersectionObserver 설정
  useEffect(() => {
    if (loading || !hasMore) return; // 로딩 중이거나 더 불러올 댓글이 없으면 중지

    if (observerRef.current) observerRef.current.disconnect(); // 기존 옵저버 해제

    observerRef.current = new IntersectionObserver((entires) => {
      if (entires[0].isIntersecting) {
        // 마지막 댓글이 화면에 보일 때 추가 댓글 요청
        const lastComment = comments[comments.length - 1];
        if (lastComment) {
          getComments(id, lastComment.id); // 마지막 댓글 ID를 cursor로 전달
        }
      }
    });

    if (lastCommentRef.current) {
      observerRef.current.observe(lastCommentRef.current); // 마지막 댓글 요소에 옵저버 연결
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect(); // 컴포넌트 언마운트 시 옵저버 해제
    };
  }, [comments, loading, hasMore]);

  // 새로운 댓글 전송 및 상태 업데이트
  const handleSubmitComment = async () => {
    try {
      const newComment = await submitComment(
        id,
        inputComment,
        '723f8545-890d-4e0a-accc-4f1995122868'
      ); // 테스트용 userId
      setComments((prevComments) => [newComment, ...prevComments]);
      setInputComment('');
    } catch (err) {
      console.error('댓글 등록에 실패했습니다.', err);
      setError('댓글 등록에 실패했습니다.');
    }
  };

  // 게시글 수정 내용 저장
  const handleSavePost = async ({ title, content }) => {
    try {
      setPost((prevPost) => ({ ...prevPost, title, content }));
      await updatePost(id, title, content);
    } catch (err) {
      console.error('게시글 업데이트에 실패했습니다.', err);
    }
  };

  // 댓글 수정 내용 저장
  const handleSaveComment = async (commentId, updatedComment) => {
    try {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, content: updatedComment } : comment
        )
      );
      await updateComment(commentId, updatedComment);
    } catch (err) {
      console.error('댓글 업데이트에 실패했습니다.', err);
    }
  };

  // 게시글 삭제 처리
  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      router.push('/freeboard');
    } catch (err) {
      console.error('게시글 삭제에 실패했습니다.', err);
    }
  };

  // 댓글 삭제 처리
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다.', error);
    }
  };

  if (!post) return null;

  return (
    <>
      <Head>
        <title>판다마켓 - 게시글 상페 페이지</title>
      </Head>
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <h4 className={styles.titleName}>{post.title}</h4>
          <KebabDropdown
            initialTitle={post.title}
            initialContent={post.content}
            onSave={handleSavePost} // 게시글 저장 처리
            onDelete={handleDeletePost}
            isPost={true} // 게시글 수정
          />
        </div>

        <div className={styles.userContainer}>
          <div className={styles.profileWrapper}>
            <Image src={profile} alt="프로필 이미지" fill />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{post.username}</p>
            <p className={styles.date}>{formatDate(new Date(post.createdAt))}</p>
          </div>
          <div className={styles.likeContainer}>
            <button className={styles.like}>❤️123</button>
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div>{post.content}</div>
      </div>

      <div className={styles.inputCommentContainer}>
        <h4 className={styles.inputCommentTitle}>댓글달기</h4>
        <div className={styles.inputComment}>
          <Textarea
            className={styles.inputCommentTextarea}
            name="comment"
            value={inputComment}
            onChange={handleInputComment}
            placeholder="댓글을 입력해주세요"
          />
          <Button
            className={styles.inputCommentButton}
            name="등록"
            onClick={handleSubmitComment}
            disabled={!isFormValid}
          />
        </div>
      </div>

      <ul className={styles.commentContainer}>
        {comments.length === 0 ? (
          <div className={styles.emptyCommentContainer}>
            <div className={styles.emptyCommentWrapper}>
              <Image src={emptyComment} alt="댓글이 없음을 알려주는 이미지" />
            </div>
            <p className={styles.emptyCommentContent}>
              아직 댓글이 없어요, <br />
              지금 댓글을 달아보세요!
            </p>
            <div>
              <Button
                className={styles.backButton}
                name="목록으로 돌아가기"
                onClick={handleBackButton}
              />
              <div className={styles.backImgWrapper}>
                <Link href="/freeboard">
                  <Image className={styles.backImg} src={backImg} alt="뒤로가기 아이콘" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div
              className={styles.commentBox}
              key={index}
              ref={index === comments.length - 1 ? lastCommentRef : null}
            >
              <div className={styles.commentContent}>
                <li>{comment.content}</li>
                <KebabDropdown
                  initialContent={comment.content} // 댓글 내용만 전달
                  onSave={(updatedData) => handleSaveComment(comment.id, updatedData.content)} // 댓글 저장 처리
                  onDelete={() => handleDeleteComment(comment.id)} // 댓글 삭제
                  isPost={false} // 댓글 수정
                />
              </div>

              <div className={styles.commentUserInfo}>
                <div className={styles.commentUserProfile}>
                  <Image src={profile} alt="프로필 이미지" fill />
                </div>
                <div className={styles.commentUserName}>
                  <p className={styles.user}>{comment.username}</p>
                  <p className={styles.time}>{formatTimeDifference(comment.createdAt)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </ul>

      {loading && <Spinner />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
