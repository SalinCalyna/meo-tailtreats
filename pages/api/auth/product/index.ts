import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany(); // ดึงสินค้าทั้งหมด
    res.status(200).json(products);
  }

  if (req.method === "POST") {
    const { name, description, price, category } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
      },
    });

    res.status(201).json(newProduct);
  }
}
