import { getUserById, updateUser } from "@/data/userData";
import { BadRequestException, HttpStatus } from "@/errors";
import { handleApiError } from "@utils/apiErrorHandler";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = session.user.id;

    switch (req.method) {
      case "GET":
        const user = await getUserById(userId);
        res.status(HttpStatus.OK).json(user);
        break;

      case "PATCH":
        const { nickname } = req.body;
        if (!nickname) {
          throw new BadRequestException("닉네임은 필수 입력 항목입니다.");
        }
        const updatedUser = await updateUser(userId, { nickname });
        res.status(HttpStatus.OK).json(updatedUser);
        break;

      default:
        res.setHeader("Allow", ["GET", "PATCH"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    handleApiError(res, error);
  }
}
