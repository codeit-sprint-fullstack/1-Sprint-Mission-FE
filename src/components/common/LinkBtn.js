import React from "react";
import { Link } from 'react-router-dom';
import styles from "./LinkBtn.module.css";


// 이미지

function LinkBtn( link ) {
  return <button className={styles.registerBtn}><Link to ={link}>상품 등록하기</Link></button>
}

export default LinkBtn