import React, { useEffect, useState } from "react";
import "./ProductAddForm.css";
import { useValidation } from "../common/useValidation";

function ProductAddForm({ onFormChange, onFormValuesChange }) {
  const { values, errors, handleChange, handleSubmit, setValues } =
    useValidation();
  const [tags, setTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 조합

  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      tags.length > 0 &&
      values.productTag.trim() === "";

    onFormChange(isFormValid);
    onFormValuesChange({ ...values, tags });
  }, [errors, values, tags, onFormChange, onFormValuesChange]);

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !isComposing &&
      values.productTag.trim() &&
      values.productTag.length <= 5
    ) {
      e.preventDefault();
      if (!tags.includes(values.productTag.trim())) {
        setTags([...tags, values.productTag.trim()]);
        setValues((prevValues) => ({ ...prevValues, productTag: "" }));
      }
    }
  };

  const handleComposition = (e) => {
    if (e.type === "compositionstart") {
      setIsComposing(true);
    } else if (e.type === "compositionend") {
      setIsComposing(false);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <form className="productForm" onSubmit={handleSubmit}>
      <label htmlFor="productName" className="labelText">
        상품명
      </label>
      <input
        type="text"
        className={`inputStyle ${errors.productName ? "inputError" : ""}`}
        id="productName"
        name="productName"
        placeholder="상품명을 입력해주세요"
        value={values.productName}
        onChange={handleChange}
      />
      {errors.productName && <p className="inputCheck">{errors.productName}</p>}

      <label htmlFor="productIntro" className="labelText">
        상품 소개
      </label>
      <textarea
        className={`inputStyle textareaStyle ${
          errors.productIntro ? "inputError" : ""
        }`}
        id="productIntro"
        name="productIntro"
        placeholder="상품 소개를 입력해주세요"
        value={values.productIntro}
        onChange={handleChange}
      ></textarea>
      {errors.productIntro && (
        <p className="inputCheck">{errors.productIntro}</p>
      )}

      <label htmlFor="productPrice" className="labelText">
        판매가격
      </label>
      <input
        type="text"
        className={`inputStyle ${errors.productPrice ? "inputError" : ""}`}
        id="productPrice"
        name="productPrice"
        placeholder="판매 가격을 입력해주세요"
        value={values.productPrice}
        onChange={handleChange}
      />
      {errors.productPrice && (
        <p className="inputCheck">{errors.productPrice}</p>
      )}

      <label htmlFor="productTag" className="labelText">
        태그
      </label>
      <input
        type="text"
        className={`inputStyle ${errors.productTag ? "inputError" : ""}`}
        id="productTag"
        name="productTag"
        placeholder="태그를 입력해주세요"
        value={values.productTag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleComposition}
        onCompositionUpdate={handleComposition}
        onCompositionEnd={handleComposition}
      />
      {errors.productTag && <p className="inputCheck">{errors.productTag}</p>}
      <div className="tags-container">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            #{tag}
            <button
              type="button"
              className="tag-close"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}

export default ProductAddForm;
