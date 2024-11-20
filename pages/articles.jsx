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
exports.default = Home;
const articles_module_css_1 = __importDefault(require("../styles/articles.module.css"));
const BestItem_1 = __importDefault(require("../components/articles/BestItem"));
const Postview_1 = __importDefault(require("../components/articles/Postview"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const articles_1 = require("./api/articles");
const router_1 = require("next/router");
// AxiosResponse 타입을 확인하는 타입 가드 함수 정의
function isAxiosResponse(response) {
    return response && response.data !== undefined;
}
let pageSize = 10;
function Home() {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [dropdownValue, setDropdownValue] = (0, react_1.useState)('최신 순');
    const [bestArticles, setBestArticles] = (0, react_1.useState)([]);
    const [value, setValue] = (0, react_1.useState)('createAt');
    const [articleData, setArticleData] = (0, react_1.useState)([]);
    const [keyword, setKeyword] = (0, react_1.useState)('');
    const [isFetching, setIsFetching] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight &&
            !isFetching) {
            // 끝에 도달했는지 확인
            setIsFetching(true);
        }
    };
    (0, react_1.useEffect)(() => {
        if (!isFetching)
            return;
        pageSize += 3;
        // 추가 데이터 가져오기 로직 여기에 추가 가능
        // 데이터 로드가 끝나면 isFetching 상태를 false로 설정
        setIsFetching(false);
    }, [isFetching]);
    const router = (0, router_1.useRouter)();
    const fetchBestArticles = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, articles_1.getArticles)({
                pageSize: 4,
            });
            if (isAxiosResponse(response)) {
                const data = response.data;
                // 데이터가 예상한 형태인지 확인하고 상태 업데이트
                if (Array.isArray(data.articles)) {
                    setBestArticles(data.articles);
                }
                else {
                    setBestArticles([]);
                }
            }
            else {
                setBestArticles([]);
                console.error('API 응답이 AxiosResponse가 아닙니다');
            }
        }
        catch (error) {
            console.error('베스트 게시글을 가져오는 중 오류 발생:', error);
            setBestArticles([]);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchBestArticles();
    }, []);
    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };
    const postClick = () => {
        router.push('article/create');
    };
    const fetchContentArticles = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, articles_1.getArticles)({
                pageSize: pageSize,
                keyword: keyword,
                orderBy: value,
                order: 'asc',
            });
            if (isAxiosResponse(response)) {
                const data = response.data;
                // 데이터가 예상한 형태인지 확인하고 상태 업데이트
                if (Array.isArray(data.articles)) {
                    setArticleData(data.articles);
                }
                else {
                    setArticleData([]);
                }
            }
            else {
                setArticleData([]);
            }
        }
        catch (error) {
            setArticleData([]);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchContentArticles();
    }, [keyword]);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleOption = (option) => {
        setIsOpen(!isOpen);
        setDropdownValue(option);
        if (option === '최신 순') {
            setValue('createAt');
        }
        else if (option === '좋아요 순') {
            setValue('like');
        }
    };
    return (<>
      <div className={articles_module_css_1.default.HomeContainer}>
        <div className={articles_module_css_1.default.ContainerGrid}>
          <div className={articles_module_css_1.default.ContainerGridTitle}>
            <p>베스트 게시글</p>
          </div>
          <div className={articles_module_css_1.default.BestItemContainer}>
            {bestArticles && bestArticles.length > 0 ? (bestArticles.map((article) => (<BestItem_1.default key={article.id} article={article}/>))) : (<p>베스트 게시글을 불러오고 있습니다...</p>)}
          </div>

          <div className={articles_module_css_1.default.ContentTitle}>
            <p>게시글</p>
            <button onClick={postClick} className={articles_module_css_1.default.ContentBtn}>
              글쓰기
            </button>
          </div>
          <div className={articles_module_css_1.default.ContentPost}>
            <input onChange={handleKeywordChange} className={articles_module_css_1.default.ContentInput} type="text" placeholder="검색할 상품을 입력해주세요"/>
            <image_1.default src="/search.svg" width={24} height={24} alt="검색" className={articles_module_css_1.default.SearchImg}/>
            <div className={articles_module_css_1.default.dropdown}>
              <p className={articles_module_css_1.default.toggle} onClick={handleToggle}>
                {dropdownValue}
                <image_1.default src="/dropdown.svg" width={24} height={24} alt="드롭다운"/>
              </p>
              {isOpen && (<ul className={articles_module_css_1.default.menu}>
                  <li onClick={() => handleOption('최신 순')}>최신 순</li>
                  <li onClick={() => handleOption('좋아요 순')}>좋아요 순</li>
                </ul>)}
            </div>
          </div>
          <div className={articles_module_css_1.default.ContentItem}>
            {articleData.map((article) => (<Postview_1.default key={article.id} articledata={article}/>))}
          </div>
        </div>
      </div>
    </>);
}
