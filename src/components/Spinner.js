import React, { useState, useEffect } from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ delay = 3000, dataLoaded, children }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [isTimeElapsed, setIsTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeElapsed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (dataLoaded || isTimeElapsed) {
      setShowSpinner(false);
    }
  }, [isTimeElapsed, dataLoaded]);

  return (
    <>
      {showSpinner ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>데이터를 불러오는 중입니다...</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Spinner;

