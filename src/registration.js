import Header_logo from "./img/Header_logo.svg";
import HeaderLogo2 from "./img/HeaderLogo2.svg";
import "./registration.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [nameError, setNameError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(true);
  const [priceError, setPriceError] = useState(true);
  const [tagError, setTagError] = useState(true);
  const [bntControl, setbtnControl] = useState(false);

  const formData = {
    name: "",
    description: "",
    price: "",
    tag: [],
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (name.length + 1 < 10) {
      setNameError(true);
      if (name && description && price && tag) {
        setbtnControl(true);
      }
    } else {
      setNameError(false);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (description.length + 1 >= 10 && description.length + 1 <= 100) {
      setDescriptionError(true);
      if (name && description && price && tag) {
        setbtnControl(true);
      }
    } else {
      setDescriptionError(false);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    if (!isNaN(Number(price))) {
      setPriceError(true);
      if (name && description && price && tag) {
        setbtnControl(true);
      }
    } else {
      setPriceError(false);
    }
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
    if (tag.length + 1 <= 5) {
      setTagError(true);
      if (name && description && price && tag) {
        setbtnControl(true);
      }
    } else {
      setTagError(false);
    }
  };

  useEffect(() => {}, [name], [description], [price], [tags]);

  async function addProducts() {
    try {
      const newData = { ...formData };
      newData.name = name;
      newData.description = description;
      newData.price = price;
      newData.tag = tags;

      const postRes = await axios.post(
        "https://product-ogs1.onrender.com/product",
        newData
      );

      if (postRes.status === 200 || postRes.status === 201) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error posting product:", error);
    }
  }

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (tag.trim().length <= 5) {
        if (tag.trim() && !tags.includes("#" + tag.trim())) {
          setTags([...tags, "#" + tag.trim()]);
          setTag("");
        }
      } else {
        setTagError(false);
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <main>
        <div id="main">
          <div id="resgistration_container">
            <div id="add_title">
              <p id="resgistration_title">상품 등록하기</p>
              <button
                id="resgistration_btn"
                onClick={addProducts}
                style={
                  bntControl &&
                  nameError &&
                  descriptionError &&
                  priceError &&
                  tagError
                    ? { backgroundColor: "rgba(54,146,255,1)" }
                    : { backgroundColor: "rgba(156,163,175,1)" }
                }
              >
                등록
              </button>
            </div>
            <div id="resgistration_container">
              <form id="resgistration_form">
                <p id="from_title">상품명</p>
                <textarea
                  name="name"
                  id="resgistration_area"
                  className={`area_name`}
                  rows="1"
                  placeholder="상품명을 입력해주세요"
                  onChange={handleNameChange}
                  style={
                    !nameError ? { borderColor: "rgba(247,71,71,1)" } : null
                  }
                ></textarea>
                <p id="error" style={nameError ? { display: "none" } : null}>
                  10자 이내로 입력해주세요
                </p>
                <p id="from_title">상품 소개</p>
                <textarea
                  name="content"
                  id="resgistration_area_content"
                  className="area_content"
                  placeholder="상품 소개를 입력해주세요"
                  onChange={handleDescriptionChange}
                  style={
                    !descriptionError
                      ? { borderColor: "rgba(247,71,71,1)" }
                      : null
                  }
                ></textarea>
                <p
                  id="error"
                  style={descriptionError ? { display: "none" } : null}
                >
                  10자 이상 입력해주세요
                </p>
                <p id="from_title">판매가격</p>
                <textarea
                  name="prcie"
                  id="resgistration_area"
                  className="area_price"
                  placeholder="판매 가격을 입력해주세요"
                  onChange={handlePriceChange}
                  style={
                    !priceError ? { borderColor: "rgba(247,71,71,1)" } : null
                  }
                ></textarea>
                <p id="error" style={priceError ? { display: "none" } : null}>
                  숫자로 입력해주세요
                </p>
                <p id="from_title">태그</p>
                <textarea
                  name="tag"
                  id="resgistration_area"
                  className="area_tag"
                  placeholder="태그를 입력해주세요"
                  onChange={handleTagChange}
                  style={
                    !tagError
                      ? { borderColor: "rgba(247,71,71,1)" }
                      : { borderColor: "none" }
                  }
                  onKeyDown={handleInputKeyDown}
                  value={tag}
                ></textarea>
                <p id="error" style={tagError ? { display: "none" } : null}>
                  5글자 이내로 입력해주세요
                </p>
                <div id="tagContainer">
                  {tags.map((tag, index) => (
                    <div key={index} className="tagItem">
                      {tag}
                      <button
                        id="tagBtn"
                        type="button"
                        onClick={() => removeTag(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Registration;
