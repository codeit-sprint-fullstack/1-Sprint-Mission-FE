import { useState } from 'react';
import { useRouter } from 'next/router';
import FleaMarketForm from '@/utils/FleaMarketForm';
import { postArticleApi } from '@/utils/api/articleApi.js';
import { useAuth } from '../../utils/AuthProvider';

export default function PostFleaArticlePage() {
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: [],
    price: '',
  });
  const [canSubmit, setCanSubmit] = useState(false);
  useAuth(true);
  const router = useRouter();

  const categoryValue = 'fleamarket';

  const handleSubmit = async () => {
    try {
      const res = await postArticleApi({
        title: values.title,
        content: values.content,
        image: values.image,
        price: values.price,
        tags: tags,
        category: categoryValue,
      });

      // console.log(res);

      // router.push(`/article/${res.id}`);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <FleaMarketForm
        title={{
          label: '상품 등록하기',
        }}
        button={{
          disabled: !canSubmit,
          label: '등록',
          onClick: handleSubmit,
          setCanSubmit: setCanSubmit,
        }}
        content={{
          values,
          setValues,
          tags,
          setTags,
        }}
      />
    </>
  );
}
