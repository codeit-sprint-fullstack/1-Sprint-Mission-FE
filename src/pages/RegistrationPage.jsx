import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { createProduct } from '../api';
import Nav from '../components/Nav';
import removeIcon from '../assets/imgs/ic_X.svg';
import useFormValidation from '../hook/useFormValidation';
import './RegistrationPage.css';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const { errors, validate } = useFormValidation();

  // 초기 렌더링 시 유효성 검사 수행
  useEffect(() => {
    validate('name', name);
    validate('description', description);
    validate('price', price);
    validate('tag', tagInput);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(typeof e.target.value);
    if (id === 'name') {
      setName(value);
      validate('name', value);
    } else if (id === 'description') {
      setDesc(value);
      validate('description', value);
    } else if (id === 'price') {
      setPrice(value);
      validate('price', value);
    } else if (id === 'tag') {
      setTagInput(value);
      validate('tag', value);
    }
  };

  // 태그 표시하기
  // - 태그 인풋에 입력값 확인
  // - 사용자가 입력을 끝내고 엔터를 누르면
  // - 태그 배열의 상태를 업데이트
  // - 업데이트 된 배열을 화면에 렌더링
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setTags([tagInput.trim(), ...tags]);
      setTagInput('');
    }
  };
  // 태그 삭제
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      description: description,
      price: Number(price),
      tags: tags,
    };

    try {
      const newProduct = await createProduct(productData);
      if (newProduct) {
        console.log('상품이 성공적으로 등록되었습니다!');
        setName('');
        setDesc('');
        setPrice('');
        setTags([]);
      } else {
        console.log('상품 등록에 실패했습니다.');
      }
    } catch (e) {
      if (e.response) {
        // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        // 리퀘스트 자체가 실패
        console.log('리퀘스트가 실패했습니다.');
      }
    }
  };

  // errors 객체를 배열로 변환
  // 배열을 순회하면서 주어진 조건에 맞는지 검사
  // 반환값(error)이 하나라도 truthy한 값이면 isFormatValid는 false
  // 즉 format에 잘 못 된 값이 입력된 상태를 의미
  const isFormatValid = !Object.values(errors).some((error) => error);

  return (
    <>
      <Helmet>
        <title>상품 등록</title>
      </Helmet>
      <Nav />
      <form className="reg-container" onSubmit={handleFormSubmit}>
        <div className="reg">
          <p>상품 등록하기</p>
          <button
            type="submit"
            className={`submit-button ${isFormatValid ? 'valid' : 'invalid'}`}
            disabled={!isFormatValid}
          >
            등록
          </button>
        </div>

        <div className="reg-flex reg-name">
          <label htmlFor="name" className="label-style">
            상품명
          </label>
          <input
            id="name"
            className={`input-style ${errors.name ? 'error' : ''}`}
            placeholder="상품명을 입력해주세요"
            value={name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="reg-flex reg-description">
          <label htmlFor="description" className="label-style">
            상품 소개
          </label>
          <textarea
            id="description"
            className={`input-style ${errors.description ? 'error' : ''}`}
            placeholder="상품 소개를 입력해주세요"
            value={description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="reg-flex reg-price">
          <label htmlFor="price" className="label-style">
            판매가격
          </label>
          <input
            id="price"
            className={`input-style ${errors.price ? 'error' : ''}`}
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>

        <div className="reg-flex reg-tag">
          <label htmlFor="tag" className="label-style">
            태그
          </label>
          <input
            id="tag"
            className={`input-style ${errors.tag ? 'error' : ''}`}
            placeholder="태그를 입력해주세요."
            value={tagInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {errors.tag && <p className="error-message">{errors.tag}</p>}

          <div className="tags-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                #{tag}
                <img
                  className="remove-tag"
                  src={removeIcon}
                  alt="x"
                  onClick={() => {
                    removeTag(index);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}

export default RegistrationPage;
