import "./App.css";
import Best from "./Best";
import Nav from "./Nav";
import OnSale from "./OnSale";
import Pagination from "./Pagination";

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <div className="main-container">
          <Best />
          <OnSale />
        </div>
      </main>
    </>
  );
}

export default App;
