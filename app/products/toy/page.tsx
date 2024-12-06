'use client';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null; // รองรับกรณีที่ `imageUrl` อาจเป็น `null`
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CatProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]); // จัดการตะกร้าสินค้า
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        // หากสินค้าซ้ำ ให้เพิ่มจำนวน
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // หากยังไม่มีสินค้าในตะกร้า ให้เพิ่มใหม่
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Toy</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full md:w-3/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <p className="text-blue-600 text-center">Loading products...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-600 text-center">Error: {error}</p>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={product.imageUrl || "/default-image.png"} // ใช้ภาพดีฟอลต์หากไม่มี imageUrl
                alt={product.name || "Default Image"}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">
                {product.name || "Unknown Product"}
              </h2>
              <p className="text-gray-600 mb-4">
                {product.description || "No description available."}
              </p>
              <p className="font-bold text-xl text-green-600 mb-4">
                ${product.price?.toFixed(2) || "0.00"}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          !isLoading && !error && (
            <p className="text-gray-500 text-center col-span-3">
              No products found.
            </p>
          )
        )}
      </div>

      {/* Cart Summary */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.product.id} className="mb-4">
                <span className="font-semibold">{item.product.name}</span> -{' '}
                <span>{item.quantity}x</span> -{' '}
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
