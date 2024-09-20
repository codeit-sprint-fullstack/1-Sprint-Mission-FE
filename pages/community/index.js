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
    let posts = res.data.articles;

    if (!posts) {
      posts = [];
    }

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
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOption, setSortOption] = useState("최신순");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const searchedPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "최신순") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const bestPosts = posts.slice(0, 3);

  return (
    <div className={styles.body}>
      <h1 className={`${styles.postTitle} text-xl bold`}>베스트 게시글</h1>
      <div className={styles.bestPostContainer}>
        {bestPosts.map((post) => (
          <Link
            key={post.id}
            href={`/community/${post.id}`}
            className={styles.linkPost}
          >
            <div>
              <BestPost
                key={post.id}
                title={post.title}
                date={post.createdAt}
              />
            </div>
          </Link>
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
        />
        <Dropdown onSortChange={handleSortChange} />
      </div>
      <div className={styles.mainPostContainer}>
        {searchedPosts.slice(0, visibleCount).map((post) => (
          <Link
            key={post.id}
            href={`/community/${post.id}`}
            className={styles.linkPost}
          >
            <div>
              <MainPost
                key={post.id}
                title={post.title}
                date={post.createdAt}
              />
            </div>
          </Link>
        ))}
      </div>
      {visibleCount < searchedPosts.length && (
        <button
          className={`${styles.loadMoreButton} text-lg semibold`}
          onClick={handleShowMore}
        >
          더 보기
        </button>
      )}
    </div>
  );
}
