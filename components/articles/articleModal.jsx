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
const articleModal_module_css_1 = __importDefault(require("./articleModal.module.css"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const articles_1 = require("../../pages/api/articles");
const router_1 = require("next/router");
const Modal = ({ isOpen, closeModal, id }) => {
    const [btnState, setBtnState] = (0, react_1.useState)('commentBtnfalse');
    const [title, setTitle] = (0, react_1.useState)('');
    const [content, setContent] = (0, react_1.useState)('');
    const router = (0, router_1.useRouter)();
    const titleHandle = (e) => {
        setTitle(e.target.value);
        if (title.length > 0 && content.length > 0) {
            setBtnState('addbtn');
        }
        else {
            setBtnState('addbtnfalse');
        }
    };
    const contentHandle = (e) => {
        setContent(e.target.value);
        if (title.length > 0 && content.length > 0) {
            setBtnState('addbtn');
        }
        else {
            setBtnState('addbtnfalse');
        }
    };
    const patchClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const data = {
            title: title,
            content,
        };
        try {
            yield (0, articles_1.patchArticle)(id, data);
            closeModal();
        }
        catch (e) {
            console.log(e);
        }
        // router.reload();
    });
    if (!isOpen) {
        return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    }
    return (<div className={articleModal_module_css_1.default.modalContainer}>
      <div className={articleModal_module_css_1.default.modalContent}>
        <div className={articleModal_module_css_1.default.sss}>
          <image_1.default onClick={closeModal} src="/deleteImg.svg" width={24} height={24} alt="close"></image_1.default>
        </div>
        <div>
          <form onSubmit={patchClick} className={articleModal_module_css_1.default.Modalform}>
            <p>게시글 제목</p>
            <textarea className={articleModal_module_css_1.default.InputTitle} placeholder="수정할 제목을 입력해주세요" onChange={titleHandle}></textarea>
            <p>게시글 내용</p>
            <textarea className={articleModal_module_css_1.default.InputContent} placeholder="수정할 내용을 입력해주세요" onChange={contentHandle}></textarea>
            {btnState === 'addbtn' ? (<button className={articleModal_module_css_1.default.addbtn}>수정</button>) : (<button onClick={(e) => e.preventDefault()} className={articleModal_module_css_1.default.addbtnfalse}>
                수정
              </button>)}
          </form>
        </div>
      </div>
    </div>);
};
exports.default = Modal;
