import React, { useState } from "react";
import useFormValidation from "../hooks/FormValidation.js";
import "../css/registration.css";
import classNames from "classnames";
import * as api from "../api.js";
import { Navigate } from "react-router-dom";
import x_icon from "../image/ic_X.png";

function Chips({ tag, onClick, index }) {
  const handleBtn = (e) => {
    e.preventDefault();
    onClick(index);
  };

  return (
    <div className="chip">
      #{tag}
      <button onClick={handleBtn}>
        <img className="x_icon" src={x_icon} alt="삭제아이콘" />
      </button>
    </div>
  );
}

function Registration() {
  const [chips, setChips] = useState([]);

  const { values, errors, disabled, handleChange, handleSubmit } =
    useFormValidation(
      {
        email: "",
        decription: "",
        price: 0,
        //tag는 필수 필드가 아니라 제외
      },
      createProduct
    );

  async function createProduct(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("decription", values.decription);
    formData.append("npriceame", values.price);
    formData.append("tag", JSON.stringify(chips));

    if (formData) {
      try {
        const data = await api.createProductAxios(formData);
        Navigate("/detaliproduct", { data });
      } catch (e) {
        console.log(e.name);
        console.log(e.message);
      }
    }
  }

  const handleRemoveChip = (index) => {
    console.log(index);
    setChips((prev) => prev.filter((_, id) => id !== index));
    console.log(chips);
  };

  const handleChips = (e) => {
    if (errors.tag) return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (values.tag.trim() !== "") {
        setChips((prev) => [...prev, e.target.value]);
        values.tag = "";
      }
    }
  };

  return (
    <main>
      <form className="add_product_form" onSubmit={handleSubmit}>
        <div className="form_submit_box">
          <h2>상품 등록하기</h2>
          <button
            type="submit"
            className={classNames("submit_btn", { disabled_btn: disabled })}
            disabled={disabled}
          >
            등록
          </button>
        </div>
        <div className="input_box">
          <label>삼품명</label>
          <input
            className={errors.name && "err_border"}
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div className="input_box">
          <label>상품 소개</label>
          <input
            className={errors.decription && "err_border"}
            type="text"
            name="decription"
            value={values.decription || ""}
            onChange={handleChange}
            placeholder="상품 소개를 입력해주세요"
          />
          {errors.decription && (
            <p style={{ color: "red" }}>{errors.decription}</p>
          )}
        </div>
        <div className="input_box">
          <label>판매가격</label>
          <input
            className={errors.price && "err_border"}
            type="text"
            name="price"
            value={values.price || ""}
            onChange={handleChange}
            placeholder="상품 가격을 입력해주세요"
          />
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
        </div>
        <div className="input_box">
          <label>태그</label>
          <input
            className={errors.tag && "err_border"}
            type="text"
            name="tag"
            value={values.tag || ""}
            onChange={handleChange}
            onKeyDown={handleChips}
            placeholder="태그를 입력해주세요"
          />
          {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
          <div className="chips_box">
            {chips.map((el, index) => (
              <Chips
                tag={el}
                key={index}
                index={index}
                onClick={handleRemoveChip}
              />
            ))}
          </div>
        </div>
      </form>
    </main>
  );
}
export default Registration;
