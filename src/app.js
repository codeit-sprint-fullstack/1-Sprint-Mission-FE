import Header from "./header";
import Main from "./main";
import Registration from "./registration";
import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}></Route>

        <Route
          path="/items"
          element={
            <>
              <Header />
              <Main />
            </>
          }
        ></Route>
        <Route
          path="/registration"
          element={
            <>
              <Header /> <Registration />
            </>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
