import React, { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

  const handleConfirm = () => {
    console.log("상품이 삭제되었습니다.");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleShowSpinner = () => {
    setIsSpinnerVisible(true);
  };

  const handleHideSpinner = () => {
    setIsSpinnerVisible(false);
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

      <button
        style={{ marginTop: "20px", marginLeft: "80px" }}
        onClick={handleShowSpinner}
      >
        스피너 표시
      </button>

      <button
        style={{ marginTop: "20px", marginLeft: "20px" }}
        onClick={handleHideSpinner}
      >
        스피너 숨기기
      </button>

      {isSpinnerVisible && <Spinner />}
    </div>
  );
};

export default HomePage;

