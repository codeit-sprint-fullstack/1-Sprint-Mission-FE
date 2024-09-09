import axios from '@/lib/axios';
import BestPost from '@/components/BestPost';
import Container from '@/components/Container';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Freeboard() {
  // 자유게시판 페이지
  // 등록된 게시글 중 최신순으로 3개를 정렬해서 서버로부터 가져온다.
  // BestList 컴포넌트를 통해 렌더링 한다.
  const [bestPosts, setBestPosts] = useState([]);

  const router = useRouter();
  const { order = 'recent', limit = 3 } = router.query;

  async function getBestPosts(order, limit) {
    const res = await axios.get('/posts', {
      params: {
        order: order,
        limit: limit,
      },
    });
    const posts = res.data;
    setBestPosts(posts);
  }

  useEffect(() => {
    getBestPosts(order, limit);
  }, [limit]);

  // 검색 기능
  // 검색어에 해당되는 게시글을 서버로부터 가져온다.
  // SearchForm 컴포넌트를 통해 검색한다.
  // Search 컴포넌트를 통해 검색 결과를 렌더링한다.

  // 게시글 목록
  // 서버로부터 모든 게시글을 가져온다.
  // PostList 컴포넌트를 통해

  return (
    <>
      <Container>
        <BestPost posts={bestPosts} />
      </Container>
    </>
  );
}
