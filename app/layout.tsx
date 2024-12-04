import "./globals.css";
import Navbar from "./Navbar";
import { CartProvider } from "../lib/cartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>TailTreats</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <CartProvider>
          {/* Navbar อยู่บนสุด */}
          <Navbar />
          {/* เนื้อหาของแต่ละหน้า */}
          <main className="container mx-auto px-4 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
