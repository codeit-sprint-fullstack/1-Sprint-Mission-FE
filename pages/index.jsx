"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Main;
const image_1 = __importDefault(require("next/image"));
const index_module_css_1 = __importDefault(require("../styles/index.module.css"));
const router_1 = require("next/router");
function Main() {
    const router = (0, router_1.useRouter)();
    return (<>
      <div className={index_module_css_1.default.mainContainer}>
        <div className={index_module_css_1.default.mainLogo}>
          <div className={index_module_css_1.default.logoDiv}>
            <div>
              <p className={index_module_css_1.default.logoTitle}>
                일상의 모든 물건을 거래해보세요
              </p>
              <button className={index_module_css_1.default.logoBtn} onClick={() => router.push('/market')}>
                구경하러 가기
              </button>
            </div>
            <div>
              <image_1.default src="/logoTop.svg" alt="logo" width={746} height={340}></image_1.default>
            </div>
          </div>
        </div>
        <div className={index_module_css_1.default.logoMiddle}>
          <image_1.default src="/logoMiddle1.svg" alt="logo" width={746} height={340}></image_1.default>
          <image_1.default src="/logoMiddle2.svg" alt="logo" width={746} height={340}></image_1.default>
          <image_1.default src="/logoMiddle3.svg" alt="logo" width={746} height={340}></image_1.default>
        </div>
        <div className={index_module_css_1.default.logoBottom}>
          <div className={index_module_css_1.default.logoDiv}>
            <div>
              <p className={index_module_css_1.default.logoBottomTitle}>믿을 수 있는</p>
              <p className={index_module_css_1.default.logoBottomTitle}>판다마켓 중고 거래</p>
            </div>
            <div>
              <image_1.default src="/logoBottom.svg" alt="logo" width={746} height={340}></image_1.default>
            </div>
          </div>
        </div>
      </div>
    </>);
}
