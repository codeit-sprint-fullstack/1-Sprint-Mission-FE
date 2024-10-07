import styles from '@/styles/ArticleFormFields.module.css';
import { useRef, useState } from 'react';
import Image from 'next/image';
import postImage from '@/public/post_imge.png';
import icImageDelete from '@/public/ic_image_delete.png';
import { useEffect } from 'react';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';

export default function FileInput({ values, setValues }) {
  const [showImages, setShowImages] = useState([]);
  const imageRef = useRef();

  const handleSelectImage = (event) => {
    const imageLists = event.target.files[0];
    const currentImageUrl = URL.createObjectURL(imageLists);

    let imageUrlLists = [...showImages];
    imageUrlLists.push(currentImageUrl);

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }

    setShowImages(imageUrlLists);
    setValues((prev) => ({
      ...prev,
      images: [...prev.images, imageLists],
    }));
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));

    setValues((prev) => ({
      ...prev,
      images: values.images.filter((_, index) => index !== id),
    }));
  };

  useEffect(() => {
    if (values.images && values.images.length > 0) {
      const updatedImages = values.images.map((image) => {
        if (typeof image === 'string') {
          return `https://sprint-be-ztdn.onrender.com/${image}`;
        }
        return URL.createObjectURL(image);
      });
      setShowImages(updatedImages);
    } else {
      setShowImages([]);
    }
  }, [values.images]);

  return (
    <div className={styles.fileInput}>
      <div className={styles.sectionTitle}>이미지</div>

      <input
        name='images'
        type='file'
        onChange={handleSelectImage}
        ref={imageRef}
        multiple
        accept='image/*'
        style={{ display: 'none' }}
      />

      <div className={styles.imageList}>
        <div
          onClick={() => imageRef.current.click()}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={postImage}
            alt='이미지 넣기 버튼'
            width={282}
            height={282}
          />
        </div>
        {showImages.map((image, id) => (
          <div key={id}>
            <Image
              src={image}
              width={282}
              height={282}
              alt={`${image}-${id}`}
              className={styles.imageValue}
            />
            <Image
              src={icImageDelete}
              alt='삭제 버튼'
              width={22}
              height={24}
              onClick={() => handleDeleteImage(id)}
              className={styles.imageDeleBtn}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
