import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import heroImage from "../assets/elv.jpg";
import products from "../data/productsData";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const F_DISPLAY = '"Clash Display", "Syne", system-ui, sans-serif';
const F_HEADING = '"Clash Display", "Syne", system-ui, sans-serif';
const F_LABEL   = '"Clash Display", "Syne", system-ui, sans-serif';
const F_BODY    = '"Syne", system-ui, sans-serif';

const C = {
  ink:    "#07101C",
  navy:   "#0D1B2A",
  navyLt: "#122234",
  cream:  "#F5F2EE",
  red:    "#C41E3A",
  redDk:  "#A01830",
  white:  "#FFFFFF",
};

// Each card gets one of these accent colors for the top bar
const ACCENTS = [
  "#C41E3A", // red
  "#1E5FAA", // blue
  "#B8770E", // gold
  "#1A7A4A", // green
  "#7B2FAE", // purple
  "#C4621E", // orange
  "#1E8FA0", // teal
  "#8A1E4A", // rose
];

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────
function MagneticButton({ children, href = "#" }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.22);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      <a href={href}>{children}</a>
    </motion.div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="w-8 h-px" style={{ background: light ? "rgba(255,255,255,0.28)" : C.red }} />
      <span className="text-[10px] font-bold tracking-[0.38em] uppercase"
        style={{ fontFamily: F_LABEL, color: light ? "rgba(255,255,255,0.40)" : C.red }}>
        {children}
      </span>
    </div>
  );
}

// ─── CINEMATIC CARD ───────────────────────────────────────────────────────────
function CinematicCard({ product, index }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const num    = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.09 + Math.floor(index / 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.id}`}>
        <div
          className="group relative flex flex-col overflow-hidden cursor-pointer"
          style={{
            background: C.navyLt,
            border: `1px solid rgba(255,255,255,0.06)`,
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent + "60";
            e.currentTarget.style.boxShadow   = `0 0 0 1px ${accent}30, 0 20px 60px rgba(0,0,0,0.5), 0 4px 20px ${accent}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.boxShadow   = "none";
          }}
        >
          {/* ── THICK TOP ACCENT BAR ── */}
          <div style={{ height: "5px", background: accent, flexShrink: 0 }} />

          {/* ── IMAGE AREA ── */}
          <div className="relative overflow-hidden" style={{ height: "170px" }}>
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "grayscale(12%) contrast(1.05) brightness(0.88)" }}
            />
            {/* Dark scrim so text on top is always readable */}
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${C.navyLt} 0%, ${C.navyLt}80 30%, transparent 70%)` }} />

            {/* Accent colour tint on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(135deg, ${accent}22 0%, transparent 55%)` }}
            />

            {/* Giant background number — always faintly visible, no guessing */}
            <div
              className="absolute -bottom-4 -right-3 font-black leading-none select-none pointer-events-none"
              style={{
                fontFamily: F_DISPLAY,
                fontSize: "7.5rem",
                color: "rgba(255,255,255,0.055)",
                lineHeight: 1,
              }}
            >
              {num}
            </div>
          </div>

          {/* ── CONTENT AREA ── */}
          <div className="flex flex-col flex-1 p-5 gap-3">

            {/* Number + accent dot row */}
            <div className="flex items-center gap-3">
              <span
                className="font-black text-[11px] tracking-[0.22em]"
                style={{ fontFamily: F_LABEL, color: accent }}
              >
                {num}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: accent }}
              />
              <div
                className="flex-1 h-px"
                style={{ background: `linear-gradient(to right, ${accent}50, transparent)` }}
              />
            </div>

            {/* Title — large, high contrast, always readable */}
            <h3
              className="font-black leading-tight"
              style={{
                fontFamily: F_HEADING,
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                color: C.white,
                letterSpacing: "-0.01em",
              }}
            >
              {product.title}
            </h3>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA row */}
            <div
              className="flex items-center justify-between pt-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <span
                className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.35)" }}
              >
                View Details
              </span>
              <div
                className="w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: accent + "22",
                  border: `1px solid ${accent}55`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = accent + "22"; }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function Products() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, 90]);

  const stats = [
    { value: "08", label: "Systems" },
    { value: "12+", label: "Projects" },
    { value: "45+", label: "Clients" },
  ];

  return (
    <div className="pt-20 overflow-hidden" style={{ background: C.ink, fontFamily: F_BODY }}>

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col overflow-hidden">

        <motion.div className="absolute inset-0" style={{ y: heroParallax }}>
          <img src={heroImage} alt="ELV" className="w-full h-full object-cover"
            style={{ opacity: 0.18, filter: "grayscale(10%) contrast(1.06)" }} />
        </motion.div>
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(110deg, ${C.ink} 0%, ${C.ink}D0 45%, ${C.ink}60 100%)` }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${C.ink} 0%, transparent 55%)` }} />

        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />

        {/* Vertical red accent */}
        <div className="absolute top-0 left-[9%] w-px h-full opacity-[0.10]"
          style={{ background: `linear-gradient(to bottom, transparent 5%, ${C.red} 40%, transparent 95%)` }} />

        {/* Soft red orb */}
        <motion.div className="absolute top-1/3 right-1/4 w-[42vw] h-[42vw] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.red}0D 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">

            {/* LEFT */}
            <motion.div className="lg:col-span-7 space-y-9"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>

              <SectionLabel light>Extra Low Voltage · ELV Systems</SectionLabel>

              <div>
                {[
                  { text: "Enterprise", color: C.white },
                  { text: "ELV", color: C.white },
                  { text: "Solutions.", color: C.red },
                ].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h1
                      className="block font-black leading-[0.9]"
                      style={{ fontFamily: F_DISPLAY, fontSize: "clamp(2.8rem, 6vw, 5.5rem)", color: line.color, letterSpacing: "-0.02em" }}
                      initial={{ y: 110, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.05, delay: 0.1 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}>
                      {line.text}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.p
                className="text-sm leading-[2.1] max-w-lg"
                style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.50)" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}>
                At Aioon Technologies, we provide end-to-end design, supply, and implementation of{" "}
                <span style={{ color: "#fca5a5" }}>ELV systems</span> that meet the diverse requirements of our clients. Our expertise spans both pre-sales consultation and post-sales support, ensuring smooth deployment and dependable service throughout the project lifecycle.
              </motion.p>

              {/* Stats */}
              <motion.div className="flex gap-12 pt-7 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}>
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="font-black text-white leading-none"
                      style={{ fontFamily: F_DISPLAY, fontSize: "2.5rem" }}>{s.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.28em] mt-2 font-semibold"
                      style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.30)" }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.94 }}>
                <MagneticButton href="#portfolio">
                  <span className="inline-flex items-center gap-3 text-white text-[11px] font-semibold px-8 py-4 tracking-[0.2em] uppercase transition-all duration-400"
                    style={{ fontFamily: F_LABEL, background: C.red }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = C.redDk; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = C.red; }}>
                    View Portfolio <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </MagneticButton>
                <MagneticButton href="#">
                  <span className="inline-flex items-center gap-3 text-[11px] font-semibold px-8 py-4 tracking-[0.2em] uppercase transition-all duration-400"
                    style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.50)", border: "1px solid rgba(255,255,255,0.16)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = C.white; e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.50)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; }}>
                    Contact Us
                  </span>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* RIGHT — accent bar preview panel */}
            <motion.div className="lg:col-span-5 hidden lg:flex flex-col gap-3"
              initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>

              {/* Mini product preview cards */}
              {products.slice(0, 4).map((p, i) => (
                <motion.div key={p.id}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${ACCENTS[i]}` }}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}>
                  <span className="font-black text-[11px]"
                    style={{ fontFamily: F_LABEL, color: ACCENTS[i], minWidth: "1.5rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-semibold text-white/75 truncate"
                    style={{ fontFamily: F_HEADING }}>
                    {p.title}
                  </span>
                </motion.div>
              ))}

              {/* More indicator */}
              <div className="flex items-center gap-3 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}>
                <span className="text-[11px] font-semibold"
                  style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.25)" }}>
                  + {products.length - 4} more systems below
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto" style={{ color: "rgba(255,255,255,0.20)" }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <motion.div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-white/20 text-[9px] uppercase tracking-[0.3em]"
            style={{ fontFamily: F_LABEL }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CINEMATIC GRID
      ══════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="relative py-28 md:py-36 overflow-hidden" style={{ background: C.navy }}>

        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "54px 54px",
          }} />

        {/* Coloured ambient glows matching accent colours */}
        <div className="absolute top-0 left-0 w-[35vw] h-[35vw] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${ACCENTS[0]}, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${ACCENTS[1]}, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionLabel light>Our Portfolio</SectionLabel>
              <h2 className="font-black leading-[1.0]"
                style={{ fontFamily: F_HEADING, fontSize: "clamp(2.8rem, 6vw, 5.5rem)", color: C.white }}>
                ELV Systems{" "}
                <span style={{ color: C.red }}>&amp; Solutions</span>
              </h2>
            </motion.div>
            <motion.p className="text-[12px] leading-[2] max-w-[240px] lg:text-right"
              style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.40)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              Comprehensive low voltage systems designed for modern infrastructure needs.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <CinematicCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between flex-wrap gap-6 pt-16 mt-8 border-t"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="text-[12px] tracking-[0.12em]"
              style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.28)" }}>
              End-to-end ELV design, supply and implementation
            </p>
            <MagneticButton href="#">
              <span className="inline-flex items-center gap-4 font-semibold text-[11px] uppercase tracking-[0.22em] px-8 py-4 transition-all duration-400"
                style={{ fontFamily: F_LABEL, color: C.white, border: "1px solid rgba(255,255,255,0.20)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.red; e.currentTarget.style.borderColor = C.red; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"; }}>
                Request a Consultation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
