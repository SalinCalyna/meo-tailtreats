export default function ToyPage() {
  const toys = [
    { id: 1, name: "Rubber Bone", description: "Fun toy for your dog.", price: 7.99, imageUrl: "/images/toy1.jpg" },
    { id: 2, name: "Cat Ball Toy", description: "Interactive toy for cats.", price: 4.99, imageUrl: "/images/toy2.jpg" },
    { id: 3, name: "Chew Rope", description: "Durable chew toy for dogs.", price: 6.99, imageUrl: "/images/toy3.jpg" },
    { id: 4, name: "Feather Wand", description: "Exciting wand toy for cats.", price: 5.49, imageUrl: "/images/toy4.jpg" },
    { id: 5, name: "Squeaky Duck", description: "Squeaky fun for dogs.", price: 8.99, imageUrl: "/images/toy5.jpg" },
    { id: 6, name: "Laser Pointer", description: "Endless entertainment for cats.", price: 3.99, imageUrl: "/images/toy6.jpg" },
    { id: 7, name: "Tennis Ball Set", description: "Perfect for fetch games.", price: 9.49, imageUrl: "/images/toy7.jpg" },
    { id: 8, name: "Catnip Mouse", description: "Irresistible for cats.", price: 4.49, imageUrl: "/images/toy8.jpg" },
    { id: 9, name: "Plush Dog Toy", description: "Soft and cuddly for dogs.", price: 7.49, imageUrl: "/images/toy9.jpg" },
    { id: 10, name: "Interactive Puzzle Toy", description: "Brain stimulation for pets.", price: 12.99, imageUrl: "/images/toy10.jpg" },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Toys</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {toys.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
