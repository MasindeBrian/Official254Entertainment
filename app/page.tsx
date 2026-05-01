export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-2xl font-black">
            254Entertainment
          </h1>

          <nav className="flex gap-6 text-sm font-medium">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/contact">Contact</a>
            <a href="/cart">Cart</a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="tracking-[0.4em] text-sm text-gray-500 mb-4">
            BORN IN 254
          </p>

          <h2 className="text-5xl md:text-8xl font-black leading-none">
            Own The Street.
          </h2>

          <p className="mt-6 text-lg text-gray-500">
            Premium streetwear built from culture.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/shop"
              className="px-6 py-3 bg-black text-white rounded-full"
            >
              Shop Now
            </a>

            <a
              href="/contact"
              className="px-6 py-3 border rounded-full"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="254Entertainment"
            className="max-w-sm w-full bg-white p-6 rounded-3xl shadow-xl"
          />
        </div>
      </section>
    </main>
  );
}