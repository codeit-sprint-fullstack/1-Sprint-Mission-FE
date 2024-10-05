import {
  getProducts,
  getTotalProductsCount,
  addProduct,
} from "@/data/productData";
import { authenticateToken } from "@/lib/auth";

async function getHandler(req, res) {
  const {
    page = "1",
    pageSize = "10",
    orderBy = "recent",
    keyword,
  } = req.query;

  try {
    const result = await getProducts(
      parseInt(page, 10),
      parseInt(pageSize, 10),
      orderBy,
      keyword || undefined
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getHandler:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function postHandler(req, res) {
  if (!req.user || !req.user.id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const newProduct = await addProduct({
      ...req.body,
      user_id: req.user.id,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in postHandler:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        await getHandler(req, res);
        break;
      case "POST":
        await authenticateToken(postHandler)(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
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
