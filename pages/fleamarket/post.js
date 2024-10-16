import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleFormFields.module.css';
import { ArticleButton } from '@/utils/Button.js';
import TitleInput from '@/components/Post/TitleInput';
import ContentInput from '@/components/Post/ContentInput';
import { useFleaMarketPostArticle } from '@/hooks/useFleaMarket';
import FileInput from '@/components/Post/FileInput';
import PriceInput from '@/components/Post/PriceInput';
import TagsInput from '@/components/Post/TagsInput';
import { useUserAuth } from '@/context/UserContextProvider';

export default function PostFleaArticlePage() {
  const [isPostSubmit, setIsPostSubmit] = useState(false);
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    title: '',
    content: '',
    price: '',
    images: [],
  });
  const { user, isPending } = useUserAuth();
  const router = useRouter();

  const { postArticle } = useFleaMarketPostArticle();

  const handleSubmit = async () => {
    try {
      const newPost = {
        title: values.title,
        content: values.content,
        price: values.price,
        images: values.images || [],
        tags: tags || [],
        userId: user.id,
      };
      postArticle(newPost);
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

    setIsPostSubmit(
      values.title.trim() !== '' &&
        values.content.trim() !== '' &&
        values.price.trim() !== ''
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // toast.error('로그인을 해야 합니다.');
        router.push('/login'); //비동기
      }
    };

    fetchData();
  }, [router]);

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시물 등록</span>
        </div>
        <ArticleButton
          disabled={!isPostSubmit}
          label='등록'
          onClick={handleSubmit}
        />
        <FileInput values={values} setValues={setValues} />
        <TitleInput values={values} onChange={onChange} />
        <ContentInput
          values={values}
          setValues={setValues}
          onChange={onChange}
        />

        <PriceInput values={values} onChange={onChange} />
        <TagsInput tags={tags} setTags={setTags} />
      </div>
    </>
  );
}
