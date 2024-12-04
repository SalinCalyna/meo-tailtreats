"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]); // รายการสินค้า
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "", // เพิ่มฟิลด์สำหรับรูปภาพ
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // ดึงข้อมูลสินค้าจาก API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/pages/api/products");
    const data = await response.json();
    setProducts(data);
  };

  // เพิ่ม/แก้ไขสินค้า
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingProductId ? "PUT" : "POST";
    const endpoint = editingProductId
      ? `/api/products/${editingProductId}`
      : "/api/products";

    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", description: "", price: "", category: "", imageUrl: "" });
    setEditingProductId(null);
    fetchProducts();
  };

  // โหลดข้อมูลสินค้าในฟอร์ม
  const handleEdit = (product) => {
    setForm(product);
    setEditingProductId(product.id);
  };

  // ลบสินค้า
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      {/* ฟอร์มเพิ่ม/แก้ไขสินค้า */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-400 transition"
        >
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* ตารางแสดงสินค้า */}
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Product List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
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
