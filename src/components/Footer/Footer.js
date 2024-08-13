import faceBook from '../../assets/images/ic_facebook.png';
import instargram from '../../assets/images/ic_instagram.png';
import twitter from '../../assets/images/ic_twitter.png';
import youtube from '../../assets/images/ic_youtube.png';
import './footer.css';

const Footer = ({ className }) => {
  const footerClass = className ? `${className} Footer` : 'footer';

  return (
    <footer className={footerClass}>
      <div className="footerContainer">
        <span className="footerOne">ⓒcodeit - 2024</span>
        <div className="footerTwo">
          <span className="policy">Privacy Policy </span>
          <span className="faq">FAQ</span>
        </div>
        <div className="footerThree">
          <img src={faceBook} alt="facebook" className="sns" />
          <img src={twitter} alt="twitter" className="sns" />
          <img src={youtube} alt="yotube" className="sns" />
          <img src={instargram} alt="instargram" className="sns" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
