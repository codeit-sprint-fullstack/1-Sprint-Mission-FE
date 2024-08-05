import Headers from "./header";
import Main from "./main";
import Registration from "./registration";
import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Headers /> <Main />
            </>
          }
        ></Route>
        <Route path="/registration" element={<Registration />}></Route>
      </Routes>
    </Router>
    // <>
    //   <Headers />
    //   <Main />
    // </>
  );
}

export default App;
