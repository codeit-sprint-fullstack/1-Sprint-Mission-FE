import CreatePostButton from '@/components/CreatePostButton';
import CreatePostForm from '@/components/CreatePostForm';
import { useState } from 'react';

export default function Writing() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 입력값이 모두 채워졌는지 확인
  const isFormValid = title.trim() !== '' && content.trim() !== '';

  return (
    <>
      <CreatePostButton isFormValid={isFormValid} />
      <CreatePostForm title={title} content={content} setTitle={setTitle} setContent={setContent} />
    </>
  );
}
