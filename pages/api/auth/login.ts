import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // เชื่อมต่อ Prisma


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้ในระบบ
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({ message: "Login successful.", user });
  }

  res.status(405).json({ message: "Method not allowed." });
}
