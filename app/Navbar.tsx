"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [isAdmin, setIsAdmin] = useState(false); // State for admin access
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#dropdownMenu")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleAdminAccess = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
    alert("You are now logged in as Admin!");
    router.push("/admin");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    alert("You have been logged out!");
    router.push("/");
  };

  const handleCustomerLogin = () => {
    setIsLoggedIn(true);
    alert("You are now logged in as a Customer!");
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

          {/* Dropdown Menu */}
          <div className="relative" id="dropdownMenu">
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
                <Link href="/products/cat" className="block px-4 py-2 hover:bg-blue-100">
                  Cat Food
                </Link>
                <Link href="/products/cat-titter" className="block px-4 py-2 hover:bg-blue-100">
                  Cat Titter
                </Link>
                <Link href="/products/dog" className="block px-4 py-2 hover:bg-blue-100">
                  Dog Food
                </Link>
                <Link href="/products/snack" className="block px-4 py-2 hover:bg-blue-100">
                  Snack
                </Link>
                <Link href="/products/toy" className="block px-4 py-2 hover:bg-blue-100">
                  Toy
                </Link>
              </div>
            )}
          </div>

          {/* Admin Access */}
          {isAdmin ? (
            <Link href="/admin/page" className="hover:text-yellow-300 text-lg transition">
              Admin
            </Link>
          ) : (
            <button
              onClick={handleAdminAccess}
              className="hover:text-yellow-300 text-lg transition"
            >
              Admin
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Cart Button */}
          {isLoggedIn && (
            <Link
              href="/cart"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 4.3c-.3 1.1.5 2.2 1.7 2.2H19m-5 0a2 2 0 11-4 0m10-2H7"
                />
              </svg>
              Cart
            </Link>
          )}

          {/* Login/Logout Section */}
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={handleCustomerLogin}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 transition"
                >
                  Login
                </button>
                <Link
                  href="/auth/register"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
