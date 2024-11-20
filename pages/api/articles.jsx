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
exports.getArticles = getArticles;
exports.getArticleId = getArticleId;
exports.patchArticle = patchArticle;
exports.deleteArticle = deleteArticle;
exports.postArticle = postArticle;
exports.postFavorite = postFavorite;
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: 'https://ms10-5yps.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
function isAxiosError(error) {
    return error.isAxiosError;
}
function getArticles(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.get('/articles', {
                params: data,
            });
            return response;
        }
        catch (error) {
            if (isAxiosError(error)) {
                return (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            }
            throw error;
        }
    });
}
function getArticleId(articleId, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.get(`/articles/${articleId}`, {
                params: {
                    pageSize,
                },
            });
            return response;
        }
        catch (error) {
            if (isAxiosError(error)) {
                return (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            }
            throw error;
        }
    });
}
function patchArticle(articleId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.patch(`/articles/${articleId}`, data);
            return response;
        }
        catch (error) {
            if (isAxiosError(error)) {
                return (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            }
            throw error;
        }
    });
}
function deleteArticle(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.delete(`/articles/${articleId}`);
            return response;
        }
        catch (error) {
            if (isAxiosError(error)) {
                return (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            }
            throw error;
        }
    });
}
function postArticle(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post('/articles', data);
            return response;
        }
        catch (error) {
            if (isAxiosError(error)) {
                return (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            }
            throw error;
        }
    });
}
function postFavorite(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield api.post(`/articles/${articleId}/favorites`);
            return response;
        }
        catch (error) {
            if (isAxiosError(error)) {
                return (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            }
            throw error;
        }
    });
}
