import { useState } from 'react';
import { useRouter } from 'next/router';
import FleaMarketForm from '@/utils/FleaMarketForm';
import { postArticleApi } from '@/utils/api/articleApi.js';
import { useAuth } from '../../utils/AuthProvider';

export default function PostFleaArticlePage() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [imageValue, setImageValue] = useState([]);
  const [tagsValue, setTagsValue] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);
  useAuth(true);
  const router = useRouter();

  const categoryValue = 'fleamarket';

  const handleSubmit = async () => {
    try {
      const res = await postArticleApi({
        titleValue,
        contentValue,
        imageValue,
        priceValue,
        tagsValue,
        categoryValue,
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
          titleValue: titleValue,
          setTitleValue: setTitleValue,
          contentValue: contentValue,
          setContentValue: setContentValue,
          imageValue: imageValue,
          setImageValue: setImageValue,
          priceValue: priceValue,
          setPriceValue: setPriceValue,
          tagsValue: tagsValue,
          setTagsValue: setTagsValue,
        }}
      />
    </>
  );
}
