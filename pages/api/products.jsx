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
exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.postProduct = postProduct;
exports.patchProduct = patchProduct;
exports.deleteProduct = deleteProduct;
exports.deletefavorite = deletefavorite;
exports.postfavorite = postfavorite;
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
// 제품 목록 조회
function getProducts(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.get('/products', {
                params: data,
            });
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 개별 제품 조회
function getProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.get(`/products/${productId}`);
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 제품 생성
function postProduct(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post('/products', data);
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 제품 수정
function patchProduct(productId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.patch(`/products/${productId}`, data);
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 제품 삭제
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.delete(`/products/${productId}`);
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 즐겨찾기 삭제
function deletefavorite(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.delete(`/products/${productId}/favorite`);
            return response;
        }
        catch (error) {
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
// 즐겨찾기 추가
function postfavorite(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post(`/products/${productId}/favorites`);
            return response;
        }
        catch (error) {
            // 즐겨찾기 추가 실패 시 자동으로 즐겨찾기 삭제 요청
            yield deletefavorite(productId);
            return (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || {
                response: undefined,
            });
        }
    });
}
