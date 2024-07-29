import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductPage from './pages/ProductPage';
import { TempForums, TempHome } from './pages/TempPages';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/forums' element={<TempForums />} />
        <Route path='/' element={<ProductPage />} />
        <Route path='/home' element={<TempHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
