// src/pages/CRM.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowRight, FiCheckCircle, FiUsers,
  FiBarChart2, FiTrendingUp, FiTarget,
  FiPieChart, FiMessageCircle,
  FiMail, FiPhone, FiMapPin,
  FiAward, FiStar,
} from "react-icons/fi";
import { FaRocket, FaRegEnvelope } from "react-icons/fa";
import { motion, useInView, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import crmImage from "./assets/CRM.png";
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
    let paused = false;
    const SPEED = 1.5;
    const step = () => {
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
          <motion.div key={index} whileHover={{ scale: 1.04, y: -8 }}
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
                    <span className="w-1 h-1 rounded-full bg-[#dc2626]/70 flex-shrink-0" />{f}
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
      <motion.div className="relative rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl" />
        <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#dc2626] to-transparent" />
        <motion.div className="absolute inset-0 origin-left z-10 pointer-events-none rounded-3xl"
          style={{ background: "linear-gradient(135deg,#0a0f1e 0%,#111827 100%)" }}
          initial={{ scaleX: 1 }} animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div className="absolute inset-0 origin-right z-10 pointer-events-none rounded-3xl"
          style={{ background: "linear-gradient(225deg,#0a0f1e 0%,#111827 100%)" }}
          initial={{ scaleX: 1 }} animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        />
        <div className="relative p-10 lg:p-16 pl-14 lg:pl-20">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }} transition={{ duration: 0.5, delay: 0.9 }}>
            <p className="text-[#dc2626] text-xs font-bold tracking-[0.25em] uppercase mb-3">About This Solution</p>
            <h2 className="text-3xl font-bold text-white mb-2 relative">
              Overview
              <motion.div className="absolute -bottom-3 left-0 h-px bg-gradient-to-r from-[#dc2626] to-transparent"
                initial={{ width: 0 }} animate={isInView ? { width: 72 } : { width: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
            </h2>
          </motion.div>
          <div className="mt-10 space-y-5">
            <p className="text-slate-300 text-base leading-[2] text-justify">
              {sentences1.map((s, i) => (
                <motion.span key={i} className="inline"
                  initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, delay: 1.05 + i * 0.15 }}
                >{s}</motion.span>
              ))}
            </p>
            <p className="text-slate-400 text-base leading-[2] text-justify">
              {sentences2.map((s, i) => (
                <motion.span key={i} className="inline"
                  initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
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
export default function CRM() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => setReady(true));
  }, []);

  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const rawParallax = useTransform(scrollY, [0, 600], [0, 100]);
  const heroImgY = isMobile ? 0 : rawParallax;


  const whatsappNumber = "966535141447";
  const whatsappMessage = "Hello! I'm interested in booking a demo for your CRM solution. Can you please provide more information?";
  const handleWhatsAppClick = () =>
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

  const service = {
    title: "Customer Relationship Management",
    imageUrl: crmImage,
    description: "Turn prospects into loyal advocates. Empower your team with a 360-degree view of every customer interaction to drive sales and retention.",
    fullDescription: "In an era where customer experience is the primary differentiator, generic sales tactics no longer work. Our Customer Relationship Management (CRM) solution is designed to put the customer at the heart of your business strategy. We move you beyond static spreadsheets and scattered emails into a dynamic ecosystem where every interaction is tracked, analyzed, and optimized. Our platform unifies your sales, marketing, and support teams, providing them with a single, shared view of customer data. By automating routine administrative tasks, we free your sales professionals to do what they do best: selling.",
    longDescription: "From capturing the initial lead to nurturing long-term loyalty, our CRM ensures every team member has the context they need to deliver personalized experiences that drive business growth. Whether you're a small business or enterprise, our scalable CRM solution adapts to your unique sales process. With advanced analytics, AI-powered insights, and seamless integration with your existing tools, you can focus on what matters most – building relationships that drive business growth.",
    modules: [
      { title: "Lead & Opportunity Management", icon: <FiTarget className="w-5 h-5" />, features: ["Smart Capture","Lead Scoring","Activity Tracking","Automated Assignment","Lead Nurturing","Conversion Analytics"] },
      { title: "Sales Pipeline & Forecasting", icon: <FiTrendingUp className="w-5 h-5" />, features: ["Visual Pipeline","Revenue Forecasting","Quotation Management","Goal Tracking","Deal Stage Management","Won/Loss Analysis"] },
      { title: "Marketing Automation", icon: <FaRegEnvelope className="w-5 h-5" />, features: ["Email Campaigns","Customer Segmentation","Campaign Analytics","Event Management","Social Media Integration","Landing Page Builder"] },
      { title: "Customer Support & Service", icon: <FiMessageCircle className="w-5 h-5" />, features: ["Ticketing System","Knowledge Base","SLA Management","Satisfaction Surveys","Customer Portal","Live Chat Integration"] },
      { title: "Analytics & Reporting", icon: <FiPieChart className="w-5 h-5" />, features: ["Custom Dashboards","Trend Analysis","Team Performance","Exportable Data","Predictive Analytics","ROI Tracking"] },
      { title: "Contact Management", icon: <FiUsers className="w-5 h-5" />, features: ["360° Customer View","Interaction History","Contact Segmentation","Activity Tracking","Document Management","Communication Log"] },
    ],
    stats: [
      { value: "45%",  label: "Increase in Sales",  icon: FiTrendingUp },
      { value: "60%",  label: "Productivity Gain",  icon: FiUsers },
      { value: "35%",  label: "Customer Retention", icon: FiAward },
      { value: "300+", label: "Happy Clients",       icon: FiStar },
    ],
  };

  return (
    <div className="min-h-screen bg-[#06080f] relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", visibility: ready ? "visible" : "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-rev  { to { transform: rotate(-360deg); } }
      `}</style>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] origin-left z-50" style={{ scaleX }} />

      <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-[#dc2626]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#1e3a8a]/[0.12] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#dc2626]/[0.02] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />


      <div className="hidden md:block absolute top-[4%] right-[4%] w-72 h-72 opacity-[0.05] pointer-events-none" style={{ animation: "spin-slow 22s linear infinite" }}>
        <div className="w-full h-full rounded-full border-2 border-dashed border-[#dc2626]" />
      </div>
      <div className="hidden md:block absolute top-[8%] right-[8%] w-44 h-44 opacity-[0.04] pointer-events-none" style={{ animation: "spin-rev 15s linear infinite" }}>
        <div className="w-full h-full rounded-full border border-[#ef4444]" />
      </div>

      <div className="relative z-10">
        {/* ── HERO ── */}
        <div className="relative h-[100vh] max-h-[760px] min-h-[620px] overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%]">
            <motion.img src={service.imageUrl} alt={service.title}
              className="w-full h-full object-cover" style={{ y: heroImgY }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080f] via-[#06080f]/80 to-[#06080f]/30 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-transparent to-[#06080f]/20" />
          </div>
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 pointer-events-none z-10"
            initial={{ x: "-150%" }} animate={{ x: "200%" }}
            transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
          />
          <div className="relative z-20 h-full flex flex-col justify-center max-w-6xl mx-auto px-6 lg:px-12">
            <div className="max-w-xl">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-10 pt-20">
  <Link to="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#ef4444] transition-colors group text-sm">
    <FiArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform w-4 h-4" />
    All Services
  </Link>
</motion.div>
              <div className="flex items-center gap-3 mb-6 overflow-hidden">
                <motion.span className="h-px bg-gradient-to-r from-[#dc2626] to-[#ef4444]"
                  initial={{ width: 0 }} animate={{ width: 36 }} transition={{ duration: 0.6, delay: 0.3 }} />
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-[#ef4444] text-xs font-bold tracking-[0.3em] uppercase"
                >CRM Solution</motion.span>
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
              <motion.div className="flex flex-wrap gap-4 mt-6 mb-8"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <button onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#dc2626]/20 text-sm group">
                  Get a Personalized Demo
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                </button>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 text-white font-semibold rounded-xl transition-all duration-300 text-sm">
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06080f] to-transparent z-10" />
        </div>

        {/* ── Stats ── */}
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
                    <div className="text-3xl font-bold text-white mb-1 tracking-tight"><Counter value={stat.value} /></div>
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

        {/* ── Core Modules ── */}
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
            <div className="py-4"><InfiniteModules modules={service.modules} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}