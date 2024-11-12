import Image from "next/image";
import { ChangeEvent, FormEvent } from "react";

import style from "./search.module.css";

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function Search({ placeholder, onSearch }: SearchProps) {
  const inputClass = `${style.input}`;
  const iconFrameClass = `${style["icon-frame"]}`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const input = e.currentTarget.querySelector("input") as HTMLInputElement;

    if (onSearch && input) {
      onSearch(input.value);
    }
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
