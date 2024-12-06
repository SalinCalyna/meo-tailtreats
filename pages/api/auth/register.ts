import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // เชื่อมต่อ Prisma
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // ตรวจสอบว่าอีเมลมีรูปแบบที่ถูกต้อง
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      // ตรวจสอบว่ามีผู้ใช้อยู่ในระบบแล้วหรือไม่
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // เข้ารหัส password
      const hashedPassword = await bcrypt.hash(password, 10);

      // สร้างผู้ใช้ใหม่ในฐานข้อมูล
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}