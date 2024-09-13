import axios from '@/lib/axios';
import Head from 'next/head';
import BestPost from '@/components/BestPost';
import WriteButton from '@/components/WriteButton';
import SearchForm from '@/components/SearchForm';
import PostList from '@/components/PostList';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Spinner from '@/components/Spinner';

// 정적 생성시 데이터도 함께 가져오기 위한 함수
export async function getStaticProps() {
  try {
    // 베스트 게시글을 서버에서 가져옴
    const bestPostRes = await axios.get('/posts', {
      params: {
        order: 'recent',
        limit: 3,
      },
    });

    const bestPosts = bestPostRes.data.posts ?? [];

    // 첫 페이지의 게시글을 서버에서 가져옴
    const postRes = await axios.get('/posts', {
      params: {
        order: 'recent',
        page: 1,
      },
    });

    const posts = postRes.data.posts ?? [];
    const totalPosts = postRes.data.totalPosts ?? 0;

    // 서버에서 가져온 데이터를 props로 전달
    return {
      props: {
        bestPosts,
        posts,
        totalPosts,
      },
      revalidate: 300, // 5분마다 페이지를 재생성
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다(자유게시판).', err);
    return {
      props: {
        bestPosts: [],
        posts: [],
        totalPosts: 0,
        error: '데이터를 불러오는 중 오류가 발생했습니다(자유게시판).',
      },
    };
  }
}

export default function Freeboard({
  bestPosts: initialBestPosts,
  posts: initialPosts = [],
  totalPosts: initialTotalPosts = 0,
  error: initialError,
}) {
  // 자유게시판 페이지
  // 등록된 게시글 중 최신순으로 3개를 정렬해서 서버로부터 가져온다.
  // BestList 컴포넌트를 통해 렌더링 한다.
  const router = useRouter();
  const { q } = router.query;

  const [bestPosts, setBestPosts] = useState(initialBestPosts);
  const [posts, setPosts] = useState(initialPosts);
  const [order, setOrder] = useState('recent'); // 드롭다운에서 선택된 order 값을 관리
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false); // 게시글 로딩 상태
  const [hasMore, setHasMore] = useState(initialPosts.length < initialTotalPosts); // 더 불러올 게시글이 있는 확인
  const [totalPosts, setTotalPosts] = useState(initialTotalPosts); // 전체 게시글 수 추가
  const [error, setError] = useState(initialError || null); // 에러 상태 관리

  const observerRef = useRef(null); // IntersectionObserver 참조
  const lastPostRef = useRef(null); // 마지막 게시글을 참조할 ref

  // 검색 및 전체 게시글 조회
  // 검색어나 정렬 기준, 페이지에 따라 게시글 목록을 서버에서 가져오는 함수
  const getPosts = async (query, selectedOrder, page = 1) => {
    if (loadingPosts) return; // 이미 로딩 중이면 중복 요청 방지

    setLoadingPosts(true);
    setError(null); // 이전 에러 초기화

    try {
      const res = await axios.get('/posts', {
        params: query
          ? { search: query, page } // 검색어가 있으면 검색어와 페이지 기준으로 요청
          : { order: selectedOrder, page }, // 검색어가 없으면 정렬 기준과 페이지로 요청
      });

      const newPosts = res.data.posts ?? []; // 서버에서 받은 게시글
      const total = res.data.totalPosts ?? 0; // 전체 게시글 수

      // 페이지 1이면 기존 게시글을 덮어쓰고, 그렇지 않으면 기존 게시글에 새로 불러온 게시글 추가
      setPosts((prevPosts) => (page === 1 ? newPosts : [...prevPosts, ...newPosts]));
      setHasMore(newPosts.length > 0 && posts.length < total); // 더 불러올 게시글이 있는지 확인
      setTotalPosts(total);
    } catch (error) {
      console.error('게시글을 가져오는 중 오류 발생:', err);
      setError('게시글을 가져오는 중 문제가 발생했습니다.');
    } finally {
      setLoadingPosts(false); // 게시글 로딩 종료
    }
  };

  // 검색어나 정렬 순서가 바뀔 때마다 게시글 목록을 초기화하고 처음부터 다시 가져옴
  useEffect(() => {
    setPage(1);
    getPosts(q, order, 1);
  }, [q, order]);

  // 페이지가 바뀌거나 새로운 게시글을 불러올 때 실행
  useEffect(() => {
    if (!hasMore || loadingPosts) return; // 더 불러올 게시글이 없거나 로딩 중이면 중지

    if (observerRef.current) observerRef.current.disconnect();

    // IntersectionObserver 설정
    // 마지막 게시글이 화면에 나타나면 페이지 번호 증가
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // 페이지를 증가시켜 다음 데이터를 요청할 준비
      }
    });

    // 마지막 게시글 요소에 옵저버 연결
    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [posts, hasMore, loadingPosts]);

  // 페이지가 변경될 때마다 새로운 게시글 요청
  useEffect(() => {
    if (page > 1) {
      getPosts(q, order, page);
    }
  }, [page]);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder); // 드롭다운에서 선택된 order 값 업데이트
  };

  return (
    <>
      <Head>
        <title>판다마켓 - 자유게시판</title>
      </Head>
      <BestPost posts={bestPosts} />
      <WriteButton />
      <SearchForm onOrderChange={handleOrderChange} />
      <PostList posts={posts} />
      {loadingPosts && <Spinner />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div ref={lastPostRef} />
    </>
  );
}
