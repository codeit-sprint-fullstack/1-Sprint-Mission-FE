import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../assets/styles/style.css';
import SellUsedProduct from '../components/SellUsedProduct/SellUsedProduct';
import Pagination from '../components/Pagination/Pagination';
import { useState } from 'react';
import Nav from '../components/Nav/Nav';

const Items = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <Header />
      <Nav setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} className="itemsNav" />
      <SellUsedProduct currentPage={currentPage} searchQuery={searchQuery} setTotalCount={setTotalCount} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalCount} className="itemsPagination" />
      <Footer className="itemsFooter" />
    </>
  );
};

export default Items;
