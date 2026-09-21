"use client";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>
      {/* ── Background Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/10685-226624850.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "rgba(0,0,0,0.58)",
        }}
      />

      {/* ── Cinematic vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ── Centered Slogan ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{ zIndex: 3 }}
      >
        <p
          className="text-white/70 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-4"
        >
          Karachi&apos;s Finest
        </p>
        <h1
          className="font-heading text-white font-bold leading-tight"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
        >
          Fresh Meat, Pure Trust,{" "}
          <span style={{ color: "#ED1C24" }}>Delivered Daily.</span>
        </h1>
      </div>

      {/* ── Red accent bar at bottom ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 bg-brand-red"
        style={{ zIndex: 4 }}
      />

      {/* ── Social rail — desktop only ── */}
      <div
        className="hidden lg:flex flex-col items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2"
        style={{ zIndex: 4 }}
      >
        <a
          href="https://www.facebook.com/p/Gosht-Ghar-61577805696063/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-white/25 bg-white/10 hover:bg-brand-red hover:border-brand-red backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold transition-all duration-300"
          aria-label="Facebook"
        >
          f
        </a>
        <a
          href="https://www.instagram.com/gosht_ghar"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-white/25 bg-white/10 hover:bg-brand-red hover:border-brand-red backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold transition-all duration-300"
          aria-label="Instagram"
        >
          in
        </a>
        <div
          className="text-white/40 text-[10px] tracking-widest uppercase mt-1"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Follow us
        </div>
      </div>


    </section>
  );
}
