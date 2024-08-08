import "./reset.css";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";


function App({children}) {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
}

export default App;
