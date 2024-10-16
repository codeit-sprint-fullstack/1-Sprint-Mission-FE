import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleFormFields.module.css';
import { ArticleButton } from '@/utils/Button.js';
import TitleInput from '@/components/Post/TitleInput';
import FileInput from '@/components/Post/FileInput';
import PriceInput from '@/components/Post/PriceInput';
import TagsInput from '@/components/Post/TagsInput';
import ContentInput from '@/components/Post/ContentInput';
import { useGetArticle, useFleaMarketEditArticle } from '@/hooks/useFleaMarket';
import { useUserAuth } from '@/context/UserContextProvider';
import toast from 'react-hot-toast';

export default function EditArticlePage() {
  const router = useRouter();
  const [canSubmit, setCanSubmit] = useState(true);
  const [tags, setTags] = useState([]);

  const { id } = router.query;
  const { data, isLoading } = useGetArticle(id);
  const { editFleaMarketArticle } = useFleaMarketEditArticle({ id });
  const { user } = useUserAuth();
  const [values, setValues] = useState({
    title: '',
    content: '',
    price: '',
    images: [],
  });

  const handleSubmit = () => {
    editFleaMarketArticle.mutate({
      id,
      title: values.title,
      content: values.content,
      price: values.price,
      images: values.images || [],
      tags: values.tags || [],
    });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setCanSubmit(
      values.title.trim() !== '' &&
        values.content.trim() !== '' &&
        String(values.price).trim() !== ''
    );
  };

  useEffect(() => {
    if (data) {
      setValues({
        title: data.article.title,
        content: data.article.content,
        price: data.article.price,
        images: data.article.images,
      });
      setTags(data.article.tags);
    }
  }, [data]);

  useEffect(() => {
    if (data && user) {
      if (!user) {
        router.push('/login');
      } else if (user.id !== data.article.userId) {
        toast.error('권한이 없습니다!');
        router.push(`/fleamarket/${id}`);
      }
    }
  }, [user, router, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시물 수정</span>
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
        <FileInput values={values} setValues={setValues} />
        <PriceInput values={values} onChange={onChange} />
        <TagsInput tags={tags} setTags={setTags} />
      </div>
    </>
  );
}
