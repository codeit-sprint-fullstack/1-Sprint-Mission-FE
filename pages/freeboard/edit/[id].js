import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleFormFields.module.css';
import Button from '@/utils/Button.js';
import TitleInput from '@/components/Post/TitleInput';
import ContentInput from '@/components/Post/ContentInput';
import { useGetArticle, useEditArticle } from '@/hooks/useFreeBoard';

export default function EditArticlePage() {
  const router = useRouter();

  const [canSubmit, setCanSubmit] = useState(true);
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: [],
  });

  const { id } = router.query;
  const { data, isLoading } = useGetArticle(id);
  const { editFreeBoardArticle } = useEditArticle({ id });

  const handleSubmit = () => {
    editFreeBoardArticle.mutate({
      id,
      title: values.title,
      content: values.content,
    });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setCanSubmit(values.title.trim() !== '' && values.content.trim() !== '');
  };

  useEffect(() => {
    if (data) {
      setValues({
        title: data.title,
        content: data.content,
        image: data.image,
      });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시물 수정</span>
        </div>
        <Button disabled={!canSubmit} label='수정' onClick={handleSubmit} />
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
