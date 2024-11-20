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
exports.isAxiosResponse = isAxiosResponse;
exports.default = Market;
const market_module_css_1 = __importDefault(require("../styles/market.module.css"));
const products_1 = require("./api/products");
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const router_1 = require("next/router");
function isAxiosResponse(response) {
    return (response && response.status !== undefined && response.data !== undefined);
}
function Market() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [bestProducts, setBestProducts] = (0, react_1.useState)([]);
    const [searchValue, setSearchValue] = (0, react_1.useState)('');
    const [sortOrder, setSortOrder] = (0, react_1.useState)('최신순');
    const [orderByField, setOrderByField] = (0, react_1.useState)('createdAt');
    const [orderDir, setOrderDir] = (0, react_1.useState)('asc');
    const [isDropdownOpen, setIsDropdownOpen] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const fetchBestProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, products_1.getProducts)({
                    page: 1,
                    pageSize: 4,
                });
                if (isAxiosResponse(response)) {
                    setBestProducts(response.data.products);
                }
                else {
                    console.error('상품을 찾지 못했습니다.', response);
                }
            }
            catch (error) {
                console.error('상품을 못 찾음', error);
            }
        });
        fetchBestProducts();
    }, []);
    (0, react_1.useEffect)(() => {
        const fetchProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, products_1.getProducts)({
                    page: 1,
                    pageSize: 8,
                    orderDir: orderDir,
                    orderByField: orderByField,
                });
                if (isAxiosResponse(response)) {
                    setProducts(response.data.products);
                }
                else {
                    console.error('상품을 찾지 못했습니다.', response);
                }
            }
            catch (error) {
                console.error('상품을 못 찾음', error);
            }
        });
        fetchProducts();
    }, [sortOrder, orderByField, orderDir]);
    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const fetchProducts = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield (0, products_1.getProducts)({
                        page: 1,
                        pageSize: 8,
                        orderByField: 'createdAt',
                        keyword: searchValue,
                    });
                    if (isAxiosResponse(response)) {
                        setProducts(response.data.products);
                    }
                    else {
                        console.error('상품을 찾지 못했습니다.', response);
                    }
                }
                catch (error) {
                    console.error('상품을 못 찾음', error);
                }
            });
            fetchProducts();
        }
        console.log('Search value:', searchValue);
    };
    const handleSelectChange = (e) => {
        const value = e.currentTarget.getAttribute('data-value');
        if (value) {
            setSortOrder(value);
            setIsDropdownOpen(false);
        }
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (<>
      <div className={market_module_css_1.default.marketContainer}>
        <div className={market_module_css_1.default.marketContent}>
          <div className={market_module_css_1.default.marketTitle}>
            <p className={market_module_css_1.default.marketTitleText}>베스트 상품</p>
          </div>
          <div className={market_module_css_1.default.marketList}>
            {bestProducts.map((bestProduct) => (<div onClick={() => router.push(`/items/${bestProduct.id}`)} className={market_module_css_1.default.marketItem} key={bestProduct.id}>
                <div className={market_module_css_1.default.marketImg}>
                  <image_1.default src={bestProduct.images[0]} alt="product" width={200} height={200}/>
                </div>
                <div className={market_module_css_1.default.marketInfo}>
                  <p className={market_module_css_1.default.marketName}>{bestProduct.name}</p>
                  <p className={market_module_css_1.default.marketPrice}>{bestProduct.price} 원</p>
                  <p className={market_module_css_1.default.marketPrice}>
                    {'하트' + bestProduct.favoriteCount}
                  </p>
                </div>
              </div>))}
          </div>
        </div>
        <div className={market_module_css_1.default.marketContent}>
          <div className={market_module_css_1.default.marketTitle}>
            <p className={market_module_css_1.default.marketTitleText}>판매 중인 상품</p>
            <div className={market_module_css_1.default.sellItem}>
              <input onChange={handleInputChange} onKeyDown={handleKeyPress} className={market_module_css_1.default.sellItemInput} placeholder="검색할 상품을 입력해주세요"/>
              <image_1.default className={market_module_css_1.default.sellItemImg} src={'/search.svg'} alt="검색 아이콘" width={24} height={24}/>
              <button className={market_module_css_1.default.sellItemBtn} onClick={() => {
            router.push('/items/createItem');
        }}>
                상품 등록하기
              </button>
              <div className={market_module_css_1.default.dropdown}>
                <button className={market_module_css_1.default.dropdownButton} onClick={toggleDropdown}>
                  {sortOrder}
                </button>
                {isDropdownOpen && (<div className={market_module_css_1.default.dropdownContent}>
                    <div className={market_module_css_1.default.dropdownItem} data-value="최신순" onClick={() => {
                setSortOrder('최신순');
                setOrderByField('createdAt');
                setOrderDir('asc');
                setIsDropdownOpen(false);
            }}>
                      최신순
                    </div>
                    <div className={market_module_css_1.default.dropdownItem} data-value="좋아요순" onClick={() => {
                setSortOrder('좋아요순');
                setOrderByField('favoriteCount');
                setOrderDir('desc');
                setIsDropdownOpen(false);
            }}>
                      좋아요순
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          <div className={market_module_css_1.default.marketList}>
            {products.map((product) => (<div onClick={() => router.push(`/items/${product.id}`)} className={market_module_css_1.default.marketItem} key={product.id}>
                <div className={market_module_css_1.default.marketImg}>
                  <image_1.default src={product.images[0]} alt="product" width={200} height={200}/>
                </div>
                <div className={market_module_css_1.default.marketInfo}>
                  <p className={market_module_css_1.default.marketName}>{product.name}</p>
                  <p className={market_module_css_1.default.marketPrice}>{product.price} 원</p>
                  <p className={market_module_css_1.default.marketPrice}>
                    {'하트' + product.favoriteCount}
                  </p>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </>);
}
