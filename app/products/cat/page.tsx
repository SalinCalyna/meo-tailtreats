"use client";

import { useState } from "react";

export default function CatProductsPage() {
  const catProducts = [
    { id: 1, name: "Premium Cat Food", description: "Healthy and nutritious cat food.", price: 12.99, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3J4N82h4vq59GaKf5U_BqzG-zsULG0a40Aw&s" },
    { id: 2, name: "Grain-Free Cat Food", description: "Perfect for cats with sensitivities.", price: 14.99, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz0w2wrB9mYzGn4CXZdpkLKNME8Isdrp4VYg&s" },
    { id: 3, name: "Kitten Starter Food", description: "Nutritious food for growing kittens.", price: 15.99, imageUrl: "https://www.purina.co.th/sites/default/files/2021-12/01%20Kitten%20Starter%201.5kg-1.jpg" },
    { id: 4, name: "Senior Cat Food", description: "Special formula for senior cats.", price: 13.99, imageUrl: " https://m.media-amazon.com/images/I/711QdNoQUGL._AC_UF1000,1000_QL80_.jpg" },
    { id: 5, name: "Organic Cat Food", description: "Healthy and natural ingredients.", price: 17.99, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAUUWVOgvVzHvN2TcP_oKJxPIZEZo3yP4JA&s" },
    { id: 6, name: "High Protein Cat Food", description: "For active and energetic cats.", price: 16.99, imageUrl: "https://www.whiskas.ca/cdn-cgi/image/width=600,height=600,f=auto,quality=90/sites/g/files/fnmzdf4896/files/migrate-product-files/images/awfpaihvw2cg4llqqgjg.png" },
    { id: 7, name: "Wet Cat Food", description: "Tasty wet food for your cat.", price: 10.99, imageUrl: "https://tailybuddy.com/products/4678/whiskas-adult-mack.jpg" },
    { id: 8, name: "Dry Cat Food", description: "Convenient and healthy option.", price: 11.99, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSiAnEImKYSmqZDY3-BO8sUpmRLrCVZOTBRw&s" },
    { id: 9, name: "Dental Chew Cat Food", description: "Helps keep teeth clean and healthy.", price: 9.99, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQigLBVpzTk6rgK8djDyZtYMaJKEs1T9mi7oA&s" },
    { id: 10, name: "Weight Control Cat Food", description: "For maintaining a healthy weight.", price: 12.99, imageUrl: "https://cdn.royalcanin-weshare-online.io/fOd3TYcBaPOZra8qUPya/v40/00030111442703f-cf-gs1" },
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
