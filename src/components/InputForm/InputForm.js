import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './inputForm.css';
import xBtn from '../../assets/images/ic_X.png';
import useTitleValidation from '../../hook/useTitleValidation';
import useDescriptionValidation from '../../hook/useDescriptionValidation';
import useTagValidation from '../../hook/useTagValidation';
import usePriceValidation from '../../hook/usePriceValidation';

const InputForm = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const {
    value: title,
    isValid: isTitleValid,
    isTouched: isTitleTouched,
    handleChange: handleTitleChange,
    handleBlur: handleTitleBlur,
  } = useTitleValidation('');

  const {
    value: description,
    isValid: isDescriptionValid,
    isTouched: isDescriptionTouched,
    handleChange: handleDescriptionChange,
    handleBlur: handleDescriptionBlur,
  } = useDescriptionValidation('');

  const {
    value: tagInput,
    isValid: isTagValid,
    isTouched: isTagTouched,
    handleChange: handleTagChange,
    handleBlur: handleTagBlur,
    setValue: setTagInput,
  } = useTagValidation('');

  const {
    value: price,
    isValid: isPriceValid,
    isTouched: isPriceTouched,
    errorMessage: priceErrorMessage,
    handleChange: handlePriceChange,
    handleBlur: handlePriceBlur,
  } = usePriceValidation('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isTitleValid && isDescriptionValid && isPriceValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isTitleValid, isDescriptionValid, isPriceValid]);

  const addTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isTagValid) {
        setTags([...tags, tagInput]);
        setTagInput('');
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleRegisterClick = () => {
    if (isFormValid) {
      navigate('/detail');
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="form-layout">
          <div className="regist-container">
            <label className="form-label">상품 등록하기 </label>
            <button
              type="button"
              className={`regist-button ${isFormValid ? 'enabled' : 'disabled'}`}
              disabled={!isFormValid}
              onClick={handleRegisterClick}
            >
              등록
            </button>
          </div>
          <label className="form-label title">제목 </label>
          <br />
          <input
            type="text"
            name="title"
            className={`form-input title ${isTitleTouched && !isTitleValid ? 'invalid' : isTitleTouched && isTitleValid ? 'valid' : ''}`}
            placeholder="상품명을 입력해주세요"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
          />
          {!isTitleValid && isTitleTouched && (
            <p className="error-message">{title.length === 0 ? '제목을 입력해주세요' : '10자 이내로 입력해주세요.'}</p>
          )}
          <div className="description-container">
            <label className="form-label description">상품 설명 </label>
            <textarea
              type="text"
              name="description"
              className={`form-input description ${
                isDescriptionTouched && isDescriptionValid === false
                  ? 'invalid'
                  : isDescriptionTouched && isDescriptionValid === true
                  ? 'valid'
                  : ''
              }`}
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
            />
            {isDescriptionTouched && isDescriptionValid === false && (
              <p className="error-message">
                {description.length === 0
                  ? '상품 설명을 입력해주세요'
                  : description.length < 10
                  ? '10자 이상 입력해주세요.'
                  : '100자 이내로 입력해주세요.'}
              </p>
            )}
          </div>
          <div className="price-container">
            <label className="form-label price">가격 </label>
            <input
              type="text"
              name="price"
              className={`form-input price ${
                isPriceTouched && isPriceValid === false ? 'invalid' : isPriceTouched && isPriceValid === true ? 'valid' : ''
              }`}
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
            />
            {isPriceTouched && isPriceValid === false && <p className="error-message">{priceErrorMessage}</p>}
          </div>
          <div className="tag-container">
            <label className="form-label tag">태그</label> <br />
            <input
              type="text"
              value={tagInput}
              onChange={handleTagChange}
              onBlur={handleTagBlur}
              onKeyDown={addTag}
              className={`form-input tag ${
                tagInput.length === 0 ? '' : isTagTouched && !isTagValid ? 'invalid' : isTagTouched && isTagValid ? 'valid' : ''
              }`}
              placeholder="태그를 입력해주세요"
            />
            {!isTagValid && isTagTouched && tagInput.length > 0 && <p className="error-message">5글자 이내로 입력해주세요.</p>}
          </div>
          <div className="tags-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag-box">
                #{tag}
                <button type="button" onClick={() => removeTag(index)} className="remove-tag-button">
                  <img src={xBtn} alt={xBtn} className="x-btn" />
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default InputForm;
