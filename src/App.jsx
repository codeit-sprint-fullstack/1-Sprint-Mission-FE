import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductPage from './pages/ProductPage';
import { TempForums, TempHome, TempProductDetailPage } from './pages/TempPages';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<TempHome />} />
        <Route path='/forums' element={<TempForums />} />
        <Route path='/items' element={<ProductPage />} />
        <Route path='/items/:id' element={<TempProductDetailPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
