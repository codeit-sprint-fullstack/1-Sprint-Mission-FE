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
  const { order = 'recent', limit = 3, q } = router.query;

  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const getBestPosts = async (order, limit) => {
    const res = await axios.get('/posts', {
      params: {
        order: order,
        limit: limit,
      },
    });
    const posts = res.data;
    setBestPosts(posts);
  };

  useEffect(() => {
    getBestPosts(order, limit);
  }, [order, limit]);

  // 검색 및 전체 게시글 조회
  // 검색어가 존재하면 검색 결과를 화면에 렌더링 한다.
  // 검색어가 없으면 서버에 등록된 모든 게시글을 화면에 렌더링 한다.
  const getPosts = async (query) => {
    const res = await axios.get('/posts', {
      params: query ? { search: query } : {},
    });
    setPosts(res.data ?? []);
  };

  useEffect(() => {
    getPosts(q);
  }, [q]);

  return (
    <>
      <Container>
        <BestPost posts={bestPosts} />
        <WriteButton />
        <SearchForm />
        <PostList posts={posts} />
      </Container>
    </>
  );
}
