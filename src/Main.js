import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import Items from './pages/Itmes';
import Registration from './pages/Registration';

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/items" element={<Items />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/items/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
