"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบสถานะ Admin (สมมติใช้ Local Storage)
    const isAdminLoggedIn = localStorage.getItem("isAdmin") === "true";
    if (!isAdminLoggedIn) {
      alert("Access denied! Please log in as Admin.");
      router.push("/"); // กลับไปหน้าหลัก
    } else {
      setIsAdmin(true);
    }
  }, []);

  if (!isAdmin) {
    return null; // แสดงหน้าเปล่าระหว่างโหลด
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      {/* Section: Add New Product */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Category"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="number"
              placeholder="Price"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <textarea
            placeholder="Description"
            className="border px-4 py-2 rounded w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={4}
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
            <tr>
              <td className="border px-4 py-2">Example Product</td>
              <td className="border px-4 py-2">Example Category</td>
              <td className="border px-4 py-2">$10.99</td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </td>
            </tr>
            {/* Add more rows dynamically */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
