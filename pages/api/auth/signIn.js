import { getUserByEmail, saveRefreshToken } from "@/data/authData";
import {
  validateEmail,
  validatePassword,
  validateRequiredFields,
} from "@/utils/validators";
import { handleApiError } from "@/utils/apiErrorHandler";
import {
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from "@/errors/CustomExceptions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { email, password } = req.body;

    if (!validateRequiredFields(req.body, ["email", "password"])) {
      throw new BadRequestException("이메일과 비밀번호를 모두 입력해주세요.");
    }

    if (!validateEmail(email) || !validatePassword(password)) {
      throw new BadRequestException(
        "유효하지 않은 이메일 또는 비밀번호 형식입니다."
      );
    }

    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        "이메일 또는 비밀번호가 올바르지 않습니다."
      );
    }

    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.error("JWT secrets are not defined");
      throw new InternalServerErrorException("서버 설정 오류가 발생했습니다.");
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshToken(user.id, refreshToken, expiresAt);

    res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, nickname: user.nickname },
    });
  } catch (error) {
    handleApiError(error, res);
  }
}
