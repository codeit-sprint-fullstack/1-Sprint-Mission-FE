import styles from "@/styles/articles.module.css";
import in_search from "@/public/images/ic_search.png";
import in_arrow_down from "@/public/images/ic_arrow_down.png";
import imgDefault from "@/public/images/img_default.png";
import ic_heart from "@/public/images/ic_heart.png";
import ic_medal from "@/public/images/ic_medal.png";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import * as api from "@/pages/api/articles";
import Pagination from "@/components/Pagination";

export async function getServerSideProps() {
  const defaultParams = {
    orderBy: "resent",
    keyword: "",
  };

  let bestItem = [];
  try {
    const { list, totalCount } = await api.getBestArticles();
    bestItem = list;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      bestItem,
      defaultParams,
    },
  };
}

function BestArticles({ item }) {
  const { user, title, createAt, favorite } = item;
  const date = new Date(createAt);

  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className={styles.best_article_box}>
      <div className={styles.medal_box}>
        <Image src={ic_medal} width={16} height={16} alt="메달아이콘" />
        <span>Best</span>
      </div>
      <div className={styles.best_item_content_box}>
        <span className={styles.best_article_title}>{title}</span>
        <Image
          className={styles.best_article_image}
          src={imgDefault}
          alt="게시글이미지"
        />
      </div>
      <div className={styles.best_item_data_box}>
        <div className={styles.best_item_data_box_left}>
          <span>{item.user.name}</span>
          {/* <span>판다마켓</span> */}
          <Image
            className={styles.best_favorite_icon}
            src={ic_heart}
            alt="좋아요이미지"
          />
          <span>{favorite}</span>
        </div>
        <span className={styles.best_create_time}>{formattedDate}</span>
      </div>
    </div>
  );
}

function Articles({ bestItem, defaultParams }) {
  const [params, setParams] = useState(defaultParams);
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState(bestItem);
  const [totalCount, setTotalCont] = useState(0);
  const [orderByName, setOrderByName] = useState({});

  const getArticles = useCallback(async () => {
    try {
      const { list, totalCount } = await api.getArticles(params);
      setArticles(list);
      setTotalCont(totalCount);
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  const getBestArticles = useCallback(async () => {
    try {
      const { list } = await api.getBestArticles();
      setBestArticles(list);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getBestArticles();
  }, [getBestArticles]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <main>
      <div className={styles.best_articles}>
        <h2>베스트 게시글</h2>
        <div className={styles.best_articles_item}>
          {bestArticles.map((item) => (
            <BestArticles key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className={styles.articles_box}>
        <div className={styles.articles_head_box}>
          <h2>게시글</h2>
          <button className={styles.articles_create_btn}>글쓰기</button>
        </div>
        <div className={styles.search_box}>
          <Image src={in_search} width={24} height={24} alt="검색아이콘" />
          <input
            type="text"
            name="keyword"
            value={params.keyword || ""}
            onChange={onChange}
            placeholder="검색할 게시글을 입력해주세요."
          />
          <button>
            {params.orderBy}
            <Image
              src={in_arrow_down}
              width={24}
              height={24}
              alt="아래화살표"
            />
          </button>
        </div>
      </div>
      <Pagination onChange={onChange} params={params} totalCount={totalCount} />
    </main>
  );
}
export default Articles;
