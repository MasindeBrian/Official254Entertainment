export default function LandingPage() {
  return (
    <main className="premium-page min-h-screen flex items-center justify-center overflow-hidden px-5 py-10">
      <section className="flex min-h-[86vh] w-full max-w-5xl flex-col items-center justify-center gap-6">
        <img
          src="/logo.png"
          alt="254 Entertainment"
          className="w-[min(76vw,28rem)] rounded-[2.5rem] shadow-[0_34px_100px_rgba(20,17,15,0.16)]"
        />

        <div className="grid w-[min(88vw,24rem)] gap-3 rounded-[1.75rem] border border-white/70 bg-white/34 p-4 shadow-[0_24px_70px_rgba(20,17,15,0.14)] backdrop-blur-2xl">
          <a
            href="/login"
            className="premium-btn rounded-full py-4 text-center font-semibold"
          >
            Login
          </a>

          <a
            href="/signup"
            className="rounded-full border border-white/70 bg-white/54 py-4 text-center font-semibold text-[#14110f] shadow-inner shadow-white/60 hover:-translate-y-0.5 hover:bg-white/72"
          >
            Create Account
          </a>
        </div>
      </section>
    </main>
  );
}
