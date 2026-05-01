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
            <a href="/home" className="hover:text-gray-500 transition">
              Home
            </a>

            <a href="/shop" className="hover:text-gray-500 transition">
              Shop
            </a>

            <a href="/contact" className="hover:text-gray-500 transition">
              Contact
            </a>
          </nav>

          <a
            href="/cart"
            className="text-2xl hover:scale-110 transition"
          >
            🛒
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-20 grid md:grid-cols-2 gap-8 items-center min-h-[85vh]">
        
        {/* Text Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300">
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
              className="px-7 py-3 rounded-full bg-black text-white font-semibold hover:scale-[1.03] transition-all"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Logo Card */}
        <div className="flex justify-center">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm w-full max-w-sm hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
            <img
              src="/logo.png"
              alt="254Entertainment"
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}