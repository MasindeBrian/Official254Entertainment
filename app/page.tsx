export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button className="md:hidden text-2xl">
            ☰
          </button>

          <h1 className="text-lg md:text-3xl font-black tracking-tight">
            254{" "}
            <span className="bg-black text-white px-3 py-1 rounded-lg">
              ENTERTAINMENT
            </span>
          </h1>

          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/contact">Contact</a>
          </nav>

          <a
            href="/cart"
            className="text-2xl"
          >
            🛒
          </a>
        </div>
      </header>

      {/* Hero Only */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-20 grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">
        <div>
          <p className="tracking-[0.35em] text-xs text-gray-500 mb-4">
            BORN IN 254
          </p>

          <h2 className="text-5xl md:text-8xl font-black leading-[0.95]">
            Own The Street.
          </h2>

          <p className="mt-6 text-lg text-gray-500 max-w-md">
            Premium streetwear built from culture and confidence.
          </p>

          <div className="mt-8">
            <a
              href="/shop"
              className="px-7 py-3 rounded-full bg-black text-white font-semibold"
            >
              Shop Now
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border w-full max-w-sm">
            <img
              src="/logo.png"
              alt="254Entertainment"
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Mobile Bottom Nav */}
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

        <a href="/contact">
          📞
          <br />
          Contact
        </a>
      </nav>
    </main>
  );
}