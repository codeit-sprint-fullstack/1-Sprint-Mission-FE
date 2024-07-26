import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Items from './pages/Items';
import { TempForums, TempHome } from './pages/TempPages';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/forums' element={<TempForums />} />
        <Route path='/' element={<Items />} />
        <Route path='/home' element={<TempHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
