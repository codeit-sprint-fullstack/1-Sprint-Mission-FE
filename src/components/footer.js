import { Link } from "react-router-dom";
import faceBookLogo from "../image/ic_facebook.png";
import instagramLogo from "../image/ic_instagram.png";
import youtubeLogo from "../image/ic_youtube.png";
import twitterLogo from "../image/ic_twitter.png";
import "../css/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_box">
        <p>@codeit - 2024</p>
        <div className="footer_center_box">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="sns_box">
          <Link to="https://www.facebook.com/" target="_blank">
            <img className="icon" src={faceBookLogo} alt="페이스북로고" />
          </Link>
          <Link to="https://x.com/?lang=ko" target="_blank">
            <img className="icon" src={twitterLogo} alt="트위터로고" />
          </Link>
          <Link to="https://www.youtube.com/" target="_blank">
            <img className="icon" src={youtubeLogo} alt="유튜브고" />
          </Link>
          <Link to="https://www.instagram.com/" target="_blank">
            <img className="icon" src={instagramLogo} alt="인스타그램로고" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
