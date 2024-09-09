// pages/api/posts/index.js
import { posts } from '../../../'; // 예시 데이터 파일
import {
  BadRequestException,
  NotFoundException,
  CommonException
} from '../errors/CustomExceptions'; // 예시 경로, 필요에 맞게 수정

let nextId = 1; // 다음 게시글 ID를 관리하기 위한 변수 (예시)

export default function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const post = posts.find(post => post.id === req.query.id);
          if (!post) {
            throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
          }
          res.status(200).json(post);
        } else {
          res.status(200).json(posts);
        }
        break;

      case 'POST':
        if (!req.body || !req.body.title || !req.body.content) {
          throw new BadRequestException("게시글 제목과 내용을 입력해야 합니다.");
        }

        const newPost = req.body;
        newPost.id = String(nextId++); // 새로운 ID를 생성하고 할당
        posts.push(newPost);
        res.status(201).json(newPost); // 201 Created
        break;

      default:
        // 허용되지 않는 HTTP 메서드가 요청되면
        res.setHeader('Allow', ['GET', 'POST']);
        throw new CommonException({
          status: 405,
          message: `Method ${req.method} Not Allowed`,
          code: "METHOD_NOT_ALLOWED",
        });
    }
  } catch (error) {
    if (error instanceof CommonException) {
      res.status(error.status).json({
        code: error.code,
        message: error.message,
        identifier: error.identifier,
        reason: error.reason,
        origin: error.origin,
        occuredAt: error.occuredAt,
      });
    } else {
      // Unhandled error
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "서버 내부 오류가 발생했습니다.",
        occuredAt: new Date().toISOString(),
      });
    }
  }
}
