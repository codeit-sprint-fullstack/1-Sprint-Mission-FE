import styles from "../styles/articles.module.css";
import BestItem from "../components/articles/BestItem";
import Postview from "../components/articles/Postview";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getArticles } from "./api/articles";
import { useRouter } from "next/router";
let pageSize = 3;
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownValue, setdropdownValue] = useState("최신 순");
  const [bestArticles, setbestArticles] = useState([]);
  const [Value, setValue] = useState("createAt");
  const [articledata, setarticledata] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY === document.body.offsetHeight &&
      !isFetching
    ) {
      // 끝에 도달했는지 확인
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) return;

    pageSize += 3;
    console.log("데이터를 가져오는 중...");
    // console.log(pageSize);
  }, [isFetching]);

  const router = useRouter();
  const article = async () => {
    const data = await getArticles();
    // console.log(data);
    setbestArticles(data.data.articles);
  };
  useEffect(() => {
    article();
  }, []);
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  const postClick = () => {
    // console.log("클릭했음");
    router.push("post/addpost");
  };

  const contentarticle = async () => {
    const data = await getArticles({
      pageSize: pageSize,
      keyword: keyword,
      orderBy: Value,
      order: "asc",
    });
    // console.log(data.data.articles);
    setarticledata(data.data.articles);
  };
  useEffect(() => {
    contentarticle();
  }, [keyword, articledata]);

  const handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const handdleOption = (option) => {
    setIsOpen(!isOpen);
    setdropdownValue(option);
    if (option === "최신 순") {
      setValue("createAt");
    } else if (option === "좋은 순") {
      setValue("like");
    }
  };

  return (
    <>
      <div className={styles.HomeContainer}>
        <div className={styles.ContainerGrid}>
          <div className={styles.ContainerGridTitle}>
            <p>베스트 게시글</p>
          </div>
          <div className={styles.BestItemContainer}>
            {bestArticles.map((article, index) => (
              <BestItem key={index} article={article} />
            ))}
          </div>

          <div className={styles.ContentTitle}>
            <p>게시글</p>
            <button onClick={postClick} className={styles.ContentBtn}>
              글쓰기
            </button>
          </div>
          <div className={styles.ContentPost}>
            <input
              onChange={handleKeywordChange}
              className={styles.ContentInput}
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            ></input>
            <Image
              src="/search.svg"
              width={24}
              height={24}
              className={styles.SearchImg}
            />
            <div className={styles.dropdown}>
              <p className={styles.toggle} onClick={handletoggle}>
                {dropdownValue}
                <Image src="/dropdown.svg" width={24} height={24} />
              </p>
              {isOpen && (
                <ul className={styles.menu}>
                  <li onClick={() => handdleOption("최신 순")}>최신 순</li>
                  <li onClick={() => handdleOption("좋아요 순")}>좋아요 순</li>
                </ul>
              )}
            </div>
          </div>
          <div className={styles.ContentItem}>
            {articledata.map((articledata, index) => (
              <Postview key={index} articledata={articledata} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
