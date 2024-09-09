import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div>
      <h1>Search 페이지</h1>
      <div>{q} 검색 결과</div>
    </div>
  );
}
