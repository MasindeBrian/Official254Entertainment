export default function ContactPage() {
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

      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="tracking-[0.4em] text-sm text-gray-500 mb-4">
          CONTACT
        </p>

        <h1 className="text-5xl font-black mb-6">
          Let’s Talk.
        </h1>

        <p className="text-lg text-gray-500 mb-10">
          Questions, custom orders, wholesale,
          support or delivery inquiries.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="https://wa.me/254757900428"
            target="_blank"
            className="bg-white rounded-3xl p-8 shadow-sm border"
          >
            <h2 className="text-2xl font-bold mb-2">
              WhatsApp
            </h2>

            <p className="text-gray-500">
              Chat instantly with us
            </p>
          </a>

          <a
            href="mailto:brian.masinde2023@students.jkuat.ac.ke"
            className="bg-white rounded-3xl p-8 shadow-sm border"
          >
            <h2 className="text-2xl font-bold mb-2">
              Email
            </h2>

            <p className="text-gray-500">
              Send us a message
            </p>
          </a>

          <div className="bg-white rounded-3xl p-8 shadow-sm border">
            <h2 className="text-2xl font-bold mb-2">
              Delivery
            </h2>

            <p className="text-gray-500">
              Nairobi & countrywide available
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border">
            <h2 className="text-2xl font-bold mb-2">
              Hours
            </h2>

            <p className="text-gray-500">
              Mon - Sat / 9AM - 7PM
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}