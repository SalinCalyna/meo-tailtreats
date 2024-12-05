"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]); // State สำหรับเก็บรายการสินค้า
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบสถานะ Admin (สมมติใช้ Local Storage)
    const isAdminLoggedIn = localStorage.getItem("isAdmin") === "true";
    if (!isAdminLoggedIn) {
      alert("Access denied! Please log in as Admin.");
      router.push("/"); // กลับไปหน้าหลัก
    } else {
      setIsAdmin(true);
      fetchProducts(); // ดึงข้อมูลสินค้า
    }
  }, []);

  // ฟังก์ชันดึงข้อมูลสินค้า
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products"); // ดึงข้อมูลจาก API
      const data = await res.json();
      setProducts(data); // ตั้งค่ารายการสินค้าใน State
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ฟังก์ชันเพิ่มสินค้าใหม่
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const product = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        fetchProducts(); // รีโหลดรายการสินค้า
        alert("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (!isAdmin) {
    return null; // แสดงหน้าเปล่าระหว่างโหลด
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      {/* Section: Add New Product */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={addProduct}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            className="border px-4 py-2 rounded w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Section: Product List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={async () => {
                      await fetch(`/api/products/${product.id}`, { method: "DELETE" });
                      fetchProducts(); // รีโหลดรายการสินค้า
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
