import { useState, useEffect, useRef } from "react";
import { Users, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import teamImage from "../assets/about.jpg";
import missionImage from "../assets/mission1.jpg";
import visionImage from "../assets/vision1.jpg";
import valuesImage from "../assets/values1.jpg";
import erpImg from "../assets/ERP.png";
import crmImg from "../assets/CRM.png";
import payrollImg from "../assets/HR.jpg";
import projectImg from "../assets/construction.jpg";
import aiImg from "../assets/ai.png";
import einvoiceImg from "../assets/Einvoiceandcompliance.webp";
import { Link } from "react-router-dom";
import heroBg from "../assets/about-bg.jpg";
import enzappsLogo from "../assets/enzapps.jpeg";

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────
const FONT_HERO    = '""Inter"", ""Poppins"", "Space Grotesk", sans-serif';
const FONT_HEADING = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BADGE   = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BODY    = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_NAV     = '"DM Sans", "Segoe UI", system-ui, sans-serif';

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
const WHT          = '#FFFFFF';

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────
function MagneticButton({ children, href = "#", onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.22);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block">
      <a href={href} onClick={onClick}>{children}</a>
    </motion.div>
  );
}


// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children, centered = false }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
      <span className="w-6 h-px" style={{ background: ACCENT }} />
      <span className="text-[10px] font-bold tracking-[0.34em] uppercase"
        style={{ fontFamily: FONT_BADGE, color: ACCENT }}>{children}</span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function AboutUs() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, 90]);

  const capabilities = [
    { title: "ERP",                        desc: "End-to-end enterprise resource planning to unify finance, inventory, procurement, and operations on a single platform.",  image: erpImg,      link: "/services/erp" },
    { title: "CRM",                        desc: "Customer relationship management tools that streamline sales pipelines, support, and client engagement.",                 image: crmImg,      link: "/services/crm" },
    { title: "HR & Payroll Automation",    desc: "Automated payroll processing, leave management, and workforce analytics tailored to Saudi labor regulations.",            image: payrollImg,  link: "/services/hr" },
    { title: "Project & Construction ERP", desc: "Specialized ERP for project planning, cost control, subcontractor management, and real-time progress tracking.",        image: projectImg,  link: "/services/construction" },
    { title: "AI & Business Analytics",    desc: "Data-driven insights powered by AI — predictive dashboards, KPI monitoring, and intelligent decision support.",         image: aiImg,       link: "/services/ai-and-analytics" },
    { title: "E-Invoicing & Compliance",   desc: "ZATCA-compliant e-invoicing, VAT reporting, and audit-ready compliance frameworks built for the Saudi market.",         image: einvoiceImg, link: "/services/e-invoicing" },
  ];

  const principles = [
    { title: "Our Mission", image: missionImage, body: "To revolutionize business operations through intelligent automation, seamless integration, and customized solutions that drive efficiency." },
    { title: "Our Vision",  image: visionImage,  body: "To be the leading digital transformation partner in Saudi Arabia, empowering businesses with future-ready technology solutions." },
    { title: "Core Values", image: valuesImage,  body: "Integrity, innovation, long-term client success, and reliable support define how we work with every partner." },
  ];


  return (
    <div className="relative overflow-hidden" style={{ background: BG_WHITE, fontFamily: FONT_BODY }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
     <img
  src={heroBg}
  alt="About background"
  className="absolute inset-0 w-full h-full object-cover"
  style={{ opacity: 1 }}
/>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-5">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
           <motion.h1
  className="font-bold mb-4"
  style={{
    fontFamily: '"Inter", sans-serif',
    fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
    lineHeight: 1.1,
    letterSpacing: '0.01em',
    fontWeight: 800,
    color: '#FFFFFF',
    textAlign: 'center'
  }}
>
  Digital Transformation <br />
  <span style={{ opacity: 0.85 }}>
    Redefined
  </span>
</motion.h1>
            <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.15 }}
  className="mx-auto"
  style={{
    marginTop: '14px',
    maxWidth: '720px',
    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
    lineHeight: 1.1,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: FONT_BODY,
  }}
>
  Transforming complex business operations into seamless, 
  intelligent systems powered by AI.
</motion.p>
            <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  style={{
    marginTop: '16px',
    fontSize: '12px',
    letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    fontFamily: FONT_BODY,
  }}
>
  POWERED BY ENZAPPS · MARKETED BY AIOON
</motion.p>

          </motion.div>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          WHO WE ARE (NESTED BOXES - FULL WIDTH)
      ══════════════════════════════════════════ */}
      <section className="relative pt-12 pb-12 overflow-hidden" style={{ background: BG_WHITE }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Outer Box */}
          <div className="w-full rounded-[48px] overflow-hidden p-8 sm:p-14 border border-black/5 shadow-inner" 
               style={{ background: '#D1D5DB' }}>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-bold leading-tight mb-12"
                style={{ color: TEXT_PRIMARY, fontFamily: FONT_HEADING, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                We're Your <span style={{ color: ACCENT }}>Innovation Partner</span>
              </h2>

              {/* Vertical Stack of Inner Boxes */}
              <div className="space-y-6">
                  {[
                    { id: "01", title: "Who We Are", text: "Aioon Technologies is a dedicated technology partner for enterprises in KSA, specializing in advanced business software, AI-Agent automation, and digital transformation." },
                    { id: "02", title: "What We Do", text: "We deliver cutting-edge AI-Agent solutions across HR, Trading, Hospitality, Laundry, Property Management, and Odoo ERP — automating workflows via WhatsApp, CRM, and intelligent chat without complex setups." },
                    { id: "03", title: "Our Partnership", text: "ENZAPPS — an authorized Meta Tech Provider — the firm leverages a 13-year legacy to build the technical foundation for Saudi enterprise, specialize in converting complex operational challenges into seamless, scalable, and intelligent systems that empower organizations to achieve sustainable growth and operational excellence." }
                  ].map((pillar, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 sm:p-8 rounded-[32px] border border-black/5 transition-all duration-300 hover:shadow-lg"
                    style={{ background: BG_WHITE }}
                  >
                    <div className="flex gap-6 sm:gap-8 items-start">
                      <span className="text-sm font-bold opacity-30 mt-1" 
                        style={{ color: ACCENT, fontFamily: FONT_BADGE }}>{pillar.id}</span>
                      <div>
                        <h4 className="font-bold text-lg mb-2" style={{ color: TEXT_PRIMARY, fontFamily: FONT_HEADING }}>{pillar.title}</h4>
                        <p className="text-[14px] leading-relaxed opacity-70" style={{ color: TEXT_SEC, fontFamily: FONT_BODY }}>{pillar.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GUIDING PRINCIPLES
      ══════════════════════════════════════════ */}
      <section className="relative pt-8 pb-10 overflow-hidden" style={{ background: BG_LIGHT, borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute -top-40 right-0 w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-[0.03]"
          style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div className="mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel>Our Guiding Principles</SectionLabel>
            <h2 className="font-bold leading-tight"
              style={{ color: TEXT_PRIMARY, fontFamily: FONT_HEADING, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              The Foundation of <span style={{ color: ACCENT }}>Our Success</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div key={i}
                className="group relative overflow-hidden cursor-pointer rounded-[24px] shadow-lg"
                style={{ height: "450px" }}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                {/* Full Background Image */}
                <img src={p.image} alt={p.title} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.7)' }} />
                
                {/* Dark Gradient for Text Legibility */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                
                <div className="relative h-full p-8 flex flex-col justify-end z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="font-bold leading-tight mb-2 text-white"
                      style={{ fontFamily: FONT_HEADING, fontSize: "1.75rem" }}>{p.title}</h3>
                    <p className="text-[14px] leading-relaxed text-white/80" style={{ fontFamily: FONT_BODY }}>{p.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAPABILITIES
      ══════════════════════════════════════════ */}
      <section className="relative pt-10 pb-16 overflow-hidden" style={{ background: BG_WHITE }}>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>Our Capabilities</SectionLabel>

              <h2
                className="font-bold leading-tight"
                style={{
                  color: TEXT_PRIMARY,
                  fontFamily: FONT_HEADING,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)"
                }}
              >
                Enterprise Solutions, <span style={{ color: ACCENT }}>Engineered for Excellence</span>
              </h2>
            </motion.div>
          </div>

          {/* Clean 3-col grid - Legacy Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden shadow-2xl" 
               style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px' }}>
            {capabilities.map((item, i) => (
              <Link to={item.link} key={i} style={{ textDecoration: 'none' }}>
                <motion.div
                  className="group relative flex flex-col cursor-pointer h-full"
                  style={{ background: '#0A0E1A' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0D1628';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0A0E1A';
                  }}>
                  
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '200px' }}>
                    <img src={item.image} alt={item.title} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'brightness(0.7)' }} />
                    <div className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.28em]" 
                         style={{ fontFamily: FONT_BADGE, color: 'rgba(255,255,255,0.55)' }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-semibold text-white mb-3 leading-snug"
                      style={{ fontFamily: FONT_HEADING, fontSize: '1rem' }}>
                      {item.title}
                    </h3>
                    <div className="w-6 h-px mb-3 group-hover:w-10 transition-all duration-400" style={{ background: ACCENT }} />
                    <p className="text-white/45 text-[12px] leading-relaxed font-light"
                      style={{ fontFamily: FONT_BODY }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;