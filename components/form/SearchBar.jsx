import Image from "next/image";
import styles from "./SearchBar.module.scss";
import searchIcon from "../../public/assets/icons/ic_search.svg";
import { useFormContext } from "react-hook-form";

export default function SearchBar({
  setKeyword,
  placeholder = "검색어를 입력해 주세요",
}) {
  const { register } = useFormContext();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setKeyword(e.target.value);
    }
  };

  return (
    <form className={styles.SearchBar}>
      <input
        {...register("articleKeyword")}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.searchIcon}>
        <Image src={searchIcon} width={24} height={24} alt="search icon" />
      </div>
    </form>
  );
}
