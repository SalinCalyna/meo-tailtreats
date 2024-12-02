"use client";
import { useState } from "react";

export default function CatTitterPage() {
  const catTitterProducts = [
    { id: 1, name: "Cat Titter Classic", description: "Essential for your cat's comfort.", price: 9.99, imageUrl: "/images/titter1.jpg" },
    { id: 2, name: "Premium Cat Titter", description: "Odor-free and easy to clean.", price: 14.99, imageUrl: "/images/titter2.jpg" },
    { id: 3, name: "Advanced Cat Titter", description: "Long-lasting and eco-friendly.", price: 12.99, imageUrl: "/images/titter3.jpg" },
    { id: 4, name: "Budget Cat Titter", description: "Affordable and reliable.", price: 7.99, imageUrl: "/images/titter4.jpg" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = catTitterProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Cat Titter</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
            <button className="bg-blue-600 text-white w-full py-2 rounded mt-4 hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* No Results Found */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-500 mt-4">No products found.</p>
      )}
    </div>
  );
}
