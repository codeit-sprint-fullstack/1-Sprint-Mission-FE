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
exports.default = CreateItem;
const createItem_module_css_1 = __importDefault(require("./createItem.module.css"));
const form_1 = __importDefault(require("../../hook/form"));
const react_1 = require("react");
const products_1 = require("../api/products");
function isAxiosResponse(response) {
    return response && 'status' in response && 'data' in response;
}
function CreateItem() {
    const { values, handleChange, handleSubmit, resetForm, setValues, isSubmitting, } = (0, form_1.default)({
        name: '',
        price: 0,
        images: [],
        tags: [],
        description: '',
    });
    const [selectedImages, setSelectedImages] = (0, react_1.useState)([]);
    const [tags, setTags] = (0, react_1.useState)([]);
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const [errors, setErrors] = (0, react_1.useState)({});
    const generateUUID = () => {
        return Math.random().toString(36).substring(2, 9);
    };
    const handleImageChange = (event) => __awaiter(this, void 0, void 0, function* () {
        const files = Array.from(event.target.files || []);
        if (selectedImages.length + files.length > 3) {
            alert('이미지는 최대 3개까지 등록할 수 있습니다.');
            return;
        }
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('image', file);
        });
        for (const file of files) {
            const image = yield (0, products_1.uploadImageToS3)(file);
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
                setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { images: imageUrls })));
                return updatedImages;
            });
        });
    });
    const handleRemoveImage = (id) => {
        setSelectedImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            event.preventDefault();
            if (tags.length < 3) {
                const newTag = { id: generateUUID(), text: inputValue.trim() };
                setTags((prevTags) => {
                    const updatedTags = [...prevTags, newTag];
                    const tagsText = updatedTags.map((tag) => tag.text);
                    setValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { tags: tagsText })));
                    return updatedTags;
                });
                setInputValue('');
            }
            else {
                setInputValue('');
                alert('태그는 최대 3개까지만 추가할 수 있습니다.');
            }
        }
    };
    const handleRemoveTag = (id) => {
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
    };
    const validate = () => {
        const validationErrors = {};
        if (!values.name) {
            validationErrors.name = '상품 이름을 입력해주세요.';
        }
        else if (values.name.length < 2) {
            validationErrors.name = '상품 이름 2글자 이상 입력해주세요.';
        }
        if (!values.description) {
            validationErrors.description = '상품 설명을 입력해주세요.';
        }
        else if (values.description.length < 2) {
            validationErrors.description = '상품 설명을 2글자 이상 입력해주세요.';
        }
        if (!values.price) {
            validationErrors.price = '가격을 입력해주세요.';
        }
        else if (values.price < 0) {
            validationErrors.price = '가격은 0 이상이어야 합니다.';
        }
        if (selectedImages.length < 1) {
            validationErrors.images = '이미지를 입력해주세요.';
        }
        return validationErrors;
    };
    const submitForm = () => __awaiter(this, void 0, void 0, function* () {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = yield (0, products_1.postProduct)({
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    tags: tags.map((tag) => tag.text),
                    images: selectedImages.map((image) => image.url),
                });
                if (isAxiosResponse(res)) {
                    if (res.status === 201) {
                        resetForm();
                        console.log('상품 등록 성공', res.data);
                    }
                    else {
                        console.log('상품 등록 실패', res.data);
                    }
                }
                else {
                    // res가 ErrorResponse인 경우 에러 메시지 로그
                    console.error('상품 등록 실패', res);
                }
            }
            catch (e) {
                console.error('에러 발생', e);
            }
        }
        else {
        }
    });
    return (<div className={createItem_module_css_1.default.container}>
      <form className={createItem_module_css_1.default.form} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        }} onSubmit={handleSubmit(submitForm)}>
        <div className={createItem_module_css_1.default.createItem}>
          <p>상품 등록하기</p>
          <button type="submit">등록</button>
        </div>
        <p>상품 이미지</p>
        <div className={createItem_module_css_1.default.fromTitle}>
          <div className={createItem_module_css_1.default.uploadContainer}>
            <label className={createItem_module_css_1.default.imageUpload}>
              <span className={createItem_module_css_1.default.uploadText}>+</span>
              <span className={createItem_module_css_1.default.uploadDescription}>이미지 등록</span>
              <input type="file" accept="image/*" className={createItem_module_css_1.default.fileInput} onChange={handleImageChange} multiple/>
            </label>

            {selectedImages.length > 0 && (<div className={createItem_module_css_1.default.imageList}>
                {selectedImages.map((image) => (<div key={image.id} className={createItem_module_css_1.default.imagePreview}>
                    <img src={image.url} alt="미리보기" className={createItem_module_css_1.default.previewImage}/>
                    <button className={createItem_module_css_1.default.removeButton} onClick={() => handleRemoveImage(image.id)}>
                      ✖
                    </button>
                  </div>))}
              </div>)}
          </div>
        </div>
        {errors.images && <p className={createItem_module_css_1.default.error}>{errors.images}</p>}
        <div className={createItem_module_css_1.default.inputTitle}>
          <p>상품명</p>
          <input placeholder="상품명을 입력해주세요" className={createItem_module_css_1.default.inputStyle} name="name" onChange={handleChange} value={values.name}/>
          {errors.name && <p className={createItem_module_css_1.default.error}>{errors.name}</p>}
          <p>상품 소개</p>
          <textarea placeholder="상품 소개를 입력해주세요" className={createItem_module_css_1.default.areaContent} name="description" onChange={handleChange} value={values.description}/>
          {errors.description && (<p className={createItem_module_css_1.default.error}>{errors.description}</p>)}
          <p>판매가격</p>
          <input placeholder="판매 가격을 입력해주세요" className={createItem_module_css_1.default.inputStyle} name="price" type="number" onChange={handleChange} value={values.price}/>
          {errors.price && <p className={createItem_module_css_1.default.error}>{errors.price}</p>}
          <p>태그</p>
          <input placeholder="태그를 입력해주세요" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} className={createItem_module_css_1.default.inputStyle}/>
        </div>
        <div className={createItem_module_css_1.default.tagList}>
          {tags.map((tag) => (<div key={tag.id} className={createItem_module_css_1.default.tag}>
              #{tag.text}
              <button className={createItem_module_css_1.default.removeTagButton} onClick={() => handleRemoveTag(tag.id)}>
                ✖
              </button>
            </div>))}
        </div>
      </form>
    </div>);
}
