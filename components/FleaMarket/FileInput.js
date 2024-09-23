import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function FileInput({ value, setValues }) {
  const [preview, setPreview] = useState();

  const imageRef = useRef();

  const handleChange = (e) => {
    const imageValue = e.target.files[0];
    setValues((prev) => ({
      ...prev,
      images: imageValue,
    }));
  };

  const handleClearClick = () => {
    const inputNode = imageRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    setValues((prev) => ({
      ...prev,
      images: null,
    }));
  };

  useEffect(() => {
    if (value.length === 0) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);

  console.log(value);

  return (
    <div>
      {value.length > 0 && (
        <Image src={preview} width={300} height={300} alt='이미지 미리보기' />
      )}

      <input name='image' type='file' onChange={handleChange} ref={imageRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
