import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import useFormValidation from "@/hooks/useFormValidation.js";
import * as api from "@/pages/api/products";
import { productModel } from "@/models/productModel";
import styles from "@/styles/registration.module.css";
import x_icon from "@/public/images/ic_X.png";
import ic_plus from "@/public/images/ic_plus.png";
import AlertModal from "@/components/Modals/AlertModal";
import useAuth from "@/contexts/authContext";

export async function getServerSideProps(context) {
  //경로의 context 값이 있다면 지곤 상품의 수정으로 서버에서 값을 전달한다.
  const { id } = context.query;
  let product = null;
  if (id) {
    try {
      product = await api.getProduct(id);
    } catch (error) {
      console.log(error);
    }
  }
  return {
    props: { product },
  };
}

function Chips({ tag, onClick, index }) {
  const handleBtnClick = (e) => {
    e.preventDefault();
    onClick(index);
  };

  return (
    <div className={styles.chip}>
      #{tag}
      <button onClick={handleBtnClick}>
        <Image className={styles.x_icon} src={x_icon} alt="삭제아이콘" />
      </button>
    </div>
  );
}

function Registration({ product }) {
  const router = useRouter();
  useAuth();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [images, setImages] = useState([]);

  async function createProduct(values) {
    const postValues = productModel(values, chips);

    try {
      const data = await api.createProduct(postValues);
      if (data) {
        router.push(`/Items/${data.id}`);
      } else {
        setAlertMessage("상품 생성에 실패했습니다.");
        handleOpenAlert();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("상품 생성에 실패했습니다." + error.message);
      handleOpenAlert();
    }
  }

  async function updateProduct(values) {
    const postValues = productModel(values, chips);

    try {
      const data = await api.updateProduct(postValues);
      if (data) {
        router.push(`/Items/${data.id}`);
      } else {
        setAlertMessage("상품 수정에 실패했습니다.");
        handleOpenAlert();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("상품 수정에 실패했습니다." + error.message);
      handleOpenAlert();
    }
  }

  const handleOpenAlert = () => setOpenAlertModal(true);
  const handleCloseAlert = () => setOpenAlertModal(false);

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
      name: product ? product.name : "",
      description: product ? product.description : "",
      price: product ? product.price : 0,
      //tag는 필수 필드가 아니라 제외
    },
    product ? updateProduct : createProduct
  );

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...images];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }

    setImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
  };

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={handleCloseAlert}
        message={alertMessage}
      />
      <main>
        <form className={styles.add_product_form} onSubmit={handleSubmit}>
          <div className={styles.form_submit_box}>
            <h2>상품 등록하기</h2>
            <button
              type="submit"
              className={`${styles.submit_btn} ${
                disabled && styles.disabled_btn
              }`}
              disabled={disabled}
            >
              등록
            </button>
          </div>

          <div className={styles.input_box}>
            <label>삼품 이미지</label>
            <div className={styles.input_file_box}>
              <label htmlFor="files" className={styles.input_file_box_add_file}>
                <Image width={48} height={48} src={ic_plus} alt="이미지추가" />
                이미지 등록
              </label>
              {images.map((item, index) => (
                <div key={index} className={styles.file_input_item_box}>
                  <Image
                    onClick={() => handleDeleteImage(index)}
                    src={x_icon}
                    alt="이미지 삭제"
                    className={styles.file_item_x_icon}
                  />
                  <Image
                    className={styles.file_input_item}
                    width={24}
                    height={24}
                    src={item}
                    alt="이미지 미리보기"
                  />
                </div>
              ))}
              <input
                id="files"
                onChange={handleAddImages}
                accept="image/jpg, image/png, image/jpeg"
                className={styles.input_file}
                type="file"
                multiple
              />
            </div>
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
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
              autoComplete="off"
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
              autoComplete="off"
            />
            {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
          </div>
          <div className={styles.input_box}>
            <label>태그</label>
            <input
              className={`${styles.input} ${errors.tags && styles.err_border}`}
              type="text"
              name="tags"
              value={values.tags || ""}
              onChange={handleChange}
              // onKeyUp={handleChips}
              //캠처링 당계에서 이벤트 핸들링 시도
              onKeyDownCapture={handleChips}
              placeholder="태그를 입력해주세요"
              autoComplete="off"
            />
            {errors.tags && <p style={{ color: "red" }}>{errors.tags}</p>}
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
    </>
  );
}
export default Registration;
