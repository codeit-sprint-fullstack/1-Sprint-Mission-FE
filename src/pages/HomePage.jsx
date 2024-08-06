import Nav from "../components/Nav";
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>판다마켓</title>
      </Helmet>
      <div className="HomePage">
        <Nav/>
        <div><h1>HOME</h1></div>
      </div>
    </>
    
  );
}

export default HomePage;