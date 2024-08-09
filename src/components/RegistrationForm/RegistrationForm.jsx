import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postProduct } from '../../services/api';

import './RegistrationForm.css';

import TagInput from './TagInput';
import InputContainer from './InputContainer';

export default function RegistrationForm({ className, initialValue }) {
  const [inputValues, setInputValues] = useState(initialValue);
  const [tagInputValue, setTagInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  const handleTagInputChange = (e) => {
    const value = e.target.value;
    setTagInputValue(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', inputValues.name);
    formData.append('description', inputValues.description);
    formData.append('price', inputValues.price);

    try {
      const response = await postProduct(formData);
      const productId = response._id;

      navigate(`/items/${productId}`);
    } catch (err) {
      console.error(err.message);
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className='form-top'>
        <h2>상품 등록하기</h2>
        <button type='submit'>등록</button>
      </div>
      <div className='form-inputs'>
        <InputContainer>
          <label htmlFor='name'>상품평</label>
          <input
            id='name'
            name='name'
            type='text'
            value={inputValues.name}
            onChange={handleInputChange}
            placeholder='상품평을 입력해주세요'
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor='description'>상품 소개</label>
          <textarea
            id='description'
            name='description'
            type='text'
            value={inputValues.description}
            onChange={handleInputChange}
            placeholder='상품 소개를 입력해 주세요'
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor='price'>판매가격</label>
          <input
            id='price'
            name='price'
            type='number'
            value={inputValues.price}
            onChange={handleInputChange}
            placeholder='판매가격을 입력해주세요'
          />
        </InputContainer>
        <InputContainer>
          <TagInput
            setTags={setTags}
            tagInputValue={tagInputValue}
            tags={tags}
            setTagInputValue={setTagInputValue}
            handleTagInputChange={handleTagInputChange}
            className='TagInput'
          />
        </InputContainer>
      </div>
    </form>
  );
}
