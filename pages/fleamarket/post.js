import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleFormFields.module.css';
import Button from '@/utils/Button.js';
import TitleInput from '@/components/Post/TitleInput';
import ContentInput from '@/components/Post/ContentInput';
import { useFleaMarketPostArticle } from '@/hooks/useFleaMarket';
import { useAuth } from '@/utils/AuthProvider';
import FileInput from '@/components/Post/FileInput';
import PriceInput from '@/components/Post/PriceInput';
import TagsInput from '@/components/Post/TagsInput';

export default function PostFleaArticlePage() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    title: '',
    content: '',
    price: '',
    image: [],
  });

  const router = useRouter();
  const { user } = useAuth();

  const { postArticle } = useFleaMarketPostArticle();

  const handleSubmit = async () => {
    try {
      const newPost = {
        title: values.title,
        content: values.content,
        price: values.price,
        image: values.image || [],
        tags: tags || [],
        userId: '86d761e4-a9d0-4082-96dd-cf6f2c931673',
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

    setCanSubmit(
      values.title.trim() !== '' &&
        values.content.trim() !== '' &&
        values.price.trim() !== ''
    );
  };

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시물 등록</span>
        </div>
        <Button disabled={!canSubmit} label='등록' onClick={handleSubmit} />
        <TitleInput values={values} onChange={onChange} />
        <ContentInput
          values={values}
          setValues={setValues}
          onChange={onChange}
        />
        <FileInput setValues={setValues} onChange={onChange} />
        <PriceInput values={values} onChange={onChange} />
        <TagsInput tags={tags} setTags={setTags} />
      </div>
    </>
  );
}
