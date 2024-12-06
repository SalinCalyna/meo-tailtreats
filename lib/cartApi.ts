export const getCart = async () => {
    const response = await fetch('/api/cart');
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch cart');
    }
    return data.cart;
  };
  
  export const addToCart = async (productId: number, name: string, price: number, quantity: number) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId, name, price, quantity }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add product to cart');
    }
    return data.cart;
  };
  
  export const removeFromCart = async (productId: number) => {
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove product from cart');
    }
    return data.cart;
  };
  