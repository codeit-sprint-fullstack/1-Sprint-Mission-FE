import Button from "./Button";
import "../assets/styles/registration.css";

export function RegistrationBody() {
  function handleRegistration() {
    alert("registration");
  }

  let btnRegistClass = "btn-registration-74-decative";

  return (
    <main className="main-frame-registration">
      <div className="main__section-registration">
        <div className="flex-row main__registration-top-bar">
          <p className="Text-xl Bold main__registration-text">상품 등록하기</p>
          <Button className={btnRegistClass} onClick={handleRegistration} />
        </div>
      </div>
      <div className="main__registration-input-margin">
        <label className="main__registration-label">상품명</label>
        <input
          className="Text-lg-line-height24 Regular main__registration-input main__registration-input-small"
          placeholder="상품명의 입력해주세요"
        ></input>
      </div>
      <div className="main__registration-input-margin">
        <label className="main__registration-label">상품 소개</label>
        <textarea
          className="Text-lg-line-height24 Regular main__registration-input main__registration-input-big"
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
      </div>
      <div className="main__registration-input-margin">
        <label className="main__registration-label">판매가격</label>
        <input
          className="Text-lg-line-height24 Regular main__registration-input main__registration-input-small"
          placeholder="판매 가격을 입력해주세요"
        ></input>
      </div>
      <form className="main__registration-input-margin">
        <label className="main__registration-label">태그</label>
        <input
          className="Text-lg-line-height24 Regular main__registration-input main__registration-input-small"
          placeholder="태그를 입력해주세요"
        ></input>
      </form>
    </main>
  );
}

export default RegistrationBody;
