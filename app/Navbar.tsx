"use client";
import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-3xl font-bold hover:text-yellow-300">
          TailTreats
        </a>

        {/* Links */}
        <div className="space-x-8 flex items-center">
          <a href="/" className="hover:text-yellow-300 text-lg transition">
            Home
          </a>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-yellow-300 text-lg transition flex items-center"
            >
              Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white text-blue-600 shadow-md rounded w-40">
                <a
                  href="/products/cat"
                  className="block px-4 py-2 hover:bg-blue-100"
                >
                  Cat Food
                </a>
                <a
                  href="/products/dog"
                  className="block px-4 py-2 hover:bg-blue-100"
                >
                  Dog Food
                </a>
              </div>
            )}
          </div>
          

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
