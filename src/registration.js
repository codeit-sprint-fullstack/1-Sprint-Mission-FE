import Header_logo from "./img/Header_logo.svg";
import Header_my from "./img/Header_my.svg";
import "./registration.css";
function Registration() {
  return (
    <>
      <header>
        <div id="header">
          <a href="https://extraordinary-lily-d8e584.netlify.app/">
            <img id="header_logo_img" alt="" src={Header_logo}></img>
          </a>

          <div id="header_str">
            <p>자유게시판</p>
            <a>
              <p>중고마켓</p>
            </a>
          </div>

          <img id="header_my_img" alt="" src={Header_my}></img>
        </div>
      </header>
      <main>
        <div id="main">
          <div id="resgistration_container">
            <div id="add_title">
              <p id="resgistration_title">상품 등록하기</p>
              <button id="resgistration_btn">등록</button>
            </div>
            <div id="resgistration_container">
              <from id="resgistration_form">
                <p id="from_title">상품명</p>
                <textarea
                  name="name"
                  id="resgistration_area"
                  rows="1"
                  placeholder="상품명을 입력해주세요"
                ></textarea>
                <p id="from_title">상품 소개</p>
                <textarea
                  name="content"
                  id="resgistration_area_content"
                  placeholder="상품 소개를 입력해주세요"
                ></textarea>
                <p id="from_title">판매가격</p>
                <textarea
                  name="prcie"
                  id="resgistration_area"
                  placeholder="판매 가격을 입력해주세요"
                ></textarea>
                <p id="from_title">태그</p>
                <textarea
                  name="tag"
                  id="resgistration_area"
                  placeholder="태그를 입력해주세요"
                ></textarea>
              </from>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Registration;
