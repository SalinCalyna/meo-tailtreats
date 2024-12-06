import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // ตรวจสอบว่า prisma client ถูกตั้งค่าอย่างถูกต้อง

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, category, price, imageUrl, description } = req.body;

      if (!name || !category || !price || !imageUrl || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const product = await prisma.product.create({
        data: { name, category, price, imageUrl, description },
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to add product" });
    }
  } else if (req.method === "PATCH") {
    // ฟังก์ชันสำหรับอัปเดตสินค้า
    try {
      const { id, name, category, price, imageUrl, description } = req.body;

      if (!id || !name || !category || !price || !imageUrl || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { name, category, price, imageUrl, description },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      await prisma.product.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
