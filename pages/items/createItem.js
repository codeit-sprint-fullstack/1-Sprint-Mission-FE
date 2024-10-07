import styles from "./createItem.module.css";
import Image from "next/image";
import useForm from "../../hook/form";
import { useState, useEffect } from "react";
import { postProduct } from "../api/products";

export default function CreateItem() {
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    isSubmitting,
  } = useForm({
    name: "",
    price: 0,
    images: [],
    tags: [],
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState({});

  const generateUUID = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (selectedImages.length + files.length > 3) {
      alert("이미지는 최대 3개까지 등록할 수 있습니다.");
      return;
    }

    const newImagesPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve({ id: generateUUID(), url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagesPromises).then((loadedImages) => {
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages, ...loadedImages].slice(0, 3);
        // console.log("업데이트된 이미지 리스트:", updatedImages);

        const imageUrls = updatedImages.map((image) => image.url);
        // images 값을 포함한 values 업데이트
        setValues((prevValues) => ({
          ...prevValues,
          images: imageUrls, // 최신 selectedImages를 사용하여 values 업데이트
        }));

        return updatedImages;
      });
    });
  };
  const handleRemoveImage = (id) => {
    setSelectedImages((prevImages) => {
      // console.log(id);
      const updatedImages = prevImages.filter((image) => image.id !== id);
      return updatedImages;
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      if (tags.length < 3) {
        const newTag = { id: generateUUID(), text: inputValue.trim() };

        // setTags의 콜백 함수에서 업데이트된 tags 배열을 사용하여 setValues 호출
        setTags((prevTags) => {
          const updatedTags = [...prevTags, newTag];
          const tagsText = updatedTags.map((tag) => tag.text);

          // 최신 updatedTags 배열을 사용하여 values 업데이트
          setValues((prevValues) => ({
            ...prevValues,
            tags: tagsText,
          }));

          return updatedTags;
        });

        setInputValue("");
      } else {
        setInputValue("");
        alert("태그는 최대 3개까지만 추가할 수 있습니다.");
      }
    }
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const validate = () => {
    let validationErrors = {};

    if (!values.name) {
      validationErrors.name = "상품 이름을 입력해주세요.";
    } else if (values.name.length < 2) {
      validationErrors.name = "상품 이름 2글자 이상 입력해주세요.";
    }

    if (!values.description) {
      validationErrors.description = "상품 description 입력해주세요.";
    } else if (values.description.length < 2) {
      validationErrors.description =
        "상품 description 2글자 이상 입력해주세요.";
    }

    if (!values.price) {
      validationErrors.price = "가격을 입력해주세요.";
    } else if (values.price < 0) {
      validationErrors.price = "가격가 0이다면 됩니다.";
    }

    if (selectedImages.length < 1) {
      validationErrors.images = "이미지를 입력해주세요.";
    }

    return validationErrors;
  };

  const submitForm = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    console.log(values);

    if (Object.keys(validationErrors).length === 0) {
      // console.log(validationErrors);
      try {
        const res = await postProduct({
          name: values.name,
          description: values.description,
          price: values.price,
          tags: tags,
          images: selectedImages,
        });
        if (res && res.status === 201) {
          resetForm();
          console.log("상품 등록 성공", res.data);
        } else {
          console.log("상품 등록 성공", res.data);
          // setIsModalOpen(true);
        }
      } catch (e) {
        // setIsModalOpen(true);
        console.log("에러", e);
      }
    } else {
      console.log(validationErrors);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.form}
          onKeyDown={(e) => {
            // Enter 키가 눌렸을 때 폼이 제출되지 않도록 기본 동작 막기
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit(submitForm)}
        >
          <div className={styles.createItem}>
            <p>상품 등록하기</p>
            <button type="submit">등록</button>
          </div>
          <p>상품 이미지</p>
          <div className={styles.fromTitle}>
            <div className={styles.uploadContainer}>
              <label className={styles.imageUpload}>
                <span className={styles.uploadText}>+</span>
                <span className={styles.uploadDescription}>이미지 등록</span>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageChange}
                  multiple
                />
              </label>

              {selectedImages.length > 0 && (
                <div className={styles.imageList}>
                  {selectedImages.map((image) => (
                    <div key={image.id} className={styles.imagePreview}>
                      <img
                        src={image.url}
                        alt="미리보기"
                        className={styles.previewImage}
                      />
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {errors.images && <p className={styles.error}>{errors.images}</p>}
          <div className={styles.inputTitle}>
            <p>상품명</p>
            <input
              placeholder="상품명을 입력해주세요"
              className={styles.inputStyle}
              name="name"
              onChange={handleChange}
              value={values.name}
            ></input>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
            <p>상품 소개</p>
            <textarea
              placeholder="상품 소개를 입력해주세요"
              className={styles.areaContent}
              name="description"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
            <p>판매가격</p>
            <input
              placeholder="판매 가격을 입력해주세요"
              className={styles.inputStyle}
              name="price"
              onChange={handleChange}
              value={values.price}
            ></input>
            {errors.price && <p className={styles.error}>{errors.price}</p>}
            <p>태그</p>
            <input
              placeholder="태그를 입력해주세요"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={styles.inputStyle}
            ></input>
          </div>
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <div key={tag.id} className={styles.tag}>
                #{tag.text}
                <button
                  className={styles.removeTagButton}
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
