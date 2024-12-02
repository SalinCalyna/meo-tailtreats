import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="bg-blue-600 text-white py-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">TailTreats</h1>
            <a href="/auth/login" className="text-lg hover:text-yellow-300">
              Login
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8">{children}</main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center py-4 mt-8">
          &copy; 2024 TailTreats. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
