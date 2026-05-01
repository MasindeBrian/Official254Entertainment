export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white border rounded-3xl p-8 text-center shadow-sm">
        <p className="tracking-[0.35em] text-xs text-gray-400 mb-4">
          BORN IN 254
        </p>

        <h1 className="text-5xl font-black mb-4">
          254 ENTERTAINMENT
        </h1>

        <p className="text-gray-500 mb-8">
          Premium streetwear built from culture and confidence.
        </p>

        <div className="grid gap-4">
          <a
            href="/login"
            className="bg-black text-white py-4 rounded-full font-semibold"
          >
            Login
          </a>

          <a
            href="/signup"
            className="border py-4 rounded-full font-semibold"
          >
            Create Account
          </a>
        </div>
      </div>
    </main>
  );
}