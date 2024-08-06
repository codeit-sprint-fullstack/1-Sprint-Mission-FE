import { useState } from 'react';
import Nav from "../components/Nav";
import './RegistrationPage.css';
import removeIcon from '../assets/imgs/ic_X.svg';
import { Helmet } from "react-helmet";

function RegistrationPage() {
  // 태그 표시하기
  // - 인풋에 입력을 감지
  // - 사용자가 입력을 끝내고 엔터를 누르면
  // - 태그 배열의 상태를 업데이트
  // - 업데이트 된 배열을 화면에 렌더링
  const [tags, setTags] = useState([]); 
  const [inputValue, setInputValue] = useState('');
  
  const handleTagInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      setTags([inputValue.trim(), ...tags]);
      setInputValue('');
    }
  }

  // 태그 삭제
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  }

  return (
    <>
      <Helmet>
        <title>상품 등록</title>
      </Helmet>
      <Nav />
      <form className="reg-container">
        <div className="reg">
          <p>상품 등록하기</p>
          <button>등록</button>
        </div>

        <div className="reg-flex reg-name">
          <label htmlFor="name" className="label-style">상품명</label>
          <input id="name" className="input-style"  placeholder="상품명을 입력해주세요"></input>
        </div>

        <div className="reg-flex reg-intro">
          <label htmlFor="intro" className="label-style">상품 소개</label>
          <textarea id="intro" placeholder="상품 소개를 입력해주세요"></textarea>
        </div>

        <div className="reg-flex reg-price">
          <label htmlFor="price" className="label-style">판매가격</label>
          <input id="price" className="input-style"  placeholder="판매 가격을 입력해주세요"></input>
        </div>

        <div className="reg-flex reg-tag">
          <label htmlFor="tag" className="label-style">태그</label>
          <input 
            id="tag" 
            className="input-style"  
            placeholder="태그를 입력해주세요."
            value={inputValue}
            onChange={handleTagInput} onKeyDown={handleKeyDown}>
          </input>

          <div className="tags-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                #{tag} 
                <img className='remove-tag' src={removeIcon} alt="x" onClick={() => {removeTag(index)}} />
              </div>
            ))}
          </div>

        </div>

      </form>
    </>
  );
}

export default RegistrationPage;