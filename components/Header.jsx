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
exports.default = Header;
const image_1 = __importDefault(require("next/image"));
const Header_module_css_1 = __importDefault(require("./Header.module.css"));
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const react_1 = require("react");
const user_1 = require("../pages/api/user");
function Header() {
    const [isLogin, setIsLogin] = (0, react_1.useState)(false);
    const [userData, setUserData] = (0, react_1.useState)(null);
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        // 비동기 함수 정의
        const fetchProfile = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setIsLogin(false);
                    return;
                }
                const profile = yield (0, user_1.getProfile)(); // 비동기 함수 실행
                if ('id' in profile) {
                    setUserData(profile); // 프로필 데이터를 저장
                    setIsLogin(true); // 로그인 상태로 변경
                }
                else {
                    setIsLogin(false); // 로그아웃 상태로 변경
                }
            }
            catch (error) {
                console.error('개인 정보를 가져오는 중 오류 발생:', error);
                setIsLogin(false); // 오류 발생 시 로그인 상태 초기화
            }
        });
        // 비동기 함수 호출
        fetchProfile();
    }, []);
    return (<div className={Header_module_css_1.default.Header}>
      <div className={Header_module_css_1.default.HeaderImgContainer}>
        <image_1.default src="/logo-img.svg" alt="logo" fill={true} className={Header_module_css_1.default.HeaderImg} onClick={() => (window.location.href = '/')}/>
      </div>
      <div className={Header_module_css_1.default.HeaderMenu}>
        <link_1.default href="/articles" className={router.pathname === '/articles' ? Header_module_css_1.default.Active : Header_module_css_1.default.NotActive}>
          <p>자유 게시판</p>
        </link_1.default>
        <link_1.default href="/market" className={router.pathname === '/market' ? Header_module_css_1.default.Active : Header_module_css_1.default.NotActive}>
          <p>중고마켓</p>
        </link_1.default>
      </div>
      {!isLogin ? (<button className={Header_module_css_1.default.HeaderBtn} onClick={() => router.push('/login')}>
          로그인
        </button>) : (<div className={Header_module_css_1.default.loginSuccess}>
          <image_1.default src="/MyImg.svg" alt="profile" width={40} height={40}/>
          <p>{userData === null || userData === void 0 ? void 0 : userData.nickname}</p>
        </div>)}
    </div>);
}
