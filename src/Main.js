import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App';


function Main() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="items" element={<App />}></Route>
        </Routes>
    </BrowserRouter>
  );

}


export default Main;