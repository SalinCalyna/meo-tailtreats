import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"; // Connect to Prisma
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Replace with a secure key

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
