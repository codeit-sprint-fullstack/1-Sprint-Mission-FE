import React, { useEffect, useState } from "react";
import { postItem } from "../api.js";
import "../styles/Registration.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });
  const [tagData, setTagData] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id.replace("product-", "")]: value, // 인풋 id의 "product-"를 제거
    }));
  };

  const handleTagChange = (e) => {
    setTagData(e.target.value);
  };

  const handleEnterTag = (e) => {
    if (e.key === "Enter" && tagData !== "") {
      e.preventDefault();
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagData],
      }));
      setTagData("");
    }
  };

  const removeTag = (removeIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag, index) => index !== removeIndex),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postItem(formData);
      console.log("post success", data);
      navigate(`/items/detail`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { name, description, price, tags } = formData;
    if (name !== "0" && description !== "" && price !== "" && tags.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  return (
    <div className="registration-body">
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="register-title-container">
          <h2 className="register-title text-xl bold">상품 등록하기</h2>
          <button
            className="register text-lg semibold"
            type="submit"
            disabled={!isValid}
          >
            등록
          </button>
        </div>
        <div className="product-name input">
          <label htmlFor="product-name" className="text-2lg bold">
            상품명
          </label>
          <input
            type="text"
            id="product-name"
            placeholder="상품명을 입력해주세요"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="product-description input">
          <label htmlFor="product-description" className="text-2lg bold">
            상품 소개
          </label>
          <textarea
            id="product-description"
            placeholder="상품 소개를 입력해주세요"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="product-price input">
          <label htmlFor="product-price" className="text-2lg bold">
            판매가격
          </label>
          <input
            type="text"
            id="product-price"
            placeholder="판매 가격을 입력해주세요"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="product-tag input">
          <label htmlFor="product-tag" className="text-2lg bold">
            태그
          </label>
          <input
            type="text"
            id="product-tag"
            placeholder="태그를 입력해주세요"
            value={tagData}
            onChange={handleTagChange}
            onKeyDown={handleEnterTag}
          />
          <div className="tag-container">
            {formData.tags.map((tag, index) => (
              <div className="tag-item">
                <span key={index} className="text-lg regular">
                  #{tag}
                </span>
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => removeTag(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
