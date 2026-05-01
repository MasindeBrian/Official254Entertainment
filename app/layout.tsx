import "./globals.css";
import { CartProvider } from "./components/CartContext";

export const metadata = {
  title: "254Entertainment",
  description: "Streetwear born in 254",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}

          {/* Global Mobile Bottom Nav */}
          <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white border shadow-lg rounded-2xl grid grid-cols-4 py-3 text-center text-xs z-50">
            <a href="/">
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
        </CartProvider>
      </body>
    </html>
  );
}