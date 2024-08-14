import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Registration from './components/Registration';
import ProductDetail from './components/ProductDetail'; // 상품 상세 페이지 추가
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/products/:id" element={<ProductDetail />} /> {/* 상품 상세 페이지 경로 추가 */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
