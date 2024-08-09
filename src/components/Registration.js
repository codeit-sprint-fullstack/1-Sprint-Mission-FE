import React, { useState, useEffect, useCallback } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // 간단한 유효성 검사 함수
  const validate = useCallback(() => {
    return (
      name.trim().length > 0 &&
      description.trim().length > 0 &&
      !isNaN(parseFloat(price)) && 
      parseFloat(price) > 0 &&
      tags.length > 0
    );
  }, [name, description, price, tags]);

  useEffect(() => {
    setIsFormValid(validate());
  }, [name, description, price, tags, validate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        // 전송할 데이터 로그 확인
        const payload = {
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price),
          tags: tags,
        };
        console.log('Submitting:', payload);

        const result = await axios.post(
          'https://one-sprint-mission-be-rzbk.onrender.com/api/products', 
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
          console.error('Response data:', error.response.data); // 서버에서 반환한 오류 메시지 확인
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
            cursor: isFormValid ? 'pointer' : 'not-allowed'
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
          placeholder="상품명을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">상품 소개</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상품 소개를 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">판매 가격</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="판매 가격을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="tag">태그</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleTagKeyPress}
          placeholder="태그를 입력해주세요"
        />
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



