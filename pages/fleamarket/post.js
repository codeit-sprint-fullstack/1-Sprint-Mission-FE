import styles from '@/styles/ArticleFormFields.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { postArticleApi } from '@/utils/api/articleApi.js';
import { useAuth } from '../../utils/AuthProvider';
import Button from '@/utils/Button.js';
import TitleInput from '@/components/Post/TitleInput';
import FileInput from '@/components/Post/FileInput';
import ContentInput from '@/components/Post/ContentInput';
import PriceInput from '@/components/Post/PriceInput';
import TagsInput from '@/components/Post/TagsInput';

export default function PostFleaArticlePage() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: [],
    price: '',
  });

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await postArticleApi({
        title: values.title,
        content: values.content,
        image: values.image,
        price: values.price,
        tags: tags,
        category: 'fleamarket',
      });

      // console.log(res);

      // router.push(`/article/${res.id}`);
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
          <span className={styles.title}>상품 등록</span>
          <Button disabled={!canSubmit} label='등록' onClick={handleSubmit} />
        </div>
        <TitleInput values={values} onChange={onChange} />
        <ContentInput
          values={values}
          setValues={setValues}
          onChange={onChange}
        />
        <FileInput setValues={setValues} />
        <PriceInput values={values} onChange={onChange} />
        <TagsInput tags={tags} setTags={setTags} />
      </div>
    </>
  );
}
