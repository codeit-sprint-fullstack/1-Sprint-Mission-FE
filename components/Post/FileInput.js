import styles from '@/styles/ArticleFormFields.module.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import postImage from '@/public/post_imge.png';

export default function FileInput({ setValues }) {
  const [preview, setPreview] = useState('');
  const imageRef = useRef();

  const handleChange = (e) => {
    const imageValue = e.target.files[0];
    setValues((prev) => ({
      ...prev,
      image: imageValue,
    }));

    if (imageValue) {
      const uploadPreview = URL.createObjectURL(imageValue);
      setPreview(uploadPreview);
    }
  };

  const handleClearClick = () => {
    const inputNode = imageRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    setValues((prev) => ({
      ...prev,
      image: null,
    }));
    setPreview('');
  };

  return (
    <div>
      <div className={styles.sectionTitle}>이미지</div>
      {preview && (
        <Image src={preview} width={300} height={300} alt='이미지 미리보기' />
      )}

      <input
        name='image'
        type='file'
        onChange={handleChange}
        ref={imageRef}
        multiple
        style={{ display: 'none' }}
      />

      <div
        onClick={() => imageRef.current.click()}
        style={{ cursor: 'pointer' }}
      >
        <Image
          src={postImage}
          alt='이미지 넣기 버튼'
          style={{ display: preview ? 'none' : 'block' }}
        />
      </div>
      {preview && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
