"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ฟังก์ชันตรวจสอบ URL
const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]); // รายการสินค้า
  const [editingProduct, setEditingProduct] = useState<any>(null); // สินค้าที่กำลังแก้ไข
  const [modalOpen, setModalOpen] = useState(false); // เปิด/ปิด Modal
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdmin") === "true";
    if (!isAdminLoggedIn) {
      alert("Access denied! Please log in as Admin.");
      router.push("/"); // เมื่อไม่ได้ login ให้ไปหน้า home
    } else {
      setIsAdmin(true);
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const product = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: Number(formData.get("price")),
      imageUrl: formData.get("imageUrl") as string,
      description: formData.get("description") as string,
    };

    if (!product.imageUrl || !isValidURL(product.imageUrl)) {
      alert("Invalid Image URL. Please provide a valid URL.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        fetchProducts();
        alert("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchProducts();
          alert("Product deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const updateProduct = async (id: number, updatedProduct: any) => {
    try {
      const res = await fetch(`/api/products`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedProduct }),
      });
      if (res.ok) {
        fetchProducts();
        alert("Product updated successfully!");
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedProduct = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: Number(formData.get("price")),
      imageUrl: formData.get("imageUrl") as string,
      description: formData.get("description") as string,
    };

    if (!updatedProduct.imageUrl || !isValidURL(updatedProduct.imageUrl)) {
      alert("Invalid Image URL. Please provide a valid URL.");
      return;
    }

    await updateProduct(editingProduct.id, updatedProduct);
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-600 font-bold text-center">
          Access denied! Redirecting to the homepage...
        </p>
      </div>
    );
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
                <td className="border px-4 py-2 flex space-x-2">
                  {/* ปุ่ม Edit */}
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                    onClick={() => {
                      setEditingProduct(product);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  {/* ปุ่ม Delete */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="name"
                defaultValue={editingProduct.name}
                placeholder="Product Name"
                className="border px-4 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="text"
                name="category"
                defaultValue={editingProduct.category}
                placeholder="Category"
                className="border px-4 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={editingProduct.price}
                placeholder="Price"
                className="border px-4 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="text"
                name="imageUrl"
                defaultValue={editingProduct.imageUrl}
                placeholder="Image URL"
                className="border px-4 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <textarea
                name="description"
                defaultValue={editingProduct.description}
                placeholder="Description"
                className="border px-4 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={4}
                required
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
