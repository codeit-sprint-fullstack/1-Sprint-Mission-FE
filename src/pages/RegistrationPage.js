import React, { useState } from 'react';
import './RegistrationPage.css';
import { createProduct } from '../api/api';
import ItemsPageHeader from '../components/ItemsPageHeader';
import useFormValidation from '../hooks/useFormValidation';

const INITIAL_VALUES = {
  name: '',
  description: '',
  price: '',
  tags: '',
};

function RegistrationPage() {
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  /* 커스텀 훅 호출*/
  const { values, setValues, errors, validate } = useFormValidation(INITIAL_VALUES);

  // 입력 필드 변경시, 상태 업데이트 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 태그 추가하는 핸들러
  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && values.tags.trim()) {
      setTags((prevTags) => [...prevTags, values.tags.trim()]);
      setValues((prevValues) => ({
        ...prevValues,
        tags: '',
      }));
      e.preventDefault();
    }
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  // 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 유효성 검사 실패시
    if (!validate()) {
      return;
    }
  
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('tags', tags.join(','));

    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      await createProduct(formData);
      setValues(INITIAL_VALUES);
      setTags([]);
    } catch (error) {
      console.error('상품 등록 실패', error);
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='RegistrationPage'>
      <ItemsPageHeader />
      <div className="product-form">
        <form onSubmit={handleSubmit} noValidate>
          <div className='FormTop'>
            <h2>상품 등록하기</h2>
            <button type="submit" disabled={isSubmitting}>등록</button>
          </div>
          <label className='Label1'>
            상품명
            <input
              id='Input1'
              className={`RegistrationInput ${errors.name ? 'error' : ''}`}
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder='상품명을 입력해주세요'
              required
            />
            {errors.name && <div className='error-message'>{errors.name}</div>}
          </label>
          <label className='Label2'>
            상품 소개
            <textarea
              id='Input2'
              name="description"
              className={`RegistrationInput ${errors.description ? 'error' : ''}`}
              value={values.description}
              onChange={handleInputChange}
              placeholder='상품 소개를 입력해주세요'
              required
            />
            {errors.description && <div className='error-message'>{errors.description}</div>}
          </label>
          <label className='Label3'>
            판매 가격
            <input
              id='Input3'
              className={`RegistrationInput ${errors.price ? 'error' : ''}`}
              type="number"
              name="price"
              value={values.price}
              onChange={handleInputChange}
              placeholder='판매 가격을 입력해주세요'
              required
            />
            {errors.price && <div className='error-message'>{errors.price}</div>}
          </label>
          <label className='Label4'>
            태그
            <input
              id='Input4'
              className={`RegistrationInput ${errors.tags ? 'error' : ''}`}
              type="text"
              name="tags"
              value={values.tags}
              onChange={handleInputChange}
              onKeyDown={handleTagAdd}
              placeholder='#태그 형식으로 입력해주세요 (예시, #모자)'
              required
            />
            {errors.tags && <div className='error-message'>{errors.tags}</div>}
          </label>
          <div className='tags-container'>
            {tags.map((tag, index) => (
              <div key={index} className='tag-item'>
                <span className='tag-text'>{tag}</span>
                <button
                  type="button"
                  className='remove-tag'
                  onClick={() => handleTagRemove(tag)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {submittingError && <div className='error-message'>상품 등록 실패: {submittingError.message}</div>}
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
