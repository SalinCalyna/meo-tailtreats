import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Prisma Client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // ลบสินค้า
      await prisma.product.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else if (req.method === "PUT") {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    try {
      // อัปเดต URL รูปภาพของสินค้า
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: { imageUrl },
      });
      res.status(200).json(product);
    } catch (error) {
      console.error("Error updating product image:", error);
      res.status(500).json({ error: "Failed to update product image" });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PUT"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
