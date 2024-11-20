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
exports.default = Create;
const create_module_css_1 = __importDefault(require("./create.module.css"));
const react_1 = require("react");
const router_1 = require("next/router");
const articles_1 = require("../api/articles");
function Create() {
    const [title, setTitle] = (0, react_1.useState)('');
    const [content, setContent] = (0, react_1.useState)('');
    const [btnState, setBtnState] = (0, react_1.useState)('addpostBtnfalse');
    const [selectedImages, setSelectedImages] = (0, react_1.useState)([]);
    const [imagesUrl, setImagesUrl] = (0, react_1.useState)([]);
    const router = (0, router_1.useRouter)();
    const generateUUID = () => {
        return Math.random().toString(36).substring(2, 9);
    };
    const handleImageChange = (event) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (selectedImages.length + files.length > 3) {
            alert('이미지는 최대 3개까지 등록할 수 있습니다.');
            return;
        }
        const newImagesPromises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve({ id: generateUUID(), url: reader.result });
                reader.readAsDataURL(file);
            });
        });
        Promise.all(newImagesPromises).then((loadedImages) => {
            setSelectedImages((prevImages) => {
                const updatedImages = [...prevImages, ...loadedImages].slice(0, 3);
                const imageUrls = updatedImages.map((image) => image.url);
                setImagesUrl(imageUrls);
                return updatedImages;
            });
        });
    };
    const handleRemoveImage = (id) => {
        setSelectedImages((prevImages) => {
            const updatedImages = prevImages.filter((image) => image.id !== id);
            setImagesUrl(updatedImages.map((image) => image.url));
            return updatedImages;
        });
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    (0, react_1.useEffect)(() => {
        if (title.length > 0 && content.length > 0) {
            setBtnState('addpostBtntrue');
        }
        else {
            setBtnState('addpostBtnfalse');
        }
    }, [title, content]);
    const postClick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const data = {
            name: title,
            content: content,
            images: imagesUrl,
            userId: localStorage.getItem('userId'),
            favoriteCount: 0,
            comment: [],
        };
        try {
            yield (0, articles_1.postArticle)(data);
            router.push(`/`);
        }
        catch (e) {
            console.error(e);
        }
    });
    return (<>
      <div className={create_module_css_1.default.addpostContainer}>
        <form className={create_module_css_1.default.addpostporm} onSubmit={postClick}>
          <div className={create_module_css_1.default.addposttitle}>
            <p>게시글 쓰기</p>
            {btnState === 'addpostBtnfalse' ? (<button className={create_module_css_1.default[btnState]} onClick={(e) => {
                e.preventDefault();
            }}>
                등록
              </button>) : (<button type="submit" className={create_module_css_1.default[btnState]}>
                등록
              </button>)}
          </div>
          <div className={create_module_css_1.default.addpostContent}>
            <p>상품 이미지</p>
            <div className={create_module_css_1.default.fromTitle}>
              <div className={create_module_css_1.default.uploadContainer}>
                <label className={create_module_css_1.default.imageUpload}>
                  <span className={create_module_css_1.default.uploadText}>+</span>
                  <span className={create_module_css_1.default.uploadDescription}>이미지 등록</span>
                  <input type="file" accept="image/*" className={create_module_css_1.default.fileInput} onChange={handleImageChange} multiple/>
                </label>

                {selectedImages.length > 0 && (<div className={create_module_css_1.default.imageList}>
                    {selectedImages.map((image) => (<div key={image.id} className={create_module_css_1.default.imagePreview}>
                        <img src={image.url} alt="미리보기" className={create_module_css_1.default.previewImage}/>
                        <button className={create_module_css_1.default.removeButton} onClick={() => handleRemoveImage(image.id)}>
                          ✖
                        </button>
                      </div>))}
                  </div>)}
              </div>
            </div>
            <div className={create_module_css_1.default.formtitle}>
              <p>* 제목</p>
              <input onChange={handleTitleChange} className={create_module_css_1.default.InputTitle} type="text" placeholder="제목을 입력해주세요"/>
            </div>
            <div className={create_module_css_1.default.formContent}>
              <p>* 내용</p>
              <textarea onChange={handleContentChange} className={create_module_css_1.default.InputContent} placeholder="내용을 입력해주세요"/>
            </div>
          </div>
        </form>
      </div>
    </>);
}
