import React, { useState, useEffect } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useValidation from '../hooks/useValidation';

const Registration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  const navigate = useNavigate();
  const { errors, validate } = useValidation({ name, description, price, tags });

  useEffect(() => {
    setIsFormValid(validate());
  }, [name, description, price, tags, validate]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const payload = {
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price),
          tags: tags,
        };

        const result = await axios.post(
          `${process.env.REACT_APP_API_URL}/products`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (result.status === 201) {
          navigate(`/products/${result.data.id}`);
        } else {
          console.error('Error submitting product:', result.data);
        }
      } catch (error) {
        console.error('Error submitting product:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      }
    }
  };

  const handleDeleteTag = (deleteTag) => {
    setTags(tags.filter((t) => t !== deleteTag));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && tag.trim().length > 0 && tag.trim().length <= 5) {
      e.preventDefault();
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>상품 등록하기</h2>
        <button
          type="submit"
          className={`submit-button ${isFormValid ? 'active' : ''}`}
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? '#3692FF' : '#9CA3AF',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
        >
          등록
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="name">상품명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="상품명을 입력해주세요"
          className={errors.name && touched.name ? 'error' : ''}
        />
        {errors.name && touched.name && <span className="error-message">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="description">상품 소개</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => handleBlur('description')}
          placeholder="상품 소개를 입력해주세요"
          className={errors.description && touched.description ? 'error' : ''}
        />
        {errors.description && touched.description && <span className="error-message">{errors.description}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="price">판매 가격</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => handleBlur('price')}
          placeholder="판매 가격을 입력해주세요"
          className={errors.price && touched.price ? 'error' : ''}
        />
        {errors.price && touched.price && <span className="error-message">{errors.price}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="tag">태그</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onBlur={() => handleBlur('tags')}
          onKeyPress={handleTagKeyPress}
          placeholder="태그를 입력해주세요"
          className={errors.tags && touched.tags ? 'error' : ''}
        />
        {errors.tags && touched.tags && <span className="error-message">{errors.tags}</span>}
        <div className="tags">
          {tags.map((t, index) => (
            <div key={index} className="tag">
              <span>{t}</span>
              <button type="button" onClick={() => handleDeleteTag(t)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Registration;





