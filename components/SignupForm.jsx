"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const form_1 = __importDefault(require("../hook/form"));
const SignupForm_module_css_1 = __importDefault(require("./SignupForm.module.css"));
const image_1 = __importDefault(require("next/image"));
const user_1 = require("../pages/api/user");
function isAxiosResponse(response) {
    return response.status !== undefined;
}
const SignupForm = ({ isModalOpen, setIsModalOpen, }) => {
    const { values, handleChange, handleSubmit, resetForm, isSubmitting } = (0, form_1.default)({
        email: '',
        nickname: '',
        password: '',
        password2: '',
    });
    const [errors, setErrors] = (0, react_1.useState)({});
    const [showPassword1, setShowPassword1] = (0, react_1.useState)(false);
    const [showPassword2, setShowPassword2] = (0, react_1.useState)(false);
    const passwordToggleHandler1 = () => {
        setShowPassword1((prev) => !prev);
    };
    const passwordToggleHandler2 = () => {
        setShowPassword2((prev) => !prev);
    };
    const validate = () => {
        let validationErrors = {};
        if (!values.email) {
            validationErrors.email = '이메일을 입력해주세요.';
        }
        else if (!/\S+@\S+\.\S+/.test(values.email)) {
            validationErrors.email = '잘못된 이메일입니다.';
        }
        if (!values.password) {
            validationErrors.password = '비밀번호를 입력해주세요.';
        }
        else if (values.password.length < 8) {
            validationErrors.password = '비밀번호를 8자 이상 입력해주세요.';
        }
        if (values.password !== values.password2) {
            validationErrors.password2 = '비밀번호가 일치하지 않습니다.';
        }
        else if (!values.password2) {
            validationErrors.password2 = '비밀번호를 입력해주세요.';
        }
        if (!values.nickname) {
            validationErrors.nickname = '닉네임을 입력해주세요.';
        }
        else if (values.nickname.length < 2) {
            validationErrors.nickname = '닉네임 2글자 이상 입력해주세요.';
        }
        return validationErrors;
    };
    const submitForm = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = yield (0, user_1.PostSignup)({
                    email: values.email,
                    password: values.password,
                    nickname: values.nickname,
                });
                if (isAxiosResponse(res)) {
                    // AxiosResponse인 경우만 처리
                    if (res.status === 201) {
                        resetForm();
                        console.log('회원가입 성공', res.data);
                    }
                    else {
                        console.log('회원가입 실패', res.data);
                        setIsModalOpen(true);
                    }
                }
                else {
                    // ErrorResponse인 경우 처리
                    console.error('회원가입 실패', (_a = res.response) === null || _a === void 0 ? void 0 : _a.data.message);
                    setIsModalOpen(true);
                }
            }
            catch (e) {
                setIsModalOpen(true);
                console.log('에러', e);
            }
        }
    });
    return (<form className={SignupForm_module_css_1.default.form} onSubmit={handleSubmit(submitForm)}>
      <div className={SignupForm_module_css_1.default.formGroup}>
        <label className={SignupForm_module_css_1.default.label}>이메일</label>
        <input type="email" name="email" value={values.email} onChange={handleChange} className={SignupForm_module_css_1.default.input}/>
        {errors.email && <p className={SignupForm_module_css_1.default.error}>{errors.email}</p>}
      </div>
      <div className={SignupForm_module_css_1.default.formGroup}>
        <label className={SignupForm_module_css_1.default.label}>닉네임</label>
        <input type="text" name="nickname" value={values.nickname} onChange={handleChange} className={SignupForm_module_css_1.default.input}/>
        {errors.nickname && <p className={SignupForm_module_css_1.default.error}>{errors.nickname}</p>}
      </div>
      <div className={SignupForm_module_css_1.default.formGroup}>
        <label className={SignupForm_module_css_1.default.label}>비밀번호</label>
        <input type={showPassword1 ? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} className={SignupForm_module_css_1.default.password1}/>
        <span className={SignupForm_module_css_1.default.passwordToggle} onClick={passwordToggleHandler1}>
          {!showPassword1 ? (<image_1.default src="./eyeClose.svg" alt="Close" width={24} height={24}/>) : (<image_1.default src="./eyeOpen.svg" alt="open" width={24} height={24}/>)}
        </span>

        {errors.password && <p className={SignupForm_module_css_1.default.error}>{errors.password}</p>}
      </div>
      <div className={SignupForm_module_css_1.default.formGroup}>
        <label className={SignupForm_module_css_1.default.label}>비밀번호 확인</label>
        <input type={showPassword2 ? 'text' : 'password'} name="password2" value={values.password2} onChange={handleChange} className={SignupForm_module_css_1.default.password2}/>
        <span className={SignupForm_module_css_1.default.passwordToggle} onClick={passwordToggleHandler2}>
          {!showPassword2 ? (<image_1.default src="./eyeClose.svg" alt="Close" width={24} height={24}/>) : (<image_1.default src="./eyeOpen.svg" alt="open" width={24} height={24}/>)}
        </span>
        {errors.password2 && <p className={SignupForm_module_css_1.default.error}>{errors.password2}</p>}
      </div>

      <button className={SignupForm_module_css_1.default.button} type="submit" disabled={isSubmitting}>
        회원가입
      </button>
    </form>);
};
exports.default = SignupForm;
