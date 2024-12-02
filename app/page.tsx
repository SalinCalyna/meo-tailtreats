export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
     

        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-blue-600">
          Welcome to TailTreats
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Shop by Category: Quality food for your pets
        </p>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Cat Food */}
          <a
            href="/products/cat"
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:bg-yellow-100 transition"
          >
            <img
              src="/images/cat-food.jpg"
              alt="Cat Food"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-bold text-blue-600">Cat Food</h2>
            <p className="text-gray-600 mt-2">
              Premium meals for your feline friends.
            </p>
          </a>

          {/* Dog Food */}
          <a
            href="/products/dog"
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:bg-yellow-100 transition"
          >
            <img
              src="/images/dog-food.jpg"
              alt="Dog Food"
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-bold text-blue-600">Dog Food</h2>
            <p className="text-gray-600 mt-2">
              Healthy meals for your loyal companions.
            </p>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <p>&copy; 2024 TailTreats. All rights reserved.</p>
      </footer>
    </div>
  );
}
