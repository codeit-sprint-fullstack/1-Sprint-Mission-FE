import { postLogin } from '@utils/api/auth';
import { NextResponse } from 'next/server';

export async function POST({ email, password }) {
  try {
    const tokens = await postLogin({ email, password });

    const { token, refreshToken } = tokens.data;

    const response = NextResponse.json({ success: true });

    response.headers.set(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=3600`
    );

    response.headers.append(
      'Set-Cookie',
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800`
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
