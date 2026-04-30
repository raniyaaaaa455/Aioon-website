import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from './assets/Aioon_logo-01.png';
import enzappLogo from './assets/enzapp.jpeg';
import crmBg from './assets/CRM.webp';
import erpBg from './assets/ERP.webp';
import hrPayrollBg from './assets/HRandPAYROLL.webp';
import projectConstructionBg from './assets/ProjectsandconstructionsERP.webp';
import aiAnalyticsBg from './assets/AIandBUSINESS.png';
import einvoiceBg from './assets/Einvoiceandcompliance.webp';
import newBanner from './assets/newrobot.png';
import scalableArchImg from './assets/1.png';
import aboutImg from './assets/ABOUT.jpg';
import aiBusinessImg from './assets/AIandBUSINESS.png';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AIAgents from "./AIAgents";
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

// ─── COLOUR PALETTE ───────────────────────────────────────────────────────────
const ACCENT       = '#2B55C5';
const ACCENT2      = '#1E45A8';
const ACCENT3      = '#5578D4';
const ACCENT_SOFT  = '#EEF2FB';
const TEXT_PRIMARY = '#1A1A1A';
const TEXT_SEC     = '#4A4A4A';
const TEXT_MUTED   = '#8A8A8A';
const BORDER       = '#E5E5E5';
const BG_WHITE     = '#FFFFFF';
const BG_LIGHT     = '#F7F7F7';
const BG_LIGHTER   = '#F0F2F5';
const BG_DARK      = '#1A1A1A';
const BG_DARK2     = '#111111';
const FOOTER_BG    = '#F2F4F8';

// ─── ELV SOLUTIONS DROPDOWN ITEMS ─────────────────────────────────────────────
const ELV_DROPDOWN_ITEMS = [
  {
    name: 'Passive Networking',
    shortName: 'Structured Cabling',
    productId: 1,
    description: 'Enterprise-grade cabling',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <rect x="2" y="2" width="6" height="4" rx="1"/><rect x="16" y="2" width="6" height="4" rx="1"/>
        <rect x="9" y="10" width="6" height="4" rx="1"/><rect x="2" y="18" width="6" height="4" rx="1"/>
        <rect x="16" y="18" width="6" height="4" rx="1"/>
        <path d="M5 6v4M19 6v4M12 14v4M5 18v-4M19 18v-4M5 14h14" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Conferencing',
    shortName: 'Meeting Hall',
    productId: 2,
    description: 'Smart AV solutions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4" strokeLinecap="round"/>
        <circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/>
        <path d="M6 14s1-2 6-2 6 2 6 2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Audio & Visual',
    shortName: 'Systems',
    productId: 3,
    description: 'Professional AV integration',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'CCTV & VMS',
    shortName: 'Surveillance',
    productId: 4,
    description: 'Video management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
        <circle cx="8.5" cy="12" r="2.5" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: 'Parking Control',
    shortName: 'Guidance',
    productId: 6,
    description: 'Smart parking',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <path d="M9 17V7h5a3 3 0 0 1 0 6H9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Access Control',
    shortName: 'E Gates',
    productId: 7,
    description: 'Biometric access',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'SmartHome',
    shortName: 'Automation',
    productId: 8,
    description: 'Home automation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
        <circle cx="17" cy="8" r="1.5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  },
];

// ─── SOCIAL ICONS ─────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aioon-technologies',
    icon: (
      <svg viewBox="0 0 24 24" fill="#0A66C2" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/aioon.technologies',
    icon: (
      <svg viewBox="0 0 24 24" fill="#1877F2" width="18" height="18">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/aioon.tech',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <defs>
          <linearGradient id="igGradientFooter" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="25%" stopColor="#e6683c"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="75%" stopColor="#cc2366"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
        <path fill="url(#igGradientFooter)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

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
            <span key={j} className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
              {item} <span className="w-1 h-1 rounded-full inline-block" style={{ background: ACCENT }} />
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// ─── AI-AGENT SOLUTIONS SECTION ───────────────────────────────────────────────
function AiAgentSolutions() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef(null);
  const sectionRef = useRef(null);

  const solutions = [
    {
      id: 0,
      tag: 'HRMS',
      label: 'Attendance & HR',
      headline: 'Attendance Made Simple with AI Agents',
      purpose: 'Eliminate biometric hardware and manual timesheets. Employees mark attendance via WhatsApp AI chat — location-verified, policy-compliant, and instant.',
      value: 'Accurate attendance across multiple sites, zero hardware costs, and seamless payroll handoff. HR teams reclaim hours spent chasing records.',
      features: ['WhatsApp Check-In/Out', '6-Layer Security', 'Leave Automation', 'Payroll Integration', 'Location Validation'],
      color: '#0EA5E9',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80',
      aiPageId: 'hrms',
    },
    {
      id: 1,
      tag: 'Trading',
      label: 'Trading & Distribution',
      headline: 'AI-Driven Sales & Support Automation',
      purpose: 'From inquiry to delivery, every touchpoint is automated. AI agents create quotations, route tickets, and send WhatsApp updates — no manual follow-up needed.',
      value: 'Faster deal cycles, fewer support escalations, and a consistent customer experience that scales without adding headcount.',
      features: ['Auto Quotation', 'Ticket Routing', 'WhatsApp Alerts', 'CRM Sync', 'Approval Workflows'],
      color: ACCENT,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
      aiPageId: 'trading',
    },
    {
      id: 2,
      tag: 'Hospitality',
      label: 'Hotel & Hospitality',
      headline: 'Elevate Every Guest Touchpoint',
      purpose: 'Guests request housekeeping, room service, and dining through a single WhatsApp thread. AI routes instantly to the right department — no app, no waiting.',
      value: 'Faster response times, higher guest satisfaction scores, and operational coordination that runs itself — so your staff can focus on hospitality.',
      features: ['Guest Request Handling', 'Dept. Notifications', 'Real-Time Tracking', 'Human Handover', 'Feedback Collection'],
      color: '#F59E0B',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
      aiPageId: 'hotel',
    },
    {
      id: 3,
      tag: 'Laundry',
      label: 'Laundry Management',
      headline: 'End-to-End Laundry, Fully Automated',
      purpose: 'Pickup requests, route assignment, stage alerts, and delivery confirmations — all handled by AI through WhatsApp. No mobile app required from the customer.',
      value: 'Reduced turnaround time, real-time visibility for managers, and a frictionless customer journey that drives repeat business.',
      features: ['Pickup Requests', 'Route Assignment', 'Stage Alerts', 'Payment Gateway', 'No App Required'],
      color: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1600&q=80',
      aiPageId: 'laundry',
    },
    {
      id: 4,
      tag: 'Property',
      label: 'Property Management',
      headline: 'Smarter Property Communication',
      purpose: 'AI handles inquiries, availability checks, viewing schedules, and maintenance requests — keeping owner and tenant data private at every step.',
      value: 'Centralized communication, faster tenant resolution, and full data privacy compliance — without hiring additional coordinators.',
      features: ['Inquiry Management', 'Privacy Protection', 'Maintenance Routing', 'Tenant Feedback', 'Availability Sync'],
      color: '#10B981',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
      aiPageId: 'property',
    },
    {
      id: 5,
      tag: 'ERP',
      label: 'Odoo Implementation',
      headline: 'Scalable ERP Built Around Your Business',
      purpose: 'Enterprise and Community Odoo configured for your exact industry workflows — from initial setup through monthly support, enhancements, and scaling.',
      value: 'A stable, evolving ERP backbone with dedicated specialists and priority response — so your operations never stall waiting on software.',
      features: ['Enterprise & Community', 'Monthly Support', 'Priority Response', 'Custom Modules', 'KSA Compliance'],
      color: ACCENT,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      aiPageId: 'odoo',
    },
  ];

  const handleViewDetails = () => {
    const currentSol = solutions[activeSlide];
    navigate('/ai-agents', { state: { activeSolutionId: currentSol.aiPageId, scrollToOverview: true } });
  };

  const goTo = (idx) => {
    if (animating || idx === activeSlide) return;
    setAnimating(true);
    setPrev(activeSlide);
    setActiveSlide(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 800);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setAnimating(true);
      setActiveSlide(p => {
        setPrev(p);
        return (p + 1) % solutions.length;
      });
      setTimeout(() => { setPrev(null); setAnimating(false); }, 800);
    }, 8000);
    return () => clearInterval(autoRef.current);
  }, []);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setAnimating(true);
      setActiveSlide(p => {
        setPrev(p);
        return (p + 1) % solutions.length;
      });
      setTimeout(() => { setPrev(null); setAnimating(false); }, 800);
    }, 8000);
  };

  const handleGo = (idx) => { goTo(idx); resetAuto(); };
  const sol = solutions[activeSlide];

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: BG_LIGHT }}>
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="font-bold leading-[1.08]" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(2rem,4.5vw,3rem)', color: TEXT_PRIMARY }}>
              Intelligent Agents for<br /><span style={{ color: ACCENT }}>Every Industry</span>
            </h2>
          </div>
          <p className="text-[12px] leading-relaxed max-w-[280px] md:text-right" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
            Powered by ENZAPPS and marketed by Aioon —<br />a complete AI-Agent solution for your business.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(480px, 68vh, 660px)' }}>
        <AnimatePresence>
          {prev !== null && (
            <motion.div key={`bg-prev-${prev}`} className="absolute inset-0"
              initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}>
              <img src={solutions[prev].image} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.7)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div key={`bg-${activeSlide}`} className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <img src={sol.image} alt={sol.label} className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.7)' }} />
        </motion.div>

        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 38%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.15) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(247,247,247,0.92) 0%, transparent 50%)' }} />

        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at right center, ${sol.color}18 0%, transparent 70%)`, transition: 'background 0.8s ease' }} />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
              <AnimatePresence mode="wait">
                <motion.div key={`content-${activeSlide}`}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 32 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.28em]"
                        style={{ background: `${sol.color}18`, color: sol.color, border: `1px solid ${sol.color}35`, fontFamily: FONT_BADGE }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: sol.color }} />
                        {sol.tag} · AI-Agent
                      </span>
                      <span className="text-[9px] font-medium" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>
                        {String(activeSlide + 1).padStart(2, '0')} / {String(solutions.length).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleGo((activeSlide - 1 + solutions.length) % solutions.length)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300"
                        style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, color: TEXT_SEC, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = ACCENT; }}
                        onMouseLeave={e => { e.currentTarget.style.background = BG_WHITE; e.currentTarget.style.color = TEXT_SEC; e.currentTarget.style.borderColor = BORDER; }}>
                        ‹
                      </button>
                      <button onClick={() => handleGo((activeSlide + 1) % solutions.length)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300"
                        style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, color: TEXT_SEC, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = ACCENT; }}
                        onMouseLeave={e => { e.currentTarget.style.background = BG_WHITE; e.currentTarget.style.color = TEXT_SEC; e.currentTarget.style.borderColor = BORDER; }}>
                        ›
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold leading-[1.1] mb-4"
                    style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.5rem,3vw,2.4rem)', color: TEXT_PRIMARY }}>
                    {sol.headline}
                  </h3>

                  <motion.div className="h-[2px] mb-5 rounded-full" style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }}
                    initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 0.7, delay: 0.2 }} />

                  <div className="mb-4">
                    <div className="text-[9px] font-bold uppercase tracking-[0.22em] mb-1.5" style={{ fontFamily: FONT_BADGE, color: sol.color }}>What it does</div>
                    <p className="text-[12px] leading-relaxed max-w-lg" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>{sol.purpose}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-[9px] font-bold uppercase tracking-[0.22em] mb-1.5" style={{ fontFamily: FONT_BADGE, color: sol.color }}>Business value</div>
                    <p className="text-[12px] leading-relaxed max-w-lg" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>{sol.value}</p>
                  </div>

                  <button
                    onClick={handleViewDetails}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-white text-[11px] transition-all duration-300"
                    style={{ background: sol.color, fontFamily: FONT_NAV, boxShadow: `0 6px 20px ${sol.color}35`, border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
                    View Details →
                  </button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div key={`card-${activeSlide}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden lg:block">
                  <div className="rounded-2xl overflow-hidden"
                    style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                    <div className="px-5 py-4 flex items-center justify-between"
                      style={{ background: `${sol.color}0D`, borderBottom: `1px solid ${BORDER}` }}>
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ fontFamily: FONT_BADGE, color: sol.color }}>Package Includes</div>
                        <div className="font-bold text-[13px]" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>{sol.label}</div>
                      </div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-[11px]"
                        style={{ background: sol.color, fontFamily: FONT_HEADING }}>
                        {String(activeSlide + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {sol.features.map((f, fi) => (
                        <motion.div key={fi}
                          initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.18 + fi * 0.07 }}
                          className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ background: BG_LIGHT, border: `1px solid ${BORDER}` }}>
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sol.color }} />
                          <span className="text-[11px] font-semibold" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>{f}</span>
                          <span className="ml-auto text-[9px] font-bold" style={{ color: sol.color }}>✓</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-4 pb-4">
                      <div className="text-[9px] text-center mb-2 font-medium" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>+ Always included</div>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {['WhatsApp Chatbot', 'Email Automation', 'CRM Integration'].map((item, ii) => (
                          <span key={ii} className="text-[9px] px-2.5 py-1 rounded-full font-semibold"
                            style={{ background: BG_LIGHTER, color: TEXT_MUTED, border: `1px solid ${BORDER}`, fontFamily: FONT_BODY }}>
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="text-center text-[9px] mt-3" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>
                        A Product of ENZAPPS · Marketed by Aioon
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ─────────────────────────────────────────────────────────────
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
    <section className="relative overflow-hidden" style={{ background: BG_WHITE }}>
      <div className="w-full h-px" style={{ background: BORDER }} />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-bold leading-tight" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: TEXT_PRIMARY }}>
              Built Different. <span style={{ color: ACCENT }}>Proven Better.</span>
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-2.5">
            {stats.map((s, i) => (
              <motion.div key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}>
                <span className="font-black" style={{ fontFamily: FONT_HEADING, fontSize: '15px', color: ACCENT }}>
                  <AnimatedCounter target={s.val} suffix={s.suf} />
                </span>
                <span className="text-[8px] uppercase tracking-wide" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{s.label}</span>
                {i < stats.length - 1 && <span className="w-px h-4 ml-2" style={{ background: BORDER, display: 'inline-block' }} />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row" style={{ minHeight: '52vh' }}>
        <div className="lg:w-[220px] flex-shrink-0 flex lg:flex-col justify-start gap-0 px-5 sm:px-8 lg:pl-12 lg:pr-0 pb-3 lg:pb-10 overflow-x-auto lg:overflow-visible">
          {features.map((feat, i) => {
            const isActive = active === i;
            return (
              <motion.button key={i} onClick={() => goTo(i)}
                className="relative flex-shrink-0 lg:flex-shrink text-left py-3.5 lg:py-4 pr-5 lg:pr-7 transition-all duration-300"
                style={{ borderBottom: `1px solid ${BORDER}` }}
                whileHover={{ x: 3 }}>
                <motion.div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={{ background: ACCENT }}
                  animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.25 }}
                  transition={{ duration: 0.32 }} />
                <div className="pl-4 lg:pl-4">
                  <div className="text-[9px] font-bold tracking-[0.2em] mb-0.5 transition-colors duration-300"
                    style={{ fontFamily: FONT_BADGE, color: isActive ? ACCENT : TEXT_MUTED }}>
                    {feat.num} — {feat.tag}
                  </div>
                  <div className="font-semibold text-[12px] leading-tight transition-colors duration-300 whitespace-nowrap lg:whitespace-normal"
                    style={{ fontFamily: FONT_HEADING, color: isActive ? TEXT_PRIMARY : TEXT_MUTED }}>
                    {feat.title}
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div key="metric"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }} className="overflow-hidden mt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-black text-[17px] leading-none" style={{ fontFamily: FONT_HEADING, color: ACCENT }}>{feat.metric}</span>
                          <span className="text-[8px] uppercase tracking-wide" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{feat.metricLabel}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
          <div className="hidden lg:block px-4 mt-5 mb-3">
            <div className="h-[2px] w-full rounded-full" style={{ background: BG_LIGHTER }}>
              <motion.div className="h-[2px] rounded-full" style={{ background: ACCENT }}
                animate={{ width: `${((active + 1) / features.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[8px]" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>01</span>
              <span className="text-[8px]" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>04</span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden" style={{ minHeight: '46vw', maxHeight: '65vh' }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div key={`img-${active}`} className="absolute inset-0"
              custom={direction} variants={imgVariants} initial="enter" animate="center" exit="exit">
              <img src={f.img} alt={f.title} className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.42) saturate(0.65)' }} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.70) 30%, rgba(255,255,255,0.15) 65%, transparent 100%)' }} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(247,247,247,0.85) 0%, transparent 50%)' }} />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-9 lg:p-10 z-10">
            <div className="flex items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.div key={`tag-${active}`}
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em]" style={{ fontFamily: FONT_BADGE, color: ACCENT }}>
                    {f.num} / {f.tag}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-2">
                {[
                  { arrow: '‹', fn: () => goTo((active - 1 + features.length) % features.length) },
                  { arrow: '›', fn: () => goTo((active + 1) % features.length) },
                ].map((b, bi) => (
                  <button key={bi} onClick={b.fn}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300"
                    style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, color: TEXT_SEC, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = ACCENT; }}
                    onMouseLeave={e => { e.currentTarget.style.background = BG_WHITE; e.currentTarget.style.color = TEXT_SEC; e.currentTarget.style.borderColor = BORDER; }}>
                    {b.arrow}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={`content-${active}`}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12, ease: [0.22,1,0.36,1] } }}
                exit={{ opacity: 0, y: -18, transition: { duration: 0.28 } }}
                className="max-w-xl">
                <h3 className="font-bold leading-tight mb-2"
                  style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.2rem,2.4vw,1.9rem)', color: TEXT_PRIMARY }}>
                  {f.title}
                </h3>
                <motion.div className="h-[2px] mb-3 rounded-full" style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }}
                  initial={{ width: 0 }} animate={{ width: '55%' }} transition={{ duration: 0.65, delay: 0.22 }} />
                <p className="text-[12px] leading-relaxed mb-4 max-w-md" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>
                  {f.body}
                </p>
                <div className="flex items-center gap-5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-black leading-none" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.7rem,3vw,2.4rem)', color: ACCENT }}>
                      {f.metric}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>
                      {f.metricLabel}
                    </span>
                  </div>
                  <div className="w-px h-10" style={{ background: BORDER }} />
                  <span className="text-[10px]" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>{f.sub}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-5 right-6 flex gap-2 z-20">
            {features.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                style={{
                  width: i === active ? 20 : 6, height: 6, borderRadius: 99,
                  border: 'none', padding: 0, cursor: 'pointer',
                  background: i === active ? ACCENT : BORDER,
                  transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
                }} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-8">
        <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto pb-1">
          {features.map((feat, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-300"
              style={{ fontFamily: FONT_BADGE, background: active === i ? ACCENT : BG_LIGHT, color: active === i ? '#fff' : TEXT_MUTED, border: `1px solid ${active === i ? ACCENT : BORDER}` }}>
              {feat.num} {feat.tag}
            </button>
          ))}
        </div>
        <div className="md:hidden grid grid-cols-4 gap-2 mt-3">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl px-2 py-2.5 text-center"
              style={{ background: BG_LIGHT, border: `1px solid ${BORDER}` }}>
              <div className="font-black text-[15px]" style={{ fontFamily: FONT_HEADING, color: ACCENT }}>
                <AnimatedCounter target={s.val} suffix={s.suf} />
              </div>
              <div className="text-[8px] uppercase tracking-wide mt-0.5" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-px" style={{ background: BORDER }} />
    </section>
  );
}

// ─── PREMIUM FOOTER ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: FOOTER_BG, borderTop: `1px solid ${BORDER}` }}>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Col 1 — Brand */}
          <div className="md:col-span-4">
            <img src={logo} alt="AIOON" className="h-9 w-auto mb-5" />
            <p className="text-[12.5px] leading-[1.8] mb-6 max-w-xs" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
              Pioneering digital transformation in Saudi Arabia with innovative technology solutions aligned with Vision 2030.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  whileHover={{ y: -3, scale: 1.18 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = ACCENT_SOFT; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = BG_WHITE; }}>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.28em] mb-5"
              style={{ fontFamily: FONT_BADGE, color: TEXT_PRIMARY }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'AI Agents', to: '/ai-agents' },
                { label: 'Contact', to: '/contact' },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 text-[12px] font-medium group transition-colors duration-200"
                    style={{ fontFamily: FONT_NAV, color: TEXT_MUTED, textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color = ACCENT; }}
                    onMouseLeave={e => { e.currentTarget.style.color = TEXT_MUTED; }}>
                    <span
                      className="w-0 group-hover:w-3 h-px rounded-full transition-all duration-300"
                      style={{ background: ACCENT }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.28em] mb-5"
              style={{ fontFamily: FONT_BADGE, color: TEXT_PRIMARY }}>
              Get in Touch
            </h4>
            <ul className="space-y-4">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" width="14" height="14">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  text: 'Riyadh, Saudi Arabia',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" width="14" height="14">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  text: 'info@aioon.com',
                  href: 'mailto:info@aioon.com',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" width="14" height="14">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  text: '+966 535 141 447',
                  href: 'tel:+966535141447',
                },
              ].map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-3 text-[12px] transition-colors duration-200"
                      style={{ fontFamily: FONT_BODY, color: TEXT_MUTED, textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = TEXT_PRIMARY; }}
                      onMouseLeave={e => { e.currentTarget.style.color = TEXT_MUTED; }}>
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT}20` }}>
                        {item.icon}
                      </span>
                      {item.text}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-[12px]"
                      style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT}20` }}>
                        {item.icon}
                      </span>
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — ENZAPPS Partner */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.28em] mb-5"
              style={{ fontFamily: FONT_BADGE, color: TEXT_PRIMARY }}>
              Powered By
            </h4>
            <div className="flex flex-col items-start gap-3">
              <img src={enzappLogo} alt="ENZAPPS" className="h-12 w-auto object-contain rounded-xl" style={{ maxWidth: '140px' }} />
              <p className="text-[12px] leading-[1.75]" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
                Authorized Meta Tech Provider with 13 years of experience building intelligent systems for Saudi enterprises.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: BORDER }} />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5">
        <div className="flex flex-col items-center gap-4">

          {/* Policy links — centred */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            {[
              { label: 'Privacy Policy', to: '/privacy-policy' },
              { label: 'Terms & Conditions', to: '/terms-and-conditions' },
              { label: 'Refund & Cancellation Policy', to: '/refund-policy' },
            ].map((link, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="w-1 h-1 rounded-full mx-1" style={{ background: BORDER, display: 'inline-block' }} />
                )}
                <Link
                  to={link.to}
                  className="text-[11px] font-medium transition-colors duration-200"
                  style={{ fontFamily: FONT_NAV, color: TEXT_MUTED, textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.color = ACCENT; }}
                  onMouseLeave={e => { e.currentTarget.style.color = TEXT_MUTED; }}>
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          {/* Copyright row */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
            <p className="text-[10.5px]" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
              &copy; {new Date().getFullYear()} AIOON Technologies. All rights reserved.
            </p>
            <p className="text-[10.5px]" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
              Proudly supporting Saudi Vision 2030 🇸🇦
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

// ─── POLICY PAGE WRAPPER ───────────────────────────────────────────────────────
function PolicyPage({ title, subtitle, children }) {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: BG_WHITE }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: FOOTER_BG, borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 50%, ${ACCENT}08 0%, transparent 70%)` }} />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20 relative z-10">
          <h1 className="font-bold mb-3 leading-[1.1]"
            style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: TEXT_PRIMARY }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px]" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>{subtitle}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        {children}
      </div>

    </div>
  );
}

// Shared section heading for policy pages
function PolicySection({ number, title, children }) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}>
      <div className="flex items-start gap-4 mb-3">
        <span className="flex-shrink-0 text-[10px] font-black px-2 py-0.5 rounded-md mt-1"
          style={{ fontFamily: FONT_BADGE, color: ACCENT, background: ACCENT_SOFT, border: `1px solid ${ACCENT}20` }}>
          {String(number).padStart(2, '0')}
        </span>
        <h2 className="font-bold leading-tight" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1rem,2vw,1.2rem)', color: TEXT_PRIMARY }}>
          {title}
        </h2>
      </div>
      <div className="ml-10">
        <div className="h-px mb-4" style={{ background: BORDER }} />
        <div className="text-[13px] leading-[1.9]" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// ─── PRIVACY POLICY PAGE ──────────────────────────────────────────────────────
function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      subtitle="Last updated · www.aioon.sa · Your privacy is our priority.">

      <PolicySection number={1} title="Introduction">
        At Aioon Alnajah, accessible from <a href="https://www.aioon.sa" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }}>www.aioon.sa</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Aioon Alnajah and how we use it. This policy applies only to our online activities and is valid for visitors to our website with regards to information they shared and/or collected on Aioon Alnajah. It is not applicable to any information collected offline or via channels other than this website. By using our website, you hereby consent to our Privacy Policy and agree to its terms.
      </PolicySection>

      <PolicySection number={2} title="Information We Collect">
        The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide it. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
      </PolicySection>

      <PolicySection number={3} title="How We Use Your Information">
        <p className="mb-3">We use the information we collect in various ways, including to:</p>
        <ul className="space-y-2 ml-2">
          {[
            'Provide, operate, and maintain our website',
            'Improve, personalize, and expand our website',
            'Understand and analyze how you use our website',
            'Develop new products, services, features, and functionality',
            'Communicate with you, either directly or through one of our partners, including for customer service, updates, and marketing',
            'Send you emails',
            'Find and prevent fraud',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: ACCENT }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection number={4} title="Log Files">
        Aioon Alnajah follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
      </PolicySection>

      <PolicySection number={5} title="Third-Party Privacy Policies">
        Aioon Alnajah's Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on Aioon Alnajah, which are sent directly to users' browsers. You can choose to disable cookies through your individual browser options.
      </PolicySection>

      <PolicySection number={6} title="CCPA Privacy Rights">
        Under the CCPA, California consumers have the right to request that a business disclose the categories and specific pieces of personal data collected about consumers; request that a business delete any personal data about the consumer; and request that a business not sell the consumer's personal data. If you make a request, we have one month to respond.
      </PolicySection>

      <PolicySection number={7} title="GDPR Data Protection Rights">
        <p className="mb-3">Every user is entitled to the following rights:</p>
        <ul className="space-y-2 ml-2">
          {[
            'The right to access — request copies of your personal data',
            'The right to rectification — request correction of inaccurate information',
            'The right to erasure — request erasure of your personal data, under certain conditions',
            'The right to restrict processing — request restriction of processing, under certain conditions',
            'The right to object to processing — object to our processing, under certain conditions',
            'The right to data portability — request transfer of your data to another organization',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: ACCENT }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">If you make a request, we have one month to respond.</p>
      </PolicySection>

      <PolicySection number={8} title="Children's Information">
        Aioon Alnajah does not knowingly collect any Personally Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
      </PolicySection>

    </PolicyPage>
  );
}

// ─── TERMS & CONDITIONS PAGE ──────────────────────────────────────────────────
function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using www.aioon.sa.">

      <PolicySection number={1} title="Introduction">
        Welcome to Aioon Alnajah! These terms and conditions outline the rules and regulations for the use of Aioon Alnajah's website, located at <a href="https://www.aioon.sa" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }}>www.aioon.sa</a>. By accessing this website we assume you accept these terms and conditions. Do not continue to use Aioon Alnajah if you do not agree to take all of the terms and conditions stated on this page.
      </PolicySection>

      <PolicySection number={2} title="Cookies">
        We employ the use of cookies. By accessing Aioon Alnajah, you agreed to use cookies in agreement with Aioon Alnajah's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
      </PolicySection>

      <PolicySection number={3} title="License">
        <p className="mb-3">Unless otherwise stated, Aioon Alnajah and/or its licensors own the intellectual property rights for all material on Aioon Alnajah. All intellectual property rights are reserved. You may access this from Aioon Alnajah for your own personal use subjected to restrictions set in these terms and conditions.</p>
        <p className="mb-2 font-semibold" style={{ color: TEXT_PRIMARY }}>You must not:</p>
        <ul className="space-y-2 ml-2">
          {[
            'Republish material from Aioon Alnajah',
            'Sell, rent or sub-license material from Aioon Alnajah',
            'Reproduce, duplicate or copy material from Aioon Alnajah',
            'Redistribute content from Aioon Alnajah',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: ACCENT }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection number={4} title="Hyperlinking to Our Content">
        <p className="mb-3">The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; Online directory distributors; and System wide Accredited Businesses. These organizations may link to our home page, to publications or to other Website information so long as the link is not in any way deceptive, does not falsely imply sponsorship or endorsement, and fits within the context of the linking party's site.</p>
      </PolicySection>

      <PolicySection number={5} title="iFrames">
        Without prior approval and written permission, you may not create frames around our webpages that alter in any way the visual presentation or appearance of our website.
      </PolicySection>

      <PolicySection number={6} title="Content Liability">
        We shall not be held responsible for any content that appears on your website. You agree to protect and defend us against all claims that are rising on your website. No link(s) should appear on any website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
      </PolicySection>

      <PolicySection number={7} title="Reservation of Rights">
        We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our website, you agree to be bound to and follow these linking terms and conditions.
      </PolicySection>

      <PolicySection number={8} title="Disclaimer">
        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. The limitations and prohibitions of liability set in this section govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty. As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
      </PolicySection>

    </PolicyPage>
  );
}

// ─── REFUND & CANCELLATION POLICY PAGE ────────────────────────────────────────
function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund & Cancellation Policy"
      subtitle="We want you to be completely happy with your purchase. Here's how our return process works.">

      <PolicySection number={1} title="Return Eligibility">
        If you are not happy with your purchase, we will accept a return of an unused product within 14 days. Once we receive the returned item, Aioon Alnajah will then give a full refund — excluding shipping, as we are unable to refund the initial shipping cost of your order. Please allow 1–2 weeks for your return to be processed.
      </PolicySection>

      <PolicySection number={2} title="Non-Eligible Items">
        <ul className="space-y-2 ml-2">
          {[
            'Discounted items are not eligible for a return.',
            'Aioon Alnajah will not issue refunds for products purchased through other entities, such as distributors or retail partners.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: ACCENT }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection number={3} title="Condition of Returned Items">
        Returned items must be delivered to us unused, in original packaging and in the condition they were received — or they may not be eligible for a refund, or be subject to a restocking fee. We cannot be held responsible for items damaged or lost in return shipment; therefore we recommend an insured and trackable mail service.
      </PolicySection>

      <PolicySection number={4} title="Proof of Return">
        We are unable to issue a refund without actual receipt of the item(s) or proof of received return delivery.
      </PolicySection>

      <PolicySection number={5} title="Inspection on Arrival">
        We aim to accept all returns. In the unlikely event that an item is returned to us in an unsuitable condition, we may have to send it back to you. All goods will be inspected on return.
      </PolicySection>

      {/* Contact nudge */}
      <motion.div
        className="mt-10 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT}20` }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <div className="flex-1">
          <div className="font-bold mb-1" style={{ fontFamily: FONT_HEADING, fontSize: '14px', color: TEXT_PRIMARY }}>
            Have questions about a return?
          </div>
          <p className="text-[12px]" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>
            Our team is happy to help you through the process — reach out before shipping your item back.
          </p>
        </div>
        <Link
          to="/contact"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[11px] font-bold transition-all duration-200"
          style={{ background: ACCENT, fontFamily: FONT_NAV, textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT2; }}
          onMouseLeave={e => { e.currentTarget.style.background = ACCENT; }}>
          Contact Us →
        </Link>
      </motion.div>

    </PolicyPage>
  );
}

// ─── SHARED LAYOUT ────────────────────────────────────────────────────────────
function SharedLayout() {
  const [isMenuOpen, setIsMenuOpen]             = useState(false);
  const [isArabic, setIsArabic]                 = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showWhatsApp, setShowWhatsApp]         = useState(false);
  const [scrollY, setScrollY]                   = useState(0);
  const [showELVDropdown, setShowELVDropdown]   = useState(false);
  const [hoveredItem, setHoveredItem]           = useState(null);

  const elvButtonRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const lang = isArabic ? 'ar' : 'en';
  const t = {
    en: {
      home: 'Home', about: 'About', elv: 'ELV Solutions', services: 'Services', contact: 'Contact',
      wpHeader: 'Start a Conversation',
      wpSub: 'Hi! Click below to chat with our Customer Support on WhatsApp',
      wpCta: 'Customer Support Executive',
    },
    ar: {
      home: 'الرئيسية', about: 'من نحن', elv: 'حلول ELV',
      services: 'الخدمات', contact: 'اتصل بنا',
      wpHeader: 'ابدأ محادثة',
      wpSub: 'مرحبا! انقر أدناه للدردشة مع دعم العملاء',
      wpCta: 'مدير دعم العملاء',
    },
  }[lang];

  useEffect(() => {
    const f = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLangDropdown && !event.target.closest('.language-dropdown-container')) {
        setShowLangDropdown(false);
      }
      if (showELVDropdown && !event.target.closest('.elv-dropdown-container')) {
        setShowELVDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangDropdown, showELVDropdown]);

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="min-h-screen" style={{ fontFamily: FONT_BODY, background: BG_WHITE, color: TEXT_PRIMARY }}>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
        style={{ scaleX, background: `linear-gradient(to right, ${ACCENT2}, ${ACCENT}, ${ACCENT3})` }} />

      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
          background: scrollY > 60 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px) saturate(130%)',
          WebkitBackdropFilter: 'blur(16px) saturate(130%)',
          borderBottom: `1px solid ${scrollY > 60 ? BORDER : 'rgba(229,229,229,0.6)'}`,
          boxShadow: scrollY > 60 ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between relative">
          <Link to="/">
            <img src={logo} alt="AIOON" className="h-8 md:h-9 w-auto" />
          </Link>

          <ul className="hidden md:flex items-center justify-center gap-8 text-sm font-medium flex-1 mx-8" style={{ fontFamily: FONT_NAV }}>
            <li className="relative group cursor-pointer transition-colors duration-300"
              style={{ color: TEXT_SEC }}
              onMouseEnter={e => { e.currentTarget.style.color = TEXT_PRIMARY; }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT_SEC; }}>
              <Link to="/" style={{ color: 'inherit' }}>{t.home}</Link>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: ACCENT }} />
            </li>
            <li className="relative group cursor-pointer transition-colors duration-300"
              style={{ color: TEXT_SEC }}
              onMouseEnter={e => { e.currentTarget.style.color = TEXT_PRIMARY; }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT_SEC; }}>
              <Link to="/about" style={{ color: 'inherit' }}>{t.about}</Link>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: ACCENT }} />
            </li>

            <li className="relative elv-dropdown-container"
              ref={elvButtonRef}
              onMouseEnter={() => setShowELVDropdown(true)}
              onMouseLeave={() => { setShowELVDropdown(false); setHoveredItem(null); }}>
              <button
                type="button"
                onClick={() => setShowELVDropdown(prev => !prev)}
                className="cursor-pointer transition-colors duration-300 flex items-center gap-1.5"
                style={{
                  fontFamily: FONT_NAV, fontSize: '14px', fontWeight: 500,
                  color: TEXT_SEC, background: 'none', border: 'none', padding: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = TEXT_PRIMARY; }}
                onMouseLeave={e => { e.currentTarget.style.color = TEXT_SEC; }}>
                {t.elv}
                <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"
                  animate={{ rotate: showELVDropdown ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>
              <span className="absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300"
                style={{ background: ACCENT, width: showELVDropdown ? '100%' : '0%' }} />

              <AnimatePresence>
                {showELVDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full mt-3 rounded-2xl overflow-hidden"
                    style={{
                      background: BG_WHITE,
                      border: `1px solid ${BORDER}`,
                      boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '300px',
                    }}>
                    <div className="grid grid-cols-1 gap-0 p-2">
                      {ELV_DROPDOWN_ITEMS.map((item, i) => (
                        <Link key={i} to={`/product/${item.productId}`}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200"
                          style={{
                            fontFamily: FONT_NAV, color: hoveredItem === i ? ACCENT : TEXT_PRIMARY,
                            background: hoveredItem === i ? ACCENT_SOFT : 'transparent', textDecoration: 'none',
                          }}
                          onMouseEnter={() => setHoveredItem(i)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => { setShowELVDropdown(false); setHoveredItem(null); }}>
                          <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200"
                            style={{
                              background: hoveredItem === i ? `${ACCENT}15` : BG_LIGHTER,
                              color: hoveredItem === i ? ACCENT : TEXT_MUTED,
                              border: `1px solid ${hoveredItem === i ? `${ACCENT}25` : BORDER}`,
                            }}>
                            {item.icon}
                          </div>
                          <span className="text-[12px] font-medium transition-colors duration-200"
                            style={{ color: hoveredItem === i ? ACCENT : TEXT_PRIMARY }}>
                            {item.name} {item.shortName}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li className="relative group cursor-pointer transition-colors duration-300"
              style={{ color: TEXT_SEC }}
              onMouseEnter={e => { e.currentTarget.style.color = TEXT_PRIMARY; }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT_SEC; }}>
              <Link to="/ai-agents" style={{ color: 'inherit' }}>AI Agents</Link>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: ACCENT }} />
            </li>
            
            <li className="relative group cursor-pointer transition-colors duration-300"
              style={{ color: TEXT_SEC }}
              onMouseEnter={e => { e.currentTarget.style.color = TEXT_PRIMARY; }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT_SEC; }}>
              <Link to="/contact" style={{ color: 'inherit' }}>{t.contact}</Link>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: ACCENT }} />
            </li>
          </ul>         

          <div className="hidden md:block language-dropdown-container">
            <div className="relative">
              <button onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="text-sm font-semibold transition-all duration-300 px-4 py-1.5 rounded-full"
                style={{ fontFamily: FONT_NAV, color: ACCENT, background: `${ACCENT}10`, border: `1.5px solid ${ACCENT}30` }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}10`; e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = `${ACCENT}30`; }}>
                Language
              </button>
              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-2 w-40 rounded-xl shadow-xl overflow-hidden"
                    style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                    {[{ code: 'en', label: 'English' }, { code: 'ar', label: 'Arabic' }].map((opt) => (
                      <button key={opt.code} onClick={() => { setIsArabic(opt.code === 'ar'); setShowLangDropdown(false); }}
                        className="w-full px-5 py-3 text-center text-sm font-medium transition-all duration-200"
                        style={{ fontFamily: FONT_NAV, color: (opt.code === 'en') === !isArabic ? ACCENT : TEXT_SEC, background: (opt.code === 'en') === !isArabic ? `${ACCENT}0D` : 'transparent' }}
                        onMouseEnter={e => { e.currentTarget.style.background = BG_LIGHT; }}
                        onMouseLeave={e => { e.currentTarget.style.background = (opt.code === 'en') === !isArabic ? `${ACCENT}0D` : 'transparent'; }}>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button className="md:hidden text-xl" style={{ color: TEXT_PRIMARY }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ background: BG_WHITE, borderTop: `1px solid ${BORDER}` }} className="md:hidden overflow-hidden">
              <div className="px-5 py-5 flex flex-col gap-4">
                <Link to="/" className="text-sm font-medium transition-colors py-1" style={{ fontFamily: FONT_NAV, color: TEXT_SEC }} onClick={() => setIsMenuOpen(false)}>{t.home}</Link>
                <Link to="/about" className="text-sm font-medium transition-colors py-1" style={{ fontFamily: FONT_NAV, color: TEXT_SEC }} onClick={() => setIsMenuOpen(false)}>{t.about}</Link>
                <div>
                  <button type="button" className="text-sm font-medium transition-colors py-1 flex items-center justify-between w-full"
                    style={{ fontFamily: FONT_NAV, color: TEXT_SEC, background: 'none', border: 'none', padding: '4px 0' }}
                    onClick={() => setShowELVDropdown(prev => !prev)}>
                    {t.elv}
                    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"
                      animate={{ rotate: showELVDropdown ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {showELVDropdown && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }} className="overflow-hidden ml-3 mt-1">
                        {ELV_DROPDOWN_ITEMS.map((item, i) => (
                          <Link key={i} to={`/product/${item.productId}`} className="flex items-center gap-2 py-2 text-[12px] font-medium"
                            style={{ fontFamily: FONT_NAV, color: TEXT_SEC }}
                            onClick={() => { setIsMenuOpen(false); setShowELVDropdown(false); }}>
                            <span style={{ color: ACCENT, opacity: 0.7 }}>›</span>
                            {item.name} {item.shortName}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link to="/ai-agents" className="text-sm font-medium transition-colors py-1" style={{ fontFamily: FONT_NAV, color: TEXT_SEC }} onClick={() => setIsMenuOpen(false)}>AI Agents</Link>
               
                <Link to="/contact" className="text-sm font-medium transition-colors py-1" style={{ fontFamily: FONT_NAV, color: TEXT_SEC }} onClick={() => setIsMenuOpen(false)}>{t.contact}</Link>
                <div className="flex gap-2 pt-1">
                  {[{ code: 'en', label: 'English' }, { code: 'ar', label: 'Arabic' }].map((opt) => (
                    <button key={opt.code} onClick={() => { setIsArabic(opt.code === 'ar'); setIsMenuOpen(false); }}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold transition-colors text-center"
                      style={{ fontFamily: FONT_NAV, background: (opt.code === 'en') === !isArabic ? ACCENT : BG_LIGHT, color: (opt.code === 'en') === !isArabic ? '#fff' : TEXT_SEC }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <Outlet />

      <Footer />

      {/* ─── WHATSAPP FAB BUTTON — MOVED LOWER ─── */}
      <motion.button 
        onClick={() => setShowWhatsApp(!showWhatsApp)} 
        whileHover={{ scale: 1.12 }} 
        whileTap={{ scale: 0.95 }}
        className="fixed z-50 p-3.5 rounded-full shadow-xl transition-all duration-300"
        style={{
          bottom: '2.5rem',
          right: '1.5rem',
          background: '#25D366',
          boxShadow: '0 8px 24px rgba(37,211,102,0.40)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}
        aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        
        {/* Subtle pulse animation ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#25D366' }} />
      </motion.button>

      {/* ─── WHATSAPP POPUP — POSITIONED ABOVE THE BUTTON ─── */}
      <AnimatePresence>
        {showWhatsApp && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.88 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.88 }} 
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="fixed z-50 w-64 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                bottom: '7.5rem',
                right: '1.5rem',
                background: BG_WHITE,
                border: `1px solid ${BORDER}`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              }}>
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] px-5 py-4">
                <h3 className="text-white text-[13px] font-bold" style={{ fontFamily: FONT_HEADING }}>
                  {t.wpHeader}
                </h3>
                <p className="text-white/80 text-[10px] mt-1" style={{ fontFamily: FONT_BODY }}>
                  {t.wpSub}
                </p>
              </div>
              
              {/* Chat button */}
              <div className="p-4 bg-white">
                <a 
                  href="https://wa.me/966535141447" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 border border-gray-100"
                  style={{ textDecoration: 'none' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[12px]" style={{ fontFamily: FONT_BODY, color: TEXT_PRIMARY }}>
                      {t.wpCta}
                    </div>
                    <div className="text-[10px] mt-0.5 font-medium" style={{ color: '#25D366', fontFamily: FONT_NAV }}>
                      Chat Now →
                    </div>
                  </div>
                </a>
              </div>
              
              {/* Close button */}
              <button 
                onClick={() => setShowWhatsApp(false)}
                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-white/20 transition-colors"
                style={{ background: 'rgba(0,0,0,0.2)' }}
                aria-label="Close">
                ×
              </button>
            </motion.div>
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" 
              onClick={() => setShowWhatsApp(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const mainRef       = useRef(null);
  const svcSectionRef = useRef(null);
  const heroRef       = useRef(null);

  const t = {
    heroTitle:   ['Where Technology', 'Meets Business Vision'],
    heroDesc:    "Aioon Technologies builds smart, scalable, and fully customized digital ecosystems. As Saudi Arabia's exclusive ENZAPPS support partner, we deliver seamless integration and future-ready solutions.",
    explore:     'Get in touch',
  };

  const [navHeight, setNavHeight] = useState(80);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo('.hero-badge-text', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.hero-line', { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: 0.14, duration: 1, ease: 'power4.out' }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-btn', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4');
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.svc-row').forEach((el, i) => {
        const col = i % 3;
        gsap.fromTo(el,
          { opacity: 0, x: col === 0 ? -55 : col === 2 ? 55 : 0, y: col === 1 ? 55 : 28, scale: 0.92 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.72, ease: 'power3.out',
            scrollTrigger: { trigger: svcSectionRef.current, start: 'top 72%', toggleActions: 'play none none none' },
            delay: 0.08 + i * 0.09 });
      });
    }, svcSectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 1,
      number: '01',
      title: 'Enterprise Resource Planning',
      slug: 'erp',
      shortDesc: 'Comprehensive management of Finance, HR, Inventory, Sales, and Manufacturing.',
      features: ['Finance Management','HR Automation','Inventory Control','Sales Integration'],
      bgImage: erpBg,
      tag: 'ERP'
    },
    {
      id: 2,
      number: '02',
      title: 'Customer Relationship Management',
      slug: 'crm',
      shortDesc: 'Intelligent tools for lead management, pipeline tracking, and customer engagement.',
      features: ['Lead Management','Pipeline Tracking','Customer Analytics','Revenue Forecasting'],
      bgImage: crmBg,
      tag: 'CRM'
    },
    {
      id: 3,
      number: '03',
      title: 'HR & Payroll Automation',
      slug: 'hr',
      shortDesc: 'Automated workforce management with AI-driven attendance and precise payroll processing.',
      features: ['AI Attendance','Payroll Processing','Leave Management','Compliance Tracking'],
      bgImage: hrPayrollBg,
      tag: 'HCM'
    },
    {
      id: 4,
      number: '04',
      title: 'Project & Construction ERP',
      slug: 'construction',
      shortDesc: 'Tailored modules for contractors to manage budgets, resources, and timelines.',
      features: ['Budget Management','Resource Allocation','Progress Tracking','Timeline Control'],
      bgImage: projectConstructionBg,
      tag: 'PMO'
    },
    {
      id: 5,
      number: '05',
      title: 'AI & Business Analytics',
      slug: 'ai-and-analytics',
      shortDesc: 'Data-driven dashboards and predictive insights across all business functions.',
      features: ['Predictive Analytics','Interactive Dashboards','Machine Learning','Risk Assessment'],
      bgImage: aiAnalyticsBg,
      tag: 'AI'
    },
    {
      id: 6,
      number: '06',
      title: 'E-Invoicing & Compliance',
      slug: 'e-invoicing',
      shortDesc: 'Seamless ZATCA-compliant e-invoicing integration with external devices.',
      features: ['ZATCA Compliance','Invoice Automation','Tax Reporting','Device Integration'],
      bgImage: einvoiceBg,
      tag: 'ZATCA'
    },
  ];

  const [activeSvc, setActiveSvc] = useState(0);
  const [prevSvc, setPrevSvc] = useState(null);
  const [svcAnimating, setSvcAnimating] = useState(false);
  const svcAutoRef = useRef(null);

  const goToSvc = (idx) => {
    if (svcAnimating || idx === activeSvc) return;
    setSvcAnimating(true);
    setPrevSvc(activeSvc);
    setActiveSvc(idx);
    setTimeout(() => { setPrevSvc(null); setSvcAnimating(false); }, 800);
  };

  useEffect(() => {
    svcAutoRef.current = setInterval(() => {
      setSvcAnimating(true);
      setActiveSvc(p => {
        setPrevSvc(p);
        return (p + 1) % services.length;
      });
      setTimeout(() => { setPrevSvc(null); setSvcAnimating(false); }, 800);
    }, 7000);
    return () => clearInterval(svcAutoRef.current);
  }, []);

  const resetSvcAuto = () => {
    clearInterval(svcAutoRef.current);
    svcAutoRef.current = setInterval(() => {
      setSvcAnimating(true);
      setActiveSvc(p => {
        setPrevSvc(p);
        return (p + 1) % services.length;
      });
      setTimeout(() => { setPrevSvc(null); setSvcAnimating(false); }, 800);
    }, 7000);
  };

  const handleSvcGo = (idx) => { goToSvc(idx); resetSvcAuto(); };
  const svc = services[activeSvc];

  const marqueeItems = ['Enterprise ERP','AI-Agent Solutions','CRM Integration','HR Automation','WhatsApp Chatbot','Odoo Implementation','E-Invoicing','ELV Systems','Hotel AI-Agent','Laundry Automation','Property Management','Vision 2030'];

  return (
    <div ref={mainRef} style={{ fontFamily: FONT_BODY }}>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative flex items-center overflow-hidden" 
        style={{ 
          minHeight: '100vh', 
          background: BG_WHITE,
          paddingTop: `${navHeight}px`
        }}>
        <div className="absolute inset-0" style={{ top: `${navHeight}px` }}>
        <img src={newBanner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.70) 35%, rgba(255,255,255,0.30) 65%, rgba(255,255,255,0.05) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.50) 0%, transparent 45%)' }} />
        </div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: `${ACCENT}0A` }} />
        <div className="absolute bottom-1/4 right-1/5 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: `${ACCENT3}08` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p className="hero-badge-text text-[11px] font-semibold tracking-[0.22em] uppercase mb-4" style={{ fontFamily: FONT_BADGE, color: ACCENT }}>
              Saudi Arabia's Premier Tech Partner
            </p>
            <h1 className="font-black mb-6" style={{ lineHeight: 1.15 }}>
  {t.heroTitle.map((line, i) => (
    <div key={i} className="overflow-visible" style={{ paddingBottom: '0.04em' }}>
      <span className="hero-line block font-bold"
        style={{ fontFamily: FONT_HERO, fontSize: 'clamp(1.8rem,4.2vw,3.2rem)', lineHeight: 1.12, color: i === 1 ? ACCENT : TEXT_PRIMARY, display: 'block' }}>
        {line}
      </span>
    </div>
  ))}
</h1>
            <p className="hero-desc text-sm md:text-[14px] leading-relaxed mb-8 max-w-md font-light" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-0">
              <MagneticButton to="/contact" className="hero-btn group flex items-center gap-3 text-sm font-medium transition-colors duration-300" style={{ fontFamily: FONT_NAV, color: TEXT_SEC }}>
                <span className="w-9 h-9 rounded-full border flex items-center justify-center transition-all text-base" style={{ borderColor: BORDER }}>→</span>
                {t.explore}
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-3.5 overflow-hidden" style={{ background: BG_LIGHTER, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <Marquee items={marqueeItems} />
      </div>

      {/* ── SERVICES ── */}
      <section id="services-section" ref={svcSectionRef} className="relative overflow-hidden" style={{ background: BG_LIGHT }}>
        <div className="w-full h-px" style={{ background: BORDER }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-bold leading-[1.08]" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(2rem,4.5vw,3rem)', color: TEXT_PRIMARY }}>Enterprise<br /><span style={{ color: ACCENT }}>Solutions</span></h2>
            </div>
            <p className="text-[12px] leading-relaxed max-w-[280px] md:text-right" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>Advanced digital ecosystems designed to optimize<br />operations and drive sustainable growth.</p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(460px, 66vh, 640px)' }}>
          <AnimatePresence>
            {prevSvc !== null && (
              <motion.div key={`svc-bg-prev-${prevSvc}`} className="absolute inset-0" initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }}>
                <img src={services[prevSvc].bgImage} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(1) saturate(0.9)' }} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div key={`svc-bg-${activeSvc}`} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <img src={svc.bgImage} alt={svc.title} className="w-full h-full object-cover" style={{ filter: 'brightness(1) saturate(0.9)' }} />
          </motion.div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(240,245,255,0.97) 0%, rgba(240,245,255,0.93) 40%, rgba(240,245,255,0.78) 65%, rgba(240,245,255,0.45) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(235,242,255,0.95) 0%, transparent 52%)' }} />
          <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none" style={{ background: `radial-gradient(ellipse at right center, ${ACCENT}10 0%, transparent 70%)` }} />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
              <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
                <AnimatePresence mode="wait">
                  <motion.div key={`svc-content-${activeSvc}`} initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 32 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.28em]" style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}30`, fontFamily: FONT_BADGE }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />{svc.tag} · Service
                        </span>
                        <span className="text-[9px] font-medium" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{String(activeSvc + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleSvcGo((activeSvc - 1 + services.length) % services.length)} className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300" style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, color: TEXT_SEC, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = ACCENT; }} onMouseLeave={e => { e.currentTarget.style.background = BG_WHITE; e.currentTarget.style.color = TEXT_SEC; e.currentTarget.style.borderColor = BORDER; }}>‹</button>
                        <button onClick={() => handleSvcGo((activeSvc + 1) % services.length)} className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all duration-300" style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, color: TEXT_SEC, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = ACCENT; }} onMouseLeave={e => { e.currentTarget.style.background = BG_WHITE; e.currentTarget.style.color = TEXT_SEC; e.currentTarget.style.borderColor = BORDER; }}>›</button>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-[3rem] font-black leading-none" style={{ fontFamily: FONT_HEADING, color: `${ACCENT}25` }}>{svc.number}</span>
                      <h3 className="font-bold leading-[1.1] pt-1" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.5rem,3vw,2.4rem)', color: TEXT_PRIMARY }}>{svc.title}</h3>
                    </div>
                    <motion.div className="h-[2px] mb-5 rounded-full" style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }} initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 0.7, delay: 0.2 }} />
                    <p className="text-[13px] leading-relaxed max-w-lg mb-6" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>{svc.shortDesc}</p>
                    <Link to={`/services/${svc.slug}`} className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-white text-[11px] transition-all duration-300" style={{ background: ACCENT, fontFamily: FONT_NAV, boxShadow: `0 6px 20px ${ACCENT}35` }} onMouseEnter={e => { e.currentTarget.style.background = ACCENT2; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'none'; }}>View More <span>→</span></Link>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={`svc-card-${activeSvc}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:block">
                    <div className="rounded-2xl overflow-hidden" style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, boxShadow: '0 8px 32px rgba(43,85,197,0.10)' }}>
                      <div className="px-5 py-4 flex items-center justify-between" style={{ background: `${ACCENT}0A`, borderBottom: `1px solid ${BORDER}` }}>
                        <div><div className="text-[9px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ fontFamily: FONT_BADGE, color: ACCENT }}>Features Included</div><div className="font-bold text-[13px]" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>{svc.title}</div></div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-[11px]" style={{ background: ACCENT, fontFamily: FONT_HEADING }}>{svc.number}</div>
                      </div>
                      <div className="p-4 space-y-2">
                        {svc.features.map((f, fi) => (
                          <motion.div key={fi} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.18 + fi * 0.07 }} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: BG_LIGHT, border: `1px solid ${BORDER}` }}>
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} /><span className="text-[11px] font-semibold" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>{f}</span><span className="ml-auto text-[9px] font-bold" style={{ color: ACCENT }}>✓</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="px-4 pb-4">
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {['ZATCA Ready', 'Cloud Native', 'KSA Compliant'].map((item, ii) => (<span key={ii} className="text-[9px] px-2.5 py-1 rounded-full font-semibold" style={{ background: ACCENT_SOFT, color: ACCENT, border: `1px solid ${ACCENT}20`, fontFamily: FONT_BODY }}>{item}</span>))}
                        </div>
                        <p className="text-center text-[9px] mt-3" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>Powered by Aioon Technologies · KSA</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {services.map((_, i) => (<button key={i} onClick={() => handleSvcGo(i)} style={{ width: i === activeSvc ? 20 : 6, height: 6, borderRadius: 99, border: 'none', padding: 0, cursor: 'pointer', background: i === activeSvc ? ACCENT : BORDER, transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)' }} />))}
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 py-5" style={{ borderTop: `1px solid ${BORDER}` }}>
            {[['06','Core Solutions'],['100+','Industries'],['500+','Projects'],['KSA','Exclusive Partner']].map(([val, label], i) => (<div key={i} className="flex items-center gap-3 cursor-default"><span className="text-xl font-bold" style={{ fontFamily: FONT_HEADING, color: ACCENT }}>{val}</span><span className="text-[9px] uppercase tracking-widest font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{label}</span>{i < 3 && <span className="hidden sm:block w-px h-4 ml-2" style={{ background: BORDER }} />}</div>))}
          </div>
        </div>
        <div className="w-full h-px" style={{ background: BORDER }} />
      </section>

      {/* ── AI-AGENT SOLUTIONS ── */}
      <AiAgentSolutions />

      {/* ── WHY CHOOSE US ── */}
      <WhyChooseUs />

      {/* ── CONTACT CTA ── */}
      <section id="contact-section" className="py-12 md:py-16 relative overflow-hidden" style={{ background: BG_DARK }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: ACCENT }} />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4" style={{ fontFamily: FONT_HEADING }}>Ready for Digital<br /><span style={{ color: ACCENT3 }}>Transformation?</span></h2>
              <p className="text-[12px] leading-relaxed mb-6 max-w-xs" style={{ fontFamily: FONT_BODY, color: 'rgba(255,255,255,0.55)' }}>Our team is ready to guide you from discovery to deployment.</p>
              <MagneticButton to="/contact" className="inline-flex items-center gap-2.5 font-semibold px-6 py-3 rounded-full text-xs transition-all duration-300" style={{ fontFamily: FONT_NAV, background: ACCENT, color: '#fff', boxShadow: `0 6px 20px ${ACCENT}40` }}>Contact us <span>→</span></MagneticButton>
            </motion.div>
            <motion.div className="grid grid-cols-3 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              {[{ icon: '✉', label: 'Email', text: 'info@aioon.com', href: 'mailto:info@aioon.com', sub: 'Write to us' }, { icon: '📞', label: 'Phone', text: '+966 535 141 447', href: 'tel:+966535141447', sub: 'Call anytime' }, { icon: '📍', label: 'Location', text: 'Riyadh, KSA', href: '#', sub: 'Saudi Arabia' }].map((item, i) => (
                <motion.a key={i} href={item.href} className="flex flex-col justify-between p-4 group transition-colors duration-300" style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none' }} onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}20`; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  <div className="flex items-center justify-between mb-4"><span className="text-base">{item.icon}</span><span className="transition-colors text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>↗</span></div>
                  <div><div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.35)' }}>{item.label}</div><div className="text-[11px] font-semibold mb-0.5 leading-tight text-white" style={{ fontFamily: FONT_BODY }}>{item.text}</div><div className="text-[9px]" style={{ fontFamily: FONT_BODY, color: 'rgba(255,255,255,0.30)' }}>{item.sub}</div></div>
                  <div className="h-[2px] w-0 group-hover:w-full transition-all duration-400 mt-3 rounded-full" style={{ background: ACCENT }} />
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
        <Route path="/"                    element={<HomePage />} />
        <Route path="/about"               element={<AboutUs />} />
        <Route path="/products"            element={<Products />} />
        <Route path="/product/:id"         element={<ProductDetails />} />
        <Route path="/ai-agents"           element={<AIAgents />} />
        <Route path="/services/erp"              element={<ERP />} />
        <Route path="/services/crm"              element={<CRM />} />
        <Route path="/services/hr"               element={<HR />} />
        <Route path="/services/construction"     element={<Construction />} />
        <Route path="/services/ai-and-analytics" element={<AIAnalytics />} />
        <Route path="/services/e-invoicing"      element={<EInvoicing />} />
        <Route path="/contact"                   element={<Contact />} />
        {/* ── Policy pages ── */}
        <Route path="/privacy-policy"            element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions"      element={<TermsAndConditionsPage />} />
        <Route path="/refund-policy"             element={<RefundPolicyPage />} />
      </Route>
    </Routes>
  );
}