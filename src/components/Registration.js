import React, { useState } from 'react';
import './Registration.css';
import useValidation from '../hooks/useValidation';

const Registration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const { errors, validate } = useValidation({ name, description, price, tags });

  const handleDeleteTag = (deleteTag) => {
    setTags(tags.filter(t => t !== deleteTag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ name, description, price, tags });
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>상품 등록하기</h2>
        <button type="submit" className="submit-button">등록</button>
      </div>
      <div className="form-group">
        <label htmlFor="name">상품명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="상품명을 입력해주세요"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="description">상품 소개</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상품 소개를 입력해주세요"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="price">판매 가격</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="판매 가격을 입력해주세요"
          className={errors.price ? 'error' : ''}
        />
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="tag">태그</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="태그를 입력해주세요"
          className={errors.tag ? 'error' : ''}
        />
        {errors.tag && <p className="error-message">{errors.tag}</p>}
        <div className="tags">
          {tags.map((t, index) => (
            <div key={index} className="tag">
              <span>{t}</span>
              <button type="button" onClick={() => handleDeleteTag(t)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Registration;

