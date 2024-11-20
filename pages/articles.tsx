import styles from '../styles/articles.module.css';
import BestItem from '../components/articles/BestItem';
import Postview from '../components/articles/Postview';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getArticles } from './api/articles';
import { useRouter } from 'next/router';
import { Article, Comment } from '../pages/api/types/articleTypes';
import { AxiosResponse } from 'axios';

// AxiosResponse 타입을 확인하는 타입 가드 함수 정의
function isAxiosResponse<T>(response: any): response is AxiosResponse<T> {
  return response && response.data !== undefined;
}
let pageSize = 10;

interface GetArticlesResponse {
  message: string;
  articles: Article[];
}
export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<string>('최신 순');
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [value, setValue] = useState<string>('createAt');
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isFetching
    ) {
      // 끝에 도달했는지 확인
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) return;

    pageSize += 3;
    // 추가 데이터 가져오기 로직 여기에 추가 가능

    // 데이터 로드가 끝나면 isFetching 상태를 false로 설정
    setIsFetching(false);
  }, [isFetching]);

  const router = useRouter();

  const fetchBestArticles = async () => {
    try {
      const response = await getArticles({
        pageSize: 4,
      });

      if (isAxiosResponse<GetArticlesResponse>(response)) {
        const data = response.data;

        // 데이터가 예상한 형태인지 확인하고 상태 업데이트
        if (Array.isArray(data.articles)) {
          setBestArticles(data.articles);
        } else {
          setBestArticles([]);
        }
      } else {
        setBestArticles([]);
        console.error('API 응답이 AxiosResponse가 아닙니다');
      }
    } catch (error) {
      console.error('베스트 게시글을 가져오는 중 오류 발생:', error);
      setBestArticles([]);
    }
  };

  useEffect(() => {
    fetchBestArticles();
  }, []);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const postClick = () => {
    router.push('article/create');
  };

  const fetchContentArticles = async () => {
    try {
      const response = await getArticles({
        pageSize: pageSize,
        keyword: keyword,
        orderBy: value,
        order: 'asc',
      });

      if (isAxiosResponse<GetArticlesResponse>(response)) {
        const data = response.data;

        // 데이터가 예상한 형태인지 확인하고 상태 업데이트
        if (Array.isArray(data.articles)) {
          setArticleData(data.articles);
        } else {
          setArticleData([]);
        }
      } else {
        setArticleData([]);
      }
    } catch (error) {
      setArticleData([]);
    }
  };

  useEffect(() => {
    fetchContentArticles();
  }, [keyword]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOption = (option: string) => {
    setIsOpen(!isOpen);
    setDropdownValue(option);
    if (option === '최신 순') {
      setValue('createAt');
    } else if (option === '좋아요 순') {
      setValue('like');
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
            {bestArticles && bestArticles.length > 0 ? (
              bestArticles.map((article) => (
                <BestItem key={article.id} article={article} />
              ))
            ) : (
              <p>베스트 게시글을 불러오고 있습니다...</p>
            )}
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
            />
            <Image
              src="/search.svg"
              width={24}
              height={24}
              alt="검색"
              className={styles.SearchImg}
            />
            <div className={styles.dropdown}>
              <p className={styles.toggle} onClick={handleToggle}>
                {dropdownValue}
                <Image
                  src="/dropdown.svg"
                  width={24}
                  height={24}
                  alt="드롭다운"
                />
              </p>
              {isOpen && (
                <ul className={styles.menu}>
                  <li onClick={() => handleOption('최신 순')}>최신 순</li>
                  <li onClick={() => handleOption('좋아요 순')}>좋아요 순</li>
                </ul>
              )}
            </div>
          </div>
          <div className={styles.ContentItem}>
            {articleData.map((article) => (
              <Postview key={article.id} articledata={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
