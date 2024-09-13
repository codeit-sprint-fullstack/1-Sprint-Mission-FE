import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";
import BestArticles from "../components/BestArticles"; // 새로운 베스트 게시글 컴포넌트 추가
import ArticleList from "../components/ArticleList"; // 새로운 게시글 목록 컴포넌트 추가

// getServerSideProps 함수 정의
export async function getServerSideProps() {
  try {
    // articles를 가져오는 함수
    const res = await fetch("http://localhost:3000/api/articles"); // 정확한 API 경로로 변경 필요
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.statusText}`);
    }
    const data = await res.json();

    const articles = data?.results || [];
    console.log(data);

    return {
      props: {
        articles, // 가져온 articles 데이터를 props로 전달
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        articles: [], // 에러 발생 시 빈 배열 전달
      },
    };
  }
}

export default function Board({ articles }) {
  return (
    <div className="main-content">
      {/* Flexbox 레이아웃에 필요한 클래스*/}
      <Nav />
      <BestArticles /> {/* 베스트 게시글 컴포넌트 */}
      <div>
        <p>게시글</p>
        <ArticleList articles={articles} />{" "}
        {/* 게시글 목록 컴포넌트에 props 전달 */}
      </div>
      <Footer />
    </div>
  );
}
