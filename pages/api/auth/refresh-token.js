import {
  getUserByRefreshToken,
  deleteRefreshToken,
  saveRefreshToken,
} from "@/data/authData";
import { handleApiError } from "@/utils/apiErrorHandler";
import {
  BadRequestException,
  UnauthorizedException,
} from "@/errors/CustomExceptions";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestException("리프레시 토큰이 필요합니다.");
    }

    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      throw new UnauthorizedException("유효하지 않은 리프레시 토큰입니다.");
    }

    await deleteRefreshToken(refreshToken);

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshToken(user.id, newRefreshToken, expiresAt);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    handleApiError(error);
  }
}
