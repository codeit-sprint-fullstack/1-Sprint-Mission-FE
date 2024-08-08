import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import MainPage from './pages/MainPage';
import ItemsPage from './pages/ItemsPage';
import RegistrationPage from './pages/RegistrationPage'; 
import ProductInformationPage from './pages/ProductInformationPage'; // 상품 등록버튼 클릭시 이동하는 빈페이지

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/items" element={<ItemsPage />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
        <Route path="/Productinformation" element={<ProductInformationPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
