import axios from '@/lib/axios';
import BestPost from '@/components/BestPost';
import Container from '@/components/Container';
import WriteButton from '@/components/WriteButton';
import SearchForm from '@/components/SearchForm';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Freeboard() {
  // 자유게시판 페이지
  // 등록된 게시글 중 최신순으로 3개를 정렬해서 서버로부터 가져온다.
  // BestList 컴포넌트를 통해 렌더링 한다.
  const router = useRouter();
  const { order = 'recent', limit = 3, q } = router.query;

  const [bestPosts, setBestPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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
  }, [limit]);

  // 검색 기능
  // 검색어에 해당되는 게시글을 서버로부터 가져온다.
  // SearchForm 컴포넌트를 통해 검색한다.
  // Search 컴포넌트를 통해 검색 결과를 렌더링한다.
  const getSearchResults = async (query) => {
    const res = await axios.get(`/posts?search=${query}`);
    const nextPosts = res.data;
    setSearchResults(nextPosts ?? []);
  };

  useEffect(() => {
    getSearchResults(q);
  }, [q]);

  // 게시글 목록
  // 서버로부터 모든 게시글을 가져온다.
  // PostList 컴포넌트를 통해

  return (
    <>
      <Container>
        <BestPost posts={bestPosts} />
        <WriteButton />
        <SearchForm />
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <div>{result.content}</div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
