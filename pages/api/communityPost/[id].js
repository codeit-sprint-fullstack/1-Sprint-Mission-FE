// pages/api/posts/[id].js
import { posts } from '../../../data/posts'; // 예시 데이터 파일

export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      // 게시글 조회
      const post = posts.find(p => p.id === id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
      break;

    case 'PATCH':
      // 게시글 수정
      const updatedPost = req.body;
      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], ...updatedPost };
        res.status(200).json(posts[index]);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
      break;

    case 'DELETE':
      // 게시글 삭제
      const deleteIndex = posts.findIndex(p => p.id === id);
      if (deleteIndex !== -1) {
        posts.splice(deleteIndex, 1);
        res.status(204).end(); // No Content
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
