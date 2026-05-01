export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-5 py-10">
      <div className="max-w-md w-full bg-white rounded-[2rem] p-8 text-center shadow-sm">
        <p className="tracking-[0.35em] text-[11px] text-gray-400 mb-4">
          BORN IN 254
        </p>

        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 break-words">
          254 <br />
          ENTERTAINMENT
        </h1>

        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
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
            className="bg-[#f3f3f3] py-4 rounded-full font-semibold"
          >
            Create Account
          </a>
        </div>
      </div>
    </main>
  );
}