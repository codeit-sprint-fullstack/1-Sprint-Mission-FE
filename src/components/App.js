import Header from "./header.js";
import "../css/reset.css";
import "../css/app.css";
import { Outlet } from "react-router-dom";
import Footer from "./footer.js";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
