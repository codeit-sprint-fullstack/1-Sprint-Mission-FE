import "./Registration.css";

function Registration() {
  return (
    <div>
      <div className="reg-header">
        <h1 className="reg-title">상품 등록하기</h1>
        <button className="reg-button">등록</button>
      </div>
      <form>
        <div className="reg-input-box">
          <label>상품명</label>
          <input placeholder="상품명을 입력해주세요" />
        </div>
        <div className="reg-input-box">
          <label>상품 소개</label>
          <textarea placeholder="상품 소개를 입력해주세요" />
        </div>
        <div className="reg-input-box">
          <label>판매 가격</label>
          <input placeholder="판매 가격을 입력해주세요" />
        </div>
        <div className="reg-input-box">
          <label>태그</label>
          <input placeholder="태그를 입력해주세요" />
        </div>
      </form>
    </div>
  );
}

export default Registration;
