import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // เชื่อมต่อกับ Prisma Client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // ดึงข้อมูลสินค้าทั้งหมด
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Unable to fetch products" });
      }
      break;

    case "POST":
      try {
        const { name, category, price, imageUrl, description } = req.body;

        // ตรวจสอบข้อมูลก่อนบันทึก
        if (!name || !category || !price || !imageUrl || !description) {
          return res.status(400).json({ error: "All fields are required" });
        }

        // เพิ่มสินค้าใหม่
        const newProduct = await prisma.product.create({
          data: {
            name,
            category,
            price,
            imageUrl,
            description,
          },
        });

        res.status(201).json(newProduct);
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Unable to add product" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;

        if (!id || Array.isArray(id)) {
          return res.status(400).json({ error: "Invalid product ID" });
        }

        // ลบสินค้า
        await prisma.product.delete({
          where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Unable to delete product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
