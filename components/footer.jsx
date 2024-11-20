"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const footer_module_css_1 = __importDefault(require("./footer.module.css"));
const Footer = () => {
    return (<>
      <div className={footer_module_css_1.default.FooterContainer}>
        <div className={footer_module_css_1.default.FooterContent}>
          <p className={footer_module_css_1.default.FooterTitle}>@codeit - 2024</p>
          <div className={footer_module_css_1.default.FooterMenu}>
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>
          <div className={footer_module_css_1.default.FooterIcon}>
            <image_1.default src="/facebook.svg" alt="Facebook logo" width={20} height={20}/>
            <image_1.default src="/twitter.svg" alt="Twitter logo" width={20} height={20}/>
            <image_1.default src="/youtube.svg" alt="YouTube logo" width={20} height={20}/>
            <image_1.default src="/instagram.svg" alt="Instagram logo" width={20} height={20}/>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Footer;
