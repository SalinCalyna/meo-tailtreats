import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client"; // หากอยู่ในตำแหน่งที่ลึกกว่า

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, description, price, category } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
      },
    });

    res.status(200).json(updatedProduct);
  }

  if (req.method === "DELETE") {
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  }
}
