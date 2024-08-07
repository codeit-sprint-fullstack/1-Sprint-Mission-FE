import React from 'react';
import { createProduct } from '../api/api';
import './RegistrationPage.css';
import ItemsPageHeader from '../components/ItemsPageHeader';

const INITIAL_VALUES = {
  name: '',
  description: '',
  price: '',
  tags: '',
};

function RegistrationPage() {

  return (
    <div className='RegistrationPage'>
      <ItemsPageHeader />
      <div className="product-form">
        <form>
          <div className='FormTop'>
            <h2>상품 등록하기</h2>
            <button>등록</button>
          </div>
          <label className='Label1'>
            상품명
            <input
              id='Input1'
              className={`RegistrationInput`}
              type="text"
              name="name"
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
              placeholder='#태그 형식으로 입력해주세요 (예시, #모자)'
              required
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;