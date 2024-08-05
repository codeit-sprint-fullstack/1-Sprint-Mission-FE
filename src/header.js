import Header_logo from "./img/Header_logo.svg";
import Header_my from "./img/Header_my.svg";
import "./header.css";

function Headers() {
  return (
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
  );
}

export default Headers;
