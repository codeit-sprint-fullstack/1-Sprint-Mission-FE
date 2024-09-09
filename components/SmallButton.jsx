import React from 'react'
import styles from './SmallButton.module.css';

export default function Button({ onClick, children, type = 'button', className = '', ...props }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={styles.button} // 기본 스타일과 추가 클래스 결합
        {...props}
      >
        {children}
      </button>
    );
  }