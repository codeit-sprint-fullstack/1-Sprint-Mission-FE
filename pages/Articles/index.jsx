import Link from "next/link";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import * as api from "@/pages/api/articles";
import DropDownBox from "@/components/DropdownList/DropdownBox";
import { dateFormatYYYYMMDD } from "@/utils/dateFormat";
import ic_search from "@/public/images/ic_search.png";
import imgDefault from "@/public/images/img_default.png";
import ic_heart from "@/public/images/ic_heart.png";
import ic_medal from "@/public/images/ic_medal.png";
import ic_profile from "@/public/images/ic_profile.png";
import styles from "@/styles/articles.module.css";
import { RefContext } from "../_app";
import useAuth from "@/contexts/authContext";

function BestArticles({ item }) {
  const { writer, title, createAt, favorite } = item;
  const date = dateFormatYYYYMMDD(createAt);

  return (
    <Link href={`/Articles/${item.id}`}>
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
            <span>{writer.nickname}</span>
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
    </Link>
  );
}

function ArticleItems({ item }) {
  const { writer, title, createAt, favorite } = item;
  const date = dateFormatYYYYMMDD(createAt);

  return (
    <Link href={`/Articles/${item.id}`}>
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
            <Image
              width={24}
              height={24}
              src={ic_profile}
              alt="사용자프로필이미지"
            />
            <span className={styles.item_data_user_name}>
              {writer.nickname}
            </span>
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
    </Link>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const defaultParams = {
    orderBy: "recent",
    keyword: "",
    pageSize: 5,
    page: 1,
  };

  await queryClient.prefetchQuery({
    queryKey: ["bestArticles"],
    queryFn: () => api.getBestArticles(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["Articles"],
    queryFn: api.getArticles(defaultParams),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      defaultParams,
    },
  };
}

function ArticlesRouter({ dehydratedState, defaultParams }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Articles defaultParams={defaultParams} />
    </HydrationBoundary>
  );
}

function Articles({ defaultParams }) {
  const globalDivRef = useContext(RefContext);
  const [params, setParams] = useState(defaultParams);
  const [articles, setArticles] = useState([]);
  const [cursor, setCursor] = useState("");
  const [keyword, setKeyword] = useState("");

  const { user } = useAuth();

  const {
    data: articlesData,
    isError,
    error,
  } = useQuery({
    queryKey: ["articles", params],
    queryFn: () => api.getArticles(params, cursor),
  });

  if (isError) {
    console.log(error);
  }

  const { data: bestArticlesData } = useQuery({
    queryKey: ["bestArticles"],
    queryFn: () => api.getBestArticles(),
  });

  const handleChangeParams = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeKeyword = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleChangeParams("keyword", keyword);
  };

  const handleChangeOrder = (e) => {
    const value = e.target.value;
    handleChangeParams("orderBy", value);
  };

  useEffect(() => {
    setArticles((prev) => [...prev, ...(articlesData?.list || [])]);
  }, [articlesData]);

  useEffect(() => {
    if (globalDivRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setParams((prev) => ({
              ...prev,
              page: prev.page + 1,
            }));
          }
        });
      });
      observer.observe(globalDivRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [globalDivRef]);

  return (
    <main>
      <div className={styles.best_articles}>
        <h2>베스트 게시글</h2>
        <div className={styles.best_articles_item}>
          {bestArticlesData?.list.map((item) => (
            <BestArticles key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className={styles.articles_box}>
        <div className={styles.articles_head_box}>
          <h2>게시글</h2>
          <Link href={"/Articles/Registration"}>
            <button className={styles.articles_create_btn}>글쓰기</button>
          </Link>
        </div>
        <div className={styles.search_box}>
          <Image
            src={ic_search}
            width={24}
            height={24}
            className={styles.search_icon}
            alt="검색아이콘"
          />
          <form onSubmit={onSubmit}>
            <input
              onChange={handleChangeKeyword}
              className={styles.search_input}
              type="text"
              value={keyword || ""}
              placeholder="검색할 게시글을 입력해주세요."
            />
          </form>
          <DropDownBox
            onOrderChange={handleChangeOrder}
            orderBy={params.orderBy}
          />
        </div>
        <ul className={styles.article_ul}>
          {articles.map((item) => (
            <ArticleItems key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </main>
  );
}
export default ArticlesRouter;
