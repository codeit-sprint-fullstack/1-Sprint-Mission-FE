import { useState, useEffect } from "react";
import { createProduct } from "API/CreateProduct";
import removeIcon from "assets/images/removal-icon.png";
import useFormValidation from "hooks/UseArticleValidation";
import "assets/styles/reg.css";

function RegistrationPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState("");

  const { errors, validateField, validateAllFields, isFormValid } =
    useFormValidation();

  useEffect(() => {
    validateAllFields({
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
    });
  }, [formValues, validateAllFields]);

  const handleInputChange = ({ target: { id, value } }) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      setFormValues((prev) => ({
        ...prev,
        tags: [currentTag.trim(), ...prev.tags],
      }));
      setCurrentTag("");
    }
  };

  const handleTagRemove = (indexToRemove) => {
    setFormValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formValues,
      price: Number(formValues.price),
    };

    try {
      const response = await createProduct(productData);
      if (response) {
        console.log("상품 등록 성공");
        setFormValues({
          name: "",
          description: "",
          price: "",
          tags: [],
        });
      } else {
        console.log("상품 등록에 실패했습니다.");
      }
    } catch (error) {
      console.log(
        error.response ? error.response.data : "리퀘스트가 실패했습니다."
      );
    }
  };

  return (
    <div className="form-container">
      <form className="form-inner-container" onSubmit={handleFormSubmit}>
        <div className="form-header">
          <p>상품 등록하기</p>
          <button
            type="submit"
            className={`submit-button ${isFormValid ? "active" : "disabled"}`}
            disabled={!isFormValid}
          >
            등록
          </button>
        </div>

        <div className="flex-container flex-name">
          <label htmlFor="name" className="label">
            상품명
          </label>
          <input
            id="name"
            className={`input ${errors.name ? "error" : ""}`}
            placeholder="상품명을 입력해주세요"
            value={formValues.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="flex-container flex-description">
          <label htmlFor="description" className="label">
            상품 소개
          </label>
          <textarea
            id="description"
            className={`input ${errors.description ? "error" : ""}`}
            placeholder="상품 소개를 입력해주세요"
            value={formValues.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>

        <div className="flex-container flex-price">
          <label htmlFor="price" className="label">
            판매가격
          </label>
          <input
            id="price"
            className={`input ${errors.price ? "error" : ""}`}
            placeholder="판매 가격을 입력해주세요"
            value={formValues.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>

        <div className="flex-container flex-tag">
          <label htmlFor="tag" className="label">
            태그
          </label>
          <input
            id="tag"
            className={`input ${errors.tag ? "error" : ""}`}
            placeholder="태그를 입력해주세요."
            value={currentTag}
            onChange={({ target: { value } }) => setCurrentTag(value)}
            onKeyDown={handleTagKeyDown}
          />
          {errors.tag && <p className="error-message">{errors.tag}</p>}

          <div className="tags-container">
            {formValues.tags.map((tag, index) => (
              <div key={index} className="tag-item">
                #{tag}
                <img
                  className="tag-remove"
                  src={removeIcon}
                  alt="x"
                  onClick={() => handleTagRemove(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
