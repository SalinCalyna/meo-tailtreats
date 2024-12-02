export default function DogProductsPage() {
    const dogProducts = [
      { id: 1, name: "Dog Food 1", description: "Delicious food for dogs.", price: 14.99, imageUrl: "/images/dog1.jpg" },
      { id: 2, name: "Dog Food 2", description: "Nutritious food for puppies.", price: 19.99, imageUrl: "/images/dog2.jpg" },
      { id: 3, name: "Dog Food 3", description: "Grain-free food for dogs.", price: 22.99, imageUrl: "/images/dog3.jpg" },
      // เพิ่มสินค้าตามต้องการจนถึง 10 รายการ
    ];
  
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Dog Food</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
              <h2 className="text-xl font-bold mt-4">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>
              <button className="bg-blue-600 text-white w-full py-2 rounded mt-4 hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  