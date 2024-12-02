export default function Navbar() {
    return (
      <nav className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-3xl font-bold hover:text-yellow-300">
            TailTreats
          </a>
  
          {/* Links */}
          <div className="space-x-8">
            <a
              href="/"
              className="hover:text-yellow-300 text-lg transition"
            >
              Home
            </a>
            <a
              href="/products/cat"
              className="hover:text-yellow-300 text-lg transition"
            >
              Cat Food
            </a>
            <a
              href="/products/dog"
              className="hover:text-yellow-300 text-lg transition"
            >
              Dog Food
            </a>
            <a
              href="/admin"
              className="hover:text-yellow-300 text-lg transition"
            >
              Admin
            </a>
          </div>
  
          {/* Login/Logout */}
          <div>
            <a
              href="/auth/login"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 transition"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    );
  }
  