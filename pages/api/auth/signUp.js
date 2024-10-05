import { createUser } from "@/data/authData";
import {
  validateEmail,
  validatePassword,
  validateRequiredFields,
} from "@/utils/validators";
import { handleApiError } from "@/utils/apiErrorHandler";
import { BadRequestException } from "@/errors/CustomExceptions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { email, password, nickname } = req.body;

    if (!validateRequiredFields(req.body, ["email", "password", "nickname"])) {
      throw new BadRequestException("모든 필드를 입력해주세요.");
    }

    if (!validateEmail(email)) {
      throw new BadRequestException("유효하지 않은 이메일 형식입니다.");
    }

    if (!validatePassword(password)) {
      throw new BadRequestException("비밀번호는 8자 이상이어야 합니다.");
    }

    const newUser = await createUser({ email, password, nickname });

    res.status(201).json({
      message: "사용자가 성공적으로 생성되었습니다.",
      user: {
        id: newUser.id,
        email: newUser.email,
        nickname: newUser.nickname,
      },
    });
  } catch (error) {
    handleApiError(error);
  }
}
