import Image from "next/image";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import styles from "./KebabMenu.module.scss";
import kebabIcon from "../../public/assets/icons/ic_kebab.svg";
import { useRouter } from "next/router";

export default function KebabMenu({ idPath }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const dropDownRef = useRef(0);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleClickEdit = () => {
    router.push(`/forum/edit-article/${idPath}`);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.KebabMenu} ref={dropDownRef}>
      <Button onClick={toggleDropDown} variant="icon">
        <Image src={kebabIcon} width={24} height={24} alt="kebab menu icon" />
      </Button>
      {isOpen && (
        <ul>
          <li onClick={handleClickEdit}>수정하기</li>
          <li>삭제하기</li>
        </ul>
      )}
    </div>
  );
}
