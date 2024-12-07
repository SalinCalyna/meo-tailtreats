// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";  // เปลี่ยนเป็นเส้นทางของ prisma instance ของคุณ

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === "DELETE") {
    try {
      // ลบข้อมูลสินค้าโดยใช้ id จาก URL
      const product = await prisma.product.delete({
        where: { id: Number(id) },
      });
      
      res.status(200).json({ message: "Product deleted successfully!", product });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
