import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      // ลบสินค้า
      await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Unable to delete product" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
