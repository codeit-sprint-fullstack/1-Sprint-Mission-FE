import BestPost from "@components/BestPost";
import Dropdown from "@components/Dropdown";
import MainPost from "@components/MainPost";
import SearchBar from "@components/SearchBar";
import styles from "@styles/Community.module.css";
import { useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";

export async function getServerSideProps() {
  try {
    const res = await axios.get("/articles");
    const posts = res.data.results;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("게시글 fetch에 실패했습니다.", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default function Community({ posts }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearch = () => {
    console.log(`검색 실행: ${searchValue}`);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const bestPosts = posts.slice(0, 3);

  return (
    <div className={styles.body}>
      <h1 className={`${styles.postTitle} text-xl bold`}>베스트 게시글</h1>
      <div className={styles.bestPostContainer}>
        {bestPosts.map((post) => (
          <BestPost key={post.id} title={post.title} date={post.createdAt} />
        ))}
      </div>
      <div className={styles.mainTitle}>
        <h1 className={`${styles.postTitle} text-xl bold`}>게시글</h1>
        <Link href="/create-post">
          <div className={`${styles.postButton} text-lg semibold`}>글쓰기</div>
        </Link>
      </div>
      <div className={styles.mainOption}>
        <SearchBar
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClear}
          onSearch={handleSearch}
        />
        <Dropdown />
      </div>
      <MainPost />
    </div>
  );
}
