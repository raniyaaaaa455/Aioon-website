import { useState, useEffect, useRef } from "react";
import { Users, Calendar, UserCheck, CheckCircle, Building, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import teamImage from "../assets/about.jpg";
import missionImage from "../assets/mission.jpg";
import visionImage from "../assets/vision.jpg";
import valuesImage from "../assets/values.jpg";
import integrationImg from "../assets/integration.jpg";
import customisationImg from "../assets/customisation.jpg";
import automationImg from "../assets/automation.jpg";
import securityImg from "../assets/security.jpg";
import scalableImg from "../assets/scalable.jpg";
import partnershipImg from "../assets/partnership.jpg";

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────
const F_DISPLAY = '"Clash Display", "Syne", system-ui, sans-serif';
const F_HEADING = '"Clash Display", "Syne", system-ui, sans-serif';
const F_LABEL   = '"Clash Display", "Syne", system-ui, sans-serif';
const F_BODY    = '"Syne", system-ui, sans-serif';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  ink:     "#07101C",
  navy:    "#0D1B2A",
  navyMid: "#152336",
  cream:   "#F5F2EE",
  creamDk: "#EDE9E3",
  red:     "#C41E3A",
  redDk:   "#A01830",
  gold:    "#B8966E",
  white:   "#FFFFFF",
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let s = 0;
          const step = target / 80;
          const t = setInterval(() => {
            s += step;
            if (s >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(s));
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────
function MagneticButton({ children, className, href = "#", onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.22);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block"
    >
      <a href={href} onClick={onClick} className={className}>{children}</a>
    </motion.div>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee({ items }) {
  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <motion.div
        className="inline-flex gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4">
            <span className="text-white/20 text-[10px] font-semibold tracking-[0.32em] uppercase" style={{ fontFamily: F_LABEL }}>{item}</span>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: `${C.red}55` }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="w-8 h-px" style={{ background: light ? "rgba(255,255,255,0.28)" : C.red }} />
      <span
        className="text-[10px] font-bold tracking-[0.38em] uppercase"
        style={{ fontFamily: F_LABEL, color: light ? "rgba(255,255,255,0.38)" : C.red }}
      >
        {children}
      </span>
    </div>
  );
}


// ─── CAPABILITY TAGS ─────────────────────────────────────────────────────────
const CAP_TAGS = {
  "Total Integration":      ["ERP", "CRM", "IoT", "Hardware"],
  "Deep Customization":     ["Bespoke", "Workflow", "UI/UX", "API"],
  "AI-Powered Automation":  ["Machine Learning", "RPA", "NLP", "Analytics"],
  "Enterprise Security":    ["ISO 27001", "Zero Trust", "Encryption", "Audit"],
  "Scalable Architecture":  ["Cloud", "Microservices", "DevOps", "Multi-tenant"],
  "Strategic Partnerships": ["ENZAPPS", "SAP", "Microsoft", "Oracle"],
};
// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function AboutUs() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, 90]);
  const [activeIndex, setActiveIndex] = useState(null);

  const statsData = [
    { raw: 13,  suf: "+",  label: "Years of Excellence",  icon: <Calendar className="w-4 h-4" /> },
    { raw: 12,  suf: "K+", label: "Satisfied Clients",    icon: <UserCheck className="w-4 h-4" /> },
    { raw: 500, suf: "+",  label: "Projects Delivered",   icon: <CheckCircle className="w-4 h-4" /> },
    { raw: 50,  suf: "+",  label: "Industries Served",    icon: <Building className="w-4 h-4" /> },
  ];

  const capabilities = [
    { title: "Total Integration",      desc: "Seamless software and hardware integration for unified business systems",       image: integrationImg },
    { title: "Deep Customization",     desc: "Tailored solutions that align perfectly with your unique business needs",        image: customisationImg },
    { title: "AI-Powered Automation",  desc: "Intelligent automation that streamlines operations and boosts efficiency",       image: automationImg },
    { title: "Enterprise Security",    desc: "Robust security frameworks protecting your critical business data",              image: securityImg },
    { title: "Scalable Architecture",  desc: "Future-ready systems that grow with your business demands",                     image: scalableImg },
    { title: "Strategic Partnerships", desc: "Alliances with industry leaders including ENZAPPS Solutions",                   image: partnershipImg },
  ];

  const principles = [
    { title: "Our Mission", image: missionImage, body: "To revolutionize business operations through intelligent automation, seamless integration, and customized solutions that drive efficiency.", num: "I" },
    { title: "Our Vision",  image: visionImage,  body: "To be the leading digital transformation partner in Saudi Arabia, empowering businesses with future-ready technology solutions.", num: "II" },
    { title: "Core Values", image: valuesImage,  body: "Integrity, innovation, long-term client success, and reliable support define how we work with every partner.", num: "III" },
  ];

  const marqueeItems = ["Digital Transformation", "13 Years of Excellence", "Enterprise Solutions", "Saudi Arabia", "AI Automation", "Security & Compliance", "Strategic Partnerships"];

  return (
    <div className="pt-20 relative overflow-hidden" style={{ background: C.cream, fontFamily: F_BODY }}>

      {/* ── GRAIN ── */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0" style={{ background: C.ink }} />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${teamImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            y: heroParallax,
            opacity: 0.16,
          }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(108deg, ${C.ink} 0%, ${C.ink}D0 42%, ${C.ink}60 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.ink} 0%, transparent 60%)` }} />

        {/* Vertical red accent */}
        <div className="absolute top-0 left-[9%] w-px h-full opacity-[0.12]" style={{ background: `linear-gradient(to bottom, transparent 5%, ${C.red} 40%, transparent 95%)` }} />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Soft orb */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-[45vw] h-[45vw] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.red}10 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* MAIN CONTENT */}
        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">

            {/* LEFT */}
            <motion.div
              className="lg:col-span-7 space-y-9"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel light>Trusted Technology Partner · Saudi Arabia</SectionLabel>

              <div>
                {["Digital", "Transformation", "Redefined."].map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h1
                      className="block font-normal leading-[0.93]"
                      style={{
                        fontFamily: F_DISPLAY,
                        fontSize: "clamp(2.6rem, 6vw, 5rem)",
                        color: i === 2 ? C.red : C.white,
                        fontStyle: "normal",
                        letterSpacing: "-0.015em",
                      }}
                      initial={{ y: 110, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.05, delay: 0.1 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.p
                className="text-white/40 text-sm leading-[2] max-w-lg"
                style={{ fontFamily: F_BODY }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
              >
                For over <span style={{ color: C.red }}>13 years</span>, Aioon Technologies has been at the forefront of digital innovation — empowering enterprises with intelligent software, hardware integration, and comprehensive transformation services.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.76 }}
              >
                <MagneticButton href="#">
                  <span
                    className="group relative overflow-hidden inline-flex items-center gap-3 text-white text-[11px] font-semibold px-8 py-4 tracking-[0.2em] uppercase transition-all duration-500"
                    style={{ fontFamily: F_LABEL, background: C.red }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = C.redDk; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = C.red; }}
                  >
                    Explore Solutions
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </MagneticButton>
                <MagneticButton href="#">
                  <span
                    className="inline-flex items-center gap-3 text-[11px] font-semibold px-8 py-4 tracking-[0.2em] uppercase transition-all duration-400"
                    style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.14)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = C.white; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}
                  >
                    Contact Our Team
                  </span>
                </MagneticButton>
              </motion.div>

              <motion.div
                className="flex gap-12 pt-7 border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.92 }}
              >
                {[{ v: "13+", l: "Years Legacy" }, { v: "12K+", l: "Clients" }, { v: "500+", l: "Projects" }].map((s, i) => (
                  <div key={i}>
                    <div className="font-normal text-white leading-none" style={{ fontFamily: F_DISPLAY, fontSize: "2.2rem" }}>{s.v}</div>
                    <div className="text-[9px] uppercase tracking-[0.28em] mt-2 font-semibold" style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.25)" }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — image */}
            <motion.div
              className="lg:col-span-5 relative hidden lg:block"
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                {/* Corner frames */}
                <div className="absolute -top-4 -left-4 w-14 h-14 border-t border-l z-20 pointer-events-none" style={{ borderColor: `${C.red}70` }} />
                <div className="absolute -bottom-4 -right-4 w-14 h-14 border-b border-r z-20 pointer-events-none" style={{ borderColor: `${C.red}70` }} />

                <img
                  src={teamImage}
                  alt="Aioon Technologies Team"
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ maxHeight: "500px", filter: "grayscale(20%) contrast(1.04)" }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.ink}90 0%, transparent 55%)` }} />

                {/* Badge: Years */}
                <motion.div
                  className="absolute -left-8 bottom-14 bg-white p-5 shadow-2xl"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.05, duration: 0.65 }}
                >
                  <div className="flex items-end gap-3">
                    <span style={{ fontFamily: F_DISPLAY, fontSize: "3rem", color: C.navy, lineHeight: 1 }}>13</span>
                    <div className="pb-1">
                      <p className="text-[9px] uppercase tracking-[0.24em] font-bold" style={{ fontFamily: F_LABEL, color: `${C.navy}50` }}>Years of</p>
                      <p className="text-[11px] font-bold" style={{ fontFamily: F_LABEL, color: C.navy }}>Excellence</p>
                    </div>
                  </div>
                  <div className="mt-3 h-px w-full" style={{ background: C.red }} />
                </motion.div>

                {/* Badge: Clients */}
                <motion.div
                  className="absolute -right-8 top-12 p-5 shadow-2xl"
                  style={{ background: C.navy }}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.65 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: C.red }}>
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.24em] font-bold text-white/30" style={{ fontFamily: F_LABEL }}>Happy</p>
                      <p className="text-[12px] font-bold text-white" style={{ fontFamily: F_LABEL }}>12k+ Clients</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee strip */}
        <div
          className="relative z-10 py-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)" }}
        >
          <Marquee items={marqueeItems} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GUIDING PRINCIPLES
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ background: C.cream }}>
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: `radial-gradient(circle, ${C.navy} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
        />
        <div className="absolute -top-24 right-0 w-[45vw] h-[45vw] rounded-full opacity-[0.08] pointer-events-none" style={{ background: `radial-gradient(circle, ${C.red}, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>Our Guiding Principles</SectionLabel>
            <h2
              className="font-normal leading-[1.04]"
              style={{ fontFamily: F_HEADING, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: C.navy }}
            >
              The Foundation of{" "}
              <span style={{ color: C.red }}>Our Success</span>
            </h2>
          </motion.div>

          {/* Flush grid with gap-px "border" trick */}
          <div className="grid md:grid-cols-3 gap-px" style={{ background: C.creamDk }}>
            {principles.map((p, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden cursor-pointer"
                style={{ height: "500px", background: C.cream }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${C.navy}F5 0%, ${C.navy}85 50%, ${C.navy}35 100%)` }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `${C.red}15` }}
                />

                {/* Roman numeral watermark */}
                <div
                  className="absolute top-6 right-7 font-normal text-white/[0.07] leading-none select-none pointer-events-none group-hover:text-white/[0.13] transition-colors duration-500"
                  style={{ fontFamily: F_DISPLAY, fontSize: "5rem" }}
                >
                  {p.num}
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div
                      className="h-px mb-6 transition-all duration-500 group-hover:w-14"
                      style={{ width: "2rem", background: C.red }}
                    />
                    <h3
                      className="text-white font-normal leading-tight mb-3"
                      style={{ fontFamily: F_HEADING, fontSize: "1.75rem" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-white/50 text-[12px] leading-[1.9]" style={{ fontFamily: F_BODY }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BY THE NUMBERS
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ background: C.navy }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
        <div className="absolute left-[11%] top-0 w-px h-full opacity-[0.10]" style={{ background: `linear-gradient(to bottom, transparent, ${C.red} 45%, transparent)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel light>By The Numbers</SectionLabel>
              <h2
                className="font-normal text-white leading-[1.04]"
                style={{ fontFamily: F_HEADING, fontSize: "clamp(2rem,4vw,3.5rem)" }}
              >
                A Journey of{" "}
                <span style={{ color: C.red }}>Growth</span>
              </h2>
              <p className="text-white/28 text-sm mt-7 leading-[2] max-w-xs" style={{ fontFamily: F_BODY }}>
                Numbers that reflect our commitment to transforming businesses across the Kingdom and beyond.
              </p>
            </motion.div>

            {/* Right: 2×2 grid with gap-px borders */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                {statsData.map((item, i) => (
                  <motion.div
                    key={i}
                    className="group relative p-6 overflow-hidden cursor-default"
                    style={{ background: C.navy }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    {/* Ghost bg number */}
                    <div
                      className="absolute -right-2 -top-4 font-normal leading-none select-none pointer-events-none"
                      style={{ fontFamily: F_DISPLAY, fontSize: "4rem", color: "rgba(255,255,255,0.022)" }}
                    >
                      {item.raw}
                    </div>

                    <div className="relative z-10">
                      <div
                        className="w-9 h-9 flex items-center justify-center mb-7 transition-all duration-400 group-hover:scale-110"
                        style={{ background: `${C.red}20`, color: C.red, border: `1px solid ${C.red}30` }}
                      >
                        {item.icon}
                      </div>

                      <div
                        className="font-normal text-white leading-none mb-3"
                        style={{ fontFamily: F_DISPLAY, fontSize: "clamp(2.2rem, 3vw, 3.5rem)" }}
                      >
                        <AnimatedCounter target={item.raw} suffix={item.suf} />
                      </div>

                      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mt-1" style={{ fontFamily: F_LABEL, color: "rgba(255,255,255,0.28)" }}>
                        {item.label}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700" style={{ background: `linear-gradient(to right, ${C.red}, transparent)` }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CAPABILITIES
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ background: C.cream }}>
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: `radial-gradient(circle, ${C.navy} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full pointer-events-none opacity-[0.06]" style={{ background: `radial-gradient(circle, ${C.red}, transparent 65%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel>Our Capabilities</SectionLabel>
              <h2
                className="font-black leading-[1.0]"
                style={{ fontFamily: F_HEADING, fontSize: "clamp(2.2rem,4vw,3.8rem)", color: C.navy }}
              >
                Enterprise Solutions,{" "}
                <span style={{ color: C.red }}>Engineered for Excellence</span>
              </h2>
            </motion.div>
            <motion.p
              className="lg:col-span-5 text-[12px] leading-[2] lg:text-right"
              style={{ fontFamily: F_BODY, color: `${C.navy}45` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Advanced digital ecosystems designed to optimize operations and drive sustainable growth across every industry.
            </motion.p>
          </div>

          {/* Accordion rows */}
          <div className="border-t" style={{ borderColor: `${C.navy}12` }}>
            {capabilities.map((item, i) => {
              const isActive = activeIndex === i;
              const tags = CAP_TAGS[item.title] || [];
              return (
                <motion.div
                  key={i}
                  className="border-b overflow-hidden cursor-pointer"
                  style={{ borderColor: `${C.navy}10` }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => setActiveIndex(isActive ? null : i)}
                >
                  {/* Row header */}
                  <div
                    className="group flex items-center gap-6 py-4 transition-all duration-300"
                    style={{ background: isActive ? `${C.red}07` : "transparent" }}
                  >
                    {/* Number */}
                    <span
                      className="text-[10px] font-bold tracking-[0.25em] w-10 flex-shrink-0 transition-colors duration-300"
                      style={{ fontFamily: F_LABEL, color: isActive ? C.red : `${C.navy}30` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h3
                      className="flex-1 font-black transition-colors duration-300 leading-tight"
                      style={{
                        fontFamily: F_HEADING,
                        fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                        color: isActive ? C.navy : `${C.navy}80`,
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Tags */}
                    <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                      {tags.slice(0, 3).map((tag, t) => (
                        <span
                          key={t}
                          className="text-[9px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 transition-all duration-300"
                          style={{
                            fontFamily: F_LABEL,
                            color: isActive ? C.red : `${C.navy}35`,
                            border: `1px solid ${isActive ? C.red + "50" : C.navy + "18"}`,
                            background: isActive ? `${C.red}08` : "transparent",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Toggle */}
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-400"
                      style={{
                        background: isActive ? C.red : `${C.navy}08`,
                        border: `1px solid ${isActive ? C.red : C.navy + "18"}`,
                      }}
                    >
                      <span
                        className="font-light text-lg leading-none select-none transition-transform duration-350"
                        style={{
                          color: isActive ? C.white : C.navy,
                          display: "inline-block",
                          transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.35s ease",
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>

                  {/* Expanded panel */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pb-8 pl-16 pr-4">
                      <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Image */}
                        <div className="lg:col-span-4 relative overflow-hidden" style={{ height: "220px" }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            style={{ filter: "grayscale(15%) contrast(1.05)" }}
                          />
                          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.cream}60 0%, transparent 60%)` }} />
                          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2" style={{ borderColor: C.red }} />
                          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2" style={{ borderColor: C.red }} />
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-5 space-y-5">
                          <div className="w-8 h-px" style={{ background: C.red }} />
                          <p className="text-sm leading-[2]" style={{ fontFamily: F_BODY, color: `${C.navy}60` }}>
                            {item.desc}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {tags.map((tag, t) => (
                              <span
                                key={t}
                                className="text-[8px] font-semibold tracking-[0.18em] uppercase px-2 py-1"
                                style={{
                                  fontFamily: F_LABEL,
                                  color: C.red,
                                  border: `1px solid ${C.red}40`,
                                  background: `${C.red}08`,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stat */}
                        <div className="lg:col-span-3">
                          <div
                            className="p-6"
                            style={{ background: `${C.navy}05`, border: `1px solid ${C.navy}10` }}
                          >
                            <div
                              className="font-black text-navy leading-none mb-2"
                              style={{ fontFamily: F_DISPLAY, fontSize: "3.5rem", color: C.navy }}
                            >
                              {["100%", "500+", "3×", "99.9%", "10×", "15+"][i]}
                            </div>
                            <div
                              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                              style={{ fontFamily: F_LABEL, color: `${C.navy}40` }}
                            >
                              {["Integration Rate", "Custom Builds", "Faster Workflows", "Uptime SLA", "ROI Multiplier", "Global Partners"][i]}
                            </div>
                            <div className="mt-4 h-px w-full" style={{ background: `linear-gradient(to right, ${C.red}, transparent)` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between flex-wrap gap-6 pt-14 mt-4 border-t" style={{ borderColor: `${C.navy}10` }}>
            <p className="text-[11px] tracking-[0.14em]" style={{ fontFamily: F_LABEL, color: `${C.navy}28` }}>
              Thirteen years of enterprise delivery across Saudi Arabia
            </p>
            <MagneticButton href="#">
              <span
                className="inline-flex items-center gap-4 font-semibold text-[10px] uppercase tracking-[0.24em] px-8 py-4 transition-all duration-400"
                style={{ fontFamily: F_LABEL, color: C.navy, border: `1px solid ${C.navy}28` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.red; e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.white; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${C.navy}28`; e.currentTarget.style.color = C.navy; }}
              >
                Start a Conversation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
