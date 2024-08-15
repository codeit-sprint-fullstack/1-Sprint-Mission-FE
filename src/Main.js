import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import MarketPage from './pages/MarketPage.js';
import MarketItemsPage from './pages/MarketItemsPage.js';
import RegistrationPage from './pages/RegistrationPage.js';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MarketPage />} />
          <Route path='/items' element={<MarketItemsPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
