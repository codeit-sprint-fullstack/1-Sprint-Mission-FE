import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "@/data/productData";
import { authenticateToken } from "@/lib/auth";
import { NotFoundException } from "@/errors/CustomExceptions";

async function getHandler(req, res) {
  const { productId } = req.query;

  try {
    const product = await getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof NotFoundException) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Error in getHandler:", error);
      res
        .status(500)
        .json({ message: "상품을 가져오는 중 오류가 발생했습니다." });
    }
  }
}

async function putHandler(req, res) {
  const { productId } = req.query;

  if (!req.user || !req.user.id) {
    res.status(401).json({ message: "인증되지 않은 사용자입니다." });
    return;
  }

  try {
    const updatedProduct = await updateProduct(productId, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error instanceof NotFoundException) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Error in putHandler:", error);
      res
        .status(500)
        .json({ message: "상품을 업데이트하는 중 오류가 발생했습니다." });
    }
  }
}

async function deleteHandler(req, res) {
  const { productId } = req.query;

  if (!req.user || !req.user.id) {
    res.status(401).json({ message: "인증되지 않은 사용자입니다." });
    return;
  }

  try {
    await deleteProduct(productId);
    res.status(200).json({ message: "상품이 성공적으로 삭제되었습니다." });
  } catch (error) {
    if (error instanceof NotFoundException) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Error in deleteHandler:", error);
      res
        .status(500)
        .json({ message: "상품을 삭제하는 중 오류가 발생했습니다." });
    }
  }
}

async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        await getHandler(req, res);
        break;
      case "PUT":
        await authenticateToken(putHandler)(req, res);
        break;
      case "DELETE":
        await authenticateToken(deleteHandler)(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling API request:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

export default handler;
