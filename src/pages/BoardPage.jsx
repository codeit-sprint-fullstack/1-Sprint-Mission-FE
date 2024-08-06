import Nav from "../components/Nav";
import { Helmet } from "react-helmet";

function BoardPage() {
  return (
    <>
      <Helmet>
        <title>자유게시판</title>
      </Helmet>
      <div className="BoardPage">
        <Nav/>
        <div><h1>자유게시판</h1></div>
      </div>
    </>
    
  );
}

export default BoardPage;