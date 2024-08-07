import React, { useState } from 'react';
import './RegistrationPage.css';
import ItemsPageHeader from '../components/ItemsPageHeader';

const INITIAL_VALUES = {
  name: '',
  description: '',
  price: '',
  tags: '',
};

function RegistrationPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [tags, setTags] = useState([]);

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

  return (
    <div className='RegistrationPage'>
      <ItemsPageHeader />
      <div className="product-form">
        <form>
          <div className='FormTop'>
            <h2>상품 등록하기</h2>
            <button type="submit">등록</button>
          </div>
          <label className='Label1'>
            상품명
            <input
              id='Input1'
              className={`RegistrationInput`}
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder='상품명을 입력해주세요'
              required
            />
          </label>
          <label className='Label2'>
            상품 소개
            <textarea
              id='Input2'
              name="description"
              className={`RegistrationInput`}
              value={values.description}
              onChange={handleInputChange}
              placeholder='상품 소개를 입력해주세요'
              required
            />
          </label>
          <label className='Label3'>
            판매 가격
            <input
              id='Input3'
              className={`RegistrationInput`}
              type="number"
              name="price"
              value={values.price}
              onChange={handleInputChange}
              placeholder='판매 가격을 입력해주세요'
              required
            />
          </label>
          <label className='Label4'>
            태그
            <input
              id='Input4'
              className={`RegistrationInput`}
              type="text"
              name="tags"
              value={values.tags}
              onChange={handleInputChange}
              onKeyDown={handleTagAdd}
              placeholder='#태그 형식으로 입력해주세요 (예시, #모자)'
              required
            />
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
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
