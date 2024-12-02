"use client";
import { useState } from "react";

export default function DogProductsPage() {
  const dogProducts = [
    { id: 1, name: "Premium Dog Food", description: "Delicious food for dogs.", price: 14.99, imageUrl: "/images/dog1.jpg" },
    { id: 2, name: "Grain-Free Dog Food", description: "Perfect for dogs with sensitivities.", price: 19.99, imageUrl: "/images/dog2.jpg" },
    { id: 3, name: "Puppy Starter Food", description: "Nutritious food for growing puppies.", price: 22.99, imageUrl: "/images/dog3.jpg" },
    { id: 4, name: "Senior Dog Food", description: "Special formula for senior dogs.", price: 17.99, imageUrl: "/images/dog4.jpg" },
    { id: 5, name: "Organic Dog Food", description: "Healthy and natural ingredients.", price: 21.99, imageUrl: "/images/dog5.jpg" },
    { id: 6, name: "High Protein Dog Food", description: "For active and energetic dogs.", price: 18.99, imageUrl: "/images/dog6.jpg" },
    { id: 7, name: "Wet Dog Food", description: "Tasty wet food for your dog.", price: 16.99, imageUrl: "/images/dog7.jpg" },
    { id: 8, name: "Dry Dog Food", description: "Convenient and healthy option.", price: 20.99, imageUrl: "/images/dog8.jpg" },
    { id: 9, name: "Dental Chew Dog Food", description: "Helps keep teeth clean and healthy.", price: 13.99, imageUrl: "/images/dog9.jpg" },
    { id: 10, name: "Weight Control Dog Food", description: "For maintaining a healthy weight.", price: 15.99, imageUrl: "/images/dog10.jpg" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = dogProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dog Food</h1>

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
