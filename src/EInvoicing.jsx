// src/pages/EInvoicing.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowRight, FiCheckCircle, FiShield, FiServer,
  FiFileText, FiClock, FiMapPin, FiMail, FiPhone,
} from "react-icons/fi";
import {
  FaRocket, FaFileInvoice, FaPrint, FaChartLine,
  FaShieldAlt, FaProjectDiagram, FaWhatsapp,
} from "react-icons/fa";
import { motion, useInView, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import complianceImage from "./assets/compliance.png";
import overviewImg from "./assets/overview.jpg";
import { Link } from "react-router-dom";

// ─── Theme Constants ────────────────────────
const DARK = '#0A0E1A';

/* ─── Counter ─────────────────────────────── */
function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isInView) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      const current = numeric * eased;
      const formatted = value.includes(".") ? current.toFixed(1) : Math.floor(current);
      setDisplay(`${formatted}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, 1600 / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref}>{display}</span>;
}

/* ─── FadeUp ──────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Infinite Marquee Modules ────────────── */
function InfiniteModules({ modules }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const animRef = useRef(null);
  const CARD_W = 300;
  const GAP = 24;
  const TOTAL = (CARD_W + GAP) * modules.length;

  useEffect(() => {
    let start = null;
    let paused = false;
    const SPEED = 1.5;

    const step = (ts) => {
      if (!start) start = ts;
      if (!paused) {
        const current = x.get();
        const next = current - SPEED;
        x.set(next <= -TOTAL ? 0 : next);
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    const el = trackRef.current;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el?.addEventListener("mouseenter", pause);
    el?.addEventListener("mouseleave", resume);
    el?.addEventListener("touchstart", pause);
    el?.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      el?.removeEventListener("mouseenter", pause);
      el?.removeEventListener("mouseleave", resume);
      el?.removeEventListener("touchstart", pause);
      el?.removeEventListener("touchend", resume);
    };
  }, [TOTAL]);

  const doubled = [...modules, ...modules];

  return (
    <div className="overflow-hidden w-full py-10" ref={trackRef} style={{ perspective: "1200px" }}>
      <motion.div style={{ x, display: "flex", gap: GAP, willChange: "transform" }}>
        {doubled.map((module, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.1,
              y: -15,
              z: 50,
              rotateX: 2,
              rotateY: 2
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex-shrink-0 relative rounded-2xl group cursor-default"
            style={{
              width: CARD_W,
              minHeight: 260,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="absolute inset-0 border border-[#2B55C5]/10 rounded-2xl group-hover:border-[#2B55C5]/40 transition-colors duration-300 shadow-sm group-hover:shadow-2xl"
              style={{ background: '#CFE0FF' }}
            />
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#2B55C5]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-7" style={{ transform: "translateZ(30px)" }}>
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#2B55C5] mb-5 group-hover:scale-110 group-hover:bg-[#2B55C5]/5 transition-all duration-200 shadow-inner">
                {module.icon}
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-base mb-4 leading-snug">{module.title}</h3>
              <ul className="space-y-2">
                {module.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-500 text-xs">
                    <span className="w-1 h-1 rounded-full bg-[#2B55C5]/50 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── OverviewBox ─────────────────────────── */
function OverviewBox({ fullDescription, longDescription, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const sentences1 = fullDescription.match(/[^.!?]+[.!?]+/g) || [fullDescription];
  const sentences2 = longDescription.match(/[^.!?]+[.!?]+/g) || [longDescription];

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="relative rounded-[32px] overflow-hidden shadow-2xl border border-[#2B55C5]/20 bg-white"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={overviewImg} alt="Overview Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
        </div>

        <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#2B55C5] to-transparent z-10" />

        <div className="relative p-10 lg:p-16 pl-14 lg:pl-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p className="text-[#2B55C5] text-xs font-bold tracking-[0.25em] uppercase mb-3">About This Solution</p>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2 relative">
              Overview
              <motion.div className="absolute -bottom-3 left-0 h-px bg-gradient-to-r from-[#2B55C5] to-transparent"
                initial={{ width: 0 }}
                animate={isInView ? { width: 72 } : { width: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
            </h2>
          </motion.div>

          <div className="mt-10 space-y-5">
            <p className="text-slate-800 text-base leading-[2] text-justify font-medium">
              {sentences1.map((s, i) => (
                <motion.span key={i} className="inline"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, delay: 1.05 + i * 0.15 }}
                >{s}</motion.span>
              ))}
            </p>
            <p className="text-slate-800 text-base leading-[2] text-justify font-medium">
              {sentences2.map((s, i) => (
                <motion.span key={i} className="inline"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, delay: 1.05 + sentences1.length * 0.15 + i * 0.15 }}
                >{s}</motion.span>
              ))}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function EInvoicing() {
  const [ready, setReady] = useState(false);
  const overviewRef = useRef(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => setReady(true));
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });

  const whatsappNumber = "966535141447";
  const whatsappMessage = "Hello! I'm interested in checking my ZATCA compliance status for your E-Invoicing solution. Can you please provide more information?";
  const handleWhatsAppClick = () =>
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

  const service = {
    title: "E-Invoicing & Compliance",
    imageUrl: complianceImage,
    description: "Simplify Compliance. Integrate Seamlessly. Avoid Penalties. Navigate ZATCA regulations with confidence through our automated, secure, and audit-ready e-invoicing solution.",
    fullDescription: "Navigating the complexities of tax regulations—specifically the ZATCA e-invoicing mandates (Phase 1 & Phase 2)—can be daunting for any business. Our solution transforms compliance from a burden into a seamless background process. We don't just generate invoices; we provide a complete ecosystem that integrates directly with your existing hardware, including thermal printers, self-service kiosks, and Point of Sale (POS) terminals. Our system ensures that every invoice generated is cryptographically secured, validated, and archived according to government standards. By automating the connection between your sales data and regulatory portals, we eliminate manual errors and ensure you remain audit-ready at all times.",
    longDescription: "Whether you operate a retail chain, a restaurant, or a B2B enterprise, our solution scales to handle high transaction volumes while maintaining 100% adherence to legal frameworks. From QR code generation to real-time validation, we handle every aspect of ZATCA compliance so you can focus on your business.",
    modules: [
  {
    title: "ZATCA (Fatoora) Compliance",
    icon: <FaFileInvoice className="w-5 h-5" />,
    features: ["Phase 1 & 2 Readiness", "Smart Validation", "QR Code Generation", "Clearance & Reporting"]
  },
  {
    title: "Device & Hardware Integration",
    icon: <FaPrint className="w-5 h-5" />,
    features: ["Universal Printer Support", "POS Connectivity", "Kiosk Integration", "IoT Connectivity"]
  },
  {
    title: "Tax Management & Reporting",
    icon: <FaChartLine className="w-5 h-5" />,
    features: ["VAT Automation", "Return Filing", "Audit Trails", "Multi-Format Export"]
  },
  {
    title: "Security & Archiving",
    icon: <FaShieldAlt className="w-5 h-5" />,
    features: ["Tamper-Proofing", "Local & Cloud Archiving", "Data Privacy", "Offline Mode"]
  },
],
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", visibility: ready ? "visible" : "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');`}</style>

      {/* Scroll bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#2B55C5] origin-left z-50" style={{ scaleX }} />

      {/* Background atmosphere */}
      <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-[#2B55C5]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#2B55C5]/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#2B55C5]/[0.02] rounded-full blur-[80px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: `linear-gradient(${DARK}11 1px,transparent 1px),linear-gradient(90deg,${DARK}11 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

      {/* Spinning rings hidden on mobile */}
      <div className="hidden md:block absolute top-[4%] right-[4%] w-72 h-72 opacity-[0.1] pointer-events-none" style={{ animation: "spin-slow 22s linear infinite" }}>
        <div className="w-full h-full rounded-full border-2 border-dashed border-[#2B55C5]/20" />
      </div>
      <div className="hidden md:block absolute top-[8%] right-[8%] w-44 h-44 opacity-[0.08] pointer-events-none" style={{ animation: "spin-rev 15s linear infinite" }}>
        <div className="w-full h-full rounded-full border border-[#2B55C5]/10" />
      </div>
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-rev  { to { transform: rotate(-360deg); } }
      `}</style>

      {/* ── HERO SECTION: Contained Box Style (matches ERP) ── */}
      <div className="relative pt-20 pb-10 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[48px] overflow-hidden bg-[#0A0E1A] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] border border-white/10"
          >
            {/* Background Image (Right side inside box) */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/80 to-[#0A0E1A]/20 lg:to-transparent" />
            </div>

            {/* Content (Left side inside box) */}
            <div className="relative z-10 p-10 lg:p-20 lg:pl-24 max-w-3xl">

              <div className="flex items-center gap-3 mb-8 overflow-hidden">
                <motion.span className="h-px bg-[#2B55C5] w-10" />
                <span className="text-[#2B55C5] text-xs font-bold tracking-[0.3em] uppercase">E-Invoicing Solution</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight flex flex-wrap gap-x-3">
                {["E-Invoicing", "&", "Compliance"].map((word, wordIdx) => (
                  <span key={wordIdx} className="flex overflow-hidden">
                    {word.split("").map((char, charIdx) => (
                      <motion.span
                        key={charIdx}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: (wordIdx * 5 + charIdx) * 0.04,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        className={wordIdx === 2 ? "text-[#2B55C5]" : "text-white"}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              <motion.p className="text-slate-300 text-lg leading-relaxed max-w-lg font-light"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                {service.description}
              </motion.p>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Overview ── */}
      <div ref={overviewRef} className="relative pt-4 pb-4" style={{ background: '#FFFFFF' }}>
  <div className="max-w-7xl mx-auto px-5 lg:px-8">
    <OverviewBox fullDescription={service.fullDescription} longDescription={service.longDescription} />
  </div>
</div>

      {/* ── Core Modules — Infinite Marquee ── */}
      <div className="relative pt-4 pb-4" style={{ background: '#EBF2FA' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-2">
          <FadeUp>
            <p className="text-[#2B55C5] text-xs font-bold tracking-[0.25em] uppercase mb-2">What We Offer</p>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold text-[#1A1A1A] relative inline-block">
                Core Modules
                <div className="absolute -bottom-2 left-0 w-12 h-px bg-[#2B55C5]" />
              </h2>
            </div>
          </FadeUp>
        </div>

        <div className="relative">
          <div className="py-4">
            <InfiniteModules modules={service.modules} />
          </div>
        </div>
      </div>
    </div>
  );
}