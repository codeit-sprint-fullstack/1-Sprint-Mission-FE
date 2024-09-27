import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleFormFields.module.css';
import Button from '@/utils/Button.js';
import TitleInput from '@/components/Post/TitleInput';
import FileInput from '@/components/Post/FileInput';
import PriceInput from '@/components/Post/PriceInput';
import TagsInput from '@/components/Post/TagsInput';
import ContentInput from '@/components/Post/ContentInput';
import { useGetArticle, useFleaMarketEditArticle } from '@/hooks/useFleaMarket';

export default function EditArticlePage() {
  const router = useRouter();

  const [canSubmit, setCanSubmit] = useState(true);
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    title: '',
    content: '',
    price: '',
    image: [],
  });
  const { id } = router.query;
  const { data, isLoading } = useGetArticle(id);
  const { editFleaMarketArticle } = useFleaMarketEditArticle({ id });

  const handleSubmit = () => {
    editFleaMarketArticle.mutate({
      id,
      title: values.title,
      content: values.content,
      price: values.price,
      image: values.image || [],
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
        values.price.trim() !== ''
    );
  };

  useEffect(() => {
    if (data) {
      setValues({
        title: data.title,
        content: data.content,
        price: data.price,
        image: data.image,
      });
      setTags(data.tags);
    }
  }, [data]);

  console.log(tags);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시물 수정</span>
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
