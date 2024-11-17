import db from "../lib/db.js";

async function testConnection() {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("연결됨:", result.rows[0].now);

    const postsResult = await db.query("SELECT COUNT(*) FROM posts");
    console.log("게시글갯수:", postsResult.rows[0].count);
  } catch (error) {
    console.error("연결실패:", error);
  } finally {
    process.exit();
  }
}

testConnection();
