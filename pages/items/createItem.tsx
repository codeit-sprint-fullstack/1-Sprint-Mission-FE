import styles from './createItem.module.css';
import Image from 'next/image';
import useForm from '../../hook/form';
import {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
} from 'react';
import { postProduct } from '../api/products';
import { AxiosResponse } from 'axios';
import { ErrorResponse, Product } from '../../pages/api/types/productTypes';

function isAxiosResponse<T>(response: any): response is AxiosResponse<T> {
  return response && 'status' in response && 'data' in response;
}

interface SelectedImage {
  id: string;
  url: string;
}

interface Tag {
  id: string;
  text: string;
}

interface FormValues {
  name: string;
  price: number;
  images: string[];
  tags: string[];
  description: string;
}

export default function CreateItem() {
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    isSubmitting,
  } = useForm<FormValues>({
    name: '',
    price: 0,
    images: [],
    tags: [],
    description: '',
  });

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const generateUUID = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);

    if (selectedImages.length + files.length > 3) {
      alert('이미지는 최대 3개까지 등록할 수 있습니다.');
      return;
    }

    const newImagesPromises = files.map((file) => {
      return new Promise<SelectedImage>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve({ id: generateUUID(), url: reader.result as string });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagesPromises).then((loadedImages) => {
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages, ...loadedImages].slice(0, 3);
        const imageUrls = updatedImages.map((image) => image.url);

        setValues((prevValues) => ({
          ...prevValues,
          images: imageUrls,
        }));

        return updatedImages;
      });
    });
  };

  const handleRemoveImage = (id: string): void => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      if (tags.length < 3) {
        const newTag = { id: generateUUID(), text: inputValue.trim() };

        setTags((prevTags) => {
          const updatedTags = [...prevTags, newTag];
          const tagsText = updatedTags.map((tag) => tag.text);

          setValues((prevValues) => ({
            ...prevValues,
            tags: tagsText,
          }));

          return updatedTags;
        });

        setInputValue('');
      } else {
        setInputValue('');
        alert('태그는 최대 3개까지만 추가할 수 있습니다.');
      }
    }
  };

  const handleRemoveTag = (id: string): void => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const validate = (): { [key: string]: string } => {
    const validationErrors: { [key: string]: string } = {};

    if (!values.name) {
      validationErrors.name = '상품 이름을 입력해주세요.';
    } else if (values.name.length < 2) {
      validationErrors.name = '상품 이름 2글자 이상 입력해주세요.';
    }

    if (!values.description) {
      validationErrors.description = '상품 설명을 입력해주세요.';
    } else if (values.description.length < 2) {
      validationErrors.description = '상품 설명을 2글자 이상 입력해주세요.';
    }

    if (!values.price) {
      validationErrors.price = '가격을 입력해주세요.';
    } else if (values.price < 0) {
      validationErrors.price = '가격은 0 이상이어야 합니다.';
    }

    if (selectedImages.length < 1) {
      validationErrors.images = '이미지를 입력해주세요.';
    }

    return validationErrors;
  };

  const submitForm = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await postProduct({
          name: values.name,
          description: values.description,
          price: values.price,
          tags: tags.map((tag) => tag.text),
          images: selectedImages.map((image) => image.url),
        });
        if (isAxiosResponse<Product>(res)) {
          if (res.status === 201) {
            resetForm();
            console.log('상품 등록 성공', res.data);
          } else {
            console.log('상품 등록 실패', res.data);
          }
        } else {
          // res가 ErrorResponse인 경우 에러 메시지 로그

          console.error('상품 등록 실패', res);
        }
      } catch (e) {
        console.error('에러 발생', e);
      }
    } else {
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onKeyDown={(e: KeyboardEvent<HTMLFormElement>) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(submitForm)}
      >
        <div className={styles.createItem}>
          <p>상품 등록하기</p>
          <button type="submit">등록</button>
        </div>
        <p>상품 이미지</p>
        <div className={styles.fromTitle}>
          <div className={styles.uploadContainer}>
            <label className={styles.imageUpload}>
              <span className={styles.uploadText}>+</span>
              <span className={styles.uploadDescription}>이미지 등록</span>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleImageChange}
                multiple
              />
            </label>

            {selectedImages.length > 0 && (
              <div className={styles.imageList}>
                {selectedImages.map((image) => (
                  <div key={image.id} className={styles.imagePreview}>
                    <img
                      src={image.url}
                      alt="미리보기"
                      className={styles.previewImage}
                    />
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveImage(image.id)}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {errors.images && <p className={styles.error}>{errors.images}</p>}
        <div className={styles.inputTitle}>
          <p>상품명</p>
          <input
            placeholder="상품명을 입력해주세요"
            className={styles.inputStyle}
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
          <p>상품 소개</p>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            className={styles.areaContent}
            name="description"
            onChange={handleChange}
            value={values.description}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
          <p>판매가격</p>
          <input
            placeholder="판매 가격을 입력해주세요"
            className={styles.inputStyle}
            name="price"
            type="number"
            onChange={handleChange}
            value={values.price}
          />
          {errors.price && <p className={styles.error}>{errors.price}</p>}
          <p>태그</p>
          <input
            placeholder="태그를 입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.inputStyle}
          />
        </div>
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <div key={tag.id} className={styles.tag}>
              #{tag.text}
              <button
                className={styles.removeTagButton}
                onClick={() => handleRemoveTag(tag.id)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
