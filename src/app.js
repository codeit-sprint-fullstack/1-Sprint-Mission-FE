import Header from "./header";
import Main from "./main";
import Registration from "./registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/items"
          element={
            <>
              <Main />
            </>
          }
        ></Route>
        <Route
          path="/registration"
          element={
            <>
              {" "}
              <Registration />
            </>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
