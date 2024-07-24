import "../assets/styles/footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer__block">
        <div className="Text-lg Regular footer__text-extra footer__text-extra--mobile">
          ©codeit - 2024
        </div>
        <div className="Text-lg Regular footer__text-extra footer__link-texts">
          <a href="/privacy" target="_self" className="footer__link-text">
            Privacy Policy
          </a>
          <a href="/faq" target="_self" className="footer__link-text">
            FAQ
          </a>
        </div>
        <div className="footer__link-icons">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="footer__link-icon footer__facebook-icon"
              alt="페이스북 링크"
            />
          </a>
          <a href="https://x.com/" target="_blank" rel="noreferrer">
            <img className="footer__link-icon footer__twitter-icon" alt="엑스 링크" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <img
              className="footer__link-icon footer__youtube-icon"
              alt="유튜브 링크"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="footer__link-icon footer__instagram-icon"
              alt="인스타그램 링크"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
