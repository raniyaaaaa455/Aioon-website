import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle, Shield, Wifi, Zap, Clock,
  ChevronRight,
} from "lucide-react";
import products from "../data/productsData";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect } from "react";
import networkingVideo from "../assets/networking-video.mp4";
import conferencingVideo from "../assets/conferencing-video.mp4";
import audioVideo from "../assets/audio-video.mp4";
import cctvVideo from "../assets/cctv-video.mp4";
import integrationVideo from "../assets/integration-video.mp4";
import parkingVideo from "../assets/parking-video.mp4";
import accessVideo from "../assets/access-video.mp4";
import smarthomeVideo from "../assets/smarthome-video.mp4";
// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const F_DISPLAY = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const F_HEADING = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const F_LABEL   = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const F_BODY    = '"DM Sans", "Segoe UI", system-ui, sans-serif';

// New palette
const C = {
  navy: '#1A1A1A',     // dark background
  teal: '#2B55C5',     // main accent
  sky: '#4A4A4A',      // secondary text
  beige: '#F7F7F7',    // light section
  white: '#FFFFFF',

  accent: '#2B55C5',
  accentDk: '#1E45A8',
};
const videoMap = {
  1: networkingVideo,
  2: conferencingVideo,
  3: audioVideo,
  4: cctvVideo,
  5: integrationVideo,
  6: parkingVideo,
  7: accessVideo,
  8: smarthomeVideo,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="w-8 h-px flex-shrink-0"
        style={{ background: light ? "rgba(200,217,230,0.35)" : C.accent }} />
      <span className="text-[10px] font-bold tracking-[0.38em] uppercase"
        style={{ fontFamily: F_LABEL, color: light ? "rgba(200,217,230,0.55)" : C.accent }}>
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
  window.scrollTo(0, 0);
}, [product.id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: C.navy }}>
      <h1 className="text-2xl font-bold"
        style={{ fontFamily: F_HEADING, color: C.white }}>Product Not Found</h1>
    </div>
  );

  const features = [
    "24/7 Technical Support",
    "5 Year Warranty",
    "On-site Installation",
    "Free Consultation",
    "Scalable Architecture",
    "Future-ready Technology",
  ];

  const benefits = [
    { icon: <Zap    className="w-5 h-5" />, title: "High Performance",     description: "Optimized for maximum efficiency and speed"    },
    { icon: <Shield className="w-5 h-5" />, title: "Enterprise Security",  description: "Bank-level encryption and security protocols"  },
    { icon: <Clock  className="w-5 h-5" />, title: "24/7 Monitoring",      description: "Round-the-clock system monitoring and alerts"  },
    { icon: <Wifi   className="w-5 h-5" />, title: "Seamless Integration", description: "Works with your existing infrastructure"       },
  ];

  return (
    <div className="overflow-hidden" style={{ background: C.navy, fontFamily: F_BODY }}>

      {/* ── GRAIN OVERLAY ─────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 · HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
  key={product.id}   // ⭐ THIS FIXES THE ISSUE
  className="relative h-screen flex flex-col overflow-hidden"
>

        {/* Parallax image */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroParallax }}>
<video
  key={product.id}
  src={videoMap[Number(product.id)]}
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
/>
</motion.div>

       <div
  className="absolute inset-0"
  style={{ background: "rgba(0,0,0,0.55)" }}
/>

        {/* Fine dot grid */}
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(200,217,230,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(200,217,230,0.6) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />

        {/* Vertical accent line */}
        <div className="absolute top-0 left-[9%] w-px h-full opacity-[0.10]"
          style={{ background: `linear-gradient(to bottom, transparent 5%, ${C.teal} 40%, transparent 95%)` }} />

        {/* Ambient orb — teal */}
        <motion.div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.teal}1A 0%, transparent 70%)` }}
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
                style={{ fontFamily: F_LABEL, color: "rgba(200,217,230,0.40)" }}>ELV Systems</span>
              <ChevronRight className="w-3 h-3" style={{ color: "rgba(200,217,230,0.25)" }} />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                style={{ fontFamily: F_LABEL, color: C.teal }}>
                {product.category || "Networking"}
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden">
              <motion.h1
  className="block font-bold leading-[1.2] pb-2"
                style={{
                  fontFamily: F_DISPLAY,
                  fontSize: "clamp(2.2rem, 5.2vw, 4rem)",
                  color: C.white,
                  letterSpacing: "-0.015em",
                }}
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.05, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {product.title}
              </motion.h1>
            </div>

            {/* Hero description */}
            <motion.p
              className="text-sm leading-relaxed max-w-xl font-light"
              style={{ fontFamily: F_BODY, color: "#ffffff" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              {product.heroText}
            </motion.p>



          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 · ABOUT SERVICE  (light beige background)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: C.beige }}>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(47,65,86,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(47,65,86,0.5) 1px,transparent 1px)",
            backgroundSize: "54px 54px",
          }} />
        {/* Accent line */}
        <div className="absolute left-[11%] top-0 w-px h-full opacity-[0.12]"
          style={{ background: `linear-gradient(to bottom, transparent, ${C.teal} 45%, transparent)` }} />
        {/* Ambient orb */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: `radial-gradient(circle, ${C.teal}, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">

            {/* Left — image */}
            <motion.div className="relative"
              initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>

              {/* Corner accents */}
              <div className="absolute -top-4 -left-4 w-14 h-14 border-t border-l z-20 pointer-events-none"
                style={{ borderColor: `${C.teal}80` }} />
              <div className="absolute -bottom-4 -right-4 w-14 h-14 border-b border-r z-20 pointer-events-none"
                style={{ borderColor: `${C.teal}80` }} />

              <div className="relative overflow-hidden shadow-2xl" style={{ height: "480px" }}>
                <img src={product.image} alt={product.title}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(12%) contrast(1.05)" }} />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${C.navy}CC 0%, transparent 55%)` }} />
                {/* Top accent bar — teal */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: C.teal }} />
              </div>
            </motion.div>

            {/* Right — text */}
            <motion.div className="space-y-7 lg:pl-4 flex flex-col justify-center"
              initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>

              <SectionLabel light={false}>About This System</SectionLabel>

              <h2 className="font-bold leading-tight"
                style={{ fontFamily: F_HEADING, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}>
                <span style={{ color: C.navy }}>
                  {product.sectionTitle?.split("|")[0]}
                </span>{" "}
                <span style={{ color: C.teal }}>
                  {product.sectionTitle?.split("|")[1]}
                </span>
              </h2>

              <p className="text-sm leading-relaxed font-light"
                style={{ fontFamily: F_BODY, color: C.teal }}>
                {product.description || "In a connected world, your network is only as strong as its physical infrastructure. We provide structured cabling and ELV solutions that ensure seamless data transfer, minimal downtime, and future scalability for modern businesses."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {features.slice(0, 4).map((feature, index) => (
                  <motion.div key={index}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{
                      background: "rgba(47,65,86,0.05)",
                      border: `1px solid rgba(86,124,141,0.18)`,
                    }}
                    initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 * index }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: C.teal }} />
                    <span className="text-[12px] font-semibold"
                      style={{ fontFamily: F_LABEL, color: C.navy }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
