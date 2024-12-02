"use client";
import { useState } from "react";

export default function SnackPage() {
  const snacks = [
    { id: 1, name: "Dog Treats", description: "Delicious treats for your pets.", price: 6.99, imageUrl: "/images/snack1.jpg" },
    { id: 2, name: "Cat Treats", description: "Yummy snacks for your feline.", price: 5.99, imageUrl: "/images/snack2.jpg" },
    { id: 3, name: "Organic Snacks", description: "Healthy and organic snacks for pets.", price: 8.99, imageUrl: "/images/snack3.jpg" },
    { id: 4, name: "Puppy Bites", description: "Perfect for growing puppies.", price: 7.99, imageUrl: "/images/snack4.jpg" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSnacks = snacks.filter((snack) =>
    snack.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">Snacks</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Treat your furry friends with our delicious and healthy snacks!
      </p>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for snacks..."
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredSnacks.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-blue-600 font-bold mt-4">${product.price.toFixed(2)}</p>

              {/* Add to Cart Button */}
              <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Found */}
      {filteredSnacks.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">No snacks found.</p>
      )}
    </div>
  );
}
