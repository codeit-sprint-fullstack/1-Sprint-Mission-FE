import { useState } from 'react';
import Nav from '../components/Nav';
import './RegistrationPage.css';
import removeIcon from '../assets/imgs/ic_X.svg';
import { Helmet } from 'react-helmet';
import { createProduct } from '../api';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(typeof e.target.value);
    if (id === 'name') {
      setName(value);
    } else if (id === 'description') {
      setDesc(value);
    } else if (id === 'price') {
      setPrice(value);
    } else if (id === 'tag') {
      setTagInput(value);
    }
  };

  // 태그 표시하기
  // - 태그 인풋에 입력값 확인
  // - 사용자가 입력을 끝내고 엔터를 누르면
  // - 태그 배열의 상태를 업데이트
  // - 업데이트 된 배열을 화면에 렌더링
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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

  return (
    <>
      <Helmet>
        <title>상품 등록</title>
      </Helmet>
      <Nav />
      <form className="reg-container" onSubmit={handleFormSubmit}>
        <div className="reg">
          <p>상품 등록하기</p>
          <button type="submit">등록</button>
        </div>

        <div className="reg-flex reg-name">
          <label htmlFor="name" className="label-style">
            상품명
          </label>
          <input
            id="name"
            className="input-style"
            placeholder="상품명을 입력해주세요"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className="reg-flex reg-description">
          <label htmlFor="description" className="label-style">
            상품 소개
          </label>
          <textarea
            id="description"
            placeholder="상품 소개를 입력해주세요"
            value={description}
            onChange={handleInputChange}
          />
        </div>

        <div className="reg-flex reg-price">
          <label htmlFor="price" className="label-style">
            판매가격
          </label>
          <input
            id="price"
            className="input-style"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={handleInputChange}
          />
        </div>

        <div className="reg-flex reg-tag">
          <label htmlFor="tag" className="label-style">
            태그
          </label>
          <input
            id="tag"
            className="input-style"
            placeholder="태그를 입력해주세요."
            value={tagInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></input>

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
