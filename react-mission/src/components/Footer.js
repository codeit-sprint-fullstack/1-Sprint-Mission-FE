import "./Footer.css";
import imgFacebook from "./img/ic_facebook.png";
import imgTwitter from "./img/ic_twitter.png";
import imgYoutube from "./img/ic_youtube.png";
import imgInstagram from "./img/ic_instagram.png";

function Footer() {
  return (
    <footer className="bottom-frame">
      <div className="bottom-box">
        <div className="mobile">©codeit - 2024</div>
        <div className="link_box">
          <div className="qna">
            <a className="qna-word" href="/privacy/">
              Privacy Policy
            </a>
            <a className="qna-word" href="/faq/">
              FAQ
            </a>
          </div>
          <div className="icon">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={imgFacebook} alt="페이스북" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <img src={imgTwitter} alt="X(구트위터)" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <img src={imgYoutube} alt="유튜브" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={imgInstagram} alt="인스타그램" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
