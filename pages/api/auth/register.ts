import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // เชื่อมต่อ Prisma
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    // ตรวจสอบว่ามีอีเมลในระบบหรือยัง
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).json(newUser);
  }

  res.status(405).json({ message: "Method not allowed." });
}
