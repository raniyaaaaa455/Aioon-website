import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from './assets/Aioon_logo-01.png';
import crmBg from './assets/CRM.webp';
import erpBg from './assets/ERP.webp';
import hrPayrollBg from './assets/HRandPAYROLL.webp';
import projectConstructionBg from './assets/ProjectsandconstructionsERP.webp';
import aiAnalyticsBg from './assets/AIandBUSINESS.png';
import einvoiceBg from './assets/Einvoiceandcompliance.webp';
import newBanner from './assets/new banner.webp';
import passiveNetworkingImg from './assets/Passive networking and structured cabling.png';
import conferencingImg from './assets/Conference.png';
import audioVisualImg from './assets/audio and visual.jpg';
import cctvImg from './assets/cctv and vms.png';
import securitySystemsImg from './assets/integrated security systems.png';
import parkingControlImg from './assets/parking control and guidance.png';
import accessControlImg from './assets/accesscontrol and egates.jpg';
import smartHomeImg from './assets/smart home.jpg';
import scalableArchImg from './assets/1.png';
import aboutImg from './assets/ABOUT.jpg';
import aiBusinessImg from './assets/AIandBUSINESS.png';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Services     from "./Services";
import ERP          from "./ERP";
import CRM          from "./CRM";
import HR           from "./HR";
import Construction from "./Construction";
import AIAnalytics  from "./AIAnalytics";
import EInvoicing   from "./EInvoicing";
import Contact      from "./Contact";

gsap.registerPlugin(ScrollTrigger);

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FONT_HERO    = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_HEADING = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BADGE   = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BODY    = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_NAV     = '"DM Sans", "Segoe UI", system-ui, sans-serif';

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
// Crimson accents
const CR  = '#8B1A1A';
const CR2 = '#A52020';
const CR3 = '#6B1414';
// Dark backgrounds — varied to break the all-navy monotony
const BG0 = '#06080f';   // near-black (hero, deepest)
const BG1 = '#0A0E1A';   // dark navy
const BG2 = '#0D1628';   // mid navy
const BG3 = '#0F1C35';   // rich navy (contact)
const BG4 = '#0C1220';   // deep charcoal-navy (services alt)
const BG5 = '#111827';   // cool dark slate (process, ELV)  — warm enough to break monotony
const BG6 = '#0E1520';   // dark teal-navy (who we are alt)

// ─── SOCIAL ICONS — always shown in brand colors, no box ─────────────────────
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aioon-technologies',
    hoverColor: '#0A66C2',
    defaultColor: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/aioon_tech',
    hoverColor: '#ffffff',
    defaultColor: 'rgba(255,255,255,0.80)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/aioon.technologies',
    hoverColor: '#1877F2',
    defaultColor: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/aioon.tech',
    isGradient: true,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <defs>
          <linearGradient id="igColorStatic" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="25%" stopColor="#e6683c"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="75%" stopColor="#cc2366"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
        <path fill="url(#igColorStatic)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

// ─── NOISE OVERLAY ────────────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '160px 160px' }} />
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0; const step = target / 60;
        const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────
function MagneticButton({ children, className, href = '#', onClick, to, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const hm = (e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); };
  const hl = () => { x.set(0); y.set(0); };
  if (to) return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={hm} onMouseLeave={hl} className="inline-block">
      <Link to={to} onClick={onClick} className={className} style={style}>{children}</Link>
    </motion.div>
  );
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={hm} onMouseLeave={hl} className="inline-block">
      <a href={href} onClick={onClick} className={className} style={style}>{children}</a>
    </motion.div>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee({ items }) {
  return (
    <div className="flex overflow-hidden select-none">
      {[0, 1].map(i => (
        <motion.div key={i} className="flex gap-8 pr-8 shrink-0"
          animate={{ x: ['0%', '-100%'] }} transition={{ duration: 22, ease: 'linear', repeat: Infinity }}>
          {items.map((item, j) => (
            <span key={j} className="flex items-center gap-4 text-[11px] font-bold text-white/20 uppercase tracking-[0.2em]" style={{ fontFamily: FONT_BODY }}>
              {item} <span className="w-1 h-1 rounded-full inline-block" style={{ background: `${CR}80` }} />
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// ─── WHY CHOOSE US — Cinematic Stage (original layout, moderately sized) ─────
function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);

  const features = [
    {
      num: '01', title: 'Tailored To Your Needs', sub: 'Bespoke Architecture',
      body: 'Every system is engineered around your exact workflows. We begin with deep discovery — understanding how your teams think, move, and decide — then build a platform that feels invented for you alone.',
      metric: '100%', metricLabel: 'Custom Built', tag: 'Strategy',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80',
    },
    {
      num: '02', title: 'Scalable Architecture', sub: 'Cloud-Native Infrastructure',
      body: 'From ten users to ten thousand without rewriting a line. Our microservice backbone scales invisibly — zero downtime, infinite ceiling.',
      metric: '10×', metricLabel: 'Growth Ready', tag: 'Technology',
      img: scalableArchImg,
    },
    {
      num: '03', title: '24/7 Continuous Support', sub: 'Dedicated NOC Team',
      body: 'A dedicated Network Operations Center monitors your systems every hour. Proactive incident response — a partner who never sleeps.',
      metric: '24/7', metricLabel: 'Always On', tag: 'Support',
      img: aboutImg,
    },
    {
      num: '04', title: 'Future-Proof Technology', sub: 'AI-First Design',
      body: 'AI-first architecture and open APIs ensure your investment stays relevant. We build for the next five years, with a roadmap that evolves beside you.',
      metric: '5yr+', metricLabel: 'Tech Lifespan', tag: 'Innovation',
      img: aiBusinessImg,
    },
  ];

  const stats = [
    { val: 13,  suf: '+', label: 'Years in KSA' },
    { val: 500, suf: '+', label: 'Projects' },
    { val: 98,  suf: '%', label: 'Retention' },
    { val: 100, suf: '+', label: 'Industries' },
  ];

  useEffect(() => {
    autoRef.current = setInterval(() => { setDirection(1); setActive(p => (p + 1) % features.length); }, 5000);
    return () => clearInterval(autoRef.current);
  }, []);

  const goTo = (i) => { clearInterval(autoRef.current); setDirection(i > active ? 1 : -1); setActive(i); };
  const f = features[active];

  const imgVariants = {
    enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1.04 }),
    center: { x: '0%', opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit:   (dir) => ({ x: dir > 0 ? '-40%' : '40%', opacity: 0, scale: 0.96, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }),
  };

  return (
    <section className="relative overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${BG2} 0%, ${BG5} 55%, ${BG0} 100%)` }}>

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.014]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Ambient glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${CR}18 0%, transparent 65%)` }} />

      {/* ── Top label bar ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-6 h-px" style={{ background: CR }} />
              <span className="text-[10px] font-bold tracking-[0.34em] uppercase" style={{ fontFamily: FONT_BADGE, color: CR2 }}>Why Choose Us</span>
            </div>
            <h2 className="font-bold text-white leading-tight" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)' }}>
              Built Different. <span style={{ color: CR2 }}>Proven Better.</span>
            </h2>
          </div>
          {/* Stats pills row — desktop */}
          <div className="hidden lg:flex items-center gap-2.5">
            {stats.map((s, i) => (
              <motion.div key={i}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}>
                <span className="font-black text-white" style={{ fontFamily: FONT_HEADING, fontSize: '14px' }}>
                  <AnimatedCounter target={s.val} suffix={s.suf} />
                </span>
                <span className="text-[8px] text-white/28 uppercase tracking-wide" style={{ fontFamily: FONT_BADGE }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cinematic Stage — full-width horizontal, ~52vh tall ── */}
      <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '52vh' }}>

        {/* LEFT: vertical nav tabs */}
        <div className="lg:w-[210px] flex-shrink-0 flex lg:flex-col justify-start gap-0
          px-5 sm:px-8 lg:pl-12 lg:pr-0 pb-3 lg:pb-10 overflow-x-auto lg:overflow-visible">
          {features.map((feat, i) => {
            const isActive = active === i;
            return (
              <motion.button key={i} onClick={() => goTo(i)}
                className="relative flex-shrink-0 lg:flex-shrink text-left py-3 lg:py-3.5 pr-5 lg:pr-7 transition-all duration-300"
                style={{ borderBottom: `1px solid rgba(255,255,255,${isActive ? '0.06' : '0.04'})` }}
                whileHover={{ x: 3 }}>
                {/* Active left stripe */}
                <motion.div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                  style={{ background: CR }}
                  animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.25 }}
                  transition={{ duration: 0.32 }} />
                <div className="pl-4 lg:pl-4">
                  <div className="text-[9px] font-bold tracking-[0.2em] mb-0.5 transition-colors duration-300"
                    style={{ fontFamily: FONT_BADGE, color: isActive ? CR2 : 'rgba(255,255,255,0.22)' }}>
                    {feat.num} — {feat.tag}
                  </div>
                  <div className="font-semibold text-[12px] leading-tight transition-colors duration-300 whitespace-nowrap lg:whitespace-normal"
                    style={{ fontFamily: FONT_HEADING, color: isActive ? '#ffffff' : 'rgba(255,255,255,0.36)' }}>
                    {feat.title}
                  </div>
                  {/* Metric animates in when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div key="metric"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }} className="overflow-hidden mt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-black text-[17px] leading-none" style={{ fontFamily: FONT_HEADING, color: CR2 }}>{feat.metric}</span>
                          <span className="text-[8px] text-white/28 uppercase tracking-wide" style={{ fontFamily: FONT_BADGE }}>{feat.metricLabel}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}

          {/* Progress bar */}
          <div className="hidden lg:block px-4 mt-5 mb-3">
            <div className="h-px w-full rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div className="h-px rounded-full" style={{ background: CR }}
                animate={{ width: `${((active + 1) / features.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[8px] text-white/20" style={{ fontFamily: FONT_BADGE }}>01</span>
              <span className="text-[8px] text-white/20" style={{ fontFamily: FONT_BADGE }}>04</span>
            </div>
          </div>
        </div>

        {/* CENTER/RIGHT: cinematic image panel */}
        <div className="flex-1 relative overflow-hidden" style={{ minHeight: '46vw', maxHeight: '65vh' }}>
          {/* Sliding background image */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div key={`img-${active}`} className="absolute inset-0"
              custom={direction} variants={imgVariants} initial="enter" animate="center" exit="exit">
              <img src={f.img} alt={f.title} className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.28) saturate(0.55) contrast(1.1)' }} />
              {/* Overlays */}
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to right, ${BG5}F2 0%, ${BG5}AA 32%, transparent 68%)` }} />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${BG0}E5 0%, transparent 52%)` }} />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${BG2}55 0%, transparent 30%)` }} />
            </motion.div>
          </AnimatePresence>

          {/* Overlaid content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-9 lg:p-10 z-10">
            {/* Top row: tag chip + nav arrows */}
            <div className="flex items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.div key={`tag-${active}`}
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: `${CR}2A`, border: `1px solid ${CR}48` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: CR2 }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em]" style={{ fontFamily: FONT_BADGE, color: CR2 }}>
                    {f.num} / {f.tag}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Arrow controls */}
              <div className="flex gap-2">
                {[
                  { arrow: '‹', fn: () => goTo((active - 1 + features.length) % features.length) },
                  { arrow: '›', fn: () => goTo((active + 1) % features.length) },
                ].map((b, bi) => (
                  <button key={bi} onClick={b.fn}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/55 text-lg transition-all duration-300"
                    style={{ background: 'rgba(0,0,0,0.42)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(6px)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = CR; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = CR2; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.42)'; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}>
                    {b.arrow}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom: title + divider + body + metric */}
            <AnimatePresence mode="wait">
              <motion.div key={`content-${active}`}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12, ease: [0.22,1,0.36,1] } }}
                exit={{ opacity: 0, y: -18, transition: { duration: 0.28 } }}
                className="max-w-xl">

                <h3 className="text-white font-bold leading-tight mb-2"
                  style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.2rem,2.4vw,1.9rem)' }}>
                  {f.title}
                </h3>

                {/* Animated underline */}
                <motion.div className="h-px mb-3" style={{ background: `linear-gradient(to right, ${CR}88, transparent)` }}
                  initial={{ width: 0 }} animate={{ width: '55%' }} transition={{ duration: 0.65, delay: 0.22 }} />

                <p className="text-white/48 text-[12px] leading-relaxed mb-4 max-w-md" style={{ fontFamily: FONT_BODY }}>
                  {f.body}
                </p>

                <div className="flex items-center gap-5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-black leading-none" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.7rem,3vw,2.4rem)', color: CR2 }}>
                      {f.metric}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30" style={{ fontFamily: FONT_BADGE }}>
                      {f.metricLabel}
                    </span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <span className="text-[10px] text-white/30" style={{ fontFamily: FONT_BODY }}>{f.sub}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot nav — bottom right */}
          <div className="absolute bottom-5 right-6 flex gap-2 z-20">
            {features.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                style={{
                  width: i === active ? 20 : 6, height: 6, borderRadius: 99,
                  border: 'none', padding: 0, cursor: 'pointer',
                  background: i === active ? CR2 : 'rgba(255,255,255,0.22)',
                  transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
                }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-8">
        {/* Mobile horizontal tabs */}
        <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto pb-1">
          {features.map((feat, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-300"
              style={{ fontFamily: FONT_BADGE, background: active === i ? CR : 'rgba(255,255,255,0.06)', color: active === i ? '#fff' : 'rgba(255,255,255,0.40)', border: `1px solid ${active === i ? CR2 : 'rgba(255,255,255,0.08)'}` }}>
              {feat.num} {feat.tag}
            </button>
          ))}
        </div>

        {/* Mobile stats */}
        <div className="md:hidden grid grid-cols-4 gap-2 mt-3">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl px-2 py-2.5 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="font-black text-white text-[15px]" style={{ fontFamily: FONT_HEADING }}>
                <AnimatedCounter target={s.val} suffix={s.suf} />
              </div>
              <div className="text-[8px] text-white/25 uppercase tracking-wide mt-0.5" style={{ fontFamily: FONT_BADGE }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-5 pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[11px] text-white/20" style={{ fontFamily: FONT_BODY }}>Thirteen years of enterprise delivery across Saudi Arabia.</p>
          <MagneticButton href="#">
            <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] px-5 py-2.5 rounded-full transition-all duration-300"
              style={{ fontFamily: FONT_NAV, color: '#fff', border: `1.5px solid ${CR}45`, background: `${CR}0E` }}
              onMouseEnter={e => { e.currentTarget.style.background = CR; e.currentTarget.style.borderColor = CR; e.currentTarget.style.boxShadow = `0 4px 20px ${CR}50`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${CR}0E`; e.currentTarget.style.borderColor = `${CR}45`; e.currentTarget.style.boxShadow = 'none'; }}>
              Start a Conversation
              <span style={{ width: 17, height: 17, borderRadius: '50%', border: '1.5px solid currentColor', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>&#8594;</span>
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

// ─── SHARED LAYOUT ────────────────────────────────────────────────────────────
function SharedLayout() {
  const [isMenuOpen, setIsMenuOpen]             = useState(false);
  const [isArabic, setIsArabic]                 = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showWhatsApp, setShowWhatsApp]         = useState(false);
  const [scrollY, setScrollY]                   = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const lang = isArabic ? 'ar' : 'en';
  const t = {
    en: {
      home: 'Home', about: 'About', products: 'Products', services: 'Services', contact: 'Contact',
      wpHeader: 'Start a Conversation',
      wpSub: 'Hi! Click below to chat with our Customer Support on WhatsApp',
      wpCta: 'Customer Support Executive',
    },
    ar: {
      home: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629', about: '\u0645\u0646 \u0646\u062d\u0646', products: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      services: '\u0627\u0644\u062e\u062f\u0645\u0627\u062a', contact: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627',
      wpHeader: '\u0627\u0628\u062f\u0623 \u0645\u062d\u0627\u062f\u062b\u0629',
      wpSub: '\u0645\u0631\u062d\u0628\u0627! \u0627\u0646\u0642\u0631 \u0623\u062f\u0646\u0627\u0647 \u0644\u0644\u062f\u0631\u062f\u0634\u0629 \u0645\u0639 \u062f\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
      wpCta: '\u0645\u062f\u064a\u0631 \u062f\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
    },
  }[lang];

  useEffect(() => {
    const f = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="min-h-screen text-white" style={{ fontFamily: FONT_BODY, background: BG0 }}>
      <NoiseOverlay />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
        style={{ scaleX, background: `linear-gradient(to right, ${CR3}, ${CR2}, ${CR3})` }} />

      {/* ── NAVBAR ── */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
          background: scrollY > 60 ? 'rgba(6,8,15,0.52)' : 'rgba(0,0,0,0)',
          backdropFilter: scrollY > 60 ? 'blur(22px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrollY > 60 ? 'blur(22px) saturate(160%)' : 'none',
          borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          boxShadow: scrollY > 60 ? '0 4px 32px rgba(0,0,0,0.28)' : 'none',
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          <Link to="/"><img src={logo} alt="AIOON" className="h-8 md:h-9 w-auto brightness-[10]" /></Link>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: FONT_NAV }}>
            {[{ to: '/', label: t.home }, { to: '/about', label: t.about }, { to: '/products', label: t.products },
              { to: '/services', label: t.services }, { to: '/contact', label: t.contact }].map(({ to, label }) => (
              <li key={to} className="relative group cursor-pointer text-white/65 hover:text-white transition-colors duration-300">
                <Link to={to}>{label}</Link>
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-400" style={{ background: CR }} />
              </li>
            ))}
            <li className="relative">
              <button onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="text-sm font-semibold text-white/40 hover:text-white transition-colors duration-300" style={{ fontFamily: FONT_NAV }}>
                {isArabic ? 'EN' : '\u0639\u0631'}
              </button>
              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-32 rounded-xl shadow-2xl overflow-hidden"
                    style={{ background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    {[['en', 'English'], ['ar', '\u0627\u0644\u0639\u0631\u0628\u064a\u0629']].map(([code, label]) => (
                      <button key={code} onClick={() => { setIsArabic(code === 'ar'); setShowLangDropdown(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
                        style={{ fontFamily: FONT_NAV, color: (code === 'en') === !isArabic ? CR2 : 'rgba(255,255,255,0.55)', background: (code === 'en') === !isArabic ? `${CR}18` : undefined }}>
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
          <MagneticButton to="/"
            className="hidden md:inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-full text-sm text-white"
            style={{ fontFamily: FONT_NAV, background: CR, boxShadow: `0 4px 16px ${CR}40` }}>
            Book a call <span className="text-xs">&#8599;</span>
          </MagneticButton>
          <button className="md:hidden text-xl text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ background: 'rgba(6,8,15,0.97)', backdropFilter: 'blur(24px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
              className="md:hidden overflow-hidden">
              <div className="px-5 py-5 flex flex-col gap-4">
                {[{ to: '/', label: t.home }, { to: '/about', label: t.about }, { to: '/products', label: t.products },
                  { to: '/services', label: t.services }, { to: '/contact', label: t.contact }].map(({ to, label }) => (
                  <Link key={to} to={to} className="text-sm font-medium text-white/55 hover:text-white transition-colors py-1"
                    style={{ fontFamily: FONT_NAV }} onClick={() => setIsMenuOpen(false)}>{label}</Link>
                ))}
                <div className="flex gap-2 pt-1">
                  {[['en', 'English'], ['ar', '\u0627\u0644\u0639\u0631\u0628\u064a\u0629']].map(([code, label]) => (
                    <button key={code} onClick={() => { setIsArabic(code === 'ar'); setIsMenuOpen(false); }}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
                      style={{ fontFamily: FONT_NAV, background: (code === 'en') === !isArabic ? CR : 'rgba(255,255,255,0.09)' }}>
                      {label}
                    </button>
                  ))}
                </div>
                <Link to="/" className="text-white text-sm font-semibold px-5 py-3 rounded-full text-center"
                  style={{ background: CR, fontFamily: FONT_NAV }} onClick={() => setIsMenuOpen(false)}>
                  Book a call &#8599;
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <Outlet />

      {/* ── FOOTER ── */}
      <footer style={{ background: BG1, borderTop: '1px solid rgba(255,255,255,0.055)' }} className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <img src={logo} alt="AIOON" className="h-9 w-auto mb-5 brightness-[10] opacity-75" />
              <p className="text-gray-500 text-[12px] leading-relaxed max-w-xs mb-5" style={{ fontFamily: FONT_BODY }}>
                Pioneering digital transformation in Saudi Arabia with innovative technology solutions aligned with Vision 2030.
              </p>
              {/* Social icons — always visible in brand colors, plain (no box) */}
              <div className="flex items-center gap-5">
                {SOCIALS.map((social, i) => (
                  <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.15 }}
                    title={social.label}
                    className="flex items-center justify-center transition-all duration-200"
                    style={{ color: social.isGradient ? undefined : social.defaultColor, opacity: 0.85 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = ''; }}>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white/65 font-bold text-[13px] mb-5" style={{ fontFamily: FONT_HEADING }}>Quick Links</h4>
              <ul className="space-y-2.5">
                {[{ to: '/', label: t.home }, { to: '/about', label: t.about }, { to: '/products', label: t.products }].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-500 text-[12px] transition-colors duration-300 flex items-center gap-2 group"
                      style={{ fontFamily: FONT_NAV }}
                      onMouseEnter={e => { e.currentTarget.style.color = CR2; }}
                      onMouseLeave={e => { e.currentTarget.style.color = ''; }}>
                      <span className="w-0 group-hover:w-2.5 h-px transition-all duration-300" style={{ background: CR }} />{label}
                    </Link>
                  </li>
                ))}
                {[{ href: '/#services-section', label: t.services }, { href: '/#contact-section', label: t.contact }].map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="text-gray-500 text-[12px] transition-colors duration-300 flex items-center gap-2 group"
                      style={{ fontFamily: FONT_NAV }}
                      onMouseEnter={e => { e.currentTarget.style.color = CR2; }}
                      onMouseLeave={e => { e.currentTarget.style.color = ''; }}>
                      <span className="w-0 group-hover:w-2.5 h-px transition-all duration-300" style={{ background: CR }} />{label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/65 font-bold text-[13px] mb-5" style={{ fontFamily: FONT_HEADING }}>Contact</h4>
              <ul className="space-y-2.5">
                {['Riyadh, Saudi Arabia', 'info@aioon.com', '+966 535 141 447'].map((item, i) => (
                  <li key={i} className="text-gray-500 hover:text-gray-300 text-[12px] transition-colors duration-300 cursor-pointer" style={{ fontFamily: FONT_BODY }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}>
            <p className="text-gray-600 text-[11px]" style={{ fontFamily: FONT_BODY }}>&copy; {new Date().getFullYear()} AIOON Technologies. All rights reserved.</p>
            <p className="text-gray-600 text-[11px]" style={{ fontFamily: FONT_BODY }}>Proudly supporting Saudi Vision 2030 &#x1F1F8;&#x1F1E6;</p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP ── */}
      <motion.button onClick={() => setShowWhatsApp(!showWhatsApp)} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full shadow-xl transition-colors duration-300"
        style={{ background: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.22)' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WhatsApp" className="w-5 h-5" />
      </motion.button>
      <AnimatePresence>
        {showWhatsApp && (
          <>
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.88 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="fixed bottom-20 right-6 z-50 w-56 rounded-2xl shadow-2xl overflow-hidden"
              style={{ background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] px-4 py-3">
                <h3 className="text-white text-[12px] font-bold" style={{ fontFamily: FONT_HEADING }}>{t.wpHeader}</h3>
                <p className="text-white/70 text-[10px] mt-0.5" style={{ fontFamily: FONT_BODY }}>{t.wpSub}</p>
              </div>
              <div className="p-3">
                <a href="https://wa.me/966535141447" target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 rounded-xl transition-colors border duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WhatsApp" className="w-8 h-8 mb-2" />
                  <span className="font-bold text-white text-[11px]" style={{ fontFamily: FONT_BODY }}>{t.wpCta}</span>
                  <span className="text-[#25D366] text-[10px] mt-0.5 font-semibold" style={{ fontFamily: FONT_NAV }}>Chat Now &#8594;</span>
                </a>
              </div>
              <button onClick={() => setShowWhatsApp(false)} className="absolute top-2 right-2 text-white/55 hover:text-white bg-black/15 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold transition-colors">&times;</button>
            </motion.div>
            <div className="fixed inset-0 z-40" onClick={() => setShowWhatsApp(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const [activeElvIndex, setActiveElvIndex] = useState(0);
  const [elvDragging, setElvDragging]       = useState(false);
  const mainRef       = useRef(null);
  const svcSectionRef = useRef(null);
  const processRef    = useRef(null);
  const elvAutoRef    = useRef(null);

  const t = {
    heroTitle:   ['Where Technology', 'Meets Business Vision'],
    heroDesc:    "Aioon Technologies builds smart, scalable, and fully customized digital ecosystems. As Saudi Arabia's exclusive ENZAPPS support partner, we deliver seamless integration and future-ready solutions.",
    explore:     'Get in touch',
    viewServices:'View services',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo('.hero-badge-text', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.hero-line', { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: 0.14, duration: 1, ease: 'power4.out' }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-btn', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4')
        .fromTo('.hero-stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.orb-a', { x: 40, y: -30, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.orb-b', { x: -30, y: 40, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-label-line', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: svcSectionRef.current, start: 'top 82%', toggleActions: 'play none none none' } });
      gsap.fromTo('.svc-label-text', { opacity: 0, y: 12, letterSpacing: '0.7em' }, { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: svcSectionRef.current, start: 'top 82%', toggleActions: 'play none none none' }, delay: 0.15 });
      gsap.fromTo('.svc-heading-word', { opacity: 0, y: 65, skewY: 6 }, { opacity: 1, y: 0, skewY: 0, stagger: 0.13, duration: 0.95, ease: 'power4.out', scrollTrigger: { trigger: svcSectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }, delay: 0.2 });
      gsap.fromTo('.svc-header-desc', { opacity: 0, x: 35 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: svcSectionRef.current, start: 'top 78%', toggleActions: 'play none none none' }, delay: 0.5 });
      gsap.fromTo('.svc-divider', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: svcSectionRef.current, start: 'top 78%', toggleActions: 'play none none none' }, delay: 0.3 });
      gsap.utils.toArray('.svc-row').forEach((el, i) => { const col = i % 3; gsap.fromTo(el, { opacity: 0, x: col === 0 ? -55 : col === 2 ? 55 : 0, y: col === 1 ? 55 : 28, scale: 0.92 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.72, ease: 'power3.out', scrollTrigger: { trigger: svcSectionRef.current, start: 'top 72%', toggleActions: 'play none none none' }, delay: 0.08 + i * 0.09 }); });
      gsap.utils.toArray('.svc-card-num').forEach((el, i) => { gsap.fromTo(el, { scale: 2.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.2)', scrollTrigger: { trigger: svcSectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }, delay: 0.18 + i * 0.09 }); });
      gsap.fromTo('.svc-btn', { opacity: 0, y: 28, scale: 0.82 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(2)', scrollTrigger: { trigger: '.svc-btn', start: 'top 93%', toggleActions: 'play none none none' } });
      gsap.fromTo('.svc-stat', { opacity: 0, y: 30, scale: 0.75 }, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.55, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.svc-stat-bar', start: 'top 93%', toggleActions: 'play none none none' } });
      gsap.fromTo('.svc-stat-sep', { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, stagger: 0.1, duration: 0.45, ease: 'power2.out', scrollTrigger: { trigger: '.svc-stat-bar', start: 'top 93%', toggleActions: 'play none none none' }, delay: 0.45 });
      gsap.to('.svc-orb-a', { x: 55, y: -45, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.svc-orb-b', { x: -40, y: 55, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.5 });
      gsap.utils.toArray('.svc-shimmer').forEach((el, i) => { gsap.fromTo(el, { x: '-110%' }, { x: '210%', duration: 1.6, ease: 'power1.inOut', repeat: -1, repeatDelay: 3.5 + i * 0.65, delay: 2 + i * 0.45 }); });
    }, svcSectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { id: 1, number: '01', title: 'Enterprise Resource Planning',     shortDesc: 'Comprehensive management of Finance, HR, Inventory, Sales, and Manufacturing.',          features: ['Finance Management','HR Automation','Inventory Control','Sales Integration'],       bgImage: erpBg,                tag: 'ERP'   },
    { id: 2, number: '02', title: 'Customer Relationship Management', shortDesc: 'Intelligent tools for lead management, pipeline tracking, and customer engagement.',      features: ['Lead Management','Pipeline Tracking','Customer Analytics','Revenue Forecasting'],  bgImage: crmBg,                tag: 'CRM'   },
    { id: 3, number: '03', title: 'HR & Payroll Automation',          shortDesc: 'Automated workforce management with AI-driven attendance and precise payroll processing.', features: ['AI Attendance','Payroll Processing','Leave Management','Compliance Tracking'],    bgImage: hrPayrollBg,          tag: 'HCM'   },
    { id: 4, number: '04', title: 'Project & Construction ERP',       shortDesc: 'Tailored modules for contractors to manage budgets, resources, and timelines.',           features: ['Budget Management','Resource Allocation','Progress Tracking','Timeline Control'],  bgImage: projectConstructionBg, tag: 'PMO' },
    { id: 5, number: '05', title: 'AI & Business Analytics',          shortDesc: 'Data-driven dashboards and predictive insights across all business functions.',           features: ['Predictive Analytics','Interactive Dashboards','Machine Learning','Risk Assessment'], bgImage: aiAnalyticsBg,     tag: 'AI'   },
    { id: 6, number: '06', title: 'E-Invoicing & Compliance',         shortDesc: 'Seamless ZATCA-compliant e-invoicing integration with external devices.',                 features: ['ZATCA Compliance','Invoice Automation','Tax Reporting','Device Integration'],       bgImage: einvoiceBg,           tag: 'ZATCA'},
  ];

  const elvProducts = [
    { id: 1, number: '01', title: 'Passive Networking & Cabling', image: passiveNetworkingImg, category: 'Infrastructure', desc: 'High-performance cabling for reliable data transmission' },
    { id: 2, number: '02', title: 'Conferencing Solutions',        image: conferencingImg,      category: 'Communication',  desc: 'Advanced audio-visual systems for seamless collaboration' },
    { id: 3, number: '03', title: 'Audio & Visual Systems',        image: audioVisualImg,       category: 'Entertainment',  desc: 'Immersive audio and visual experiences for any space' },
    { id: 4, number: '04', title: 'CCTV & Video Management',       image: cctvImg,              category: 'Security',       desc: 'Intelligent surveillance with AI-powered video analytics' },
    { id: 5, number: '05', title: 'Integrated Security',           image: securitySystemsImg,   category: 'Security',       desc: 'Comprehensive security systems for complete protection' },
    { id: 6, number: '06', title: 'Parking Control',               image: parkingControlImg,    category: 'Access',         desc: 'Smart parking management with real-time guidance' },
    { id: 7, number: '07', title: 'Access Control',                image: accessControlImg,     category: 'Access',         desc: 'Secure entry solutions with biometric authentication' },
    { id: 8, number: '08', title: 'Smart Home',                    image: smartHomeImg,         category: 'Automation',     desc: 'Intelligent home automation for comfort and efficiency' },
    { id: 9, number: '09', title: 'Fire Alarm Systems',            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', category: 'Safety', desc: 'Early detection and emergency response systems' },
  ];

  const processSteps = [
    { num: '01', title: 'Smart Analyzing', desc: 'We assess your business processes, identifying pain points where AI can deliver maximum impact.' },
    { num: '02', title: 'AI Development',  desc: 'Our team builds custom AI solutions tailored to your needs, creating intelligent systems that learn.' },
    { num: '03', title: 'Implementation',  desc: 'We integrate solutions into your existing infrastructure ensuring smooth deployment and minimal disruption.' },
    { num: '04', title: 'Support & Scale', desc: 'We provide ongoing support and scale your solutions as you grow and your needs evolve.' },
  ];

  const marqueeItems = ['Enterprise ERP','CRM Solutions','AI Analytics','HR Automation','E-Invoicing','ELV Systems','Smart Home','Vision 2030'];

  const whoWeAreStats = [
    { val: 13,  suf: '+', label: 'Years of Legacy',     sub: 'Trusted expertise' },
    { val: 100, suf: '+', label: 'Industries Served',   sub: 'Diverse expertise' },
    { val: 500, suf: '+', label: 'Projects Delivered',  sub: 'Successful builds' },
    { val: 98,  suf: '%', label: 'Client Satisfaction', sub: 'Exceeding expectations' },
  ];

  useEffect(() => {
    if (elvDragging) return;
    elvAutoRef.current = setInterval(() => { setActiveElvIndex(p => (p + 1) % elvProducts.length); }, 3500);
    return () => clearInterval(elvAutoRef.current);
  }, [elvDragging]);

  const currentElv = elvProducts[activeElvIndex];

  return (
    <div ref={mainRef} style={{ fontFamily: FONT_BODY }}>

      {/* ── HERO — near-black ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24" style={{ background: BG0 }}>
        <div className="absolute inset-0">
          <img src={newBanner} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${BG0}F5 0%, ${BG0}CC 55%, ${BG0}66 100%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG0}BB 0%, transparent 60%)` }} />
        </div>
        <div className="absolute inset-0 opacity-[0.016]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="orb-a absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${CR}14` }} />
        <div className="orb-b absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: `${BG3}88` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p className="hero-badge-text text-white/45 text-[11px] font-semibold tracking-[0.2em] uppercase mb-5" style={{ fontFamily: FONT_BADGE }}>Saudi Arabia's Premier Tech Partner</p>
            <h1 className="font-black leading-[1.04] mb-4 text-white">
              {t.heroTitle.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="hero-line block text-[clamp(2.2rem,5.2vw,4rem)] font-bold" style={{ fontFamily: FONT_HERO, color: i === 1 ? CR2 : '#ffffff' }}>{line}</span>
                </div>
              ))}
            </h1>
            <p className="hero-desc text-white/48 text-sm md:text-[14px] leading-relaxed mb-6 max-w-md font-light" style={{ fontFamily: FONT_BODY }}>{t.heroDesc}</p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <MagneticButton href="#" className="hero-btn group relative overflow-hidden text-white font-semibold px-7 py-3 rounded-full text-sm transition-all duration-300"
                style={{ fontFamily: FONT_NAV, background: CR, boxShadow: `0 8px 24px ${CR}40` }}>
                <span className="relative z-10 flex items-center gap-2">{t.explore}<span className="group-hover:translate-x-1 transition-transform inline-block">&#8594;</span></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </MagneticButton>
              <a href="#services-section" className="hero-btn group flex items-center gap-3 text-white/50 hover:text-white/85 text-sm font-medium transition-colors duration-300" style={{ fontFamily: FONT_NAV }}>
                <span className="w-9 h-9 rounded-full border border-white/18 flex items-center justify-center group-hover:border-white/45 group-hover:bg-white/8 transition-all text-base">&#8595;</span>
                {t.viewServices}
              </a>
            </div>
            <div className="flex flex-wrap gap-8 pt-5 border-t border-white/[0.09]">
              {[{ v: '13+', l: 'Years Legacy' }, { v: '100+', l: 'Industries' }, { v: '500+', l: 'Projects' }].map((s, i) => (
                <div key={i} className="hero-stat">
                  <div className="text-white font-black text-2xl md:text-3xl" style={{ fontFamily: FONT_HEADING }}>{s.v}</div>
                  <div className="text-white/28 text-[10px] uppercase tracking-widest mt-0.5 font-medium" style={{ fontFamily: FONT_BADGE }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <motion.div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.25, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }} />
          <span className="text-white/22 text-[9px] uppercase tracking-[0.25em] font-medium" style={{ fontFamily: FONT_BADGE }}>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE — mid navy ── */}
      <div className="py-3.5 overflow-hidden" style={{ background: BG2 }}><Marquee items={marqueeItems} /></div>

      {/* ── WHO WE ARE — dark slate teal, with bg image ── */}
      <section className="relative py-12 md:py-16 overflow-hidden" style={{ background: BG6 }}>
        <div className="absolute inset-0">
          <img src={aiAnalyticsBg} alt="" className="w-full h-full object-cover" style={{ opacity: 0.18, filter: 'grayscale(18%)', objectPosition: 'center 20%' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${BG6}F0 0%, ${BG2}CC 50%, ${BG6}EE 100%)` }} />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-[360px] h-[240px] rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse, ${CR}0C 0%, transparent 70%)`, transform: 'translate(20%, -30%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div className="mb-7" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-px" style={{ background: CR }} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: FONT_BADGE, color: CR2 }}>Who We Are</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: FONT_HEADING }}>
              We're Your <span style={{ color: CR2 }}>Innovation</span> Partner
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-0 md:divide-x md:divide-white/[0.065] mb-8">
            {[
              (<><span className="text-white font-semibold" style={{ fontFamily: FONT_BODY }}>Aioon Technologies</span> is a dedicated technology partner for enterprises in KSA, specializing in advanced business software and digital transformation.</>),
              (<>We deliver cutting-edge solutions across software and hardware, with a core focus on total integration and deep customization. Our strength lies in transforming complex business needs into seamless, scalable systems.</>),
              (<>We serve as an exclusive support partner in KSA for <span className="font-semibold" style={{ color: CR2 }}>ENZAPPS Software Solutions</span>, with 13+ years of legacy and a vast customer base across industries.</>),
            ].map((para, i) => (
              <motion.div key={i} className={`pb-6 md:pb-0 ${i > 0 ? 'md:px-8 pt-6 md:pt-0' : 'md:pr-8'}`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
                <div className="w-6 h-0.5 mb-3" style={{ background: CR }} />
                <p className="text-white/48 text-[12px] leading-relaxed" style={{ fontFamily: FONT_BODY }}>{para}</p>
                {i === 2 && (
                  <div className="mt-4">
                    <MagneticButton to="/about"
                      className="inline-flex items-center gap-2 font-semibold px-5 py-2 rounded-full text-xs transition-all duration-300"
                      style={{ fontFamily: FONT_NAV, color: 'rgba(255,255,255,0.48)', border: '1px solid rgba(255,255,255,0.14)' }}>
                      Learn More <span>&#8594;</span>
                    </MagneticButton>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.065)' }}>
            <div className="flex flex-wrap md:flex-nowrap items-stretch" style={{ borderLeft: '1px solid rgba(255,255,255,0.065)' }}>
              {whoWeAreStats.map((stat, i) => (
                <motion.div key={i} className="flex-1 min-w-[90px] px-5 py-2 group cursor-default"
                  style={{ borderRight: '1px solid rgba(255,255,255,0.065)' }}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div className="text-xl font-bold mb-0.5 transition-colors duration-300" style={{ fontFamily: FONT_HEADING, color: CR2 }}>
                    <AnimatedCounter target={stat.val} suffix={stat.suf} />
                  </div>
                  <div className="text-white font-semibold text-[10px] leading-tight" style={{ fontFamily: FONT_BODY }}>{stat.label}</div>
                  <div className="text-white/22 text-[9px] uppercase tracking-widest mt-0.5" style={{ fontFamily: FONT_BADGE }}>{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES — dark charcoal gradient ── */}
      <section id="services-section" ref={svcSectionRef} className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${BG4} 0%, ${BG1} 100%)` }}>
        <div className="absolute inset-0 opacity-[0.016]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="svc-orb-a absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse at top right,${CR}09 0%,transparent 65%)` }} />
        <div className="svc-orb-b absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none" style={{ background: `radial-gradient(ellipse at bottom left,${BG3}66 0%,transparent 70%)` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-10 pb-8 svc-divider" style={{ borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="svc-label-line w-6 h-px" style={{ background: CR }} />
                <span className="svc-label-text text-[10px] font-bold tracking-[0.35em] uppercase" style={{ fontFamily: FONT_BADGE, color: CR2 }}>Our Services</span>
              </div>
              <h2 className="font-bold text-white leading-[1.0]" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(2.2rem,5vw,3.8rem)' }}>
                <span className="svc-heading-word block overflow-hidden">Enterprise</span>
                <span className="svc-heading-word block overflow-hidden" style={{ color: CR2 }}>Solutions</span>
              </h2>
            </div>
            <p className="svc-header-desc text-white/38 text-[12px] leading-relaxed max-w-[260px] md:text-right" style={{ fontFamily: FONT_BODY }}>Advanced digital ecosystems designed to optimize operations and drive sustainable growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-1">
            {services.map((svc) => (
              <motion.div key={svc.id} className="svc-row group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-400"
                style={{ minHeight: '170px', border: '1px solid rgba(255,255,255,0.055)' }}
                whileHover={{ y: -3, scale: 1.012 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <div className="absolute inset-0 z-0">
                  <img src={svc.bgImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${BG0}EB 0%,${BG0}D1 42%,${BG0}8C 72%,${BG0}3D 100%)` }} />
                  <div className="svc-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-[-20deg] pointer-events-none z-20" style={{ left: '-33%' }} />
                </div>
                <motion.div className="absolute bottom-0 left-0 h-[2px] z-10" style={{ background: `linear-gradient(to right, ${CR}, ${CR2}, transparent)` }}
                  initial={{ width: '0%' }} whileHover={{ width: '100%' }} transition={{ duration: 0.5 }} />
                <div className="relative z-10 p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="svc-card-num text-[10px] font-black tracking-widest text-white/28 transition-colors duration-300" style={{ fontFamily: FONT_HEADING }}>{svc.number}</span>
                    <span className="text-[8px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded-full text-white/45" style={{ fontFamily: FONT_BADGE, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>{svc.tag}</span>
                  </div>
                  <h3 className="font-bold leading-tight mb-1.5 transition-colors duration-300" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(0.78rem,1.2vw,0.9rem)', color: CR2 }}>{svc.title}</h3>
                  <p className="text-white/42 text-[10px] leading-relaxed mb-2.5 flex-1" style={{ fontFamily: FONT_BODY }}>{svc.shortDesc}</p>
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {svc.features.slice(0, 2).map((ff, fi) => (
                      <span key={fi} className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.42)', fontFamily: FONT_BODY }}>{ff}</span>
                    ))}
                    {svc.features.length > 2 && (
                      <span className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.22)', fontFamily: FONT_BODY }}>+{svc.features.length - 2}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold transition-all duration-300" style={{ fontFamily: FONT_NAV, color: CR2 }}>
                    Explore <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]" style={{ background: `${CR}18`, border: `1px solid ${CR}30` }}>&#8594;</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="svc-btn flex justify-center mt-6 mb-1">
            <MagneticButton href="#" className="group inline-flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-full text-[11px] uppercase tracking-widest transition-all duration-400"
              style={{ fontFamily: FONT_NAV, background: CR, boxShadow: `0 8px 28px ${CR}38` }}>
              View All Services <span className="w-5 h-5 rounded-full bg-white/12 flex items-center justify-center text-[10px]">&#8594;</span>
            </MagneticButton>
          </div>
          <div className="svc-stat-bar flex flex-wrap items-center justify-between gap-4 py-5 mt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}>
            {[['06','Core Solutions'],['100+','Industries'],['500+','Projects'],['KSA','Exclusive Partner']].map(([val, label], i) => (
              <div key={i} className="svc-stat flex items-center gap-3 group cursor-default">
                <span className="text-[18px] md:text-xl font-bold" style={{ fontFamily: FONT_HEADING, color: CR2 }}>{val}</span>
                <span className="text-[9px] text-white/38 uppercase tracking-widest font-semibold" style={{ fontFamily: FONT_BADGE }}>{label}</span>
                {i < 3 && <span className="svc-stat-sep hidden sm:block w-px h-4 ml-2" style={{ background: 'rgba(255,255,255,0.07)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELV — cool dark slate ── */}
      <section className="relative py-10 md:py-14 overflow-hidden" style={{ background: BG5 }}>
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '35px 35px' }} />
        <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: `${CR}18` }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-block text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3" style={{ fontFamily: FONT_BADGE, background: CR }}>ELV Solutions</span>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontFamily: FONT_HEADING }}>Extra Low <span style={{ color: CR2 }}>Voltage Systems</span></h2>
                <p className="text-gray-500 text-[11px] leading-relaxed max-w-xs" style={{ fontFamily: FONT_BODY }}>Comprehensive low voltage infrastructure for modern buildings and smart cities.</p>
              </div>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-[1fr_340px] gap-5 items-stretch">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: '340px' }} onMouseEnter={() => setElvDragging(true)} onMouseLeave={() => setElvDragging(false)}>
              <AnimatePresence mode="wait">
                <motion.div key={`img-${currentElv.id}`} className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                  <img src={currentElv.image} alt={currentElv.title} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,12,21,0.90) 0%, rgba(5,12,21,0.30) 60%, transparent 100%)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,12,21,0.40) 0%, transparent 60%)' }} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-4 left-5 text-[5rem] font-black leading-none select-none pointer-events-none" style={{ fontFamily: FONT_HEADING, color: 'rgba(255,255,255,0.05)' }}>{currentElv.number}</div>
              <div className="absolute top-4 right-4"><span className="text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full" style={{ fontFamily: FONT_BADGE, background: `${CR}E6` }}>{currentElv.category}</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <AnimatePresence mode="wait">
                  <motion.div key={`info-${currentElv.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                    <div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-bold" style={{ fontFamily: FONT_BADGE, color: CR2 }}>{currentElv.number}</span><div className="w-4 h-px" style={{ background: `${CR}60` }} /></div>
                    <h3 className="text-white text-[17px] font-bold leading-tight mb-1" style={{ fontFamily: FONT_HEADING }}>{currentElv.title}</h3>
                    <p className="text-gray-400 text-[11px] leading-relaxed" style={{ fontFamily: FONT_BODY }}>{currentElv.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              {[
                { pos: 'left-3', fn: () => { setElvDragging(true); setActiveElvIndex(i => (i - 1 + elvProducts.length) % elvProducts.length); setTimeout(() => setElvDragging(false), 4000); }, arrow: '&#8249;' },
                { pos: 'right-3', fn: () => { setElvDragging(true); setActiveElvIndex(i => (i + 1) % elvProducts.length); setTimeout(() => setElvDragging(false), 4000); }, arrow: '&#8250;' },
              ].map((b, bi) => (
                <button key={bi} onClick={b.fn}
                  className={`absolute ${b.pos} top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/65 text-sm backdrop-blur-sm transition-all duration-300`}
                  onMouseEnter={e => { e.currentTarget.style.background = CR; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.40)'; e.currentTarget.style.color = ''; }}
                  dangerouslySetInnerHTML={{ __html: b.arrow }} />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1 overflow-y-auto" style={{ maxHeight: '340px', scrollbarWidth: 'none' }}>
                <div className="flex flex-col gap-1.5">
                  {elvProducts.map((p, i) => (
                    <motion.button key={p.id} onClick={() => { setActiveElvIndex(i); setElvDragging(true); setTimeout(() => setElvDragging(false), 4000); }}
                      whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                      className="flex items-center gap-2.5 p-2 rounded-lg text-left transition-all duration-300"
                      style={{ background: activeElvIndex === i ? `${CR}20` : 'rgba(255,255,255,0.025)', border: `1px solid ${activeElvIndex === i ? CR + '35' : 'rgba(255,255,255,0.05)'}` }}>
                      <div className="w-10 h-8 rounded-md overflow-hidden shrink-0"><img src={p.image} alt={p.title} className="w-full h-full object-cover" /></div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold mb-0.5" style={{ fontFamily: FONT_BADGE, color: `${CR2}AA` }}>{p.number}</div>
                        <div className="text-[10px] font-semibold leading-tight truncate" style={{ fontFamily: FONT_BODY, color: activeElvIndex === i ? '#ffffff' : 'rgba(255,255,255,0.42)' }}>{p.title}</div>
                      </div>
                      {activeElvIndex === i && <div className="ml-auto w-1 h-4 rounded-full shrink-0" style={{ background: CR }} />}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 justify-center pt-1">
                {elvProducts.map((_, i) => (
                  <button key={i} onClick={() => { setActiveElvIndex(i); setElvDragging(true); setTimeout(() => setElvDragging(false), 4000); }}
                    className="rounded-full transition-all duration-400"
                    style={{ width: i === activeElvIndex ? 20 : 6, height: 6, background: i === activeElvIndex ? CR : 'rgba(255,255,255,0.14)', border: 'none', padding: 0, cursor: 'pointer' }} />
                ))}
                <span className="text-[9px] text-gray-600 ml-2" style={{ fontFamily: FONT_BODY }}>{activeElvIndex + 1}/{elvProducts.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS — gradient dark → navy ── */}
      <section ref={processRef} className="py-12 md:py-16 relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${BG1} 0%, ${BG5} 50%, ${BG0} 100%)` }}>
        <div className="absolute inset-0 opacity-[0.016]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: FONT_BADGE, color: CR2 }}>Our Process</span>
                <span className="w-6 h-px" style={{ background: `${CR}40` }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: FONT_HEADING }}>
                Simple, Smart <span style={{ color: CR2 }}>&amp; Scalable</span>
              </h2>
            </div>
            <p className="text-gray-500 text-[11px] max-w-xs leading-relaxed" style={{ fontFamily: FONT_BODY }}>We design, develop, and implement automation tools that help you work smarter.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.055] rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.055)' }}>
            {processSteps.map((step, i) => (
              <motion.div key={i} className="group relative p-6 cursor-default overflow-hidden transition-colors duration-400"
                style={{ background: BG2 }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={e => { e.currentTarget.style.background = CR; }}
                onMouseLeave={e => { e.currentTarget.style.background = BG2; }}>
                <div className="absolute -right-3 -bottom-4 text-[6rem] font-black leading-none select-none pointer-events-none opacity-[0.04]" style={{ fontFamily: FONT_HEADING }}>{step.num}</div>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-widest mb-3 block" style={{ fontFamily: FONT_BADGE, color: CR2 }}>{step.num}</span>
                  <div className="w-5 h-0.5 mb-3 group-hover:w-8 transition-all duration-400" style={{ background: CR }} />
                  <h3 className="text-[13px] font-bold text-white mb-1.5" style={{ fontFamily: FONT_HEADING }}>{step.title}</h3>
                  <p className="text-[11px] text-gray-500 group-hover:text-white/65 leading-relaxed transition-colors duration-400" style={{ fontFamily: FONT_BODY }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <WhyChooseUs />

      {/* ── CONTACT — rich navy ── */}
      <section id="contact-section" className="py-10 md:py-14 relative overflow-hidden" style={{ background: BG3 }}>
        <div className="absolute inset-0 opacity-[0.016]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: `${CR}14` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-px" style={{ background: CR }} />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: FONT_BADGE, color: CR2 }}>Contact Us</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3" style={{ fontFamily: FONT_HEADING }}>
                Ready for Digital<br /><span style={{ color: CR2 }}>Transformation?</span>
              </h2>
              <p className="text-white/42 text-[11px] leading-relaxed mb-5 max-w-xs" style={{ fontFamily: FONT_BODY }}>Our team is ready to guide you from discovery to deployment.</p>
              <MagneticButton href="#" className="inline-flex items-center gap-2.5 text-white font-semibold px-6 py-3 rounded-full text-xs transition-all duration-300"
                style={{ fontFamily: FONT_NAV, background: CR, boxShadow: `0 6px 20px ${CR}38` }}>
                Schedule a Meeting <span>&#8594;</span>
              </MagneticButton>
            </motion.div>
            <motion.div className="grid grid-cols-3 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.055)', background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              {[
                { icon: '\u2709', label: 'Email',    text: 'info@aioon.com',   href: 'mailto:info@aioon.com', sub: 'Write to us' },
                { icon: '\u{1F4DE}', label: 'Phone', text: '+966 535 141 447', href: 'tel:+966535141447',     sub: 'Call anytime' },
                { icon: '\u{1F4CD}', label: 'Location', text: 'Riyadh, KSA',  href: '#',                     sub: 'Saudi Arabia' },
              ].map((item, i) => (
                <motion.a key={i} href={item.href} className="flex flex-col justify-between p-4 group transition-colors duration-300"
                  style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.055)' : 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${CR}14`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-white/18 group-hover:text-white/50 transition-colors text-[10px]">&#8599;</span>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-white/32 uppercase tracking-widest mb-1" style={{ fontFamily: FONT_BADGE }}>{item.label}</div>
                    <div className="text-[11px] font-semibold mb-0.5 leading-tight text-white" style={{ fontFamily: FONT_BODY }}>{item.text}</div>
                    <div className="text-white/28 text-[9px]" style={{ fontFamily: FONT_BODY }}>{item.sub}</div>
                  </div>
                  <div className="h-px w-0 group-hover:w-full transition-all duration-400 mt-3" style={{ background: `${CR}55` }} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route element={<SharedLayout />}>
        <Route path="/"            element={<HomePage />} />
        <Route path="/about"       element={<AboutUs />} />
        <Route path="/products"    element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/services"    element={<Services />} />
        <Route path="/services/erp"              element={<ERP />} />
        <Route path="/services/crm"              element={<CRM />} />
        <Route path="/services/hr"               element={<HR />} />
        <Route path="/services/construction"     element={<Construction />} />
        <Route path="/services/ai-and-analytics" element={<AIAnalytics />} />
        <Route path="/services/e-invoicing"      element={<EInvoicing />} />
        <Route path="/contact"                   element={<Contact />} />
      </Route>
    </Routes>
  );
}