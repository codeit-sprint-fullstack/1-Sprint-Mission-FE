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
exports.getServerSideProps = getServerSideProps;
exports.default = Post;
const id_module_css_1 = __importDefault(require("./id.module.css"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const articles_1 = require("../api/articles");
const comments_1 = require("../api/comments");
const router_1 = require("next/router");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const articleModal_1 = __importDefault(require("../../components/articles/articleModal"));
const articleCommentModal_1 = __importDefault(require("../../components/articles/articleCommentModal"));
let pageSize = 3;
function getServerSideProps(_a) {
    return __awaiter(this, arguments, void 0, function* ({ params, }) {
        const { id } = params;
        return {
            props: {
                id,
            },
        };
    });
}
function Post({ id }) {
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [isModalOpen2, setIsModalOpen2] = (0, react_1.useState)(false);
    const [modalData, setModalData] = (0, react_1.useState)(null);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [openComments, setOpenComments] = (0, react_1.useState)({});
    const [data, setData] = (0, react_1.useState)(null);
    const [date, setDate] = (0, react_1.useState)(''); // 바로 추가하려고했으나 {.slice(0, 10)}에서 오류가 발생.. 이유 못찾음
    const [commentContent, setCommentContent] = (0, react_1.useState)('');
    const [commentData, setCommentData] = (0, react_1.useState)([]);
    const [btnState, setBtnState] = (0, react_1.useState)('commentBtn');
    const router = (0, router_1.useRouter)();
    const [isFetching, setIsFetching] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // 스크롤 이벤트 핸들러 추가
        window.addEventListener('scroll', handleScroll);
        return () => {
            // 컴포넌트 언마운트 시 스크롤 이벤트 핸들러 제거
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY === document.body.offsetHeight &&
            !isFetching) {
            // 끝에 도달했는지 확인
            setIsFetching(true);
        }
    };
    (0, react_1.useEffect)(() => {
        if (!isFetching)
            return;
        // 여기서 데이터를 로드하거나 API 호출 가능
        pageSize += 3;
        // 데이터 로드가 끝나면 isFetching 상태를 false로 설정
        setTimeout(() => {
            setIsFetching(false);
        }, 2000); // 임의의 지연 시간 추가
    }, [isFetching]);
    const article = () => __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, articles_1.getArticleId)(id, pageSize);
        if ('data' in response) {
            const articleData = response.data.article;
            setDate(articleData.createdAt.slice(0, 10));
            setData(articleData);
            setCommentData(articleData.comment);
        }
    });
    (0, react_1.useEffect)(() => {
        article();
    }, [commentData]);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalOpen2(false);
    };
    const commentPost = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const data = {
            content: commentContent,
        };
        try {
            yield (0, comments_1.postArticleComment)(id, data);
            setCommentContent('');
        }
        catch (e) {
            console.log(e);
        }
    });
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleCommentToggle = (index) => {
        setOpenComments((prevState) => (Object.assign(Object.assign({}, prevState), { [index]: !prevState[index] })));
    };
    const movePage = () => {
        router.push(`/`);
    };
    const handlePatch = () => {
        setIsModalOpen(true);
        setIsOpen(!isOpen);
    };
    const handleDelete = () => __awaiter(this, void 0, void 0, function* () {
        yield (0, articles_1.deleteArticle)(id);
        setIsOpen(!isOpen);
        movePage();
    });
    const handlePatchComment = (index) => {
        const comment = commentData[index];
        setIsModalOpen2(true);
        setModalData({ id: comment.articleId, commentsId: comment.id });
        setOpenComments((prevState) => (Object.assign(Object.assign({}, prevState), { [index]: !prevState[index] })));
    };
    const handleDeleteComment = (index) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const commentId = commentData[index].id;
        const res = yield (0, comments_1.deleteArticleComment)(commentId);
        setOpenComments((prevState) => (Object.assign(Object.assign({}, prevState), { [index]: !prevState[index] })));
        if ('status' in res && (res.status === 200 || res.status === 204)) {
            setOpenComments((prevState) => (Object.assign(Object.assign({}, prevState), { [index]: false })));
        }
        else if ('response' in res &&
            (((_a = res.response) === null || _a === void 0 ? void 0 : _a.status) === 500 || ((_b = res.response) === null || _b === void 0 ? void 0 : _b.status) === 404)) {
            console.log('error:', ((_d = (_c = res.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || 'Unknown error');
        }
    });
    const handleComment = (e) => {
        setCommentContent(e.target.value);
    };
    (0, react_1.useEffect)(() => {
        if (commentContent.length > 1) {
            setBtnState('commentBtntrue');
        }
        else {
            setBtnState('commentBtn');
        }
    }, [commentContent]);
    return (<>
      <div className={id_module_css_1.default.postContainer}>
        <articleModal_1.default isOpen={isModalOpen} closeModal={closeModal} id={(data === null || data === void 0 ? void 0 : data.id) || ''}/>
        <articleCommentModal_1.default isOpen={isModalOpen2} closeModal={closeModal} id={(modalData === null || modalData === void 0 ? void 0 : modalData.id) || ''} commentsId={(modalData === null || modalData === void 0 ? void 0 : modalData.commentsId) || ''}/>
        <div className={id_module_css_1.default.pstInfo}>
          <div className={id_module_css_1.default.posttop}>
            <p>{data === null || data === void 0 ? void 0 : data.name}</p>
            <image_1.default onClick={handleToggle} src="/kebab-btn.svg" width={24} height={24} className={id_module_css_1.default.menuBtn} alt="Menu Button"/>
            {isOpen && (<ul className={id_module_css_1.default.menu}>
                <li onClick={handlePatch}>수정 하기</li>
                <li onClick={handleDelete}>삭제 하기</li>
              </ul>)}
          </div>
          <div className={id_module_css_1.default.postmiddle}>
            <div className={id_module_css_1.default.posttitle}>
              <image_1.default className={id_module_css_1.default.postImg} src="/MyImg.svg" width={40} height={40} alt="My Profile"/>
              <p className={id_module_css_1.default.titlename}>{data === null || data === void 0 ? void 0 : data.userId}</p>
              <p className={id_module_css_1.default.titledate}>{date}</p>
            </div>
            <div>
              <button className={id_module_css_1.default.likebtn} onClick={() => (0, articles_1.postFavorite)((data === null || data === void 0 ? void 0 : data.id) || '')}>
                ♡ {data === null || data === void 0 ? void 0 : data.favoriteCount}
              </button>
            </div>
          </div>
          <div className={id_module_css_1.default.postcontent}>
            <p>{data === null || data === void 0 ? void 0 : data.content}</p>
          </div>
        </div>
        <div className={id_module_css_1.default.commentContainer}>
          <p className={id_module_css_1.default.commentTitle}>댓글 달기</p>
          <form className={id_module_css_1.default.commentForm} onSubmit={commentPost}>
            <div className={id_module_css_1.default.commentContent}>
              <textarea value={commentContent} onChange={handleComment} className={id_module_css_1.default.commentInput} placeholder="댓글을 입력해주세요"/>
              <button type="submit" className={id_module_css_1.default[btnState]} disabled={btnState === 'commentBtn'}>
                등록
              </button>
            </div>
          </form>
        </div>
        <div className={id_module_css_1.default.commentList}>
          {commentData.map((comment, index) => (<div className={id_module_css_1.default.commentItemStyle} key={comment.id}>
              <div className={id_module_css_1.default.commenttop}>
                <p>{comment.content}</p>
                <image_1.default onClick={() => handleCommentToggle(index)} src="/kebab-btn.svg" width={24} height={24} className={id_module_css_1.default.commentmenu} alt="Comment Menu"/>
                {openComments[index] && (<ul className={id_module_css_1.default.menu}>
                    <li onClick={() => handlePatchComment(index)}>수정 하기</li>
                    <li onClick={() => handleDeleteComment(index)}>
                      삭제 하기
                    </li>
                  </ul>)}
              </div>
              <div className={id_module_css_1.default.commentItem}>
                <image_1.default className={id_module_css_1.default.commentImg} src="/MyImg.svg" width={32} height={32} alt="My Profile"/>
                <div className={id_module_css_1.default.commentmiddle}>
                  <p className={id_module_css_1.default.commentname}>{comment.name}</p>
                  <p className={id_module_css_1.default.commentdate}>
                    {(0, date_fns_1.formatDistanceToNow)(new Date(comment.createdAt), {
                addSuffix: true,
                locale: locale_1.ko,
            })}
                  </p>
                </div>
              </div>
            </div>))}
        </div>
        <div className={id_module_css_1.default.commentbottom}>
          <button onClick={movePage} className={id_module_css_1.default.commentbottomBtn}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </>);
}
