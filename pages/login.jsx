"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_module_css_1 = __importDefault(require("../styles/login.module.css"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const LoginForm_1 = __importDefault(require("../components/LoginForm"));
const router_1 = require("next/router");
const Login = () => {
    const [isLogin, setIsLogin] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const fetchProfile = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = localStorage.getItem('accessToken');
            if (token && token.length > 0) {
                setIsLogin(true); // 로그인 상태로 변경
            }
            else {
                setIsLogin(false); // 로그아웃 상태로 변경
            }
        });
        fetchProfile();
    }, []); // 처음 컴포넌트가 마운트될 때만 실행되도록 빈 의존성 배열 사용
    if (isLogin) {
        router.push('/folder');
        return null; // 로그인 상태일 경우 화면에 아무것도 렌더링하지 않음
    }
    return (<>
      <div className={login_module_css_1.default.loginContainer}>
        <div className={login_module_css_1.default.loginForm}>
          <div className={login_module_css_1.default.logoImg}>
            <image_1.default src="/logo.svg" alt="logo" fill={true}/>
          </div>
          <LoginForm_1.default />
          <div className={login_module_css_1.default.simpleLogin}>
            <p>간편 로그인하기</p>
            <div className={login_module_css_1.default.loginIcon}>
              <a href="https://www.google.com/" className={login_module_css_1.default.googleLogin}>
                <image_1.default src="/google.svg" alt="google" width={42} height={42}/>
              </a>
              <a className={login_module_css_1.default.kakaoLogin} href="https://www.kakaocorp.com/page">
                <image_1.default src="/kakao.svg" alt="kakao" width={42} height={42}/>
              </a>
            </div>
          </div>
          <p className={login_module_css_1.default.fromFooter}>
            판다마켓이 처음이신가요?{' '}
            <a onClick={() => router.push('/signup')}>회원가입</a>
          </p>
        </div>
      </div>
    </>);
};
exports.default = Login;
