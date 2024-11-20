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
exports.getComments = getComments;
exports.postComment = postComment;
exports.patchComment = patchComment;
exports.deleteComment = deleteComment;
exports.getArticleComments = getArticleComments;
exports.postArticleComment = postArticleComment;
exports.patchArticleComment = patchArticleComment;
exports.deleteArticleComment = deleteArticleComment;
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
function isAxiosError(error) {
    return error.isAxiosError;
}
// 제품 댓글 가져오기
function getComments(productId, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.get(`/products/product/${productId}/comments`, {
                params: { limit },
            });
            console.log(response);
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
// 제품 댓글 작성
function postComment(productId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post(`/products/product/${productId}/comments`, data);
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
// 제품 댓글 수정
function patchComment(commentId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.patch(`/products/comments/${commentId}`, data);
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
// 제품 댓글 삭제
function deleteComment(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.delete(`/products/comments/${commentId}`);
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
// 게시글 댓글 가져오기
function getArticleComments(articleId, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.get(`/article/${articleId}/comments`, {
                params: { limit },
            });
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
// 게시글 댓글 작성
function postArticleComment(articleId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post(`/articles/article/${articleId}/comments`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
// 게시글 댓글 수정
function patchArticleComment(commentId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.patch(`/articles/comments/${commentId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
// 게시글 댓글 삭제
function deleteArticleComment(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.delete(`/articles/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            return response;
        }
        catch (error) {
            return isAxiosError(error)
                ? (_a = error.response) === null || _a === void 0 ? void 0 : _a.data
                : { response: undefined };
        }
    });
}
