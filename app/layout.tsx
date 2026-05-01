"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { CartProvider } from "./components/CartContext";
import AuthGate from "./authgate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    usePathname();

  const hideNav =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup";

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthGate>
            {children}
          </AuthGate>

          {!hideNav && (
            <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white border shadow-lg rounded-2xl grid grid-cols-4 py-3 text-center text-xs z-50">
              <a href="/home">
                🏠
                <br />
                Home
              </a>

              <a href="/shop">
                🛍️
                <br />
                Shop
              </a>

              <a href="/cart">
                🛒
                <br />
                Cart
              </a>

              <a href="/login">
                👤
                <br />
                Login
              </a>
            </nav>
          )}
        </CartProvider>
      </body>
    </html>
  );
}