import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret-key");
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
