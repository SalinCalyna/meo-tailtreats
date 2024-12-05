import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // ดึงข้อมูลจาก body
    const { productId, quantity } = req.body;

    // ตรวจสอบว่า productId และ quantity ถูกต้องหรือไม่
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // ตัวอย่างการเพิ่มสินค้าในตะกร้า (คุณสามารถเพิ่ม Logic Database ได้ที่นี่)
    res.status(200).json({
      message: 'Product added to cart successfully!',
      data: {
        productId,
        quantity,
      },
    });
  } else if (req.method === 'GET') {
    // ตัวอย่างการคืนค่าข้อมูลตะกร้าสินค้า
    res.status(200).json({
      message: 'Cart retrieved successfully!',
      data: [
        { productId: '123', quantity: 1 },
        { productId: '456', quantity: 2 },
      ],
    });
  } else {
    // ไม่รองรับ method อื่น
    res.status(405).json({ message: 'Method not allowed' });
  }
}
