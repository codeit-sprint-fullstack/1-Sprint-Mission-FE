import { getUserInfoApi } from '@/utils/api/userApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/AuthProvider';

export default function MyPage() {
  const { user } = useAuth(true);

  const router = useRouter();

  return (
    <>
      <div>회원정보</div>
      <div>닉네임</div>
      <div>{user ? user.nickname : ''}</div>
    </>
  );
}
