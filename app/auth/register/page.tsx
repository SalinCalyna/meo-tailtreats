import bcrypt from "bcrypt";
import prisma from "./prisma"; // เชื่อม Prisma ORM

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    // เช็คว่าผู้ใช้งานนี้มีอยู่ในระบบหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // เข้ารหัสรหัสผ่านด้วย bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่มผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}
