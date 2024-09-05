import React from "react";
import useFormValidation from "@/hooks/useFormValidation.js";
import styles from "@/styles/registration.module.css";
import * as api from "@/pages/api/products";
import x_icon from "@/public/images/ic_X.png";
import { productModel } from "@/models/productModel";
import Image from "next/image";
import { useRouter } from "next/router";

function Chips({ tag, onClick, index }) {
  const handleBtn = (e) => {
    e.preventDefault();
    onClick(index);
  };

  return (
    <div className={styles.chip}>
      #{tag}
      <button onClick={handleBtn}>
        <Image className={styles.x_icon} src={x_icon} alt="삭제아이콘" />
      </button>
    </div>
  );
}

function Registration() {
  const {
    values,
    errors,
    disabled,
    chips,
    handleChange,
    handleSubmit,
    handleChips,
    handleRemoveChip,
  } = useFormValidation(
    {
      name: "",
      description: "",
      price: 0,
      //tag는 필수 필드가 아니라 제외
    },
    createProduct
  );

  const router = useRouter();

  async function createProduct(values) {
    const postValues = productModel(values, chips);

    try {
      const data = await api.createProductAxios(postValues);
      router.push(`/DetailProduct/${data.id}`);
    } catch (e) {
      console.log(e.name);
      console.log(e.message);
    }
  }

  return (
    <main>
      <form className={styles.add_product_form} onSubmit={handleSubmit}>
        <div className={styles.form_submit_box}>
          <h2>상품 등록하기</h2>
          <button
            type="submit"
            // className={classNames("submit_btn", { disabled_btn: disabled })}
            className={styles.submit_btn}
            disabled={disabled}
          >
            등록
          </button>
        </div>
        <div className={styles.input_box}>
          <label>삼품명</label>
          <input
            className={`${styles.input} ${errors.name && styles.err_border}`}
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div className={styles.input_box}>
          <label>상품 소개</label>
          <textarea
            className={`${styles.input} ${styles.description} ${
              errors.description && styles.err_border
            }`}
            name="description"
            value={values.description || ""}
            onChange={handleChange}
            placeholder="상품 소개를 입력해주세요"
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
        </div>
        <div className={styles.input_box}>
          <label>판매가격</label>
          <input
            className={`${styles.input} ${errors.price && styles.err_border}`}
            type="number"
            name="price"
            value={values.price || ""}
            onChange={handleChange}
            placeholder="상품 가격을 입력해주세요"
          />
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
        </div>
        <div className={styles.input_box}>
          <label>태그</label>
          <input
            className={`${styles.input} ${errors.tag && styles.err_border}`}
            type="text"
            name="tag"
            value={values.tag || ""}
            onChange={handleChange}
            onKeyUp={handleChips}
            placeholder="태그를 입력해주세요"
          />
          {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
          <div className={styles.chips_box}>
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
