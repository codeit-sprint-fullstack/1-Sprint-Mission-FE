import { useEffect, useState } from 'react';
import { InputTemplete } from './Templete.js';
import { registrationItem } from '../api.js';
import useValidateText from '../hooks/useValidateText.js';

export default function Registration() {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    tags: '',
  });
  const [touch, setTouch] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  const [button, setButton] = useState(false);
  const errText = useValidateText(formValues);
  const [tag, setTag] = useState([]);

  const tagsEnterDown = (e) => {
    if (
      formValues.tags.trim() !== '' &&
      formValues.tags.length <= 5 &&
      e.key === 'Enter'
    ) {
      setTag((prevTags) => [...prevTags, { text: formValues.tags.trim() }]);
      setFormValues((prevValues) => ({ ...prevValues, tags: '' }));
    }
  };

  const buttonEnable = (errText, tag) => {
    if (
      errText['name'] === '' &&
      errText['description'] === '' &&
      errText['price'] === '' &&
      tag.length !== 0
    )
      return true;
    return false;
  };

  useEffect(() => {
    setButton(buttonEnable(errText, tag));
  }, [errText, tag]);

  const submit = (e) => {
    e.preventDefault();
    registrationItem({
      ...formValues,
      tags: tag.map((tag) => tag.text).join(', '),
    })
      .then((data) => {
        console.log(data.data);
      })
      .catch((e) => console.log(e));
    window.location.href = '/';
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setTouch((prevTouch) => ({
      ...prevTouch,
      [name]: true,
    }));
  };

  const inputs = [
    {
      inputName: 'name',
      inputTitle: '상품명',
      type: 'text',
      textarea: false,
      tags: false,
      placeholder: '상품명을 입력해주세요',
    },
    {
      inputName: 'description',
      inputTitle: '상품 소개',
      type: '',
      textarea: true,
      tags: false,
      placeholder: '상품 소개를 입력해주세요',
    },
    {
      inputName: 'price',
      inputTitle: '판매가격',
      type: 'text',
      textarea: false,
      tags: false,
      placeholder: '판매가격을 입력해주세요',
    },
    {
      inputName: 'tags',
      inputTitle: '태그',
      type: 'text',
      textarea: false,
      tags: true,
      placeholder: '태그를 입력해주세요',
    },
  ];

  return (
    <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
      <div className="registration-header">
        <div className="registration-text">상품 등록하기</div>
        <button
          className="registration-submit"
          onClick={submit}
          disabled={!button}
          style={{ backgroundColor: button ? '#3692FF' : '#9ca3af' }}
        >
          등록
        </button>
      </div>
      {inputs.map((input) => {
        return (
          <InputTemplete
            key={input.inputName}
            input={input}
            onChange={onChange}
            value={formValues[input.inputName]}
            errText={errText[input.inputName]}
            touch={touch[input.inputName]}
            onKeyDown={input.tags ? tagsEnterDown : undefined}
          />
        );
      })}
      <div className="tags-container">
        {tag.map((tag) => (
          <div className="tags" key={tag.text}>
            #{tag.text}
            <div className="delete-button" />
          </div>
        ))}
      </div>
    </form>
  );
}
