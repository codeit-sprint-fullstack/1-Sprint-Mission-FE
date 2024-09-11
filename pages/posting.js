import CreatePostForm from '@/components/CreatePostForm';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Posting() {
  // CreatePostForm에 title과 content 상태, 그리고 상태 변경 함수 전달
  // CreatePostButton에 isFormValid 전달해서 버튼 설정(사용자 입력 부분이 비워져 있으면 disabled)
  // 등록버튼(CreatePostButton) 눌렀을 때 API 요청 후 해당 게시물 상세 페이지로 이동

  const [title, setTitle] = useState(''); // 제목 상태
  const [content, setContent] = useState(''); // 내용 상태
  const router = useRouter(); // useRouter를 사용해 페이지 이동 처리

  // 입력값이 모두 채워졌는지 확인
  const isFormValid = title.trim() !== '' && content.trim() !== '';

  // 게시글 등록 핸들러
  const handleSubmit = async () => {
    if (!isFormValid) return;

    // 자유게시판과 중고마켓 구분을 위한 category 설정
    let category;
    if (router.pathname === '/posting') {
      category = 'FREE_BOARD'; // '/postWriting'이면 category를 'FREE_MARKET'으로 고정
    } else {
      category = 'MARKET'; // 다른 경우에 category를 'MARKET;으로 설정
    }

    const res = await axios.post('/posts', {
      title: title,
      content: content,
      category: category,
      userId: 'db7a3df4-dff0-43bf-80d5-5b74b2216dd9', // 아직 로그인 기능이 없어서 게시글 생성할 때 마다 특정 유저와 연결
    });

    // 요청 성공 후 게시물 상세 페이지로 이동
    const postId = res.data.id;
    router.push(`/posts/${postId}`);
  };

  return (
    <CreatePostForm
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    />
  );
}
