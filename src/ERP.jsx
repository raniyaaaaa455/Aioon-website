// src/pages/ERP.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowRight, FiCheckCircle, FiUsers, FiPackage,
  FiBarChart2, FiDollarSign, FiGrid, FiTrendingUp,
  FiMail, FiPhone, FiMapPin, FiChevronRight,
} from "react-icons/fi";
import { FaRocket, FaWhatsapp } from "react-icons/fa";
import { motion, useInView, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import erp1Image from "./assets/erp1.png";
import { Link } from "react-router-dom";

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
    <div className="overflow-hidden w-full" ref={trackRef}>
      <motion.div style={{ x, display: "flex", gap: GAP, willChange: "transform" }}>
        {doubled.map((module, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-shrink-0 relative rounded-2xl overflow-hidden group cursor-default"
            style={{ width: CARD_W, minHeight: 260 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl group-hover:border-[#dc2626]/40 transition-colors duration-300" />
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#dc2626]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-7">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dc2626]/20 to-[#dc2626]/5 flex items-center justify-center text-[#ef4444] mb-5 group-hover:scale-110 group-hover:from-[#dc2626]/30 transition-all duration-200">
                {module.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-4 leading-snug">{module.title}</h3>
              <ul className="space-y-2">
                {module.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-400 text-xs">
                    <span className="w-1 h-1 rounded-full bg-[#dc2626]/70 flex-shrink-0" />
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
        className="relative rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl" />
        <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#dc2626] to-transparent" />

        <motion.div className="absolute inset-0 origin-left z-10 pointer-events-none rounded-3xl"
          style={{ background: "linear-gradient(135deg,#0a0f1e 0%,#111827 100%)" }}
          initial={{ scaleX: 1 }}
          animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div className="absolute inset-0 origin-right z-10 pointer-events-none rounded-3xl"
          style={{ background: "linear-gradient(225deg,#0a0f1e 0%,#111827 100%)" }}
          initial={{ scaleX: 1 }}
          animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        />

        <div className="relative p-10 lg:p-16 pl-14 lg:pl-20">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p className="text-[#dc2626] text-xs font-bold tracking-[0.25em] uppercase mb-3">About This Solution</p>
            <h2 className="text-3xl font-bold text-white mb-2 relative">
              Overview
              <motion.div className="absolute -bottom-3 left-0 h-px bg-gradient-to-r from-[#dc2626] to-transparent"
                initial={{ width: 0 }}
                animate={isInView ? { width: 72 } : { width: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
            </h2>
          </motion.div>

          <div className="mt-10 space-y-5">
            <p className="text-slate-300 text-base leading-[2] text-justify">
              {sentences1.map((s, i) => (
                <motion.span key={i} className="inline"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, delay: 1.05 + i * 0.15 }}
                >{s}</motion.span>
              ))}
            </p>
            <p className="text-slate-400 text-base leading-[2] text-justify">
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
export default function ERP() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => setReady(true));
  }, []);

  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });

  // FIX 2: Parallax disabled on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const rawParallax = useTransform(scrollY, [0, 600], [0, 100]);
  const heroImgY = isMobile ? 0 : rawParallax;


  const whatsappNumber = "966535141447";
  const whatsappMessage = "Hello! I'm interested in booking a demo for your ERP solution.";
  const handleWhatsAppClick = () =>
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

  const service = {
    title: "Enterprise Resource Planning",
    imageUrl: erp1Image,
    description: "Eliminate operational silos and unlock data-driven insights. Manage your capital, people, and processes from a single, integrated command center.",
    fullDescription: "Unifying Your Business Operations for Scalable Growth. In today's fast-paced market, relying on disconnected spreadsheets and legacy software creates data silos that stifle innovation. Our Enterprise Resource Planning (ERP) solutions bridge these gaps by consolidating your critical business functions into one seamless, intelligent ecosystem. We help organizations transition from fragmented tools to a single 'source of truth.' By integrating Finance, HR, Inventory, Sales, and Manufacturing, we empower your leadership team to make data-driven decisions with absolute confidence. Our ERP systems go beyond simple record-keeping; they automate complex workflows, ensure regulatory compliance, and provide real-time visibility into every corner of your enterprise. Whether you are looking to optimize production costs, streamline payroll, or accelerate growth, our ERP solution is built for scalability.",
    longDescription: "Our ERP solution is designed for businesses of all sizes, from SMEs to large enterprises. With modular architecture, you can start with the modules you need and scale as your business grows. The system offers real-time analytics, mobile accessibility, and seamless integration with third-party applications. Our implementation team ensures smooth transition from your legacy systems with minimal disruption to your daily operations.",
    features: [
      "Real-time data synchronization across all departments",
      "Customizable dashboards for different user roles",
      "Automated workflows and approval processes",
      "Advanced reporting and business intelligence",
      "Multi-currency and multi-language support",
      "Cloud-based or on-premise deployment options",
      "Mobile app for iOS and Android",
      "24/7 technical support and regular updates",
    ],
    modules: [
      { title: "Finance Management", icon: <FiDollarSign className="w-5 h-5" />, features: ["Intelligent Accounting", "Cash Flow Optimization", "Strategic Planning", "Regulatory Compliance", "Budgeting & Forecasting", "Multi-currency Support"] },
      { title: "Human Resource Management", icon: <FiUsers className="w-5 h-5" />, features: ["Core HR & Payroll", "Workforce Management", "Talent Lifecycle", "Employee Development", "Performance Reviews", "Leave & Attendance"] },
      { title: "Inventory & Supply Chain", icon: <FiPackage className="w-5 h-5" />, features: ["Smart Stock Control", "Procurement Efficiency", "Warehouse Optimization", "Future-Ready Planning", "Supplier Management", "Demand Forecasting"] },
      { title: "Sales & CRM", icon: <FiTrendingUp className="w-5 h-5" />, features: ["360° Customer View", "Order-to-Cash", "Pipeline Management", "Revenue Analytics", "Quotes & Invoicing", "Customer Portal"] },
      { title: "Manufacturing & Operations", icon: <FiGrid className="w-5 h-5" />, features: ["Production Control", "Bill of Materials (BOM)", "Quality Assurance", "Resource Planning", "Shop Floor Control", "Maintenance Management"] },
      { title: "Business Intelligence", icon: <FiBarChart2 className="w-5 h-5" />, features: ["Interactive Dashboards", "Custom Reports", "KPI Tracking", "Predictive Analytics", "Data Visualization", "Executive Insights"] },
    ],
    stats: [
      { value: "40%",   label: "Cost Reduction",  icon: FiDollarSign },
      { value: "60%",   label: "Efficiency Gain", icon: FiTrendingUp },
      { value: "99.9%", label: "Data Accuracy",   icon: FiCheckCircle },
      { value: "500+",  label: "Happy Clients",   icon: FiUsers },
    ],
  };

  return (
    <div className="min-h-screen bg-[#06080f] relative overflow-hidden" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", visibility: ready ? "visible" : "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');`}</style>

      {/* Scroll bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] origin-left z-50" style={{ scaleX }} />

      {/* Background atmosphere */}
      <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-[#dc2626]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#1e3a8a]/[0.12] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#dc2626]/[0.02] rounded-full blur-[80px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />


      {/* FIX 1: Spinning rings hidden on mobile */}
      <div className="hidden md:block absolute top-[4%] right-[4%] w-72 h-72 opacity-[0.05] pointer-events-none" style={{ animation: "spin-slow 22s linear infinite" }}>
        <div className="w-full h-full rounded-full border-2 border-dashed border-[#dc2626]" />
      </div>
      <div className="hidden md:block absolute top-[8%] right-[8%] w-44 h-44 opacity-[0.04] pointer-events-none" style={{ animation: "spin-rev 15s linear infinite" }}>
        <div className="w-full h-full rounded-full border border-[#ef4444]" />
      </div>
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-rev  { to { transform: rotate(-360deg); } }
      `}</style>

      {/* ── HERO SECTION ── */}
      <div className="relative z-10">
        <div className="relative h-[100vh] max-h-[720px] min-h-[560px] overflow-hidden">
          {/* Hero image right side */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%]">
            {/* FIX 3: Lighter overlay on mobile so image is visible */}
            <motion.img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
              style={{ y: heroImgY }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080f] via-[#06080f]/80 to-[#06080f]/30 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-transparent to-[#06080f]/20" />
          </div>

          {/* Shimmer */}
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 pointer-events-none z-10"
            initial={{ x: "-150%" }} animate={{ x: "200%" }}
            transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
          />

          {/* Left content */}
          <div className="relative z-20 h-full flex flex-col justify-center max-w-6xl mx-auto px-6 lg:px-12">
            <div className="max-w-xl">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                <Link to="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#ef4444] transition-colors group text-sm">
  <FiArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform w-4 h-4" />
  All Services
</Link>
              </motion.div>

              <div className="flex items-center gap-3 mb-6 overflow-hidden">
                <motion.span className="h-px bg-gradient-to-r from-[#dc2626] to-[#ef4444]"
                  initial={{ width: 0 }} animate={{ width: 36 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-[#ef4444] text-xs font-bold tracking-[0.3em] uppercase"
                >Enterprise Solution</motion.span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05] flex flex-wrap gap-x-4 gap-y-1">
                {service.title.split(" ").map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block" style={{ paddingBottom: "0.05em" }}>
                    <motion.span className="inline-block"
                      initial={{ y: "110%" }} animate={{ y: "0%" }}
                      transition={{ duration: 0.65, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >{word}</motion.span>
                  </span>
                ))}
              </h1>

              <motion.p className="text-slate-400 text-base leading-relaxed mb-10 max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
              >{service.description}</motion.p>

              <motion.div className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <button onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#dc2626]/20 text-sm group"
                >
                  Book a Demo
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                </button>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 text-white font-semibold rounded-xl transition-all duration-300 text-sm"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06080f] to-transparent z-10" />
        </div>

        {/* ── Stats strip ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 mt-4 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {service.stats.map((stat, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="relative rounded-2xl overflow-hidden group cursor-default">
                  <div className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-2xl group-hover:border-[#dc2626]/30 transition-colors duration-300" />
                  <div className="relative p-6 text-center">
                    <div className="w-9 h-9 rounded-lg bg-[#dc2626]/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-[#dc2626]/20 transition-all duration-200">
                      <stat.icon className="w-4 h-4 text-[#ef4444]" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 tracking-tight">
                      <Counter value={stat.value} />
                    </div>
                    <div className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase">{stat.label}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── Overview ── */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-28">
          <OverviewBox fullDescription={service.fullDescription} longDescription={service.longDescription} />
        </div>

        {/* ── Core Modules — Infinite Marquee ── */}
        <div className="mb-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-10">
            <FadeUp>
              <p className="text-[#dc2626] text-xs font-bold tracking-[0.25em] uppercase mb-2">What We Offer</p>
              <div className="flex items-end justify-between">
                <h2 className="text-3xl font-bold text-white relative inline-block">
                  Core Modules
                  <div className="absolute -bottom-2 left-0 w-12 h-px bg-gradient-to-r from-[#dc2626] to-transparent" />
                </h2>
              </div>
            </FadeUp>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06080f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06080f] to-transparent z-10 pointer-events-none" />
            <div className="py-4">
              <InfiniteModules modules={service.modules} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}