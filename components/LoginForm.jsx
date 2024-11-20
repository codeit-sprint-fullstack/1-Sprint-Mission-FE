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
const LoginForm_module_css_1 = __importDefault(require("./LoginForm.module.css"));
const image_1 = __importDefault(require("next/image"));
const user_1 = require("../pages/api/user");
const router_1 = require("next/router");
const LoginForm = () => {
    const { values, handleChange, handleSubmit, resetForm, isSubmitting } = (0, form_1.default)({
        email: '',
        password: '',
    });
    const router = (0, router_1.useRouter)();
    const [errors, setErrors] = (0, react_1.useState)({});
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const passwordToggleHandler = () => {
        setShowPassword(!showPassword);
    };
    // 유효성 검사 함수
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
        return validationErrors;
    };
    // 폼 제출 시 처리하는 함수
    const submitForm = () => __awaiter(void 0, void 0, void 0, function* () {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = yield (0, user_1.PostLogin)({
                    email: values.email,
                    password: values.password,
                });
                // res가 AxiosResponse라면 res.data를 사용하여 접근합니다.
                if ('data' in res && 'accessToken' in res.data) {
                    const data = res.data;
                    resetForm(); // 폼 리셋
                    console.log('로그인 성공', data);
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    router.push('/market');
                }
                else {
                    // ErrorResponse 처리
                    console.log('로그인 실패', res);
                }
            }
            catch (e) {
                console.log('에러', e);
            }
        }
    });
    return (<form className={LoginForm_module_css_1.default.form} onSubmit={handleSubmit(submitForm)}>
      <div className={LoginForm_module_css_1.default.formGroup}>
        <label className={LoginForm_module_css_1.default.label}>이메일</label>
        <input type="email" name="email" value={values.email} onChange={handleChange} className={LoginForm_module_css_1.default.input}/>
        {errors.email && <p className={LoginForm_module_css_1.default.error}>{errors.email}</p>}
      </div>
      <div className={LoginForm_module_css_1.default.formGroup}>
        <label className={LoginForm_module_css_1.default.label}>비밀번호</label>
        <input type={showPassword ? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} className={LoginForm_module_css_1.default.input}/>
        <span className={LoginForm_module_css_1.default.passwordToggle} onClick={passwordToggleHandler}>
          {!showPassword ? (<image_1.default src="./eyeClose.svg" alt="Close" width={24} height={24}/>) : (<image_1.default src="./eyeOpen.svg" alt="open" width={24} height={24}/>)}
        </span>
        {errors.password && <p className={LoginForm_module_css_1.default.error}>{errors.password}</p>}
      </div>
      <button className={LoginForm_module_css_1.default.button} type="submit">
        로그인
      </button>
    </form>);
};
exports.default = LoginForm;
