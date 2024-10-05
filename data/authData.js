import { PrismaClient } from "@prisma/client";
import {
  NotFoundException,
  ConflictException,
} from "@/errors/CustomExceptions";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function createUser(userData) {
  try {
    console.log("createUser 호출됨:", userData);
    const existingUser = await getUserByEmail(userData.email, false);
    if (existingUser) {
      console.log("사용자 충돌:", userData.email);
      throw new ConflictException("이미 존재하는 이메일입니다.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        nickname: userData.nickname,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
      },
    });
    console.log("사용자 생성 완료:", user);
    return user;
  } catch (error) {
    if (error instanceof ConflictException) {
      throw error;
    }
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      console.log("이미 존재하는 이메일로 인한 충돌:", userData.email);
      throw new ConflictException("이미 존재하는 이메일입니다.");
    }
    console.log("createUser 오류 발생:", error);
    throw error;
  }
}

export async function getUserByEmail(email, throwError = true) {
  console.log("getUserByEmail 호출됨:", email);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user && throwError) {
    console.log("사용자 없음:", email);
    throw new NotFoundException("해당 이메일의 사용자를 찾을 수 없습니다.");
  }
  console.log("사용자 정보 반환:", user);
  return user;
}

export async function saveRefreshToken(userId, token, expiresAt) {
  console.log("saveRefreshToken 호출됨:", { userId, token });
  await prisma.refreshToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
  console.log("리프레시 토큰 저장 완료:", token);
}

export async function deleteRefreshToken(token) {
  console.log("deleteRefreshToken 호출됨:", token);
  await prisma.refreshToken.delete({
    where: { token },
  });
  console.log("리프레시 토큰 삭제 완료:", token);
}

export async function getUserByRefreshToken(token) {
  console.log("getUserByRefreshToken 호출됨:", token);
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!refreshToken || refreshToken.expiresAt <= new Date()) {
    console.log("유효하지 않은 리프레시 토큰:", token);
    throw new NotFoundException("유효하지 않은 리프레시 토큰입니다.");
  }
  console.log("사용자 정보 반환:", refreshToken.user);
  return refreshToken.user;
}

export async function updateUserPassword(userId, newPassword) {
  console.log("updateUserPassword 호출됨:", { userId });
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
  console.log("비밀번호 업데이트 완료:", userId);
}

export async function cleanExpiredTokens() {
  console.log("cleanExpiredTokens 호출됨");
  await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
  console.log("만료된 리프레시 토큰 정리 완료");
}

export async function isRefreshTokenValid(token) {
  console.log("isRefreshTokenValid 호출됨:", token);
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { token },
  });
  const isValid = refreshToken && refreshToken.expiresAt > new Date();
  console.log("리프레시 토큰 유효성:", isValid);
  return isValid;
}
