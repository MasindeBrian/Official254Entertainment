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
  const whatsappLink =
    "https://wa.me/254757900428?text=Hello%20I%20need%20help%20with%20an%20order";

  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}

          {/* Floating WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-5 py-4 rounded-full shadow-xl font-semibold hover:scale-105 transition"
          >
            WhatsApp
          </a>
        </CartProvider>
      </body>
    </html>
  );
}