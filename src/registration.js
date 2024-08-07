import Header_logo from "./img/Header_logo.svg";
import Header_my from "./img/Header_my.svg";
import "./registration.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");

  const formData = {
    name: "",
    description: "",
    price: "",
    tag: "",
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  useEffect(() => {}, [name], [description], [price], [tag]);

  async function addProducts() {
    //파라미터로 받아서 입력 예정
    try {
      console.log("보낸거");
      const newData = { ...formData };
      newData.name = name;
      newData.description = description;
      newData.price = price;
      newData.tag = tag;

      const postRes = await axios.post(
        "https://product-ogs1.onrender.com/product",
        newData
      );

      if (postRes.status === 200 || postRes.status === 201) {
        window.location.href = "/";
      }
      console.log("완료");
    } catch (error) {
      console.error("Error posting product:", error);
    }
  }
  return (
    <>
      <header>
        <div id="header">
          <a href="https://extraordinary-lily-d8e584.netlify.app/">
            <img id="header_logo_img" alt="" src={Header_logo}></img>
          </a>

          <div id="header_str">
            <p>자유게시판</p>
            <a>
              <p>중고마켓</p>
            </a>
          </div>

          <img id="header_my_img" alt="" src={Header_my}></img>
        </div>
      </header>
      <main>
        <div id="main">
          <div id="resgistration_container">
            <div id="add_title">
              <p id="resgistration_title">상품 등록하기</p>
              <button id="resgistration_btn" onClick={addProducts}>
                등록
              </button>
            </div>
            <div id="resgistration_container">
              <form id="resgistration_form">
                <p id="from_title">상품명</p>
                <textarea
                  name="name"
                  id="resgistration_area"
                  className="area_name"
                  rows="1"
                  placeholder="상품명을 입력해주세요"
                  onChange={handleNameChange}
                ></textarea>
                <p id="from_title">상품 소개</p>
                <textarea
                  name="content"
                  id="resgistration_area_content"
                  className="area_content"
                  placeholder="상품 소개를 입력해주세요"
                  onChange={handleDescriptionChange}
                ></textarea>
                <p id="from_title">판매가격</p>
                <textarea
                  name="prcie"
                  id="resgistration_area"
                  className="area_price"
                  placeholder="판매 가격을 입력해주세요"
                  onChange={handlePriceChange}
                ></textarea>
                <p id="from_title">태그</p>
                <textarea
                  name="tag"
                  id="resgistration_area"
                  className="area_tag"
                  placeholder="태그를 입력해주세요"
                  onChange={handleTagChange}
                ></textarea>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Registration;
