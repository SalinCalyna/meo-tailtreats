"use client";
import { useState } from "react";

export default function CatProductsPage() {
  const catProducts = [
    { id: 1, name: "Premium Cat Food", description: "Healthy and nutritious cat food.", price: 12.99, imageUrl: "/images/cat1.jpg" },
    { id: 2, name: "Kitten Starter Food", description: "Perfect for growing kittens.", price: 15.99, imageUrl: "/images/cat2.jpg" },
    { id: 3, name: "Grain-Free Cat Food", description: "Delicious food for sensitive cats.", price: 18.99, imageUrl: "/images/cat3.jpg" },
    { id: 4, name: "Senior Cat Food", description: "Tailored nutrition for older cats.", price: 14.99, imageUrl: "/images/cat4.jpg" },
    { id: 5, name: "Organic Cat Food", description: "Natural ingredients for healthy cats.", price: 19.99, imageUrl: "/images/cat5.jpg" },
    { id: 6, name: "Wet Cat Food", description: "Tasty and moist meals for cats.", price: 11.99, imageUrl: "/images/cat6.jpg" },
    { id: 7, name: "Dry Cat Food", description: "Convenient and healthy option.", price: 13.99, imageUrl: "/images/cat7.jpg" },
    { id: 8, name: "High Protein Cat Food", description: "For active and energetic cats.", price: 17.99, imageUrl: "/images/cat8.jpg" },
    { id: 9, name: "Weight Control Cat Food", description: "Helps maintain a healthy weight.", price: 16.99, imageUrl: "/images/cat9.jpg" },
    { id: 10, name: "Dental Care Cat Food", description: "Supports dental health for cats.", price: 18.49, imageUrl: "/images/cat10.jpg" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = catProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Cat Food</h1>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
