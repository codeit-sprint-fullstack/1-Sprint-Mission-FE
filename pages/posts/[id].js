import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const handleInputComment = (event) => {
    setInputComment(event.target.value);
  };

  const isFormValid = inputComment.trim() !== '';

  async function getPost(targetId) {
    const res = await axios.get(`/posts/${targetId}`);
    const result = res.data;
    setPost(result);
  }

  async function getComments(targetId) {
    const res = await axios.get(`/comments/free-board/${targetId}`);
    const result = res.data.comments ?? [];
    setComments(result);
  }

  useEffect(() => {
    if (!id) return;

    getPost(id);
    getComments(id);
  }, [id]);

  const handleBackButton = () => {
    router.push('/freeboard');
  };

  // 새로운 댓글 전송 및 상태 업데이트
  const handleSubmitComment = async () => {
    try {
      // 서버에 새 댓글 전송
      const res = await axios.post(`/comments/free-board/${id}`, {
        content: inputComment,
        userId: '723f8545-890d-4e0a-accc-4f1995122868',
      });
      const newComment = res.data; // 서버에서 반환된 새 댓글 데이터

      // 로컬 상태 업데이트 (새로운 댓글 추가)
      setComments((prevComments) => [newComment, ...prevComments]);

      // 댓글 입력란 초기화
      setInputComment('');
    } catch (error) {
      console.error('댓글 등록에 실패했습니다.', error);
    }
  };

  // 게시글 수정 내용 저장
  const handleSavePost = async ({ title, content }) => {
    try {
      setPost((prevPost) => ({ ...prevPost, title, content })); // 로컬 상태 업데이트
      await axios.patch(`/posts/${id}`, { title, content }); // 서버로 수정된 게시글 업데이트 요청
    } catch (error) {
      console.error('게시글 업데이트에 실패했습니다.', error);
    }
  };

  // 댓글 수정 내용 저장
  const handleSaveComment = async (commentId, updatedComment) => {
    try {
      // 로컬 상태 업데이트
      // 기존 댓글 목록을 순회하면서
      setComments((prevComments) =>
        prevComments.map((comment) =>
          // 수정하려는 댓글 ID와 일치하는 댓글을 찾으면
          comment.id === commentId
            ? // 해당 댓글의 content만 수정하여 새 객체 반환
              { ...comment, content: updatedComment }
            : // ID가 일치하지 않으면 기존 댓글 반환
              comment
        )
      );

      await axios.patch(`/comments/${commentId}`, {
        content: updatedComment,
      });
    } catch (error) {
      console.error('댓글 업데이트에 실패했습니다.', error);
    }
  };

  // 게시글 삭제 처리
  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      router.push('/freeboard');
    } catch (error) {
      console.error('게시글 삭제에 실패했습니다.', error);
    }
  };

  // 댓글 삭제 처리
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
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
            <div className={styles.commentBox} key={index}>
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
    </>
  );
}
