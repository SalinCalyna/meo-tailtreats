"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // Remove token on logout
    alert("You have been logged out!");
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold hover:text-yellow-300">
          TailTreats
        </Link>

        {/* Links */}
        <div className="space-x-8 flex items-center">
          <Link href="/" className="hover:text-yellow-300 text-lg transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-yellow-300 text-lg transition">
            Products
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
