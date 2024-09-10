import axios from '@/lib/axios';
import BestPost from '@/components/BestPost';
import Container from '@/components/Container';
import WriteButton from '@/components/WriteButton';
import SearchForm from '@/components/SearchForm';
import PostList from '@/components/PostList';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Freeboard() {
  // 자유게시판 페이지
  // 등록된 게시글 중 최신순으로 3개를 정렬해서 서버로부터 가져온다.
  // BestList 컴포넌트를 통해 렌더링 한다.
  const router = useRouter();
  const { q } = router.query;

  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState('recent'); // 드롭다운에서 선택된 order 값을 관리

  const getBestPosts = async (order, limit) => {
    const res = await axios.get('/posts', {
      params: {
        order: 'recent', // 베스트 게시글은 최신순으로 고정
        limit: 3,
      },
    });
    const posts = res.data;
    setBestPosts(posts);
  };

  useEffect(() => {
    getBestPosts();
  }, []); // 페이지 로드 시 최신 게시글 3개를 가져옴

  // 검색 및 전체 게시글 조회
  // 검색어가 있으면 검새 결과, 없으면 모든 게시글 조회
  const getPosts = async (query, selectedOrder) => {
    const res = await axios.get('/posts', {
      params: query ? { search: query } : { order: selectedOrder },
    });
    setPosts(res.data ?? []); // 검색어와 선택된 order 값에 따라 게시글 조회
  };

  useEffect(() => {
    getPosts(q, order);
  }, [q, order]);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder); // 드롭다운에서 선택된 order 값 업데이트
  };

  return (
    <>
      <Container>
        <BestPost posts={bestPosts} />
        <WriteButton />
        <SearchForm onOrderChange={handleOrderChange} />
        <PostList posts={posts} />
      </Container>
    </>
  );
}
