export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Welcome to TailTreats
      </h1>
      <p className="text-center text-gray-600 mt-4">
        Shop by Category: Quality food for your pets
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Cat Food */}
        <a
          href="/products/cat"
          className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition"
        >
          <img
            src="/images/cat-food.jpg"
            alt="Cat Food"
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h2 className="text-2xl font-bold text-blue-600">Cat Food</h2>
          <p className="text-gray-500">Premium meals for your feline friends</p>
        </a>

        {/* Dog Food */}
        <a
          href="/products/dog"
          className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition"
        >
          <img
            src="/images/dog-food.jpg"
            alt="Dog Food"
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h2 className="text-2xl font-bold text-blue-600">Dog Food</h2>
          <p className="text-gray-500">Healthy meals for your loyal companions</p>
        </a>
      </div>
    </div>
  );
}
