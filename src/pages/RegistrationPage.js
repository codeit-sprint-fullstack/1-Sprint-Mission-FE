import React from 'react';
import { createProduct } from '../api/api';
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
              required
            />
          </label>
          <label className='Label2'>
            상품 소개
            <textarea
              id='Input2'
              name="description"
              className={`RegistrationInput`}
              required
            />
          </label>
          <label className='Label3'>
            판매 가격
            <input
              id='Input3'
              className={`RegistrationInpu`}
              type="number"
              name="price"
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
              required
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;