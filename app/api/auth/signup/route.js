import { postSignup } from '@utils/api/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password, nickname } = await request.json();

    const response = await postSignup({
      email,
      password,
      nickname,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
