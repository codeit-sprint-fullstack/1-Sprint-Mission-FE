import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.js';
import MarketPage from './pages/MarketPages.js';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<MarketPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
