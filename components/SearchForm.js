import { useState } from "react"; // React에서 useState Hook을 가져옵니다. 상태 관리를 위해 사용합니다.
import { useRouter } from "next/router"; // Next.js에서 useRouter Hook을 가져옵니다. 라우팅(페이지 이동)을 위해 사용합니다.
import Image from "next/image"; // Next.js의 Image 컴포넌트를 가져옵니다. 최적화된 이미지를 사용하기 위해 사용합니다.

export default function SearchForm({ initialValue }) {
  // SearchForm 컴포넌트를 정의하고, initialValue라는 props를 받습니다.
  const router = useRouter(); // useRouter Hook을 호출하여 router 객체를 가져옵니다. 이를 통해 페이지 이동을 제어할 수 있습니다.
  const [value, setValue] = useState(initialValue); // 상태 변수(value)와 이를 업데이트하는 함수(setValue)를 선언합니다. 초기값은 initialValue입니다.

  // 입력 필드 값이 변경될 때 호출되는 함수
  function handleChange(e) {
    setValue(e.target.value); // 입력된 값을 상태 변수 value에 저장합니다.
  }

  // 폼이 제출될 때 호출되는 함수
  function handleSubmit(e) {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 막습니다.
    /* Form 태그의 기본 동작은 페이지를 새로고침하면서 쿼리스트링을 포함한 URL로 이동하는 것입니다. 
       그러나 Next.js의 라우터(router.push)를 사용해 페이지 이동을 제어할 것이기 때문에, 기본 동작을 막아줍니다. */

    router.push(`/search?q=${value}`); // 검색어를 쿼리 파라미터로 포함하여 /search 경로로 이동합니다.
  }

  // JSX를 반환하여 컴포넌트를 렌더링합니다.
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* 폼이 제출되면 handleSubmit 함수가 호출됩니다. */}
      <input
        name="q" // 입력 필드의 이름을 "q"로 설정합니다.
        value={value} // 입력 필드의 값은 value 상태에 따라 결정됩니다.
        onChange={handleChange} // 입력 필드의 값이 변경될 때마다 handleChange 함수가 호출됩니다.
      />
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
