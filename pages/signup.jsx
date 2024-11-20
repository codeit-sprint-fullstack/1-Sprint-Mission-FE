"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signup;
const signup_module_css_1 = __importDefault(require("../styles/signup.module.css"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const SignupForm_1 = __importDefault(require("../components/SignupForm"));
const modal_1 = require("../components/modal");
const router_1 = require("next/router");
function Signup() {
    const router = (0, router_1.useRouter)();
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    return (<>
      <modal_1.Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
        <p>회원가입 실패 했어요!! 아직 에러코드 못내렸어요 콘솔창확인!</p>
        <button onClick={() => setIsModalOpen(!isModalOpen)}>확인</button>
      </modal_1.Modal>
      <div className={signup_module_css_1.default.signupContainer}>
        <div className={signup_module_css_1.default.signupForm}>
          <div className={signup_module_css_1.default.logoImg}>
            <image_1.default src="/logo.svg" // 경로 수정: './' 대신 '/' 사용하여 public 폴더 기준으로 변경
     alt="logo" fill={true} sizes="100vw"/>
          </div>
          <SignupForm_1.default isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

          <div className={signup_module_css_1.default.simpleLogin}>
            <p>간편 로그인하기</p>
            <div className={signup_module_css_1.default.loginIcon}>
              <a className={signup_module_css_1.default.googleLogin}>
                <image_1.default src="/google.svg" alt="google" width={42} height={42}/>
              </a>
              <a className={signup_module_css_1.default.kakaoLogin}>
                <image_1.default src="/kakao.svg" alt="kakao" width={42} height={42}/>
              </a>
            </div>
          </div>
          <p className={signup_module_css_1.default.formfooter}>
            이미 회원이신가요?{' '}
            <a onClick={() => {
            router.push('/login');
        }}>
              로그인
            </a>
          </p>
        </div>
      </div>
    </>);
}
