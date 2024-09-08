import { useState } from 'react';
import instance from '@/lib/axios';
import axios from 'axios';
import styles from '@/styles/FreeBoard.module.css';

export default function UserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState([]);

  async function getArticles() {
    try {
      const res = await axios.post(
        'https://sprint-be-h8kw.onrender.com/users',
        {
          email: email,
          name: name,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  console.log(instance);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  function handleSubmit() {
    getArticles();
  }

  return (
    <>
      <div className={styles.body}>
        <input value={name} onChange={handleName} placeholder='your name' />
        <input value={email} onChange={handleEmail} placeholder='your email' />
        <button type='button' onClick={handleSubmit}>
          확인
        </button>
      </div>
    </>
  );
}
