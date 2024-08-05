import ProductList from './ProductList';
import Nav from './Nav';

function App() {
  return (
    <div className='App'>
      <Nav /> 
      <ProductList/>
    </div>
  );
}

export default App;


// 1. 데이터 로드 및 상태 관리:
// - 'useProducts' 훅이 API를 통해 데이터를 비동기적으로 가져오고, 이를 items와 totalCount로 관리함
// - 화면 크기, 정렬, 검색어 등의 조건에 따라 데이터를 정렬 및 필터링 함

// 2. UI 구성 및 사용자 상호작용:
// - 'ProductList' 컴포넌트는 'ProductBest'와 'ProductOnSale'을 통해 각각의 상품 목록을 표시함
// - 'SelectBox'를 통해 사용자가 정렬 옵션을 선택하고, 검색 기능을 통해 상요자가 상품을 검색할 수 있음
// - 'Pagination'을 통해 사용자가 여러 페이지의 데이터를 탐색할 수 있음

// 3. 반응형 디자인:
// - 'useMediaQuery' 훅을 통해 반응형 디자인을 구현하고, 화면 크기에 따라 UI를 조정함