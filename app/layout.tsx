"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { CartProvider } from "./components/CartContext";
import AuthGate from "./authgate";
import { supabase } from "@/lib/supabase";

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
 pathname === "/signup" ||
 pathname === "/admin" ||
 pathname === "/dashboard" ||
 pathname === "/admin-orders";

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthGate>
            {children}
          </AuthGate>

          {!hideNav && (
            <nav className="bottom-nav md:hidden fixed bottom-4 left-4 right-4 rounded-2xl grid grid-cols-4 py-3 text-center text-xs z-50">
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

              {pathname === "/home" ? (
                <a href="/contact">
                  Contact
                </a>
              ) : (
              <a href="/cart">
                🛒
                <br />
                Cart
              </a>
              )}

              <button
                type="button"
                onClick={logout}
                className="text-center"
              >
                👤
                <br />
                Logout
              </button>
            </nav>
          )}
        </CartProvider>
      </body>
    </html>
  );
}
