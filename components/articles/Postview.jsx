"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const Postview_module_css_1 = __importDefault(require("./Postview.module.css"));
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const Postview = ({ articledata }) => {
    const router = (0, router_1.useRouter)();
    const pagemove = () => {
        router.push(`/article/${articledata.id}`);
    };
    return (<div className={Postview_module_css_1.default.Container} onClick={pagemove}>
      <div className={Postview_module_css_1.default.PostviewContainer}>
        <p>{articledata.content}</p>
        {articledata.images.length > 0 && (<image_1.default className={Postview_module_css_1.default.PostviewImg} src={articledata.images[0]} width={300} height={300} alt="Post Image"/>)}
      </div>
      <div className={Postview_module_css_1.default.PostviewInfo}>
        <div className={Postview_module_css_1.default.Posttitle}>
          <image_1.default src="/MyImg.svg" width={24} height={24} alt="User Profile"/>
          <p className={Postview_module_css_1.default.MyName}>{articledata.userId}</p>
          <p className={Postview_module_css_1.default.MyDate}>{articledata.createdAt.slice(0, 10)}</p>
        </div>
        <div>
          <p>♡{articledata.favoriteCount}+</p>
        </div>
      </div>
    </div>);
};
exports.default = Postview;
