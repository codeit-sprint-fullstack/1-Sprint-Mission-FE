import styles from "@/styles/articles.module.css";
import ic_search from "@/public/images/ic_search.png";
import imgDefault from "@/public/images/img_default.png";
import ic_heart from "@/public/images/ic_heart.png";
import ic_medal from "@/public/images/ic_medal.png";
import ic_profile from "@/public/images/ic_profile.png";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import * as api from "@/pages/api/articles";
import Pagination from "@/components/Pagination";
import DropDownBox from "@/components/DropDownBox";
import { dateFormatYYYYMMDD } from "@/utils/dateFromat";

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
  const date = dateFormatYYYYMMDD(createAt);

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
      <div className={styles.item_data_box}>
        <div className={styles.item_data_box}>
          <span>{user.name}</span>
          {/* <span>판다마켓</span> */}
          <Image
            width={16}
            height={16}
            className={styles.favorite_icon}
            src={ic_heart}
            alt="좋아요이미지"
          />
          <span>{favorite}</span>
        </div>
        <div className={styles.item_data_box}>
          <span className={styles.create_time}>{date}</span>
        </div>
      </div>
    </div>
  );
}

function ArticleItems({ item }) {
  const { user, title, createAt, favorite } = item;
  const date = dateFormatYYYYMMDD(createAt);

  return (
    <li className={styles.article_item_box}>
      <div className={styles.article_main_content_box}>
        <span className={styles.article_item_title}>{title}</span>
        <Image
          className={styles.article_item_image}
          src={imgDefault}
          alt="게시글이미지"
        />
      </div>
      <div className={styles.item_data_box}>
        <div className={styles.item_data_box}>
          <Image width={24} height={24} src={ic_profile} alt="유저이미지" />
          <span className={styles.item_data_user_name}>{user.name}</span>
          <span className={styles.create_time}>{date}</span>
        </div>
        <div className={styles.item_data_box}>
          <Image
            width={24}
            height={24}
            className={styles.favorite_icon}
            src={ic_heart}
            alt="좋아요이미지"
          />
          <span>{favorite}</span>
        </div>
      </div>
    </li>
  );
}

function Articles({ bestItem, defaultParams }) {
  const [params, setParams] = useState(defaultParams);
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState(bestItem);
  const [totalCount, setTotalCont] = useState(0);

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

  const onOrderChange = (e) => {
    const name = [e.target.name];
    const value = [e.target.value];
    onChange(name, value);
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
          <Image
            src={ic_search}
            className={styles.search_icon}
            alt="검색아이콘"
          />
          <input
            className={styles.search_input}
            type="text"
            name="keyword"
            value={params.keyword || ""}
            onChange={onChange}
            placeholder="검색할 게시글을 입력해주세요."
          />
          <DropDownBox onOrderChange={onOrderChange} order={params.orderBy} />
        </div>
        <ul>
          {articles.map((item) => (
            <ArticleItems key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <Pagination onChange={onChange} params={params} totalCount={totalCount} />
    </main>
  );
}
export default Articles;
