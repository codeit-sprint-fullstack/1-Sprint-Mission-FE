import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './assets/styles/style.css';
import BestProduct from './components/BestProduct/BestProduct';
import SellProduct from './components/SellProduct/SellProduct';
import Pagination from './components/Pagination/Pagination';
import { useState } from 'react';
import Nav from './components/Nav/Nav';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <Header />
      <>
        <p className="bestText">베스트 상품</p>
      </>
      <BestProduct />
      <Nav setOrderBy={setOrderBy} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />
      <SellProduct currentPage={currentPage} orderBy={orderBy} searchQuery={searchQuery} setTotalCount={setTotalCount} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalCount} />
      <Footer />
    </>
  );
};

export default App;
