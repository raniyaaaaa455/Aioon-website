import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import enzappsLogo from "./assets/enzapp.jpeg";
import heroBg from "./assets/videoai.mp4";
import odooLogo from "./assets/odoo official logo.png";

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

// ─── SOLUTIONS DATA ───────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    id: 'hrms',
    num: '01',
    tag: 'HRMS',
    name: 'Attendance & HR',
    headline: 'Attendance Made Simple with AI Agents',
    sub: 'AI-enabled attendance and workforce request automation with full cycle of HRMS',
    color: '#0EA5E9',
    darkColor: '#0369A1',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80',
    highlights: [
      { title: 'Attendance & Time Tracking',   body: 'Attendance marking via AI chat with simple and fast employee check-in and check-out. Employees mark their attendance directly through WhatsApp — no biometrics, no hardware, no complicated setup required.' },
      { title: 'Validation & Compliance',       body: 'Location-based check-in/check-out validation to reduce attendance misuse and ensure policy compliance. Every punch is verified with GPS location data, keeping records accurate and auditable.' },
      { title: 'Leave & Workforce Requests',   body: 'Leave and vacation requests submitted via AI agent with automated routing for approvals and status updates. Employees submit, managers approve, and everyone stays informed — all within WhatsApp.' },
      { title: 'Service Value',                body: 'Accurate attendance tracking, reduced manual HR effort, and seamless integration with CRM systems and Odoo. HR teams reclaim hours previously lost chasing timesheets and attendance records.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'No Biometrics · No Complicated Setup',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'trading',
    num: '02',
    tag: 'Trading',
    name: 'Trading & Distribution',
    headline: 'AI-Agent Solutions for Trading, System Integrators & Distributors',
    sub: 'AI-driven automation for sales, support, approvals, and communication.',
    color: ACCENT,
    darkColor: ACCENT2,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80',
    highlights: [
      { title: 'AI-Agent Capabilities',      body: 'AI-based quotation and service ticket creation, intelligent chat routing, and rule-based approval workflows. The AI agent handles the entire sales conversation — from inquiry to quote generation — automatically.' },
      { title: 'Communication & Engagement', body: 'Instant WhatsApp notifications, automated CRM-based marketing messages, and seamless AI-human chat collaboration. Your customers receive timely updates while your team focuses on closing deals, not managing messages.' },
      { title: 'Employee Interaction',       body: 'View and manage assigned tickets, interact with AI-Agent for lead creation, and review chat summaries. Sales executives get a full picture of every customer interaction without logging into multiple systems.' },
      { title: 'Service Value',              body: 'Faster process execution, reduced operational effort, and enhanced customer experience. Reduce quote turnaround from hours to minutes, and give every customer the feeling of having a dedicated account manager.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'Create Quotes · Send Quotes · Talk with Customers',
    ctaNote: 'AI-Agent Solution for your business',
  },
  {
    id: 'hotel',
    num: '03',
    tag: 'Hospitality',
    name: 'Hotel & Hospitality',
    headline: 'AI-Agent Solutions for Hotel & Hospitality Operations',
    sub: 'AI-enabled guest service automation for faster response and superior experience.',
    color: '#F59E0B',
    darkColor: '#B45309',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
    highlights: [
      { title: 'Guest Service Automation',   body: 'AI-Agent handles service requests for restaurant, housekeeping, with intelligent routing to the right menus or departments. Guests simply send a WhatsApp message — the AI understands, routes, and confirms instantly.' },
      { title: 'Operations & Coordination', body: 'Automatic notifications to hotel departments with real-time request tracking and status visibility. The front desk, housekeeping, F&B, and maintenance teams all receive the right alerts at the right time.' },
      { title: 'Assisted & Human Support',   body: 'Smooth handover to human agents for complex requests, ensuring consistent service across AI and staff interactions. When the AI cannot resolve a request, it transfers the guest to the right human agent seamlessly.' },
      { title: 'Service Value',               body: 'Faster guest response, improved service efficiency, and enhanced guest satisfaction. Hotels using AI-Agent report significantly faster response times and higher satisfaction scores without increasing staffing.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'No App Required · Instant Guest Communication',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'laundry',
    num: '04',
    tag: 'Laundry',
    name: 'Laundry Management',
    headline: 'AI-Agent Solutions for Laundry Management',
    sub: 'End-to-end automation for pickup, processing, delivery, and customer communication.',
    color: '#8B5CF6',
    darkColor: '#6D28D9',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1400&q=80',
    highlights: [
      { title: 'Pickup & Customer Interaction',    body: 'Laundry pickup requests handled via AI chat with location capture and AI-driven communication without a mobile app. Customers simply send a WhatsApp message to schedule a pickup — the AI captures all necessary details automatically.' },
      { title: 'Operations & Workflow Automation', body: 'Notifications with automatic pickup assignment, route details for executives and alerts for processing stages to managers. Every stage of the laundry journey is tracked and communicated — pickup, washing, drying, folding, and delivery.' },
      { title: 'Delivery, Payments & Support',     body: 'Delivery executive notifications, optional payment gateway integration, and seamless transition to human chat for support. Customers receive real-time updates and can pay digitally — all within a single WhatsApp conversation.' },
      { title: 'Service Value',                    body: 'Fully automated laundry operations, reduced reliance on mobile apps, and improved turnaround time with enhanced customer satisfaction. Run a high-volume laundry operation without needing your customers to download anything.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'No Mobile App Required · Full Automation',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'property',
    num: '05',
    tag: 'Property',
    name: 'Property Management',
    headline: 'AI-Agent Solutions for Property Management',
    sub: 'AI-powered communication and service automation for property agents and tenants.',
    color: '#10B981',
    darkColor: '#047857',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Property Inquiry & Engagement',  body: 'AI chat manages property inquiries with real-time availability and guided conversations for details, pricing, and scheduling. Every potential tenant or buyer gets an instant, intelligent response — even outside business hours.' },
      { title: 'Secure Communication & Privacy', body: 'AI-enabled interaction with property representatives while fully protecting customer and property owner information. Our system keeps owner and tenant data completely separate and private throughout every conversation.' },
      { title: 'Operations & Tenant Services',   body: 'Maintenance requests and tenant feedback handled via AI chat with automatic routing to the appropriate representative. Tenants raise issues through WhatsApp, the AI logs and routes them, and the right team gets notified instantly.' },
      { title: 'Service Value',                  body: 'Centralized property communication, enhanced data privacy and compliance, and improved tenant and customer experience. Property managers handle more properties with fewer coordinators, while tenants enjoy responsive, modern service.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'Full Data Privacy · Centralized Communication',
    ctaNote: 'A Product of ENZAPPS and Marketed by Aioon',
  },
  {
    id: 'odoo',
    num: '06',
    tag: 'ERP',
    name: 'Odoo Implementation',
    headline: 'Scalable Success with Odoo Implementation',
    sub: 'Comprehensive ERP services designed for stability, scalability, and growth.',
    color: ACCENT,
    darkColor: ACCENT2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Odoo Implementation (Enterprise & Community)', body: 'Business-focused system setup and configuration with industry-specific workflows and scalable architecture. Whether you need the full Enterprise edition or the flexible Community version, we configure Odoo to fit your exact business processes — not the other way around.' },
      { title: 'Monthly Support Services',                      body: 'Continuous bug fixes, performance optimization, feature enhancements, and ongoing customizations. Your Odoo system evolves with your business — our team proactively monitors, improves, and extends your platform every month.' },
      { title: 'Premium Support Plan',                           body: 'Dedicated Odoo specialists with priority response and expert operational guidance. When you have a critical issue or need expert advice, you reach a real Odoo specialist — not a generic support queue.' },
      { title: 'Service Value',                                  body: 'Stable and reliable ERP operations, flexible system evolution, and expert-driven support. A well-implemented Odoo system is the backbone of your business — we make sure it stays fast, stable, and perfectly aligned with your growth.' },
    ],
    package: ['WhatsApp Chatbot', 'WhatsApp Marketing', 'Email Automation', 'CRM Integration', 'Automation AI Agent'],
    packageNote: 'Enterprise & Community · KSA Compliance · Priority Support',
    ctaNote: 'Scalable ERP for the Saudi Market',
  },
];

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

    const handleTimeUpdate = () => {
      if (video.currentTime >= 15 && showOverlay) {
        setShowOverlay(false);
      }
    };

    const handleSeeked = () => {
      if (video.currentTime < 15 && !showOverlay) {
        setShowOverlay(true);
      } else if (video.currentTime >= 15 && showOverlay) {
        setShowOverlay(false);
      }
    };

    const handleEnded = () => {
      setShowOverlay(true);
    };

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
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Video — reduced opacity to 45% for less visibility */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      >
        <source src={heroBg} type="video/mp4" />
      </video>

      {/* Darker overlay on top of video */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />

      {/* Large centered overlay text - fades out at 15s */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            style={{ opacity }} 
            className="absolute inset-0 z-10 w-full flex flex-col items-center justify-center text-center px-5"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 md:mb-6"
              style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.60)', textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}>
              Powered by ENZAPPS · Marketed by Aioon
            </motion.p>

            {/* Big headline - grey-white color */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase"
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 'clamp(2.4rem, 6.5vw, 6rem)',
                lineHeight: 1.0,
                letterSpacing: '0.02em',
                color: 'rgba(230, 230, 235, 0.85)',
                textShadow: '0 2px 32px rgba(0,0,0,0.90)',
              }}>
              AI AGENTS FOR<br />EVERY INDUSTRY
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-center smaller text - appears after 15s */}
      <AnimatePresence>
        {!showOverlay && (
          <motion.div
            className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.p
              className="text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.55)', textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
              Powered by ENZAPPS · Marketed by Aioon
            </motion.p>
            <motion.h2
              className="font-black uppercase"
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                lineHeight: 1.1,
                letterSpacing: '0.03em',
                color: 'rgba(225, 225, 230, 0.80)',
                textShadow: '0 2px 20px rgba(0,0,0,0.90)',
              }}>
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="mb-10">
          <h2 className="font-bold leading-tight mb-1"
            style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: TEXT_PRIMARY }}>
            Our Core <span style={{ color: ACCENT }}>AI-Agent Solutions</span>
          </h2>
          <p className="text-[13px]" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
            Click any solution below to explore every feature in detail.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((sol, i) => (
            <motion.button
              key={sol.id}
              onClick={() => onSelect(sol.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group text-left overflow-hidden transition-all duration-300 relative"
              style={{
                background: BG_WHITE,
                border: `1px solid ${BORDER}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                borderRadius: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${sol.color}50`;
                e.currentTarget.style.boxShadow = `0 12px 36px ${sol.color}18`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'none';
              }}>
              <div className="relative overflow-hidden" style={{ height: '160px' }}>
                <img src={sol.image} alt={sol.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.42) saturate(0.55)' }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 60%)` }} />
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${sol.color}22 0%, transparent 60%)` }} />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{ background: `${sol.color}28`, color: sol.color, border: `1px solid ${sol.color}45`, fontFamily: FONT_BADGE }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: sol.color }} />
                    {sol.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-3">
                  <div className="text-[9px] font-bold mb-0.5" style={{ fontFamily: FONT_BADGE, color: sol.color }}>{sol.num}</div>
                  <h3 className="font-bold text-white text-[14px] leading-tight" style={{ fontFamily: FONT_HEADING }}>
                    {sol.name}
                  </h3>
                </div>
              </div>
              <div className="px-4 py-4">
                <p className="text-[11px] leading-relaxed mb-3" style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}>
                  {sol.sub}
                </p>
                <p className="text-[10px] font-semibold mb-4" style={{ fontFamily: FONT_BADGE, color: sol.color }}>
                  {sol.highlights[0].title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>
                    Explore Solution
                  </span>
                  <span className="w-7 h-7 flex items-center justify-center text-[13px]"
                    style={{ background: `${sol.color}14`, color: sol.color }}>
                    →
                  </span>
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
    <div className="grid lg:grid-cols-5 gap-10 items-start mb-12">
      <div className="relative lg:col-span-2">
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 z-20 pointer-events-none"
          style={{ borderColor: `${sol.color}80` }} />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 z-20 pointer-events-none"
          style={{ borderColor: `${sol.color}80` }} />
        <div className="relative overflow-hidden" style={{ height: '260px', borderRadius: 0 }}>
          <img src={sol.image} alt={sol.name}
            className="w-full h-full object-cover object-center"
            style={{ filter: 'grayscale(8%) contrast(1.03)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(10,10,20,0.50) 0%, transparent 55%)` }} />
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: sol.color }} />
        </div>
        <div className="absolute -bottom-4 -right-4 px-4 py-3 shadow-xl z-10"
          style={{ background: BG_WHITE, border: `1px solid ${BORDER}`, borderRadius: 0, minWidth: '155px' }}>
          <p className="text-[8px] uppercase tracking-[0.3em] font-bold mb-2"
            style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>Quick Specs</p>
          {[['Platform','WhatsApp'],['Setup','No Hardware'],['Support','24 / 7']].map(([l,v],i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b last:border-0"
              style={{ borderColor: BORDER }}>
              <span className="text-[9px] font-semibold" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>{l}</span>
              <span className="text-[10px] font-bold" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>{v}</span>
            </div>
          ))}
          <div className="mt-2 h-px" style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }} />
        </div>
      </div>

      <div className="pt-1 lg:col-span-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] mb-1"
          style={{ fontFamily: FONT_BADGE, color: sol.color }}>
          Package Includes Following Features
        </p>
        <h3 className="font-bold text-[16px] mb-1" style={{ fontFamily: FONT_HEADING, color: TEXT_PRIMARY }}>
          {sol.name} — Complete AI-Agent Bundle
        </h3>
        <p className="text-[11px] mb-5" style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>
          {sol.packageNote}
        </p>
        <div className="flex flex-nowrap gap-2 mb-6">
          {sol.package.map((item, ii) => (
            <span key={ii}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-[11px] font-semibold whitespace-nowrap flex-shrink-0"
              style={{ background: `${sol.color}10`, color: sol.color, border: `1px solid ${sol.color}28`, fontFamily: FONT_BODY }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sol.color }} />
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4"
          style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="text-[11px] flex-1" style={{ fontFamily: FONT_BODY, color: TEXT_MUTED }}>
            {sol.ctaNote}
          </p>
          <a href="https://wa.me/966535141447" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-white text-[11px] transition-all duration-300 flex-shrink-0"
            style={{ background: sol.color, fontFamily: FONT_BADGE, borderRadius: 0, boxShadow: `0 4px 14px ${sol.color}30` }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
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
    const newOpenIndices = new Set(openIndices);
    if (newOpenIndices.has(index)) {
      newOpenIndices.delete(index);
    } else {
      newOpenIndices.add(index);
    }
    setOpenIndices(newOpenIndices);
  };

  return (
    <div className="relative">
      {/* Enhanced Section header with bigger "How It Works" and animated background */}
      <div className="flex items-center gap-6 mb-16 relative z-10">
        <motion.div 
          className="h-px flex-1"
          style={{ background: `linear-gradient(to right, transparent, ${sol.color}60)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="text-center">
          <motion.p 
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] mb-1"
            style={{ fontFamily: FONT_BADGE, color: sol.color }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Discover the Process
          </motion.p>
          <motion.h2
            className="font-black uppercase leading-none"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              color: TEXT_PRIMARY,
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            HOW IT <span style={{ color: sol.color }}>WORKS</span>
          </motion.h2>
        </div>
        <motion.div 
          className="h-px flex-1"
          style={{ background: `linear-gradient(to left, transparent, ${sol.color}60)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Accordion Items */}
      <div className="max-w-4xl mx-auto relative z-10">
        {sol.highlights.map((h, i) => {
          const isOpen = openIndices.has(i);
          const isLast = i === sol.highlights.length - 1;

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Subtle divider line above each item */}
              <div 
                className="w-full"
                style={{ 
                  height: '1px', 
                  background: i === 0 ? `linear-gradient(to right, ${sol.color}20, ${BORDER})` : BORDER,
                  opacity: i === 0 ? 1 : 0.7 
                }} 
              />

              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(i)}
                className="w-full flex items-center justify-between py-5 md:py-6 px-2 text-left group transition-all duration-300"
                style={{ background: 'transparent' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${sol.color}03`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                  {/* Title and badge */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span 
                        className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] flex-shrink-0"
                        style={{ fontFamily: FONT_BADGE, color: sol.color }}
                      >
                        {sol.tag} Feature
                      </span>
                      <span 
                        className="text-[9px] font-semibold"
                        style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Accordion Title - for Odoo first item, replace "Odoo" text with logo */}
                    {isOdoo && i === 0 ? (
                      <h3 
                        className="font-bold text-[16px] md:text-[18px] leading-tight transition-colors duration-300 flex items-center flex-wrap"
                        style={{ 
                          fontFamily: FONT_HEADING, 
                          color: isOpen ? sol.color : TEXT_PRIMARY,
                          gap: 'clamp(4px, 1vw, 8px)'
                        }}
                      >
                        <img 
                          src={odooLogo} 
                          alt="Odoo" 
                          style={{ 
                            height: 'clamp(16px, 2vw, 18px)', 
                            width: 'auto',
                            display: 'inline-block',
                            verticalAlign: 'middle'
                          }} 
                        />
                        Implementation (Enterprise & Community)
                      </h3>
                    ) : (
                      <h3 
                        className="font-bold text-[16px] md:text-[18px] leading-tight transition-colors duration-300"
                        style={{ 
                          fontFamily: FONT_HEADING, 
                          color: isOpen ? sol.color : TEXT_PRIMARY 
                        }}
                      >
                        {h.title}
                      </h3>
                    )}
                  </div>
                </div>

                {/* Plain Plus / Close Icon - no box */}
                <motion.span
                  className="flex-shrink-0 ml-4 text-2xl font-light leading-none"
                  style={{ color: isOpen ? sol.color : TEXT_MUTED }}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  +
                </motion.span>
              </button>

              {/* Accordion Content with smooth animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pb-6 md:pb-8">
                      {/* Small decorative line */}
                      <div 
                        className="h-px w-10 mb-4"
                        style={{ background: `linear-gradient(to right, ${sol.color}40, transparent)` }}
                      />
                      
                      <p 
                        className="text-[14px] md:text-[15px] leading-[1.75] max-w-2xl"
                        style={{ fontFamily: FONT_BODY, color: TEXT_SEC }}
                      >
                        {h.body}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Last item bottom divider */}
              {isLast && (
                <div className="w-full h-px" style={{ background: BORDER }} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom decorative element */}
      <motion.div 
        className="flex justify-center mt-10 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: `${sol.color}30` }} />
          <span 
            className="w-2 h-2 rotate-45"
            style={{ background: sol.color, opacity: 0.6 }}
          />
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex overflow-x-auto gap-0 scrollbar-hide">
          {SOLUTIONS.map((sol) => {
            const isActive = activeId === sol.id;
            return (
              <button key={sol.id} onClick={() => onSelect(sol.id)}
                className="relative flex-shrink-0 flex flex-col items-start gap-0.5 px-5 py-3.5 transition-all duration-200"
                style={{
                  borderBottom: isActive ? `2px solid ${sol.color}` : '2px solid transparent',
                  background: isActive ? `${sol.color}07` : 'transparent',
                  minWidth: 130,
                }}>
                <span className="text-[8px] font-bold uppercase tracking-[0.22em]"
                  style={{ fontFamily: FONT_BADGE, color: isActive ? sol.color : TEXT_MUTED }}>
                  {sol.num}
                </span>
                <span className="text-[11px] font-semibold leading-tight text-left"
                  style={{ fontFamily: FONT_HEADING, color: isActive ? TEXT_PRIMARY : TEXT_MUTED }}>
                  {sol.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SOLUTION DETAIL ──────────────────────────────────────────────────────────
function SolutionDetail({ solution }) {
  const sol = solution;
  const isOdoo = sol.id === 'odoo';

  return (
    <AnimatePresence mode="wait">
      <motion.div key={sol.id}
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

        {/* ── Hero banner ── */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(240px, 38vh, 400px)' }}>
          <motion.img key={`img-${sol.id}`}
            src={sol.image} alt={sol.name}
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.35) saturate(0.55)' }}
            initial={{ scale: 1.06 }} animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />

          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.90) 0%, rgba(8,8,8,0.65) 55%, rgba(8,8,8,0.28) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at bottom left, ${sol.color}18 0%, transparent 65%)` }} />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
              <motion.div initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{ fontFamily: FONT_BADGE, color: sol.color }}>
                    {sol.tag} · AI-Agent Solution
                  </span>
                  <span className="text-[10px]" style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.30)' }}>
                    {sol.num} of 06
                  </span>
                </div>
                
                {/* Headline - for Odoo, replace "Odoo" text with logo */}
                {isOdoo ? (
                  <h2 className="font-bold mb-3 max-w-2xl flex items-center flex-wrap"
                    style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.5rem,3vw,2.5rem)', color: '#FFFFFF', lineHeight: 1.1, gap: 'clamp(4px, 1vw, 8px)' }}>
                    Scalable Success with
                    <img 
                      src={odooLogo} 
                      alt="Odoo" 
                      style={{ 
                        height: 'clamp(1.5rem, 3vw, 2.5rem)', 
                        width: 'auto',
                        display: 'inline-block',
                        verticalAlign: 'middle'
                      }} 
                    />
                    Implementation
                  </h2>
                ) : (
                  <h2 className="font-bold mb-3 max-w-2xl"
                    style={{ fontFamily: FONT_HEADING, fontSize: 'clamp(1.5rem,3vw,2.5rem)', color: '#FFFFFF', lineHeight: 1.1 }}>
                    {sol.headline}
                  </h2>
                )}
                
                <motion.div className="h-[2px] mb-4"
                  style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }}
                  initial={{ width: 0 }} animate={{ width: '30%' }}
                  transition={{ duration: 0.8, delay: 0.25 }} />
                <p className="text-[13px] leading-relaxed max-w-md"
                  style={{ fontFamily: FONT_BODY, color: 'rgba(255,255,255,0.58)' }}>
                  {sol.sub}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Main content area ── */}
        <div style={{ background: BG_WHITE }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8"
              style={{ fontFamily: FONT_BADGE, color: TEXT_MUTED }}>
              About This Solution
            </p>
            <CompactImagePackage solution={sol} />
            <div className="h-px mb-12" style={{ background: BORDER }} />
          </div>
        </div>

        {/* Accordion Highlights section - full width off-white background with animated gradient */}
        <div style={{ background: BG_CREAM }} className="w-full relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-30"
            animate={{ 
              background: [
                `radial-gradient(circle at 30% 50%, ${sol.color}15 0%, transparent 50%)`,
                `radial-gradient(circle at 70% 50%, ${sol.color}10 0%, transparent 50%)`,
                `radial-gradient(circle at 30% 50%, ${sol.color}15 0%, transparent 50%)`,
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-0 left-0 right-0 h-px z-10"
            style={{ background: `linear-gradient(to right, transparent, ${sol.color}40, transparent)` }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20 relative z-10">
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
  const [activeId, setActiveId] = useState(null);
  const detailRef = useRef(null);

  const handleSelect = (id) => {
    setActiveId(id);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const activeSolution = SOLUTIONS.find(s => s.id === activeId);

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <HeroSection />
      <SolutionsOverview onSelect={handleSelect} />
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