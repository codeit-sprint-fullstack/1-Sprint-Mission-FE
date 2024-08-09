import { useState } from 'react';
import { InputTemplete } from './Templete.js';
import { registrationItem } from '../api.js';

export default function Registration() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price,
      tags,
    };
    console.log(formData);
    registrationItem(formData)
      .then((data) => {
        console.log(data.data);
      })
      .catch((e) => console.log(e));
    setName('');
    setDescription('');
    setPrice('');
    setTags('');
    window.location.href = '/';
  };

  const inputs = [
    {
      inputName: 'name',
      inputTitle: '상품명',
      type: 'text',
      errMessage: '10자 이내로 입력해주세요',
      textarea: false,
      placeholder: '상품명을 입력해주세요',
      onChange: (e) => setName(e.target.value),
    },
    {
      inputName: 'description',
      inputTitle: '상품 소개',
      type: '',
      errMessage: '10자 이상 입력해주세요',
      textarea: true,
      placeholder: '상품 소개를 입력해주세요',
      onChange: (e) => setDescription(e.target.value),
    },
    {
      inputName: 'price',
      inputTitle: '판매가격',
      type: 'text',
      errMessage: '숫자로 입력해주세요',
      textarea: false,
      placeholder: '판매가격을 입력해주세요',
      onChange: (e) => setPrice(e.target.value),
    },
    {
      inputName: 'tags',
      inputTitle: '태그',
      type: 'text',
      errMessage: '5글자 이내로 입력해주세요',
      textarea: false,
      placeholder: '상품 소개를 입력해주세요',
      onChange: (e) => setTags(e.target.value),
    },
  ];
  return (
    <form className="registration-form">
      <div className="registration-header">
        <div className="registration-text">상품 등록하기</div>
        <button className="registration-submit" onClick={submit}>
          등록
        </button>
      </div>
      {inputs.map((input) => {
        return <InputTemplete key={input.inputName} input={input} />;
      })}
    </form>
  );
}
