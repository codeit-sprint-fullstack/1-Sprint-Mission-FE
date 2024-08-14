import Header from "./Header.js";
import "../css/reset.css";
import "../css/app.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
