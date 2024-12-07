// pages/api/products/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";// เชื่อม Prisma ที่ตั้งไว้

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;  // รับค่า id จาก URL

  // ตรวจสอบว่า id ถูกส่งมาหรือไม่
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  switch (method) {
    case "DELETE":
      try {
        // ลบสินค้าตาม id โดยใช้ Prisma
        const product = await prisma.product.delete({
          where: { id: parseInt(id) },
        });
        return res.status(200).json(product); // ส่งผลลัพธ์กลับ
      } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Failed to delete product" });
      }

    default:
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
