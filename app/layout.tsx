import "./globals.css"; // นำเข้า CSS
import Navbar from "./Navbar"; // นำเข้า Navbar

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blue-50 min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto py-8">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center py-4">
          &copy; 2024 TailTreats. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
