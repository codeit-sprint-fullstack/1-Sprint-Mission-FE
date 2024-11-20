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
exports.PostSignup = PostSignup;
exports.PostLogin = PostLogin;
exports.refreshAccessToken = refreshAccessToken;
exports.getProfile = getProfile;
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: 'https://ms10-5yps.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
// 회원가입 요청
function PostSignup(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post('/auth/signup', data);
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 로그인 요청
function PostLogin(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post('/auth/login', data);
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 액세스 토큰 재발급 요청
function refreshAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const refreshToken = localStorage.getItem('refreshToken'); // refreshToken 가져오기
            const response = yield api.post('/auth/refreshToken', {
                refreshToken,
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.accessToken;
        }
        catch (error) {
            console.error('토큰 재발급 실패', error);
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 사용자 프로필 정보 요청
function getProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const response = yield api.get('/auth/me');
            return response.data.user;
        }
        catch (error) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                // accessToken 만료 시 새로운 토큰 발급 시도
                try {
                    yield refreshAccessToken(); // 새로운 accessToken 발급
                    const retryResponse = yield api.get('/auth/me');
                    return retryResponse.data.user;
                }
                catch (refreshError) {
                    console.error('재시도 중 오류 발생', refreshError);
                    localStorage.removeItem('accessToken');
                    return (((_b = refreshError.response) === null || _b === void 0 ? void 0 : _b.data) || {
                        response: undefined,
                    });
                }
            }
            else {
                localStorage.removeItem('accessToken');
                return (((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || {
                    response: undefined,
                });
            }
        }
    });
}
