import { NotFoundException } from '../../../exceptions/CustomExceptions';
import { posts } from '../../../data/postMockData.js';

export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const post = posts.find(p => p.id === id);
      if (post) {
        res.status(200).json(post);
      } else {
        throw new NotFoundException('게시글을 찾을 수 없습니다.');
      }
      break;

    case 'PATCH':
      const updatedPost = req.body;
      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], ...updatedPost };
        res.status(200).json(posts[index]);
      } else {
        throw new NotFoundException('게시글을 찾을 수 없습니다.');
      }
      break;

    case 'DELETE':
      const deleteIndex = posts.findIndex(p => p.id === id);
      if (deleteIndex !== -1) {
        posts.splice(deleteIndex, 1);
        res.status(204).end();
      } else {
        throw new NotFoundException('게시글을 찾을 수 없습니다.');
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`${req.method}  는 사용할 수 없습니다`);
      break;
  }
}
