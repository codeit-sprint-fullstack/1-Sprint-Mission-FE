import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Best from "./Best";
import Nav from "./Nav";
import OnSale from "./OnSale";
import Registration from "./Registration";
import ProductDetail from "./ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Nav />
      </header>
      <main>
        <div className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Best />
                  <OnSale />
                </>
              }
            />
            <Route path="/items" element={<OnSale />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
