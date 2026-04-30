import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products from "../data/productsData";

// ── Asset imports ────────────────────────────────────────────────────────────
import crmBg              from "../assets/CRM.webp";
import erpBg              from "../assets/ERP.webp";
import hrPayrollBg        from "../assets/HRandPAYROLL.webp";
import projectConstructionBg from "../assets/ProjectsandconstructionsERP.webp";
import aiAnalyticsBg      from "../assets/AIandBUSINESS.png";
import einvoiceBg         from "../assets/Einvoiceandcompliance.webp";

gsap.registerPlugin(ScrollTrigger);

// ─── TOKENS — DM Sans kept, palette replaced ─────────────────────────────────
const FONT_HEADING = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BADGE   = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BODY    = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_NAV     = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_DISPLAY = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_LABEL   = '"DM Sans", "Segoe UI", system-ui, sans-serif';

// ── New palette ───────────────────────────────────────────────────────────────
const NAVY      = "#2F4156";   // primary dark
const NAVY_DEEP = "#1C2D3E";   // darkest — page/section bg
const NAVY_MID  = "#243448";   // card bg dark
const TEAL      = "#567C8D";   // primary accent
const TEAL_LT   = "#6E96A8";   // lighter accent
const SKY       = "#C8D9E6";   // sky blue — highlights
const SKY_LT    = "#E4EFF6";   // ultra-light sky
const BEIGE     = "#F5EFEB";   // light section bg
const WHITE     = "#FFFFFF";

// ── Per-service accents (palette-coherent) ────────────────────────────────────
const SVC_ACCENTS = [
  "#2F4156",  // 01 ERP   — navy
  "#567C8D",  // 02 CRM   — teal
  "#3D6678",  // 03 HCM   — deep teal
  "#4A5E72",  // 04 PMO   — slate
  "#5E7A8A",  // 05 AI    — muted teal
  "#3A5268",  // 06 ZATCA — dark teal
];

// ── ELV card accents ──────────────────────────────────────────────────────────
const ACCENTS = [
  "#567C8D","#3D6678","#4A5E72",
  "#2F4156","#5E7A8A","#3A5268",
  "#6E96A8","#4A6880",
];

// ── C object (replaces old C.navy / C.navyLt / C.red / C.white) ──────────────
const C = {
  navy:   NAVY_MID,
  navyLt: NAVY_MID,
  teal:   TEAL,
  sky:    SKY,
  white:  WHITE,
};

// ── Services data — accents replaced ─────────────────────────────────────────
const services = [
  {
    id: 1, number: "01", title: "Enterprise Resource Planning",
    shortDesc: "Unified management of finance, HR, inventory, and sales in one powerful platform.",
    bgImage: erpBg, tag: "ERP", href: "/services/erp", accent: SVC_ACCENTS[0],
  },
  {
    id: 2, number: "02", title: "Customer Relationship Management",
    shortDesc: "Intelligent tools to track leads, manage pipelines, and engage customers effectively.",
    bgImage: crmBg, tag: "CRM", href: "/services/crm", accent: SVC_ACCENTS[1],
  },
  {
    id: 3, number: "03", title: "HR & Payroll Automation",
    shortDesc: "AI-driven attendance, automated payroll, and seamless compliance management.",
    bgImage: hrPayrollBg, tag: "HCM", href: "/services/hr", accent: SVC_ACCENTS[2],
  },
  {
    id: 4, number: "04", title: "Project & Construction ERP",
    shortDesc: "Tailored modules for contractors to control budgets, resources, and timelines.",
    bgImage: projectConstructionBg, tag: "PMO", href: "/services/construction", accent: SVC_ACCENTS[3],
  },
  {
    id: 5, number: "05", title: "AI & Business Analytics",
    shortDesc: "Predictive dashboards and machine-learning insights across every business function.",
    bgImage: aiAnalyticsBg, tag: "AI", href: "/services/ai-and-analytics", accent: SVC_ACCENTS[4],
  },
  {
    id: 6, number: "06", title: "E-Invoicing & Compliance",
    shortDesc: "ZATCA-compliant e-invoicing with seamless integration across all external devices.",
    bgImage: einvoiceBg, tag: "ZATCA", href: "/services/e-invoicing", accent: SVC_ACCENTS[5],
  },
];

// Slide-in directions (unchanged)
const slideFrom = [
  { x: -60, y: 0 },
  { x: 0,  y: 50 },
  { x:  60, y: 0 },
  { x: -60, y: 0 },
  { x: 0,  y: 50 },
  { x:  60, y: 0 },
];

// ─── MAGNETIC BUTTON (unchanged) ─────────────────────────────────────────────
function MagneticButton({ children, href = "#" }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.22);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      <a href={href}>{children}</a>
    </motion.div>
  );
}

// ─── SECTION LABEL — colours replaced ────────────────────────────────────────
function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span
        className="svc-label-line w-8 h-px"
        style={{ background: light ? `${SKY}55` : TEAL }}
      />
      <span
        className="svc-label-text text-[10px] font-bold tracking-[0.38em] uppercase"
        style={{ fontFamily: FONT_LABEL, color: light ? `${SKY}AA` : TEAL }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── SERVICE CARD — structure 100% original, colours + polish updated ─────────
function ServiceCard({ svc, index }) {
  const from = slideFrom[index] || { x: 0, y: 40 };

  return (
    <motion.div
      initial={{ opacity: 0, x: from.x, y: from.y, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={svc.href}>
        <motion.div
          className="group relative overflow-hidden cursor-pointer"
          style={{
            borderRadius: "18px",
            border: `1px solid ${SKY}45`,
            background: WHITE,
            boxShadow: `0 4px 28px rgba(47,65,86,0.07), inset 0 1px 0 ${WHITE}`,
            minHeight: "230px",
          }}
          whileHover={{
            y: -9,
            boxShadow: `0 28px 64px rgba(47,65,86,0.14), 0 0 0 1px ${svc.accent}50`,
            borderColor: `${svc.accent}60`,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background image — faint, blooms on hover */}
          <div className="absolute inset-0 z-0 overflow-hidden" style={{ borderRadius: "18px" }}>
            <img
              src={svc.bgImage}
              alt={svc.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.14]"
              style={{ opacity: 0.07, filter: "saturate(0.4) brightness(1.05)" }}
            />
            <div className="absolute inset-0" style={{
              background: `linear-gradient(145deg, ${WHITE}F8 0%, ${WHITE}EE 58%, ${svc.accent}07 100%)`,
            }} />
          </div>

          {/* Accent top stripe */}
          <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{
            background: `linear-gradient(to right, ${svc.accent}, ${svc.accent}55, transparent)`,
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
          }} />

          {/* Hover glow corner */}
          <div
            className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{ background: `radial-gradient(circle, ${svc.accent}18 0%, transparent 70%)` }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col gap-3">

            {/* Number + Tag */}
            <div className="flex items-center justify-between">
              <span style={{
                fontFamily: FONT_HEADING, fontSize: "10px", fontWeight: 800,
                letterSpacing: "0.22em", color: `${SKY}CC`,
              }}>
                {svc.number}
              </span>
              <span style={{
                fontFamily: FONT_BADGE, fontSize: "8px", fontWeight: 800,
                letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "3px 11px", borderRadius: "999px",
                color: svc.accent,
                background: `${svc.accent}12`,
                border: `1px solid ${svc.accent}35`,
              }}>
                {svc.tag}
              </span>
            </div>

            {/* Title */}
            <h3
              className="transition-colors duration-300"
              style={{
                fontFamily: FONT_HEADING,
                fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)",
                fontWeight: 700,
                lineHeight: 1.3,
                color: NAVY,
                letterSpacing: "-0.01em",
              }}
            >
              {svc.title}
            </h3>

            {/* Accent divider */}
            <div style={{
              height: "1px",
              background: `linear-gradient(to right, ${svc.accent}55, transparent)`,
            }} />

            {/* Description */}
            <p style={{
              fontFamily: FONT_BODY, fontSize: "11.5px",
              lineHeight: "1.78", color: TEAL,
            }}>
              {svc.shortDesc}
            </p>

            {/* Explore CTA — reveals on hover */}
            <div
              className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ transform: "translateY(4px)" }}
            >
              <span style={{
                fontFamily: FONT_NAV, fontSize: "9px", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: svc.accent,
              }}>
                Explore
              </span>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%",
                background: `${svc.accent}14`, border: `1px solid ${svc.accent}45`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowUpRight size={10} color={svc.accent} />
              </div>
            </div>

          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── CINEMATIC CARD — structure 100% original, colours updated ────────────────
function CinematicCard({ product, index }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const num    = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.09 + Math.floor(index / 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.id}`}>
        <div
          className="group relative flex flex-col overflow-hidden cursor-pointer"
          style={{
            background: `linear-gradient(160deg, ${NAVY_MID} 0%, ${NAVY_DEEP} 100%)`,
            border: `1px solid ${SKY}12`,
            borderRadius: "14px",
            boxShadow: `0 4px 20px rgba(26,43,60,0.32), inset 0 1px 0 ${SKY}07`,
            transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.38s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent + "55";
            e.currentTarget.style.boxShadow   = `0 0 0 1px ${accent}30, 0 22px 56px rgba(26,43,60,0.55), 0 4px 20px ${accent}18`;
            e.currentTarget.style.transform   = "translateY(-7px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${SKY}12`;
            e.currentTarget.style.boxShadow   = `0 4px 20px rgba(26,43,60,0.32), inset 0 1px 0 ${SKY}07`;
            e.currentTarget.style.transform   = "translateY(0)";
          }}
        >
          {/* Accent top stripe */}
          <div style={{
            height: "4px",
            background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)`,
            flexShrink: 0,
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }} />

          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: "175px" }}>
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "saturate(0.32) brightness(0.55) contrast(1.05)" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{
              background: `linear-gradient(to top, ${NAVY_DEEP} 0%, ${NAVY_DEEP}CC 32%, transparent 70%)`,
            }} />
            {/* Hover tint */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(135deg, ${accent}22 0%, transparent 55%)` }}
            />
            {/* Ghost number */}
            <div
              className="absolute -bottom-4 -right-3 font-bold leading-none select-none pointer-events-none"
              style={{ fontFamily: FONT_DISPLAY, fontSize: "7.5rem", color: `${SKY}07`, lineHeight: 1 }}
            >
              {num}
            </div>
            {/* ELV pill tag */}
            <div style={{
              position: "absolute", top: "12px", right: "12px",
              fontFamily: FONT_LABEL, fontSize: "7.5px", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "3px 10px", borderRadius: "999px",
              color: SKY,
              background: `rgba(26,43,60,0.72)`,
              border: `1px solid ${SKY}22`,
              backdropFilter: "blur(8px)",
            }}>
              ELV
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            <div className="flex items-center gap-3">
              <span
                className="font-semibold text-[11px] tracking-[0.22em]"
                style={{ fontFamily: FONT_LABEL, color: accent }}
              >
                {num}
              </span>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}50, transparent)` }} />
            </div>

            <h3
              className="font-semibold leading-tight"
              style={{ fontFamily: FONT_HEADING, fontSize: "clamp(1.0rem, 1.7vw, 1.18rem)", color: WHITE, letterSpacing: "-0.01em" }}
            >
              {product.title}
            </h3>

            <div className="flex-1" />

            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${SKY}12` }}>
              <span
                className="text-[9.5px] font-semibold tracking-[0.22em] uppercase"
                style={{ fontFamily: FONT_LABEL, color: `${SKY}50` }}
              >
                View Details
              </span>
              <div
                className="w-8 h-8 flex items-center justify-center"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}50`,
                  borderRadius: "8px",
                  transition: "background 0.28s ease, transform 0.28s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background  = accent;
                  e.currentTarget.style.transform   = "rotate(-45deg) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background  = `${accent}18`;
                  e.currentTarget.style.transform   = "none";
                }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: WHITE }} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── WAVE DIVIDER — new ───────────────────────────────────────────────────────
function WaveDivider({ from, to }) {
  return (
    <div style={{ lineHeight: 0, background: from }}>
      <svg viewBox="0 0 1440 52" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" style={{ width: "100%", height: "38px", display: "block" }}>
        <path d="M0,26 C480,0 960,52 1440,26 L1440,52 L0,52 Z" fill={to} />
      </svg>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
function Products() {
  const svcRef = useRef(null);

  // GSAP animations — identical to original
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-label-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: svcRef.current, start: "top 82%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(".svc-label-text",
        { opacity: 0, y: 12, letterSpacing: "0.7em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: svcRef.current, start: "top 82%", toggleActions: "play none none none" }, delay: 0.15 }
      );
      gsap.fromTo(".svc-heading-word",
        { opacity: 0, y: 65, skewY: 6 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.13, duration: 0.95, ease: "power4.out", scrollTrigger: { trigger: svcRef.current, start: "top 80%", toggleActions: "play none none none" }, delay: 0.2 }
      );
      gsap.fromTo(".svc-header-desc",
        { opacity: 0, x: 35 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: svcRef.current, start: "top 78%", toggleActions: "play none none none" }, delay: 0.5 }
      );
      gsap.fromTo(".svc-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: svcRef.current, start: "top 78%", toggleActions: "play none none none" }, delay: 0.3 }
      );
      gsap.fromTo(".svc-btn",
        { opacity: 0, y: 28, scale: 0.82 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(2)", scrollTrigger: { trigger: ".svc-btn", start: "top 93%", toggleActions: "play none none none" } }
      );
    }, svcRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20 overflow-hidden" style={{ background: BEIGE, fontFamily: FONT_BODY }}>

      {/* ── Subtle grain overlay ───────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(155deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 52%, ${TEAL}BB 100%)`,
        position: "relative", overflow: "hidden",
        minHeight: "500px", display: "flex", alignItems: "center",
      }}>
        {/* Geometric rings */}
        {[540, 380, 230].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${-90 - i * 38}px`, right: `${-70 - i * 28}px`,
            width: `${s}px`, height: `${s}px`, borderRadius: "50%",
            border: `1px solid ${SKY}${["14","0D","08"][i]}`,
            pointerEvents: "none",
          }} />
        ))}
        {/* Vertical accent lines */}
        {["31%","57%"].map((r, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, right: r, width: "1px", height: "100%",
            background: `linear-gradient(to bottom, transparent, ${SKY}${["16","08"][i]}, transparent)`,
            pointerEvents: "none",
          }} />
        ))}
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, ${SKY}18 1px, transparent 1px)`,
          backgroundSize: "40px 40px", opacity: 0.45,
        }} />
        {/* Glow orb */}
        <div style={{
          position: "absolute", bottom: "-60px", left: "-30px",
          width: "340px", height: "340px", borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL}28 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-24">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel light>Products &amp; Services</SectionLabel>

            <h1 style={{
              fontFamily: FONT_HEADING, fontWeight: 800,
              fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
              color: WHITE, lineHeight: 1.06, letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}>
              Intelligent<br />
              <span style={{ color: SKY, fontWeight: 300 }}>Enterprise </span>
              Solutions
            </h1>

            <p style={{
              fontFamily: FONT_BODY, fontSize: "14px", lineHeight: "1.85",
              color: `${SKY}99`, maxWidth: "430px", marginBottom: "36px",
            }}>
              From ERP to AI-powered analytics — a complete suite built to
              transform how modern businesses operate and scale.
            </p>
          </motion.div>

          {/* Ghost number stack — right */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end">
            {["01","02","03","04","05","06"].map((n, i) => (
              <motion.span key={n}
                initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.4 + i * 0.07 }}
                style={{
                  fontFamily: FONT_DISPLAY, fontWeight: 800,
                  fontSize: i === 0 ? "4.2rem" : i === 1 ? "2.9rem" : "1.7rem",
                  color: `${SKY}${i === 0 ? "10" : "07"}`,
                  lineHeight: 1.1, letterSpacing: "-0.05em",
                }}
              >{n}</motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition */}
      <WaveDivider from={BEIGE} to={NAVY_DEEP} />

      {/* ══════════════════════════════════════════════════════════════════════
          ELV PORTFOLIO GRID — structure identical to original
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="portfolio"
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ background: `linear-gradient(175deg, ${NAVY_DEEP} 0%, ${NAVY_MID} 100%)` }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${SKY}55 1px,transparent 1px),linear-gradient(90deg,${SKY}55 1px,transparent 1px)`,
          backgroundSize: "54px 54px",
        }} />
        {/* Radial glows — replaced red with teal */}
        <div className="absolute top-0 left-0 w-[35vw] h-[35vw] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${TEAL}, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${TEAL_LT}, transparent 70%)` }} />

        {/* Decorative rings */}
        {[700, 500].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: `${-180 - i * 55}px`, right: `${-180 - i * 55}px`,
            width: `${s}px`, height: `${s}px`, borderRadius: "50%",
            border: `1px solid ${SKY}${["07","05"][i]}`,
            pointerEvents: "none",
          }} />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionLabel light>Our Portfolio</SectionLabel>
              <h2 className="font-bold leading-[1.04]" style={{
                fontFamily: FONT_HEADING,
                fontSize: "clamp(2.2rem, 5.2vw, 4rem)",
                color: WHITE,
                letterSpacing: "-0.03em",
              }}>
                ELV Systems{" "}
                <span style={{ color: SKY, fontWeight: 300 }}>&amp; Solutions</span>
              </h2>
            </motion.div>
            <motion.p
              className="text-[12px] leading-[2] max-w-[240px] lg:text-right"
              style={{ fontFamily: FONT_BODY, color: `${SKY}66` }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive low voltage systems designed for modern infrastructure needs.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <CinematicCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between flex-wrap gap-6 pt-16 mt-8 border-t"
            style={{ borderColor: `${SKY}12` }}>
            <p className="text-[12px] tracking-[0.12em]"
              style={{ fontFamily: FONT_LABEL, color: `${SKY}40` }}>
              End-to-end ELV design, supply and implementation
            </p>
            <MagneticButton href="https://wa.me/966535141447">
              <span
                className="inline-flex items-center gap-4 font-semibold text-[11px] uppercase tracking-[0.18em] px-7 py-3 rounded-full"
                style={{
                  fontFamily: FONT_LABEL, color: WHITE,
                  border: `1.5px solid ${SKY}30`,
                  transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background   = TEAL;
                  e.currentTarget.style.borderColor  = TEAL;
                  e.currentTarget.style.boxShadow    = `0 10px 36px ${TEAL}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background   = "transparent";
                  e.currentTarget.style.borderColor  = `${SKY}30`;
                  e.currentTarget.style.boxShadow    = "none";
                }}
              >
                Request a Consultation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Products;
