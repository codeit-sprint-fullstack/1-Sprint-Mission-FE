import Image from "next/image";

import style from "./search.module.css";

export function Search({ placeholder, onSearch }) {
  const inputClass = `${style.input}`;
  const iconFrameClass = `${style["icon-frame"]}`;

  const onSubmit = (e) => {
    onSearch(e.target.value);
  };

  const search = (
    <form className={style.search} onSubmit={onSubmit}>
      <input className={inputClass} placeholder={placeholder} />
      <div className={iconFrameClass}>
        <Image src="icons/ic_search.svg" alt="검색 마크" fill />
      </div>
    </form>
  );

  return search;
}

export default Search;
