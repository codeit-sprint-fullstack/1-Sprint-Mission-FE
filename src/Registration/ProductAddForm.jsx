import React, { useEffect, useState } from "react";
import "./ProductAddForm.css";
import { useValidation } from "../common/useValidation";

function ProductAddForm({ onFormChange, onFormValuesChange }) {
  const initialState = {
    productName: "",
    productIntro: "",
    productPrice: "",
    productTag: "",
  };

  const validations = {
    productName: {
      required: true,
      minLength: 1,
      maxLength: 10,
    },
    productIntro: {
      required: true,
      minLength: 10,
      maxLength: 100,
    },
    productPrice: {
      required: true,
      pattern: /^[0-9]+$/,
    },
    productTag: {
      maxLength: 5,
    },
  };

  const { values, errors, handleChange, handleSubmit, setValues } =
    useValidation(initialState, validations);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(values).every((value) => value.trim() !== "");
    onFormChange(isFormValid && tags.length > 0);
    onFormValuesChange({ ...values, tags });
  }, [errors, values, tags, onFormChange, onFormValuesChange]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && values.productTag.trim()) {
      e.preventDefault();
      if (!tags.includes(values.productTag.trim())) {
        setTags([...tags, values.productTag.trim()]);
        setValues((prevValues) => ({ ...prevValues, productTag: "" }));
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <form className="productForm" onSubmit={handleSubmit(() => {})}>
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
