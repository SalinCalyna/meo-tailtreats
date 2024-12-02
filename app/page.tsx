import React from "react";

export default function HomePage() {
  const snowflakes = Array.from({ length: 60 });

  return (
    <div className="min-h-screen bg-blue-50 relative overflow-hidden">
      {/* Snowflakes */}
      {snowflakes.map((_, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 0.5 + 0.5}em`,
          }}
        >
          ❄
        </div>
      ))}
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          Welcome to TailTreats
        </h1>
        <p className="text-lg text-gray-700 mt-2 mb-8">
          Your trusted pet store for high-quality food and supplies.
        </p>

        {/* Video Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <iframe
              className="w-full h-64 md:h-96"
              src="https://www.youtube.com/embed/K-Vd_TV6AzU?si=R_fZVazHpg5XOzCA"
              title="TailTreats Introduction Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-gray-600 mt-4">
            Discover more about TailTreats and why we're the best choice for your furry friends!
          </p>

          {/* Cat Food Brands Section */}
          <div className="mt-12">
          <h3 className="text-2xl font-bold text-blue-600 mb-6">Food Brands</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Images of Cat Food Brands */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEK3z-Tu_vvss8XYntFZ7rPBt_89eNj4TEvPYbgx0oeehlwtN26-d6nxJhI-0mOQE4CDE&usqp=CAU " // URL รูปแบรนด์ที่ 1
                alt="Brand 1"
                className="sm:grid-cols-4  object-cover rounded shadow-md mx-auto"
              />
              <img
                src="  https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/271134315_100391175871353_3332976770807284276_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=BncZAosKlqMQ7kNvgEnDsYA&_nc_zt=23&_nc_ht=scontent.fbkk13-2.fna&_nc_gid=AzRLrpoI61j0H5sRePBR-PX&oh=00_AYDZIrJVghW7tdOzSJeoEdvDeKtq5fuwKlgHKLhVqjW0ow&oe=6753EE88 " // URL รูปแบรนด์ที่ 2
                alt="Brand 2"
                className="sm:grid-cols-4 object-cover rounded shadow-md mx-auto"
              />
              <img
                src="https://inwfile.com/s-f/r65qpt.jpg" // URL รูปแบรนด์ที่ 3
                alt="Brand 3"
                className="sm:grid-cols-4  object-cover rounded shadow-md mx-auto"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSfaSab3Bs4Lb1QizZqvtewkMXKA4uJQ9pLGki0Iz62dETOApTnZMVhFIyZ1LQ3o41nsE&usqp=CAU" // URL รูปแบรนด์ที่ 4
                alt="Brand 4"
                className="sm:grid-cols-4 object-cover rounded shadow-md mx-auto"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOcgXyQjTxQ77LLBk4kKxX_SJ8AzMDERlvw&s" // URL รูปแบรนด์ที่ 4
                alt="Brand 5"
                className="sm:grid-cols-4 object-cover rounded shadow-md mx-auto"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC6c5_xGNwbg7QS5LptvxOS4k3H5exm64psdg84Bl_uibuE32XkNIObJM9hkAMRYob1MY&usqp=CAU " // URL รูปแบรนด์ที่ 4
                alt="Brand 6"
                className="sm:grid-cols-4  object-cover rounded shadow-md mx-auto"
              />
              <img
                src="data:image/png;base64,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 " // URL รูปแบรนด์ที่ 4
                alt="Brand 7"
                className="sm:grid-cols-4  object-cover rounded shadow-md mx-auto"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdd9xvBx1j7mGHgrlZ6X8bWhytq6uTuyTQYg&s " // URL รูปแบรนด์ที่ 4
                alt="Brand 8"
                className="sm:grid-cols-4 object-cover rounded shadow-md mx-auto"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white shadow-md rounded-lg p-6 mb-8">
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
        <section id="mission" className="bg-yellow-100 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Our Mission</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            At TailTreats, our mission is to promote the well-being of pets
            through premium quality products and exceptional customer service.
            Whether you're shopping for your loyal canine companion or your
            curious feline friend, we are here to meet all your pet's needs.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-blue-100 shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We'd love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us through the following channels.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <p className="text-gray-700">
              <strong>Email:</strong> support@tailtreats.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Pet Lane, Pet City, PC 12345
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
