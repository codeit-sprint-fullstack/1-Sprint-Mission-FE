import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App';
import HomePage from "./pages/HomePage";


function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="items" element={<App />}></Route>
      </Routes>  
    </BrowserRouter>
  );

}


export default Main;