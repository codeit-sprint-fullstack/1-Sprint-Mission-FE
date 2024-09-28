import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleFormFields.module.css';
import { ArticleButton } from '@/utils/Button.js';
import TitleInput from '@/components/Post/TitleInput';
import ContentInput from '@/components/Post/ContentInput';
import { useEditArticle } from '@/hooks/useFreeBoard';
import { useAuth } from '@/utils/AuthProvider';

export default function PostArticlePage() {
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: [],
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const { postComment } = useEditArticle({ id });

  const handleSubmit = async () => {
    try {
      const newPost = {
        title: values.title,
        content: values.content,
        userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
      };
      postComment(newPost);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setCanSubmit(values.title.trim() !== '' && values.content.trim() !== '');
  };

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시물 등록</span>
        </div>
        <ArticleButton
          disabled={!canSubmit}
          label='등록'
          onClick={handleSubmit}
        />
        <TitleInput values={values} onChange={onChange} />
        <ContentInput
          values={values}
          setValues={setValues}
          onChange={onChange}
        />
      </div>
    </>
  );
}
