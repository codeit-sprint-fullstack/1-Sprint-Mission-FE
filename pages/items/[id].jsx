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
exports.default = Market;
const id_module_css_1 = __importDefault(require("./id.module.css"));
const image_1 = __importDefault(require("next/image"));
const products_1 = require("../api/products");
const react_1 = require("react");
const comments_1 = require("../api/comments");
// import { getProfile } from "../api/user";
const router_1 = require("next/router");
const modal_1 = require("../../components/modal");
const form_1 = __importDefault(require("../../hook/form"));
const utill_1 = require("../../utill/utill");
function getServerSideProps(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = path.params;
        return {
            props: {
                id,
            },
        };
    });
}
function isAxiosResponse(response) {
    return response && 'data' in response && 'status' in response;
}
function Market({ id }) {
    const { values, handleChange, handleSubmit, resetForm, isSubmitting } = (0, form_1.default)({
        name: '',
        description: '',
        price: '',
        tags: '',
        content: '',
    });
    const [product, setProduct] = (0, react_1.useState)(null);
    const [comments, setComments] = (0, react_1.useState)([]);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [openComments, setOpenComments] = (0, react_1.useState)({});
    const [commentData, setCommentData] = (0, react_1.useState)('');
    const [isProductModalOpen, setIsProductModalOpen] = (0, react_1.useState)(false);
    const [checkModal, setCheckModal] = (0, react_1.useState)(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = (0, react_1.useState)(false);
    const [commentId, setCommentId] = (0, react_1.useState)();
    const [isProductDeleteModalOpen, setIsProductDeleteModalOpen] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const fetchProduct = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, products_1.getProduct)(id); // 비동기 API 호출
                if (isAxiosResponse(response)) {
                    setProduct(response.data.product); // product 데이터를 올바르게 설정
                }
                else {
                    console.error('제품 정보를 가져오는 중 오류 발생:', response);
                }
            }
            catch (error) {
                console.error('제품 정보를 가져오는 중 알 수 없는 오류 발생:', error);
            }
        });
        fetchProduct();
    }, [id]);
    (0, react_1.useEffect)(() => {
        const fetchComments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, comments_1.getComments)(id, 9); // 비동기 API 호출
                if (isAxiosResponse(response)) {
                    // response가 AxiosResponse<{ message: string; comments: Comment[] }>인 경우
                    setComments(response.data.comments); // `comments`에 접근해서 상태로 설정
                }
                else {
                    console.error('댓글을 가져오는 중 오류 발생:', response);
                }
            }
            catch (error) {
                console.error('댓글을 가져오는 중 알 수 없는 오류 발생:', error);
            }
        });
        fetchComments();
    }, [id]);
    const handleContentChange = (event) => {
        setCommentData(event.target.value);
    };
    const handletoggle = () => {
        setIsOpen(!isOpen);
    };
    const handleDelete = () => __awaiter(this, void 0, void 0, function* () {
        setIsProductDeleteModalOpen(true);
    });
    const commentSubmitForm = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!commentId)
                return;
            const res = yield (0, comments_1.patchComment)(commentId, {
                content: values.content,
            });
            if (isAxiosResponse(res)) {
                if (res.status === 200) {
                    resetForm();
                    console.log('수정 성공', res.data);
                    router.push(`/items/${id}`);
                    setIsCommentsModalOpen(false);
                }
                else {
                    console.log('수정 실패', res.data);
                }
            }
            else {
                console.error('댓글 수정 중 오류 발생:', (_b = (_a = res === null || res === void 0 ? void 0 : res.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    });
    const submitForm = () => __awaiter(this, void 0, void 0, function* () {
        if (!product)
            return;
        try {
            const tags = values.tags
                ? values.tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean) // `filter(Boolean)`으로 undefined나 빈 문자열 필터링
                : product.tags;
            const res = yield (0, products_1.patchProduct)(id, {
                name: values.name || product.name,
                description: values.description || product.description,
                price: values.price ? Number(values.price) : product.price,
                tags: tags.length ? tags : product.tags, // `tags`가 비어 있으면 기존 태그 유지
            });
            if (isAxiosResponse(res)) {
                if (res.status === 200) {
                    setIsProductModalOpen(false);
                    console.log('수정 성공', res.data);
                    resetForm();
                    router.reload();
                }
                else {
                    console.log('수정 실패', res.data);
                }
            }
            else {
                console.error('수정 실패', res);
            }
        }
        catch (e) {
            console.error('에러', e);
        }
    });
    const handleCommentToggle = (index) => {
        setOpenComments((prevState) => (Object.assign(Object.assign({}, prevState), { [index]: !prevState[index] })));
    };
    return (<>
      <modal_1.Modal isModalOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)}>
        <form onSubmit={handleSubmit(submitForm)}>
          <p>게시글 수정</p>
          <p>게시글 제목</p>
          <textarea name="name" value={values.name} onChange={handleChange}></textarea>
          <p>가격</p>
          <textarea name="price" value={values.price} onChange={handleChange}></textarea>
          <p>내용</p>
          <textarea name="description" value={values.description} onChange={handleChange}></textarea>
          <p>태그</p>
          <textarea name="tags" value={values.tags} onChange={handleChange}></textarea>
          <button>수정</button>
        </form>
      </modal_1.Modal>
      <modal_1.Modal isModalOpen={isCommentsModalOpen} onClose={() => setIsCommentsModalOpen(false)}>
        <form onSubmit={handleSubmit(commentSubmitForm)}>
          <p>댓글 수정</p>
          <p>댓글 내용</p>
          <textarea name="content" value={values.content} onChange={handleChange}></textarea>
          <button>수정</button>
        </form>
      </modal_1.Modal>
      <modal_1.Modal isModalOpen={checkModal} onClose={() => setCheckModal(!checkModal)}>
        <p>성공 했습니다.</p>
        <button onClick={() => setCheckModal(!checkModal)}>확인</button>
      </modal_1.Modal>
      <modal_1.Modal isModalOpen={isProductDeleteModalOpen} onClose={() => setIsProductDeleteModalOpen(!isProductDeleteModalOpen)}>
        <p>정말 삭제 하시겠습니까!!?</p>
        <button style={{ width: '50%', height: '50px' }} onClick={() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, products_1.deleteProduct)(id);
                router.push('/market');
            }
            catch (error) {
                console.error('제품 삭제 오류', error);
            }
        })}>
          확인
        </button>
        <button style={{ width: '50%', height: '50px' }} onClick={() => setIsProductDeleteModalOpen(!isProductDeleteModalOpen)}>
          취소
        </button>
      </modal_1.Modal>
      <div className={id_module_css_1.default.marketContainer}>
        <div className={id_module_css_1.default.marketProductContainer}>
          <div className={id_module_css_1.default.itemImg}>
            {product && product.images && product.images.length > 0 ? (<image_1.default src={product.images[0]} width={486} height={486} alt="제품 이미지"/>) : (<p>이미지를 불러오는 중...</p>)}
          </div>
          <div className={id_module_css_1.default.marketProductTitle}>
            <div className={id_module_css_1.default.marketTitle}>
              <p>{product === null || product === void 0 ? void 0 : product.name}</p>
              <image_1.default onClick={handletoggle} src="/kebab-btn.svg" width={24} height={24} className={id_module_css_1.default.menuBtn} alt="menu"/>
              {isOpen && (<ul className={id_module_css_1.default.menu}>
                  <li onClick={() => setIsProductModalOpen(!isProductModalOpen)}>
                    수정 하기
                  </li>

                  <li onClick={() => handleDelete()}>삭제 하기</li>
                </ul>)}
            </div>
            <div className={id_module_css_1.default.marketPrice}>
              {((product === null || product === void 0 ? void 0 : product.price) || 0) + '원'}
            </div>
            <div className={id_module_css_1.default.marketContentName}>상품 소개</div>
            <div className={id_module_css_1.default.marketContent}>{product === null || product === void 0 ? void 0 : product.description}</div>
            <div className={id_module_css_1.default.marketTagName}>상품태그</div>
            <div className={id_module_css_1.default.marketTag}>
              {(product === null || product === void 0 ? void 0 : product.tags) && product.tags.length > 0 ? (product.tags.map((tag, index) => (<p className={id_module_css_1.default.tag} key={index}>
                    #{tag}
                  </p>))) : (<p>태그가 없습니다.</p>)}
            </div>
            <div className={id_module_css_1.default.marketProfile}>
              <div className={id_module_css_1.default.marketProfileContainer}>
                <div>
                  <image_1.default src="/MyImg.svg" width={40} height={40} alt="myImg"/>
                </div>
                <div>
                  {product ? (<>
                      <h1>{product.name}</h1>
                      <p>{product.description}</p>
                    </>) : (<p>Loading...</p>)}
                </div>
              </div>
              <button className={id_module_css_1.default.favorite} onClick={() => __awaiter(this, void 0, void 0, function* () {
            yield (0, products_1.postfavorite)((product === null || product === void 0 ? void 0 : product.id) || '');
            router.reload();
        })}>
                {'♡' + (product === null || product === void 0 ? void 0 : product.favoriteCount)}
              </button>
            </div>
          </div>
        </div>
        <div className={id_module_css_1.default.marketArticle}>
          <p className={id_module_css_1.default.marketArticleTitle}>문의하기</p>
          <textarea className={id_module_css_1.default.marketArticleTextarea} placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민협사상 책임을 게시자에게 있습니다." onChange={handleContentChange}></textarea>
          <button className={id_module_css_1.default.marketArticleBtn} onClick={() => __awaiter(this, void 0, void 0, function* () {
            yield (0, comments_1.postComment)((product === null || product === void 0 ? void 0 : product.id) || '', { content: commentData });
            router.reload();
        })}>
            등록
          </button>
          <div>
            {comments.length > 0 ? (comments.map((comment, index) => (<div key={index} className={id_module_css_1.default.marketArticleContainer}>
                  <div className={id_module_css_1.default.marketArticleContent}>
                    <p className={id_module_css_1.default.marketArticleContentTitle}>
                      {comment.content}
                    </p>{' '}
                    <image_1.default onClick={() => handleCommentToggle(index)} src="/kebab-btn.svg" width={24} height={24} className={id_module_css_1.default.commentMenu} alt="menu"/>
                    {openComments[index] && (<ul className={id_module_css_1.default.menu}>
                        <li onClick={() => {
                    setCommentId(comment.id);
                    setIsCommentsModalOpen(!isCommentsModalOpen);
                }}>
                          수정 하기
                        </li>
                        <li onClick={() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, comments_1.deleteComment)(comment.id);
                    router.reload();
                })}>
                          삭제 하기
                        </li>
                      </ul>)}
                  </div>
                  <div className={id_module_css_1.default.marketArticleProfileContainer}>
                    <div>
                      <image_1.default src="/MyImg.svg" width={40} height={40} alt="myImg"/>
                    </div>
                    <div className={id_module_css_1.default.marketArticleProfileInfo}>
                      <p className={id_module_css_1.default.marketArticleProfileName}>
                        {comment.nickname}
                      </p>{' '}
                      <p className={id_module_css_1.default.marketArticleProfileDate}>
                        {(0, utill_1.getTimeDifference)(comment.updatedAt)}
                      </p>{' '}
                    </div>
                  </div>
                </div>))) : (<p>댓글이 없습니다.</p>)}
          </div>
          <div className={id_module_css_1.default.marketArticleFooter}>
            <button className={id_module_css_1.default.marketArticleFooterBtn} onClick={() => router.push(`/market`)}>
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </>);
}
