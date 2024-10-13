import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mini1018';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'mini1018';

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token not provided' },
        { status: 403 }
      );
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired refresh token' },
      { status: 403 }
    );
  }
}
