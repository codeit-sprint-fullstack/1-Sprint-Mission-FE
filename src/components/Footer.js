import "../assets/styles/footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer_space">
        <div className="footer_icons_common">
          <div id="company" className="footer_text">
            <a>©codeit - 2024</a>
          </div>
          <div id="footer_link_texts" className="footer_text">
            <a href="/privacy" target="_self" className="link_text">
              Privacy Policy
            </a>
            <a href="/faq" target="_self" className="link_text">
              FAQ
            </a>
          </div>
          <div id="footer_link_icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer_icon"
                id="facebook-icon"
                alt="페이스북 링크"
              />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              <img className="footer_icon" id="twitter-icon" alt="엑스 링크" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img
                className="footer_icon"
                id="youtube-icon"
                alt="유튜브 링크"
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer_icon"
                id="instagram-icon"
                alt="인스타그램 링크"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
