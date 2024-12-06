// pages/cart.tsx
import { useState } from "react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, item];
    });
  };

  // ฟังก์ชันลบสินค้าจากตะกร้า
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // คำนวณยอดรวม
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link href="/">Go to Shop</Link></p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-lg">{item.name}</h3>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ตะกร้ารวม */}
      {cartItems.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-semibold">Total: ${calculateTotal()}</p>
          <Link href="/checkout">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}
