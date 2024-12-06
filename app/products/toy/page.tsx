'use client';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export default function CatProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]); // Cart state
  const [address, setAddress] = useState<Address>({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Simulate payment processing
  const [isCartVisible, setIsCartVisible] = useState(false); // State to toggle cart visibility

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

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleOrder = () => {
    if (!address.name || !address.street || !address.city || !address.state || !address.zip) {
      alert('Please provide a complete shipping address.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setOrderSuccess(true);
      setIsProcessing(false);
      setCart([]); // Clear cart after successful order
    }, 2000); // Simulate payment processing for 2 seconds
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Toy</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full md:w-3/3 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartVisible(!isCartVisible)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ease-in-out duration-300"
      >
        {isCartVisible ? 'Hide Cart' : 'View Cart'} ({cart.length} items)
      </button>

      {/* Cart Summary */}
      {isCartVisible && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 transition-all duration-300 ease-in-out transform">
          <h2 className="text-2xl font-semibold text-Red-600 mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.product.id} className="flex justify-between items-center border-b py-2">
                    <div className="flex items-center">
                      <img
                        src={item.product.imageUrl || '/default-image.png'}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-md mr-4"
                      />
                      <span className="text-lg">{item.product.name}</span>
                    </div>
                    <span className="font-semibold text-lg">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold text-xl mt-4">
                Total: ${getTotalPrice().toFixed(2)}
              </div>

              {/* Shipping Address Form */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Shipping Address</h3>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrder}
                disabled={isProcessing}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition duration-300"
              >
                {isProcessing ? 'Processing Payment...' : 'Order Now'}
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          {/* Order Success Message */}
          {orderSuccess && (
            <div className="mt-6 text-center">
              <p className="text-green-600 font-semibold text-lg">
                Your order was placed successfully! 🎉
              </p>
              <p className="text-gray-700 mt-4">
                <strong>Bank Account Details:</strong> 020-1238-9430, Krungthai Bank, Salitip
              </p>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && <p className="text-blue-600 text-center">Loading products...</p>}

      {/* Error State */}
      {error && <p className="text-red-600 text-center">Error: {error}</p>}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <img
                src={product.imageUrl || '/default-image.png'}
                alt={product.name || 'Default Image'}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name || 'Unknown Product'}</h2>
              <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>
              <p className="font-bold text-xl text-green-600 mb-4">${product.price?.toFixed(2) || '0.00'}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          !isLoading && !error && (
            <p className="text-gray-500 text-center col-span-3">No products found.</p>
          )
        )}
      </div>
    </div>
  );
}
