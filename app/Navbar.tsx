"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [isAdmin, setIsAdmin] = useState(false); // State for admin access
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Modal state
  const [password, setPassword] = useState(""); // Password input state
  const [username, setUsername] = useState(""); // State to store username
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if there's a valid token
    const adminStatus = localStorage.getItem("isAdmin");
    const storedUsername = localStorage.getItem("username"); // Get username from localStorage

    if (token) {
      setIsLoggedIn(true); // Set login status based on token
    }
    
    if (adminStatus === "true") {
      setIsAdmin(true); // Set admin status from localStorage
    }

    if (storedUsername) {
      setUsername(storedUsername); // Set username state
    }
  }, []);

  // Close dropdown when clicking outside
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

  // Handle Admin Access
  const handleAdminAccess = () => {
    setIsPasswordModalOpen(true); // เปิด modal ให้กรอกรหัส
  };

  // Validate Password and login as Admin
  const handlePasswordSubmit = () => {
    if (password === "Admin123") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true"); // บันทึกสถานะ Admin
      alert("You are now logged in as Admin!");
      router.push("/admin"); // เปลี่ยนเส้นทางไปที่หน้า Admin
      setIsPasswordModalOpen(false); // ปิด modal
    } else {
      alert("Incorrect password!");
    }
  };

  // Handle Login and redirect to Home page after successful login
  const handleLogin = () => {
    const user = "exampleUser"; // Example username
    setIsLoggedIn(true);
    setUsername(user); // Set username when login
    localStorage.setItem("token", "user-auth-token"); // Save token to localStorage
    localStorage.setItem("username", user); // Save username to localStorage
    router.push("/home"); // Go to home page after login
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername(""); // Clear username
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("isAdmin"); // Remove admin status
    localStorage.removeItem("username"); // Remove username
    alert("You have been logged out!");
    router.push("/"); // Redirect to home page
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

        {/* Cart and Login/Logout */}
        <div className="space-x-4 flex items-center">
          {/* Show username when logged in */}
          {isLoggedIn && (
            <span className="text-white text-lg">{`Welcome, ${username}`}</span>
          )}

          {/* Remove Cart when logged in */}
          {!isLoggedIn && (
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

          {/* Customer Login */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 transition"
              >
                Login
              </Link>
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

      {/* Admin Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Admin Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-4 py-2 w-full mb-4 rounded"
              placeholder="Password"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
