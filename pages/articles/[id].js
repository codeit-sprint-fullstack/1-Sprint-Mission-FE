import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "@/pages/api/axios";
import {
  getArticle,
  getComment,
  deleteArticle,
} from "@/services/articleService"; // 함수들을 import

export default function Article() {
  const [article, setArticle] = useState();
  const router = useRouter();
  const { id } = router.query;

  async function getArticle(targetId) {
    const res = await axios.get(`/articles/${targetId}`);
    const nextArticle = res.data;
    setArticle(nextArticle);
  }

  useEffect(() => {
    if (!id) return;

    getArticle(id);
  }, [id]);

  if (!article) return null;

  return;
  <>
    <div>
      <Nav />
    </div>
    <div>
      <h1>{article.name}</h1>
      <p>댓글달기</p>
    </div>
    ;
    <div>
      <Footer />
    </div>
  </>;
}
