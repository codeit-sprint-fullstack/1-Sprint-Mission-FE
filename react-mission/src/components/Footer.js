import imgFacebook from './img/ic_facebook.png'
import imgTwitter from './img/ic_twitter.png'
import imgYoutube from './img/ic_youtube.png'
import imgInstagram from './img/ic_instagram.png'



function Footer() {
    return (
        <footer class="bottom-frame">
            <div class="bottom-box">
                <div class="mobile">©codeit - 2024</div>
                <div class="link_box">
                    <div class="qna">
                        <a class="qna-word" href="/privacy/">Privacy Policy</a>
                        <a class="qna-word" href="/faq/">FAQ</a>
                    </div>
                    <div class="icon">
                        <a href="https://www.facebook.com/" target="_blank">
                            <img src={imgFacebook} />
                        </a>
                        <a href="https://x.com/" target="_blank">
                            <img src={imgTwitter} />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank">
                            <img src={imgYoutube} />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank">
                            <img src={imgInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer