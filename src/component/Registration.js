import { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://product-api-shiu.onrender.com/products";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  // useNavigate 훅 초기화
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register product");
      }

      const result = await response.json();
      console.log("Product registered successfully:", result);
      // 등록 성공 후 상세 페이지로 이동
      navigate(`/products/${result._id}`);
    } catch (error) {
      console.error("Error registering product:", error.message);
      // 추가 작업: 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div>
      <div className="reg-header">
        <h1 className="reg-title">상품 등록하기</h1>
        <button className="reg-button" onClick={handleSubmit}>
          등록
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="reg-input-box">
          <label>상품명</label>
          <input
            placeholder="상품명을 입력해주세요"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="reg-input-box">
          <label>상품 소개</label>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="reg-input-box">
          <label>판매 가격</label>
          <input
            placeholder="판매 가격을 입력해주세요"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="reg-input-box">
          <label>태그</label>
          <input
            placeholder="태그를 입력해주세요"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}

export default Registration;
