import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './Dropdown.module.css';
import arrow from '@/public/arrow.svg';

export default function Dropdown({ options, onOptionSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  // 드롭다운 외부를 클릭하면 닫히는 로직
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // 드롭다운 열기/닫기
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 옵션을 선택하면 드롭다운 닫기
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onOptionSelect(option); // 선택된 옵션을 상위 컴포넌트로 전달
    setIsOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={toggleDropdown} type="button">
        {selectedOption || '정렬기준'}
        <div className={`${styles.dropdownImgWrapper} ${isOpen ? styles.open : ''}`}>
          <Image src={arrow} alt="화살표 이미지" />
        </div>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
