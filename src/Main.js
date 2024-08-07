import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import MarketPage from './pages/MarketPage.js';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MarketPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
