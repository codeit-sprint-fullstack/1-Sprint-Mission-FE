import { posts } from '../../../data/postMockData.js';
import {
  BadRequestException,
  NotFoundException,
  CommonException
} from '../errors/CustomExceptions';

let nextId = 1;

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
        newPost.id = String(nextId++);
        posts.push(newPost);
        res.status(201).json(newPost);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        throw new CommonException({
          status: 405,
          message: `${req.method} 는 사용할 수 없습니다`,
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
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "서버 내부 오류",
        occuredAt: new Date().toISOString(),
      });
    }
  }
}
