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
const articleCommentModal_module_css_1 = __importDefault(require("./articleCommentModal.module.css"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const comments_1 = require("../../pages/api/comments");
const router_1 = require("next/router");
const CommentModal = ({ isOpen, closeModal, id, commentsId, }) => {
    // commentsId prop 추가
    const [btnState, setBtnState] = (0, react_1.useState)('commentBtnfalse');
    const [content, setContent] = (0, react_1.useState)('');
    const router = (0, router_1.useRouter)();
    if (!isOpen) {
        return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    }
    const contentHandle = (e) => {
        setContent(e.target.value);
        if (e.target.value.length > 0) {
            // content 대신 e.target.value 사용
            setBtnState('addbtn');
        }
        else {
            setBtnState('addbtnfalse');
        }
    };
    const patchClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const data = { content };
        try {
            yield (0, comments_1.patchArticleComment)(commentsId, data); // 댓글 수정 API 호출
            closeModal();
            router.reload(); // 페이지 새로고침
        }
        catch (e) {
            console.log('댓글 수정 실패:', e);
        }
    });
    return (<div className={articleCommentModal_module_css_1.default.modalContainer}>
      <div className={articleCommentModal_module_css_1.default.modalContent}>
        <div className={articleCommentModal_module_css_1.default.sss}>
          <image_1.default onClick={closeModal} src="/deleteImg.svg" width={24} height={24} alt="close"/>
        </div>
        <div>
          <form onSubmit={patchClick} className={articleCommentModal_module_css_1.default.Modalform}>
            <p>댓글 내용</p>
            <textarea className={articleCommentModal_module_css_1.default.InputContent} placeholder="수정할 내용을 입력해주세요" value={content} // value 설정
     onChange={contentHandle}></textarea>
            {btnState === 'addbtn' ? (<button className={articleCommentModal_module_css_1.default.addbtn}>수정</button>) : (<button onClick={(e) => e.preventDefault()} className={articleCommentModal_module_css_1.default.addbtnfalse}>
                수정
              </button>)}
          </form>
        </div>
      </div>
    </div>);
};
exports.default = CommentModal;
