import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // ดึง `id` จาก URL

  if (req.method === "DELETE") {
    try {
      // ลบข้อมูลสินค้าโดยอ้างอิง `id`
      await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
