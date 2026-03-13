import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle, Shield, Wifi, Zap, Clock, ArrowRight,
  Download, Phone, Mail, MapPin, ChevronRight, ArrowUpRight
} from "lucide-react";
import products from "../data/productsData";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
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

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="w-8 h-px flex-shrink-0"
        style={{ background: light ? "rgba(255,255,255,0.28)" : C.red }} />
      <span className="text-[10px] font-bold tracking-[0.38em] uppercase"
        style={{ fontFamily: F_LABEL, color: light ? "rgba(255,255,255,0.40)" : C.red }}>
        {children}
      </span>
    </div>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, 80]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: C.navy }}>
      <h1 className="text-2xl font-bold text-white"
        style={{ fontFamily: F_HEADING }}>Product Not Found</h1>
    </div>
  );

  // ── DATA (unchanged) ──────────────────────────────────────────────────────
  const features = [
    "24/7 Technical Support",
    "5 Year Warranty",
    "On-site Installation",
    "Free Consultation",
    "Scalable Architecture",
    "Future-ready Technology",
  ];

  const specifications = [
    { label: "Bandwidth",     value: "10 Gbps"  },
    { label: "Compliance",    value: "ISO 27001" },
    { label: "Warranty",      value: "5 Years"   },
    { label: "Support",       value: "24/7"      },
    { label: "Certification", value: "CE, RoHS"  },
    { label: "Integration",   value: "API Ready" },
  ];

  const benefits = [
    { icon: <Zap    className="w-5 h-5" />, title: "High Performance",     description: "Optimized for maximum efficiency and speed"         },
    { icon: <Shield className="w-5 h-5" />, title: "Enterprise Security",  description: "Bank-level encryption and security protocols"       },
    { icon: <Clock  className="w-5 h-5" />, title: "24/7 Monitoring",      description: "Round-the-clock system monitoring and alerts"       },
    { icon: <Wifi   className="w-5 h-5" />, title: "Seamless Integration", description: "Works with your existing infrastructure"            },
  ];

  return (
    <div className="pt-20 overflow-hidden" style={{ background: C.ink, fontFamily: F_BODY }}>

      {/* ── GRAIN OVERLAY ─────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 · HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col overflow-hidden">

        {/* Parallax image */}
        <motion.div className="absolute inset-0" style={{ y: heroParallax }}>
          <img src={product.image} alt={product.title}
            loading="lazy" decoding="async"
            className="w-full h-full object-cover"
            style={{ opacity: 0.28, filter: "grayscale(10%) contrast(1.06)" }} />
        </motion.div>

        {/* Gradient layers */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(105deg, ${C.ink} 0%, ${C.ink}E0 40%, ${C.ink}60 100%)` }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${C.ink} 0%, transparent 50%)` }} />

        {/* Fine dot grid */}
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />

        {/* Vertical red accent line */}
        <div className="absolute top-0 left-[9%] w-px h-full opacity-[0.10]"
          style={{ background: `linear-gradient(to bottom, transparent 5%, ${C.red} 40%, transparent 95%)` }} />

        {/* Ambient red orb */}
        <motion.div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.red}0D 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">
          <div className="lg:max-w-[62%] space-y-7">

            {/* Breadcrumb */}
            <motion.div className="flex items-center gap-2"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.28)" }}>ELV Systems</span>
              <ChevronRight className="w-3 h-3" style={{ color: "rgba(255,255,255,0.20)" }} />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                style={{ fontFamily: F_LABEL, color: C.red }}>
                {product.category || "Networking"}
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden">
              <motion.h1 className="block font-black leading-[0.95]"
  style={{
    fontFamily: F_DISPLAY,
    fontSize: "clamp(2rem, 5vw, 4rem)",
    color: C.white,
    letterSpacing: "-0.02em"
  }}
>
  {product.title}
</motion.h1>
            </div>

            {/* Hero description */}
            <motion.p className="text-sm leading-[2.1] max-w-xl"
              style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.55)" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              {product.heroText}
            </motion.p>

            {/* CTA — same href + buttonText */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.56 }}>
              <a href="https://wa.me/966535141447" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white font-semibold text-[11px] px-8 py-4 tracking-[0.2em] uppercase transition-all duration-400"
                style={{ fontFamily: F_LABEL, background: C.red }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.redDk; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.red; }}>
                <FaWhatsapp className="w-4 h-4" />
                {product.buttonText}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll pulse */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <motion.div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-white/20 text-[9px] uppercase tracking-[0.3em]"
            style={{ fontFamily: F_LABEL }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 · ABOUT SERVICE  (navy bg)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: C.navy }}>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "54px 54px",
          }} />
        <div className="absolute left-[11%] top-0 w-px h-full opacity-[0.07]"
          style={{ background: `linear-gradient(to bottom, transparent, ${C.red} 45%, transparent)` }} />
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-[0.055]"
          style={{ background: `radial-gradient(circle, ${C.red}, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">

            {/* Left — image with floating quick-specs badge */}
            <motion.div className="relative"
              initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>

              {/* Corner frames */}
              <div className="absolute -top-4 -left-4 w-14 h-14 border-t border-l z-20 pointer-events-none"
                style={{ borderColor: `${C.red}70` }} />
              <div className="absolute -bottom-4 -right-4 w-14 h-14 border-b border-r z-20 pointer-events-none"
                style={{ borderColor: `${C.red}70` }} />

              <div className="relative overflow-hidden shadow-2xl" style={{ height: "480px" }}>
                <img src={product.image} alt={product.title}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(12%) contrast(1.05)" }} />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${C.navy}CC 0%, transparent 55%)` }} />
                {/* Red top bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: C.red }} />
              </div>

              {/* Floating spec badge */}
              <motion.div className="absolute -bottom-6 -right-6 p-5 shadow-2xl z-10"
                style={{ background: C.ink, border: `1px solid rgba(255,255,255,0.07)`, minWidth: "195px" }}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.55, duration: 0.6 }}>
                <p className="text-[9px] uppercase tracking-[0.28em] font-bold mb-3"
                  style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.28)" }}>Quick Specs</p>
                {specifications.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b last:border-0"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="text-[10px] font-semibold"
                      style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.38)" }}>{s.label}</span>
                    <span className="text-[11px] font-black text-white"
                      style={{ fontFamily: F_HEADING }}>{s.value}</span>
                  </div>
                ))}
                <div className="mt-3 h-px" style={{ background: `linear-gradient(to right, ${C.red}, transparent)` }} />
              </motion.div>
            </motion.div>

            {/* Right — text content (same data as original) */}
            <motion.div className="space-y-7 lg:pl-4 flex flex-col justify-center"
              initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>

              <SectionLabel light>About This System</SectionLabel>

              {/* sectionTitle split on "|" — same as original */}
              <h2 className="font-black leading-[1.0]"
                style={{ fontFamily: F_HEADING, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}>
                <span style={{ color: C.white }}>
                  {product.sectionTitle?.split("|")[0]}
                </span>{" "}
                <span style={{ color: C.red }}>
                  {product.sectionTitle?.split("|")[1]}
                </span>
              </h2>

              <p className="text-sm leading-[2.1]"
                style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.52)" }}>
                {product.description || "In a connected world, your network is only as strong as its physical infrastructure. We provide structured cabling and ELV solutions that ensure seamless data transfer, minimal downtime, and future scalability for modern businesses."}
              </p>

              {/* Key features — same slice(0,4) as original */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {features.slice(0, 4).map((feature, index) => (
                  <motion.div key={index}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 * index }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: C.red }} />
                    <span className="text-[12px] font-semibold text-white"
                      style={{ fontFamily: F_LABEL }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 · SPECIFICATIONS  (navy bg)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: C.navy }}>

        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-[0.055]"
          style={{ background: `radial-gradient(circle, ${C.red}, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Left — heading */}
            <motion.div className="lg:col-span-5"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionLabel light>Technical Specifications</SectionLabel>
              <h2 className="font-black leading-[1.0] mb-6"
                style={{ fontFamily: F_HEADING, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: C.white, letterSpacing: "-0.015em" }}>
                Precision{" "}
                <span style={{ color: C.red }}>Engineered</span>
              </h2>
              <p className="text-sm leading-[2]"
                style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.42)" }}>
                Every system we deploy meets the highest international standards. These specifications represent our baseline — custom configurations are available on request.
              </p>
              <div className="mt-10">
                <a href="https://wa.me/966535141447" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-semibold text-[11px] px-8 py-4 tracking-[0.2em] uppercase transition-all duration-400"
                  style={{ fontFamily: F_LABEL, background: C.red, color: C.white }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = C.redDk; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = C.red; }}>
                  <FaWhatsapp className="w-4 h-4" />
                  {product.buttonText}
                </a>
              </div>
            </motion.div>

            {/* Right — spec rows */}
            <div className="lg:col-span-7 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {specifications.map((spec, i) => (
                <motion.div key={i}
                  className="flex items-center justify-between py-5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-bold tracking-[0.22em] w-8"
                      style={{ fontFamily: F_LABEL, color: `${C.red}80` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-semibold"
                      style={{ fontFamily: F_HEADING, color: "rgba(255,255,255,0.60)" }}>
                      {spec.label}
                    </span>
                  </div>
                  <span className="font-black text-sm px-4 py-1.5"
                    style={{ fontFamily: F_HEADING, background: `${C.red}15`, border: `1px solid ${C.red}30`, color: "#fca5a5" }}>
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
