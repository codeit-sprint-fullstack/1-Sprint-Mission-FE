import React, { useState } from "react";
import DeleteModal from "../components/DeleteModal";
const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirm = () => {
    console.log("상품이 삭제되었습니다.");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1 style={{ paddingLeft: "80px", paddingTop: "20px" }}>
        헬로우 바오마켓
      </h1>
      <button
        style={{ marginTop: "20px", marginLeft: "80px" }}
        onClick={() => setIsModalVisible(true)}
      >
        상품 삭제 모달 테스트
      </button>

      {isModalVisible && (
        <DeleteModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default HomePage;
