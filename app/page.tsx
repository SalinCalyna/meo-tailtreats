export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}


      {/* Main Content */}
      <main className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          Welcome to TailTreats
        </h1>
        <p className="text-lg text-gray-700 mt-2 mb-8">
          Your trusted pet store for high-quality food and supplies.
        </p>

        {/* About Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-blue-600">About Us</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            TailTreats was founded in 2024 with a mission to provide the best
            quality food and supplies for your beloved pets. We believe that
            happy pets make happy owners, and we strive to ensure your furry
            friends are always healthy and satisfied. From premium cat food to
            nutritious meals for dogs, TailTreats offers products you can trust.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-yellow-100 shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-blue-600">Our Mission</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            At TailTreats, our mission is to promote the well-being of pets
            through premium quality products and exceptional customer service.
            Whether you're shopping for your loyal canine companion or your
            curious feline friend, we are here to meet all your pet's needs.
          </p>
        </section>
      </main>

    </div>
  );
}
