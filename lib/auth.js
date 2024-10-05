import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../errors";

export function authenticateToken(handler) {
  return async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("인증 토큰이 필요합니다.");
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) return res.status(403).end(); // sendStatus 대신 status와 end 사용
      req.user = user;
      handler(req, res);
    });
  };
}
