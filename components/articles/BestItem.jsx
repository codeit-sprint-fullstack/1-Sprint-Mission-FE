"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BestItem_module_css_1 = __importDefault(require("./BestItem.module.css"));
const image_1 = __importDefault(require("next/image"));
const router_1 = require("next/router");
const BestItem = ({ article }) => {
    const router = (0, router_1.useRouter)();
    const pagemove = () => {
        router.push(`/article/${article.id}`);
    };
    return (<>
      <div className={BestItem_module_css_1.default.GridItem} onClick={pagemove}>
        <div className={BestItem_module_css_1.default.BestItem}>
          <div className={BestItem_module_css_1.default.BestItemImg}>
            <image_1.default src="/bestItem.svg" fill={true} alt="Best Item"/>
          </div>
          <p className={BestItem_module_css_1.default.BestItemTitle}>Best</p>
        </div>
        <div className={BestItem_module_css_1.default.BestItemContent}>
          <p className={BestItem_module_css_1.default.BestItemContentTitle}>{article.content}</p>
          <div className={BestItem_module_css_1.default.BestImg}>
            {article.images && article.images.length > 0 && (<image_1.default src={article.images[0]} fill={true} alt="logo"/>)}
          </div>
        </div>
        <div className={BestItem_module_css_1.default.BestItemInfo}>
          <p>{article.userId}</p>
          <p>♡{article.favoriteCount}+</p>
          <p className={BestItem_module_css_1.default.BestItemDate}>
            {article.createdAt.slice(0, 10)}
          </p>
        </div>
      </div>
    </>);
};
exports.default = BestItem;
