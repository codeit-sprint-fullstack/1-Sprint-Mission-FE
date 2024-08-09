import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postProduct } from '../../services/api';

export default function RegistrationForm({ className, initialValue }) {
  const [values, setValues] = useState(initialValue);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);

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
      <div>
        <h2>상품 등록하기</h2>
        <button type='submit'>등록</button>
      </div>
      <label htmlFor='name'>상품평</label>
      <input
        id='name'
        name='name'
        type='text'
        value={values.name}
        onChange={handleInputChange}
        placeholder='상품평을 입력해주세요'
      />
      <label htmlFor='description'>상품 소개</label>
      <textarea
        id='description'
        name='description'
        type='text'
        value={values.description}
        onChange={handleInputChange}
        placeholder='상품 소개를 입력해 주세요'
      />
      <label htmlFor='price'>판매가격</label>
      <input
        id='price'
        name='price'
        type='number'
        value={values.price}
        onChange={handleInputChange}
        placeholder='판매가격을 입력해주세요'
      />
      <label htmlFor='tags'>태그</label>
      <input
        id='tags'
        name='tags'
        type='text'
        value={values.tags}
        onChange={handleInputChange}
        placeholder='태그를 입력해주세요'
      />
    </form>
  );
}
