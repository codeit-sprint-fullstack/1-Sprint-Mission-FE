import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App';
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import RegistrationPage from "./pages/RegistrationPage";


function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="items" element={<App />} />
        <Route path="registration" element={<RegistrationPage/>} />
      </Routes>  
    </BrowserRouter>
  );

}


export default Main;