import styles from "@/styles/ArticleList.module.css";
import { useEffect, useState, useRef } from "react";
import axios from "@/lib/axios";
import ArticleCard from "./articleCard";
import Image from "next/image";
import Link from "next/link";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [boxText, setBoxText] = useState("최신순");
  const [orderBy, setOrderBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const dropDownRef = useRef(null);

  useEffect(() => {
    async function fetchArticles() {
      const res = await axios.get(
        `/article?order=${orderBy}&keyword=${searchQuery}&pageSize=6`
      );
      setArticles(res.data);
    }

    fetchArticles();
  }, [orderBy, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickRecent = () => {
    setBoxText("최신순");
    setOrderBy("recent");
  };

  const handleClickOldest = () => {
    setBoxText("오래된순");
    setOrderBy("oldest");
  };

  return (
    <div className={styles.article_list}>
      <div className={styles.article_list_title_container}>
        <p className={styles.article_list_title}>게시글</p>
        <Link href="/registPage" className={styles.article_list_regist}>
          글쓰기
        </Link>
      </div>
      <div className={styles.article_list_search_container}>
        <Image
          src="/ic_search.png"
          className={styles.article_list_search_btn}
          width={24}
          height={24}
          alt="search_btn"
        />
        <input
          placeholder="검색할 상품을 입력해주세요"
          className={styles.article_list_search}
          onChange={handleSearchChange}
        />

        <div className={styles.article_list_dropdown} onClick={toggleDropDown}>
          {boxText}
          <Image
            src="/ic_arrow_down.png"
            width={20}
            height={20}
            alt="ic_toggle"
            className={
              isOpen
                ? styles.article_list_dropdown_btn_rotate
                : styles.article_list_dropdown_btn
            }
          />
          {isOpen && (
            <div className={styles.article_list_dropdown_box} ref={dropDownRef}>
              <div
                className={styles.article_list_dropdown_box_recent}
                onClick={handleClickRecent}
              >
                최신 순
              </div>
              <div
                className={styles.article_list_dropdown_box_favorite}
                onClick={handleClickOldest}
              >
                오래된 순
              </div>
            </div>
          )}
        </div>
      </div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
