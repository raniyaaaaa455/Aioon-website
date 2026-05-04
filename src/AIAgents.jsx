import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import enzappsLogo from "./assets/enzapp.jpeg";
import heroBg from "./assets/videoai.mp4";
import odooLogo from "./assets/odoo official logo.png";
import zohoLogo from "./assets/Zoho.jpg";
import whatsappLogo from "./assets/WhatsApp.png";
import shopifyLogo from "./assets/Shopify.png";
import stripeLogo from "./assets/Stripe.png";
import Attendance from "./assets/Attendance.jpg";
import Trading from "./assets/Trading.jpg";
import Hotel from "./assets/Hotel.jpg";
import Laundry from "./assets/laundry.jpg";
import Property from "./assets/property.jpg";
import OdooImg from "./assets/odoo.jpg";
import WhatsAppImg from "./assets/whatsappimage.jpg";

// ─── THEME ────────────────────────────────────────────────────────────────────
const ACCENT       = '#2B55C5';
const ACCENT2      = '#1E45A8';
const ACCENT3      = '#5578D4';
const TEXT_PRIMARY = '#1A1A1A';
const TEXT_SEC     = '#4A4A4A';
const TEXT_MUTED   = '#8A8A8A';
const BORDER       = '#E5E5E5';
const BG_WHITE     = '#FFFFFF';
const BG_LIGHT     = '#F7F7F7';
const BG_OFFWHITE  = '#FCFCFA';
const BG_CREAM     = '#FAFAF8';

const FONT_HEADING = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BODY    = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BADGE   = '"DM Sans", "Segoe UI", system-ui, sans-serif';

const WA_GREEN     = '#25D366';
const WA_DARK      = '#075E54';
const WA_MID       = '#128C7E';

// ─── SOLUTIONS DATA ───────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    id: 'hrms', num: '01', tag: 'HRMS', name: 'Attendance & HR',
    headline: 'Attendance Made Simple with AI Agents',
    sub: 'AI-enabled attendance and workforce request automation with full cycle of HRMS',
    color: '#0EA5E9', darkColor: '#0369A1',
    image: Attendance,
    highlights: [
      { title: 'Attendance & Time Tracking', body: 'Attendance marking via AI chat with simple and fast employee check-in and check-out. Employees mark their attendance directly through WhatsApp — no biometrics, no hardware, no complicated setup required.' },
      { title: 'Validation & Compliance', body: 'Location-based check-in/check-out validation to reduce attendance misuse and ensure policy compliance. Every punch is verified with GPS location data, keeping records accurate and auditable.' },
      { title: 'Leave & Workforce Requests', body: 'Leave and vacation requests submitted via AI agent with automated routing for approvals and status updates. Employees submit, managers approve, and everyone stays informed — all within WhatsApp.' },
      { title: 'Service Value', body: 'Accurate attendance tracking, reduced manual HR effort, and seamless integration with CRM systems and Odoo. HR teams reclaim hours previously lost chasing timesheets and attendance records.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'No Biometrics · No Complicated Setup',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'trading', num: '02', tag: 'Trading', name: 'Trading & Distribution',
    headline: 'AI-Agent Solutions for Trading, System Integrators & Distributors',
    sub: 'AI-driven automation for sales, support, approvals, and communication.',
    color: ACCENT, darkColor: ACCENT2,
    image: Trading,
    highlights: [
      { title: 'AI-Agent Capabilities', body: 'AI-based quotation and service ticket creation, intelligent chat routing, and rule-based approval workflows.' },
      { title: 'Communication & Engagement', body: 'Instant WhatsApp notifications, automated CRM-based marketing messages, and seamless AI-human chat collaboration.' },
      { title: 'Employee Interaction', body: 'View and manage assigned tickets, interact with AI-Agent for lead creation, and review chat summaries.' },
      { title: 'Service Value', body: 'Faster process execution, reduced operational effort, and enhanced customer experience.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'Create Quotes · Send Quotes · Talk with Customers',
    ctaNote: 'AI-Agent Solution for your business',
  },
  {
    id: 'hotel', num: '03', tag: 'Hospitality', name: 'Hotel & Hospitality',
    headline: 'AI-Agent Solutions for Hotel & Hospitality Operations',
    sub: 'AI-enabled guest service automation for faster response and superior experience.',
    color: '#F59E0B', darkColor: '#B45309',
    image: Hotel,
    highlights: [
      { title: 'Guest Service Automation', body: 'AI-Agent handles service requests for restaurant, housekeeping, with intelligent routing to the right menus or departments.' },
      { title: 'Operations & Coordination', body: 'Automatic notifications to hotel departments with real-time request tracking and status visibility.' },
      { title: 'Assisted & Human Support', body: 'Smooth handover to human agents for complex requests, ensuring consistent service across AI and staff interactions.' },
      { title: 'Service Value', body: 'Faster guest response, improved service efficiency, and enhanced guest satisfaction.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'No App Required · Instant Guest Communication',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'laundry', num: '04', tag: 'Laundry', name: 'Laundry Management',
    headline: 'AI-Agent Solutions for Laundry Management',
    sub: 'End-to-end automation for pickup, processing, delivery, and customer communication.',
    color: '#8B5CF6', darkColor: '#6D28D9',
    image: Laundry,
    highlights: [
      { title: 'Pickup & Customer Interaction', body: 'Laundry pickup requests handled via AI chat with location capture and AI-driven communication without a mobile app.' },
      { title: 'Operations & Workflow Automation', body: 'Notifications with automatic pickup assignment, route details for executives and alerts for processing stages to managers.' },
      { title: 'Delivery, Payments & Support', body: 'Delivery executive notifications, optional payment gateway integration, and seamless transition to human chat for support.' },
      { title: 'Service Value', body: 'Fully automated laundry operations, reduced reliance on mobile apps, and improved turnaround time.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'No Mobile App Required · Full Automation',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'property', num: '05', tag: 'Property', name: 'Property Management',
    headline: 'AI-Agent Solutions for Property Management',
    sub: 'AI-powered communication and service automation for property agents and tenants.',
    color: '#10B981', darkColor: '#047857',
    image: Property,
    highlights: [
      { title: 'Property Inquiry & Engagement', body: 'AI chat manages property inquiries with real-time availability and guided conversations for details, pricing, and scheduling.' },
      { title: 'Secure Communication & Privacy', body: 'AI-enabled interaction with property representatives while fully protecting customer and property owner information.' },
      { title: 'Operations & Tenant Services', body: 'Maintenance requests and tenant feedback handled via AI chat with automatic routing to the appropriate representative.' },
      { title: 'Service Value', body: 'Centralized property communication, enhanced data privacy and compliance, and improved tenant and customer experience.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'Full Data Privacy · Centralized Communication',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'odoo', num: '06', tag: 'ERP', name: 'Odoo Implementation',
    headline: 'Scalable Success with Odoo Implementation',
    sub: 'Comprehensive ERP services designed for stability, scalability, and growth.',
    color: ACCENT, darkColor: ACCENT2,
    image: OdooImg,
    highlights: [
      { title: 'Odoo Implementation (Enterprise & Community)', body: 'Business-focused system setup and configuration with industry-specific workflows and scalable architecture.' },
      { title: 'Monthly Support Services', body: 'Continuous bug fixes, performance optimization, feature enhancements, and ongoing customizations.' },
      { title: 'Premium Support Plan', body: 'Dedicated Odoo specialists with priority response and expert operational guidance.' },
      { title: 'Service Value', body: 'Stable and reliable ERP operations, flexible system evolution, and expert-driven support.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'Enterprise & Community · KSA Compliance · Priority Support',
    ctaNote: 'Scalable ERP for the Saudi Market',
  },
  {
    id: 'whatsapp', num: '07', tag: 'WhatsApp AI', name: 'WhatsApp Chatbot',
    headline: 'Your Business, Automated on WhatsApp 24/7',
    sub: '24/7 AI automation on WhatsApp',
    color: WA_GREEN, darkColor: WA_DARK,
    image: WhatsAppImg,
    highlights: [], package: [], packageNote: '', ctaNote: '', isWhatsApp: true,
  },
];

// ─── HERO PHONE CHAT — all messages visible immediately ──────────────────────
function HeroPhoneChat() {
  const allMessages = [
    { from: 'bot',  text: '👋 Hello! Welcome to our store. How can I help you today?', time: '09:01' },
    { from: 'user', text: 'Hi, I want to know the pricing for your premium plan', time: '09:02' },
    { from: 'bot',  text: 'Great! Our Professional plan is SAR 499/month — includes unlimited chats, CRM sync and priority support. Shall I send a brochure?', time: '09:02' },
    { from: 'user', text: 'Yes please, and book me a demo 😊', time: '09:03' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', background: '#E5DDD5', display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px 8px' }}>
      {allMessages.map((msg, i) => (
        <div key={i}
          style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
          <div style={{
            maxWidth: '84%', padding: '6px 9px',
            borderRadius: msg.from === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
            background: msg.from === 'user' ? '#DCF8C6' : '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          }}>
            <div style={{ fontSize: '10px', color: '#111', lineHeight: 1.4, fontFamily: FONT_BODY }}>{msg.text}</div>
            <div style={{ fontSize: '8px', color: '#999', textAlign: 'right', marginTop: '3px', fontFamily: FONT_BODY }}>{msg.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── DASHBOARD PHONE CHAT — all messages visible immediately ─────────────────
function DashboardPhoneChat() {
  const allMessages = [
    { from: 'bot',  text: 'Hi! How can I help? 👋' },
    { from: 'user', text: 'I need pricing' },
    { from: 'bot',  text: 'SAR 199/mo — starts free!' },
    { from: 'user', text: 'Book demo 😊' },
    { from: 'bot',  text: 'Confirmed! See you Tuesday ✅' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', background: '#E5DDD5', display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px' }}>
      {allMessages.map((msg, i) => (
        <div key={i}
          style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
          <div style={{
            maxWidth: '88%', padding: '4px 7px',
            borderRadius: msg.from === 'user' ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
            background: msg.from === 'user' ? '#DCF8C6' : '#FFFFFF',
            boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
            fontSize: '7px', color: '#111', lineHeight: 1.35, fontFamily: FONT_BODY,
          }}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => { if (video.currentTime >= 15 && showOverlay) setShowOverlay(false); };
    const handleSeeked = () => {
      if (video.currentTime < 15 && !showOverlay) setShowOverlay(true);
      else if (video.currentTime >= 15 && showOverlay) setShowOverlay(false);
    };
    const handleEnded = () => setShowOverlay(true);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('ended', handleEnded);
    };
  }, [showOverlay]);

  return (
    <section ref={heroRef} className="relative flex items-center justify-center overflow-hidden" style={{ height: '100svh', minHeight: '500px', background: '#0a0a0a' }}>
      <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.45 }}>
        <source src={heroBg} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
      <AnimatePresence>
        {showOverlay && (
          <motion.div style={{ opacity }} className="absolute inset-0 z-10 w-full flex flex-col items-center justify-center text-center px-5"
            initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}
              className="text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 md:mb-6"
              style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.60)', textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}>
              Powered by ENZAPPS · Marketed by Aioon
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase"
              style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(2rem, 6.5vw, 6rem)', lineHeight: 1.0, letterSpacing: '0.02em', color: 'rgba(230, 230, 235, 0.85)', textShadow: '0 2px 32px rgba(0,0,0,0.90)' }}>
              AI AGENTS FOR<br />EVERY INDUSTRY
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showOverlay && (
          <motion.div className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-5"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
            <motion.p className="text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.55)', textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
              Powered by Aioon Alnajah · Marketed by Aioon
            </motion.p>
            <motion.h2 className="font-black uppercase"
              style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.1rem, 2.5vw, 2rem)', lineHeight: 1.1, letterSpacing: '0.03em', color: 'rgba(225, 225, 230, 0.80)', textShadow: '0 2px 20px rgba(0,0,0,0.90)' }}>
              AI AGENTS FOR EVERY INDUSTRY
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
    </section>
  );
}

// ─── SOLUTIONS OVERVIEW ───────────────────────────────────────────────────────
function SolutionsOverview({ onSelect }) {
  return (
    <section style={{ background: BG_LIGHT, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-14">
        <div className="mb-8 md:mb-10">
          <h2 className="font-bold leading-tight mb-1" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.4rem,3vw,2.4rem)', color: TEXT_PRIMARY }}>
            Our Core <span style={{ color: ACCENT }}>AI-Agent Solutions</span>
          </h2>
          <p className="text-[13px]" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>Click any solution below to explore every feature in detail.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SOLUTIONS.map((sol, i) => (
            <motion.button key={sol.id} onClick={() => onSelect(sol.id)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group text-left overflow-hidden transition-all duration-300 relative w-full"
              style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', borderRadius: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${sol.color}50`; e.currentTarget.style.boxShadow = `0 12px 36px ${sol.color}18`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'none'; }}>
              <div className="relative overflow-hidden" style={{ height: '150px' }}>
                <img src={sol.image} alt={sol.name} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: sol.isWhatsApp ? 'brightness(0.35) saturate(0.8) hue-rotate(100deg)' : 'brightness(0.42) saturate(0.55)' }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 60%)` }} />
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${sol.color}22 0%, transparent 60%)` }} />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ background: `${sol.color}28`, color: sol.color, border: `1px solid ${sol.color}45`, fontFamily: FONT_BADGE }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: sol.color }} />{sol.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-3">
                  <div className="text-[9px] font-bold mb-0.5" style={{ fontFamily: FONT_BADGE, color: sol.color }}>{sol.num}</div>
                  <h3 className="font-bold text-white text-[13px] leading-tight" style={{ fontFamily: FONT_HEADING }}>{sol.name}</h3>
                </div>
              </div>
              <div className="px-4 py-4">
                <p className="text-[11px] leading-relaxed mb-3" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>{sol.sub}</p>
                <p className="text-[10px] font-semibold mb-4" style={{ fontFamily: FONT_BADGE, color: sol.color }}>
                  {sol.isWhatsApp ? 'Human-Like AI · Lead Qualification · Bilingual' : sol.highlights[0]?.title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>Explore Solution</span>
                  <span className="w-7 h-7 flex items-center justify-center text-[13px]" style={{ background: `${sol.color}14`, color: sol.color }}>→</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPACT IMAGE + PACKAGE ──────────────────────────────────────────────────
function CompactImagePackage({ solution }) {
  const sol = solution;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start mb-12">
      <div className="relative lg:col-span-2">
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 z-20 pointer-events-none" style={{ borderColor: `${sol.color}80` }} />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 z-20 pointer-events-none" style={{ borderColor: `${sol.color}80` }} />
        <div className="relative overflow-hidden" style={{ height: '240px', borderRadius: 0 }}>
          <img src={sol.image} alt={sol.name} className="w-full h-full object-cover object-center" style={{ filter: 'grayscale(8%) contrast(1.03)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(10,10,20,0.50) 0%, transparent 55%)` }} />
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: sol.color }} />
        </div>
        <div className="absolute -bottom-4 -right-4 px-4 py-3 shadow-xl z-10" style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, borderRadius: 0, minWidth: '155px' }}>
          <p className="text-[8px] uppercase tracking-[0.3em] font-bold mb-2" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>Quick Specs</p>
          {[['Platform','WhatsApp'],['Setup','No Hardware'],['Support','24 / 7']].map(([l,v],i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b last:border-0" style={{ borderColor: BORDER }}>
              <span className="text-[9px] font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{l}</span>
              <span className="text-[10px] font-bold" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>{v}</span>
            </div>
          ))}
          <div className="mt-2 h-px" style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }} />
        </div>
      </div>
      <div className="pt-1 lg:col-span-3 mt-4 lg:mt-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] mb-1" style={{ fontFamily: FONT_BADGE, color: sol.color }}>
          Package Includes Following Features
        </p>
        <h3 className="font-bold text-[15px] md:text-[16px] mb-1" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>
          {sol.name} — Complete AI-Agent Bundle
        </h3>
        <p className="text-[11px] mb-4" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{sol.packageNote}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {sol.package.map((item, ii) => (
            <span key={ii} className="inline-flex items-center gap-1 px-2 py-1 text-[9px] font-semibold"
              style={{ background: `${sol.color}10`, color: sol.color, border: `1px solid ${sol.color}28`, fontFamily: FONT_BODY }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: sol.color }} />{item}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="text-[11px] flex-1" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>{sol.ctaNote}</p>
          <a href="https://wa.me/966535141447" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-white text-[11px] transition-all duration-300 flex-shrink-0"
            style={{ background: sol.color, fontFamily: FONT_BADGE, borderRadius: 0, boxShadow: `0 4px 14px ${sol.color}30` }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='none'; }}>
            <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── ACCORDION HIGHLIGHTS ─────────────────────────────────────────────────────
function AccordionHighlights({ solution }) {
  const sol = solution;
  const [openIndices, setOpenIndices] = useState(new Set());
  const isOdoo = sol.id === 'odoo';
  const toggleAccordion = (index) => {
    const n = new Set(openIndices);
    if (n.has(index)) n.delete(index); else n.add(index);
    setOpenIndices(n);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16 relative z-10">
        <motion.div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${sol.color}60)` }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        <div className="text-center flex-shrink-0">
          <motion.p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] mb-1"
            style={{ fontFamily: FONT_BADGE, color: sol.color }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Discover the Process
          </motion.p>
          <motion.h2 className="font-black uppercase leading-none"
            style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.8rem, 5vw, 4.5rem)', color: TEXT_PRIMARY, letterSpacing: '-0.01em' }}
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            HOW IT <span style={{ color: sol.color }}>WORKS</span>
          </motion.h2>
        </div>
        <motion.div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${sol.color}60)` }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        {sol.highlights.map((h, i) => {
          const isOpen = openIndices.has(i);
          const isLast = i === sol.highlights.length - 1;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <div className="w-full" style={{ height: '1px', background: i === 0 ? `linear-gradient(to right, ${sol.color}20, ${BORDER})` : BORDER, opacity: i === 0 ? 1 : 0.7 }} />
              <button onClick={() => toggleAccordion(i)}
                className="w-full flex items-center justify-between py-4 md:py-6 px-2 text-left transition-all duration-300"
                style={{ background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${sol.color}03`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] flex-shrink-0" style={{ fontFamily: FONT_BADGE, color: sol.color }}>{sol.tag} Feature</span>
                      <span className="text-[8px] md:text-[9px] font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    {isOdoo && i === 0 ? (
                      <h3 className="font-bold text-[13px] md:text-[18px] leading-tight transition-colors duration-300 flex items-center flex-wrap"
                        style={{ fontFamily: FONT_HEADING, color: isOpen ? sol.color : TEXT_PRIMARY, gap: 'clamp(4px, 1vw, 8px)' }}>
                        <img src={odooLogo} alt="Odoo" style={{ height: 'clamp(14px, 2vw, 18px)', width: 'auto', display: 'inline-block', verticalAlign: 'middle' }} />
                        Implementation (Enterprise & Community)
                      </h3>
                    ) : (
                      <h3 className="font-bold text-[13px] md:text-[18px] leading-tight transition-colors duration-300"
                        style={{ fontFamily: FONT_HEADING, color: isOpen ? sol.color : TEXT_PRIMARY }}>{h.title}</h3>
                    )}
                  </div>
                </div>
                <motion.span className="flex-shrink-0 ml-3 md:ml-4 text-xl md:text-2xl font-light leading-none" style={{ color: isOpen ? sol.color : TEXT_MUTED }}
                  animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <div className="px-2 pb-5 md:pb-8">
                      <div className="h-px w-10 mb-4" style={{ background: `linear-gradient(to right, ${sol.color}40, transparent)` }} />
                      <p className="text-[12px] md:text-[15px] leading-[1.75] max-w-2xl" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>{h.body}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {isLast && <div className="w-full h-px" style={{ background: BORDER }} />}
            </motion.div>
          );
        })}
      </div>
      <motion.div className="flex justify-center mt-10 relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: `${sol.color}30` }} />
          <span className="w-2 h-2 rotate-45" style={{ background: sol.color, opacity: 0.6 }} />
          <div className="h-px w-8" style={{ background: `${sol.color}30` }} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── STICKY SOLUTION NAV ──────────────────────────────────────────────────────
function SolutionsNav({ activeId, onSelect }) {
  return (
    <div className="sticky top-16 z-30" style={{ background: BG_WHITE, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-8 lg:px-12">
        <div className="flex overflow-x-auto gap-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {SOLUTIONS.map((sol) => {
            const isActive = activeId === sol.id;
            return (
              <button key={sol.id} onClick={() => onSelect(sol.id)}
                className="relative flex-shrink-0 flex flex-col items-start gap-0.5 px-2 sm:px-5 py-2.5 sm:py-3.5 transition-all duration-200"
                style={{ borderBottom: isActive ? `2px solid ${sol.color}` : '2px solid transparent', background: isActive ? `${sol.color}07` : 'transparent', minWidth: 80 }}>
                <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: FONT_BADGE, color: isActive ? sol.color : TEXT_MUTED }}>{sol.num}</span>
                <span className="text-[9px] sm:text-[11px] font-semibold leading-tight text-left" style={{ fontFamily: FONT_HEADING, color: isActive ? TEXT_PRIMARY : TEXT_MUTED }}>{sol.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── WHATSAPP CHATBOT SECTION ─────────────────────────────────────────────────
function WhatsAppChatbotDetail() {
  const features = [
    { icon: '🧠', title: 'Human-Like AI Conversations', body: 'Advanced LLMs understand context, tone and intent — giving customers a genuinely natural experience on WhatsApp.' },
    { icon: '🎯', title: 'Smart Lead Qualification', body: 'Automatically scores, qualifies and routes leads so your sales team only speaks to hot prospects.' },
    { icon: '📅', title: 'Appointment Booking', body: 'Customers book, reschedule and cancel appointments directly inside WhatsApp, synced to your calendar in real time.' },
    { icon: '🔗', title: 'ERP & CRM Integration', body: 'Native connectors for Odoo, Salesforce, HubSpot and 50+ platforms. All data stays in sync automatically.' },
    { icon: '📊', title: 'Advanced Analytics', body: 'Track conversation volume, response times, lead funnel and customer satisfaction in a live dashboard.' },
    { icon: '🌍', title: 'Arabic & English Bilingual', body: 'Fluent in both languages. Auto-detects the customer\'s language and responds accordingly — zero configuration.' },
    { icon: '🛒', title: 'WhatsApp Catalogue & Payments', body: 'Showcase products, take orders and process payments entirely inside the WhatsApp interface.' },
    { icon: '🔒', title: 'Enterprise-Grade Security', body: 'End-to-end encrypted, GDPR compliant, hosted on secure cloud infrastructure. Your data is always protected.' },
    { icon: '📍', title: 'GPS Check IN/OUT via WhatsApp', body: 'Employees under your organization can check-in or check-out via WhatsApp bot.' },
  ];

  const advantages = [
    { title: 'Instant response, 24/7', body: 'Customers never wait — every message answered in under 1 second.' },
    { title: 'Unlimited conversations', body: 'Arabic and English, simultaneously, with zero degradation in quality.' },
    { title: 'Qualifies & routes leads', body: 'Warm prospects only reach your sales team — AI filters the noise.' },
    { title: 'Seamless integrations', body: 'Odoo, Salesforce, HubSpot and 50+ platforms all stay in sync.' },
    { title: 'Reduces support costs by 80%', body: 'Automate repetitive queries, free your team for high-value tasks.' },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div key="whatsapp-section" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

        {/* ── HERO BANNER ── */}
        <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${WA_DARK} 0%, #0a2a26 40%, #051a16 100%)`, minHeight: '100svh' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${WA_GREEN}40 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: WA_GREEN, filter: 'blur(80px)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-8" style={{ background: WA_MID, filter: 'blur(60px)', transform: 'translate(-30%, 30%)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-12">
            <div className="flex-1 max-w-xl w-full">
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 md:mb-5" style={{ fontFamily: FONT_BADGE, color: WA_GREEN }}>
                  AI-POWERED WHATSAPP AUTOMATION
                </p>
                <h2 className="font-black leading-tight mb-3 md:mb-4" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                  Your Business,<br />Automated on<br /><span style={{ color: WA_GREEN }}>WhatsApp 24/7</span>
                </h2>
                <p className="text-[12px] md:text-[13px] leading-relaxed mb-5 md:mb-6" style={{ fontFamily: FONT_BODY, color: 'rgba(255,255,255,0.65)' }}>
                  Aioon Alnajah AI Chatbot handles customer queries, qualifies leads, books appointments and closes deals on WhatsApp — without a single human agent.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['A','B','C'].map((l, i) => (
                      <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white border-2" style={{ background: [WA_MID, WA_GREEN, '#0a7a6a'][i], borderColor: WA_DARK }}>{l}</div>
                    ))}
                  </div>
                  <span className="text-[11px] md:text-[12px]" style={{ fontFamily: FONT_BODY, color: 'rgba(255,255,255,0.55)' }}>Trusted by <strong style={{ color: 'rgba(255,255,255,0.85)' }}>200+ businesses</strong> across the GCC</span>
                </div>
              </motion.div>
            </div>

            {/* ── HERO PHONE ── */}
            <div className="flex-shrink-0 relative mx-auto lg:ml-6 xl:ml-12 mt-8 lg:mt-12">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="relative">
                <div className="absolute -top-3 -right-4 px-3 py-2 z-20" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', boxShadow: '0 6px 20px rgba(0,0,0,0.18)', borderRadius: 8, minWidth: '90px', border: '1px solid rgba(255,255,255,0.5)' }}>
                  <div className="text-[16px] font-black" style={{ fontFamily: FONT_HEADING, color: WA_MID, lineHeight: 1 }}>98%</div>
                  <div className="text-[8px] font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>Response Rate</div>
                </div>
                <div className="absolute -bottom-2 -left-4 px-3 py-2 z-20" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', boxShadow: '0 6px 20px rgba(0,0,0,0.18)', borderRadius: 8, minWidth: '85px', border: '1px solid rgba(255,255,255,0.5)' }}>
                  <div className="text-[16px] font-black" style={{ fontFamily: FONT_HEADING, color: WA_MID, lineHeight: 1 }}>3x</div>
                  <div className="text-[8px] font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>Lead Conversion</div>
                </div>

                <div style={{ width: '240px' }}>
                  <div style={{ background: '#1a1a1a', borderRadius: '36px', padding: '10px', boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)', border: '2px solid #333' }}>
                    <div style={{ background: '#111', borderRadius: '26px 26px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '420px' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '6px', paddingBottom: '4px', background: '#1a1a1a', flexShrink: 0 }}>
                        <div style={{ width: '60px', height: '18px', background: '#111', borderRadius: '10px' }} />
                      </div>
                      <div style={{ background: WA_MID, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: WA_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🤖</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: FONT_HEADING }}>Aioon AI Bot</div>
                          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: WA_GREEN, display: 'inline-block' }} />Online now
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', opacity: 0.7 }}>
                          <span style={{ color: '#fff', fontSize: '10px' }}>📹</span>
                          <span style={{ color: '#fff', fontSize: '10px' }}>📞</span>
                        </div>
                      </div>
                      <HeroPhoneChat />
                      <div style={{ background: '#F0F0F0', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <div style={{ flex: 1, background: '#fff', borderRadius: '18px', padding: '5px 10px', fontSize: '9px', color: '#aaa', fontFamily: FONT_BODY }}>Message…</div>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: WA_MID, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>🎤</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── FEATURES GRID ── */}
        <div style={{ background: BG_LIGHT }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 md:py-20">
            <div className="text-center mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3" style={{ fontFamily: FONT_BADGE, color: WA_GREEN }}>Features</p>
              <h2 className="font-black leading-tight mb-4" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color: TEXT_PRIMARY }}>
                Everything You Need to <span style={{ color: WA_MID }}>Automate</span>
              </h2>
              <p className="text-[13px] md:text-[14px] max-w-xl mx-auto" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
                One platform to replace an entire customer support team — powered by enterprise AI, built for GCC businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group p-5 md:p-6 transition-all duration-300"
                  style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, borderRadius: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${WA_GREEN}50`; e.currentTarget.style.boxShadow=`0 10px 32px ${WA_GREEN}12`; e.currentTarget.style.transform='translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=BORDER; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.03)'; e.currentTarget.style.transform='none'; }}>
                  <div className="w-10 h-10 flex items-center justify-center text-[20px] mb-4" style={{ background:`${WA_GREEN}10`, border:`1px solid ${WA_GREEN}20` }}>{f.icon}</div>
                  <h3 className="font-bold text-[13px] md:text-[14px] mb-2" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>{f.title}</h3>
                  <p className="text-[11px] md:text-[12px] leading-relaxed" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>{f.body}</p>
                  <div className="mt-4 h-[2px] w-0 transition-all duration-500 group-hover:w-full" style={{ background:`linear-gradient(to right, ${WA_GREEN}, transparent)` }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── INTEGRATIONS ── */}
        <div style={{ background: BG_WHITE, borderBottom: `1px solid ${BORDER}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-12">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 md:mb-8" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>
              Integrated with platforms you already use
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
              {[
                { src: odooLogo, alt: 'Odoo', height: '28px' },
                { src: whatsappLogo, alt: 'WhatsApp', height: '60px' },
                { src: zohoLogo, alt: 'Zoho', height: '72px' },
                { src: shopifyLogo, alt: 'Shopify', height: '76px' },
                { src: stripeLogo, alt: 'Stripe', height: '42px' },
              ].map((logo, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.07 }}>
                  <img src={logo.src} alt={logo.alt} style={{ height: logo.height, width: 'auto', objectFit: 'contain' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ADVANTAGES + DASHBOARD ── */}
        <div style={{ background: BG_CREAM, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* LEFT: Advantages */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3" style={{ fontFamily: FONT_BADGE, color: WA_GREEN }}>Why AI Chatbot</p>
                <h2 className="font-black leading-tight mb-3" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.9rem, 3.5vw, 3.4rem)', color: TEXT_PRIMARY }}>
                  Advantages That<br /><span style={{ color: WA_MID }}>Transform</span><br />Your Business
                </h2>
                <p className="text-[13px] mb-8 md:mb-10 leading-relaxed text-justify" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
                  Stop missing leads and start automating. Aioon Alnajah AI gives you a 24/7 sales and support team on WhatsApp — working tirelessly while you sleep.
                </p>
                <div className="space-y-0">
                  {advantages.map((adv, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-4 py-4 md:py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center mt-0.5" style={{ background:`${WA_GREEN}15`, border:`1px solid ${WA_GREEN}30` }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={WA_GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div className="text-justify">
                        <h4 className="font-bold text-[13px] md:text-[14px] mb-1" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>{adv.title}</h4>
                        <p className="text-[11px] md:text-[12px] leading-relaxed" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>{adv.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Dashboard + Phone */}
              <motion.div
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
                style={{ position: 'relative' }}
              >
                {/* DASHBOARD BOX */}
                <motion.div
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: '#0F1923', borderRadius: '16px', marginTop: '16px',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.05)',
                    overflow: 'hidden', position: 'relative',
                  }}
                >
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:WA_GREEN, boxShadow:`0 0 6px ${WA_GREEN}50` }} />
                      <span style={{ fontSize:'11px', fontWeight:700, color:'#fff', fontFamily:FONT_HEADING }}>Aioon AI · Live Dashboard</span>
                    </div>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'9px', fontWeight:600, padding:'4px 10px', borderRadius:'12px', background:`${WA_GREEN}18`, color:WA_GREEN, border:`1px solid ${WA_GREEN}30` }}>
                      <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:WA_GREEN }} />Live
                    </span>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', background:'rgba(255,255,255,0.02)' }}>
                    {[
                      { val:'142', label:'Chats Today', sub:'+18% vs yesterday', color:'#22C55E' },
                      { val:'23', label:'Hot Leads', sub:'+5 new today', color:WA_GREEN },
                      { val:'0.8s', label:'Avg Response', sub:'Optimal', color:'#3B82F6' },
                    ].map((item, i) => (
                      <div key={i} style={{ padding:'14px 14px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                        <div style={{ fontSize:'24px', fontWeight:900, color:'#fff', fontFamily:FONT_HEADING, letterSpacing:'-0.02em', lineHeight:1 }}>{item.val}</div>
                        <div style={{ fontSize:'7px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(255,255,255,0.35)', fontFamily:FONT_BADGE, marginTop:'4px' }}>{item.label}</div>
                        <div style={{ fontSize:'9px', fontWeight:600, color:item.color, marginTop:'3px', fontFamily:FONT_BADGE }}>↗ {item.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Leads + Phone row with more padding top for leads */}
                  <div style={{ display:'flex', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ flex:1, padding:'24px 16px 14px 16px', minWidth:0 }}>
                      <div style={{ fontSize:'8px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.18em', color:'rgba(255,255,255,0.25)', fontFamily:FONT_BADGE, marginBottom:'12px' }}>Recent Leads</div>
                      {[
                        { initials:'AH', name:'Ahmed Al-Rashid', note:'Interested in Enterprise plan', badge:'Hot', badgeColor:'#22C55E', bg:WA_MID },
                        { initials:'SA', name:'Sara Mohammed', note:'Demo booked for tomorrow', badge:'New', badgeColor:WA_GREEN, bg:'#2563EB' },
                        { initials:'KA', name:'Khaled Clinic Group', note:'Odoo ERP integration needed', badge:'Follow-up', badgeColor:'#F59E0B', bg:'#7C3AED' },
                        { initials:'MA', name:'Mohammed Al-Farsi', note:'WhatsApp API integration', badge:'Hot', badgeColor:'#22C55E', bg:'#DC2626' },
                      ].map((lead, i) => (
                        <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', paddingTop:'10px', paddingBottom:'10px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <div style={{ width:'30px', height:'30px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:700, color:'#fff', flexShrink:0, background:lead.bg }}>{lead.initials}</div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:'10px', fontWeight:700, color:'#fff', fontFamily:FONT_HEADING, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lead.name}</div>
                            <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.30)', fontFamily:FONT_BODY, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:'1px' }}>{lead.note}</div>
                          </div>
                          <span style={{ flexShrink:0, padding:'2px 7px', fontSize:'7px', fontWeight:700, borderRadius:'5px', background:`${lead.badgeColor}18`, color:lead.badgeColor, border:`1px solid ${lead.badgeColor}30`, fontFamily:FONT_BADGE }}>{lead.badge}</span>
                        </div>
                      ))}
                    </div>

                    {/* Phone section - pushed to the right */}
                    <div style={{ width:'160px', flexShrink:0, position:'relative', padding:'28px 4px 0 8px' }}>
                      <div style={{
                        width:'132px',
                        height:'260px',
                        background:'linear-gradient(145deg,#2a2a2a,#111)',
                        borderRadius:'26px',
                        padding:'6px',
                        boxShadow:'0 0 0 1px rgba(255,255,255,0.08), 0 0 0 4px #0d0d0d, 0 0 0 5px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)',
                        position:'relative',
                        zIndex:20,
                      }}>
                        <div style={{ position:'absolute', right:-2, top:'28%', width:2, height:30, background:'linear-gradient(to left,#0a0a0a,#3a3a3a)', borderRadius:'0 1px 1px 0' }} />
                        <div style={{ width:'100%', height:'100%', background:'#000', borderRadius:'22px', overflow:'hidden', display:'flex', flexDirection:'column' }}>
                          <div style={{ background:'#000', display:'flex', justifyContent:'center', paddingTop:'5px', paddingBottom:'3px', flexShrink:0 }}>
                            <div style={{ width:'44px', height:'12px', background:'#000', borderRadius:'10px', border:'1px solid #1a1a1a' }} />
                          </div>
                          <div style={{ background:WA_MID, padding:'6px 8px', display:'flex', alignItems:'center', gap:'5px', flexShrink:0 }}>
                            <div style={{ width:'22px', height:'22px', borderRadius:'50%', background:`linear-gradient(135deg,${WA_GREEN},${WA_MID})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', flexShrink:0, boxShadow:'0 1px 3px rgba(0,0,0,0.3)' }}>🤖</div>
                            <div>
                              <div style={{ fontSize:'8px', fontWeight:700, color:'#fff', fontFamily:FONT_HEADING }}>Aioon AI Bot</div>
                              <div style={{ fontSize:'6px', color:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', gap:'2px' }}>
                                <span style={{ width:'4px', height:'4px', borderRadius:'50%', background:WA_GREEN, display:'inline-block', boxShadow:`0 0 3px ${WA_GREEN}` }} />Online
                              </div>
                            </div>
                          </div>
                          <DashboardPhoneChat />
                          <div style={{ background:'#F0F0F0', padding:'4px 6px', display:'flex', alignItems:'center', gap:'4px', flexShrink:0 }}>
                            <div style={{ flex:1, background:'#fff', borderRadius:'12px', padding:'3px 7px', fontSize:'7px', color:'#aaa', fontFamily:FONT_BODY }}>Message…</div>
                            <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:WA_MID, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', flexShrink:0 }}>🎤</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badges INSIDE the box at bottom corners */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'stretch', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{
                      background:'rgba(15,25,35,0.95)',
                      padding:'14px 18px',
                      display:'flex',
                      alignItems:'center',
                      gap:'10px',
                      whiteSpace:'nowrap',
                      borderRight:'1px solid rgba(255,255,255,0.06)',
                      flex:1,
                    }}>
                      <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:`${WA_GREEN}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px' }}>👥</div>
                      <div>
                        <div style={{ fontSize:'17px', fontWeight:900, color:'#fff', fontFamily:FONT_HEADING, lineHeight:1 }}>200+</div>
                        <div style={{ fontSize:'9px', fontWeight:600, color:'rgba(255,255,255,0.45)', fontFamily:FONT_BADGE, marginTop:'2px' }}>GCC Businesses</div>
                      </div>
                    </div>

                    <div style={{ width:'1px', background:'rgba(255,255,255,0.06)' }} />

                    <div style={{
                      background:'rgba(15,25,35,0.95)',
                      padding:'14px 18px',
                      display:'flex',
                      alignItems:'center',
                      gap:'10px',
                      whiteSpace:'nowrap',
                      flex:1,
                    }}>
                      <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:`${WA_GREEN}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={WA_GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize:'17px', fontWeight:900, color:'#fff', fontFamily:FONT_HEADING, lineHeight:1 }}>98%</div>
                        <div style={{ fontSize:'9px', fontWeight:600, color:'rgba(255,255,255,0.45)', fontFamily:FONT_BADGE, marginTop:'2px' }}>Response Rate</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="h-px" style={{ background: BORDER }} />
      </motion.div>
    </AnimatePresence>
  );
}

// ─── SOLUTION DETAIL ──────────────────────────────────────────────────────────
function SolutionDetail({ solution }) {
  const sol = solution;
  if (sol.isWhatsApp) return <WhatsAppChatbotDetail />;
  const isOdoo = sol.id === 'odoo';

  return (
    <AnimatePresence mode="wait">
      <motion.div key={sol.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <div className="relative overflow-hidden" style={{ height: 'clamp(220px, 38vh, 400px)' }}>
          <motion.img key={`img-${sol.id}`} src={sol.image} alt={sol.name} className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.35) saturate(0.55)' }}
            initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.90) 0%, rgba(8,8,8,0.65) 55%, rgba(8,8,8,0.28) 100%)' }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom left, ${sol.color}18 0%, transparent 65%)` }} />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
              <motion.div initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: FONT_BADGE, color: sol.color }}>{sol.tag} · AI-Agent Solution</span>
                  <span className="text-[9px] md:text-[10px]" style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.30)' }}>{sol.num} of 07</span>
                </div>
                {isOdoo ? (
                  <h2 className="font-bold mb-2 md:mb-3 max-w-2xl flex items-center flex-wrap" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.3rem,3vw,2.5rem)', color: '#FFFFFF', lineHeight: 1.1, gap: 'clamp(4px, 1vw, 8px)' }}>
                    Scalable Success with <img src={odooLogo} alt="Odoo" style={{ height: 'clamp(1.3rem, 3vw, 2.5rem)', width: 'auto', display: 'inline-block', verticalAlign: 'middle' }} /> Implementation
                  </h2>
                ) : (
                  <h2 className="font-bold mb-2 md:mb-3 max-w-2xl" style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.3rem,3vw,2.5rem)', color: '#FFFFFF', lineHeight: 1.1 }}>{sol.headline}</h2>
                )}
                <motion.div className="h-[2px] mb-3 md:mb-4" style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }}
                  initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 0.8, delay: 0.25 }} />
                <p className="text-[12px] md:text-[13px] leading-relaxed max-w-md" style={{ fontFamily: FONT_BODY, color: 'rgba(255,255,255,0.58)' }}>{sol.sub}</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div style={{ background: BG_WHITE }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>About This Solution</p>
            <CompactImagePackage solution={sol} />
            <div className="h-px mb-10 md:mb-12" style={{ background: BORDER }} />
          </div>
        </div>

        <div style={{ background: BG_CREAM }} className="w-full relative overflow-hidden">
          <motion.div className="absolute inset-0 z-0 opacity-30"
            animate={{ background: [`radial-gradient(circle at 30% 50%, ${sol.color}15 0%, transparent 50%)`, `radial-gradient(circle at 70% 50%, ${sol.color}10 0%, transparent 50%)`, `radial-gradient(circle at 30% 50%, ${sol.color}15 0%, transparent 50%)`] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: `linear-gradient(to right, transparent, ${sol.color}40, transparent)` }}
            animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 md:py-20 relative z-10">
            <AccordionHighlights solution={sol} />
          </div>
        </div>
        <div className="h-px" style={{ background: BORDER }} />
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function AIAgents() {
  const location = useLocation();
  const [activeId, setActiveId] = useState(null);
  const detailRef = useRef(null);
  const overviewRef = useRef(null);

  useEffect(() => {
    const state = location.state;
    if (!state) return;
    const { activeSolutionId, scrollToDetail, scrollToOverview } = state;
    if (activeSolutionId) {
      setActiveId(activeSolutionId);
      setTimeout(() => {
        if (scrollToDetail || scrollToOverview) detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
    window.history.replaceState({}, document.title);
  }, [location.state]);

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash) {
      const matched = SOLUTIONS.find(s => s.id === hash);
      if (matched) {
        setActiveId(matched.id);
        setTimeout(() => { detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 200);
      }
    }
  }, [location.hash]);

  const handleSelect = (id) => {
    setActiveId(id);
    setTimeout(() => { detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
  };

  const activeSolution = SOLUTIONS.find(s => s.id === activeId);

  return (
    <div style={{ fontFamily: FONT_BODY, overflowX: 'hidden' }}>
      <HeroSection />
      <div ref={overviewRef}>
        <SolutionsOverview onSelect={handleSelect} />
      </div>
      {activeId && (
        <>
          <SolutionsNav activeId={activeId} onSelect={handleSelect} />
          <div ref={detailRef}>
            <SolutionDetail solution={activeSolution} />
          </div>
        </>
      )}
    </div>
  );
}