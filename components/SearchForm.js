import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function SearchForm({ initialValue }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  // 입력 필드 값이 변경될 때 호출되는 함수
  function handleChange(e) {
    setValue(e.target.value);
  }

  // 폼이 제출될 때 호출되는 함수
  function handleSubmit(e) {
    e.preventDefault();

    router.push(`/search?q=${value}`);
  }

  //
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* 폼이 제출되면 handleSubmit 함수가 호출됩니다. */}
      <input name="q" value={value} onChange={handleChange} />
      <button>
        {" "}
        {/* 검색 버튼입니다. */}
        <Image
          src="/ic_search.png"
          alt="검색 버튼"
          width={24}
          height={24}
        />{" "}
        {/* Next.js Image 컴포넌트를 사용해 검색 아이콘을 렌더링합니다. */}
      </button>
    </form>
  );
}
