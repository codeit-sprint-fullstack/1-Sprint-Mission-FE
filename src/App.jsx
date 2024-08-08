import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductPage from './pages/ProductPage';
import { TempForums, TempHome, TempProductDetailPage } from './pages/TempPages';
import Register from './components/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<TempHome />} />
        <Route path='/forums' element={<TempForums />} />
        <Route path='/items' element={<ProductPage />} />
        <Route path='/items/:id' element={<TempProductDetailPage />} />
        <Route path='/registration' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
