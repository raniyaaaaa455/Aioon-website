import { useState, useEffect, useRef } from "react";
import { Users, Calendar, UserCheck, CheckCircle, Building, ArrowUpRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
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
const FONT_HERO    = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_HEADING = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BADGE   = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_BODY    = '"DM Sans", "Segoe UI", system-ui, sans-serif';
const FONT_NAV     = '"DM Sans", "Segoe UI", system-ui, sans-serif';

// ─── UNIFIED DARK PALETTE — same as HomePage ──────────────────────────────────
const BG0 = '#06080f';
const BG1 = '#0A0E1A';
const BG2 = '#0D1628';
const BG3 = '#0F1C35';
const CR  = '#8B1A1A';
const CR2 = '#A52020';

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
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
    }, { threshold: 0.5 });
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
    <motion.div ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.22);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block">
      <a href={href} onClick={onClick} className={className}>{children}</a>
    </motion.div>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee({ items }) {
  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <motion.div className="inline-flex gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4">
            <span className="text-white/20 text-[10px] font-semibold tracking-[0.32em] uppercase"
              style={{ fontFamily: FONT_BADGE }}>{item}</span>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: `${CR2}55` }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px" style={{ background: CR2 }} />
      <span className="text-[10px] font-bold tracking-[0.34em] uppercase"
        style={{ fontFamily: FONT_BADGE, color: CR2 }}>{children}</span>
    </div>
  );
}

const CAP_TAGS = {};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function AboutUs() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, 90]);
  const [activeIndex, setActiveIndex] = useState(null); // kept for future use

  const capabilities = [
    { title: "Total Integration",      desc: "Seamless software and hardware integration for unified business systems.",       image: integrationImg  },
    { title: "Deep Customization",     desc: "Tailored solutions that align perfectly with your unique business needs.",        image: customisationImg },
    { title: "AI-Powered Automation",  desc: "Intelligent automation that streamlines operations and boosts efficiency.",       image: automationImg   },
    { title: "Enterprise Security",    desc: "Robust security frameworks protecting your critical business data.",              image: securityImg     },
    { title: "Scalable Architecture",  desc: "Future-ready systems that grow with your business demands.",                     image: scalableImg     },
    { title: "Strategic Partnerships", desc: "Alliances with industry leaders including ENZAPPS Solutions.",                   image: partnershipImg  },
  ];

  const principles = [
    { title: "Our Mission", image: missionImage, body: "To revolutionize business operations through intelligent automation, seamless integration, and customized solutions that drive efficiency.", num: "01" },
    { title: "Our Vision",  image: visionImage,  body: "To be the leading digital transformation partner in Saudi Arabia, empowering businesses with future-ready technology solutions.", num: "02" },
    { title: "Core Values", image: valuesImage,  body: "Integrity, innovation, long-term client success, and reliable support define how we work with every partner.", num: "03" },
  ];

  const marqueeItems = ["Digital Transformation", "13 Years of Excellence", "Enterprise Solutions", "Saudi Arabia", "AI Automation", "Security & Compliance", "Strategic Partnerships"];

  return (
    <div className="relative overflow-hidden" style={{ background: BG0, fontFamily: FONT_BODY }}>

      {/* ── GRAIN ── */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: BG0 }}>
        <motion.div className="absolute inset-0"
          style={{ backgroundImage: `url(${teamImage})`, backgroundSize: "cover", backgroundPosition: "center 30%", y: heroParallax, opacity: 0.14 }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(108deg, ${BG0} 0%, ${BG0}D0 42%, ${BG0}60 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG0} 0%, transparent 60%)` }} />
        <div className="absolute top-0 left-[9%] w-px h-full opacity-[0.10]"
          style={{ background: `linear-gradient(to bottom, transparent 5%, ${CR2} 40%, transparent 95%)` }} />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <motion.div className="absolute top-1/3 right-1/4 w-[45vw] h-[45vw] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${CR}18 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">

            {/* LEFT */}
            <motion.div className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>

              <div className="flex items-center gap-3">
                <span className="w-6 h-px" style={{ background: CR2 }} />
                <span className="text-[10px] font-bold tracking-[0.34em] uppercase text-white/40"
                  style={{ fontFamily: FONT_BADGE }}>Trusted Technology Partner · Saudi Arabia</span>
              </div>

              <div>
                {["Digital", "Transformation", "Redefined."].map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h1 className="block font-bold leading-[1.04]"
                      style={{ fontFamily: FONT_HERO, fontSize: "clamp(2.2rem, 5.2vw, 4rem)", color: i === 2 ? CR2 : '#ffffff', letterSpacing: "-0.015em" }}
                      initial={{ y: 110, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.05, delay: 0.1 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}>
                      {word}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.p className="text-white/45 text-sm leading-relaxed max-w-lg font-light"
                style={{ fontFamily: FONT_BODY }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}>
                For over <span style={{ color: CR2 }}>13 years</span>, Aioon Technologies has been at the forefront of digital innovation — empowering enterprises with intelligent software, hardware integration, and comprehensive transformation services.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.76 }}>
                <MagneticButton href="/products">
                  <span className="inline-flex items-center gap-2 text-white text-[11px] font-semibold px-7 py-3 rounded-full tracking-[0.18em] uppercase transition-all duration-400"
                    style={{ fontFamily: FONT_NAV, background: CR2, boxShadow: `0 8px 24px ${CR2}40` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = CR; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = CR2; }}>
                    Explore Solutions <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </MagneticButton>
                <MagneticButton href="https://wa.me/966535141447">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold px-7 py-3 rounded-full tracking-[0.18em] uppercase transition-all duration-400"
                    style={{ fontFamily: FONT_NAV, color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.14)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}>
                    Contact Our Team
                  </span>
                </MagneticButton>
              </motion.div>

              <motion.div className="flex flex-wrap gap-8 pt-6 border-t border-white/[0.08]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.92 }}>
                {[{ v: "13+", l: "Years" }, { v: "12K+", l: "Clients" }, { v: "500+", l: "Projects" }].map((s, i) => (
                  <div key={i}>
                    <div className="font-bold text-white leading-none" style={{ fontFamily: FONT_HEADING, fontSize: "2.2rem" }}>{s.v}</div>
                    <div className="text-[9px] uppercase tracking-[0.28em] mt-1.5 font-semibold text-white/25" style={{ fontFamily: FONT_BADGE }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — image */}
            <motion.div className="lg:col-span-5 relative hidden lg:block"
              initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-14 h-14 border-t border-l z-20 pointer-events-none" style={{ borderColor: `${CR2}70` }} />
                <div className="absolute -bottom-4 -right-4 w-14 h-14 border-b border-r z-20 pointer-events-none" style={{ borderColor: `${CR2}70` }} />
                <img src={teamImage} alt="Aioon Technologies Team" loading="lazy"
                  className="w-full object-cover" style={{ maxHeight: "480px", filter: "grayscale(20%) contrast(1.04)" }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG0}90 0%, transparent 55%)` }} />

                {/* Badge: Years */}
                <motion.div className="absolute -left-8 bottom-14 p-5 shadow-2xl"
                  style={{ background: BG1, border: `1px solid rgba(255,255,255,0.08)` }}
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.05, duration: 0.65 }}>
                  <div className="flex items-end gap-3">
                    <span className="font-bold leading-none text-white" style={{ fontFamily: FONT_HEADING, fontSize: "3rem", lineHeight: 1 }}>13</span>
                    <div className="pb-1">
                      <p className="text-[9px] uppercase tracking-[0.24em] font-bold text-white/30" style={{ fontFamily: FONT_BADGE }}>Years of</p>
                      <p className="text-[11px] font-bold text-white" style={{ fontFamily: FONT_BADGE }}>Excellence</p>
                    </div>
                  </div>
                  <div className="mt-3 h-px w-full" style={{ background: CR2 }} />
                </motion.div>

                {/* Badge: Clients */}
                <motion.div className="absolute -right-8 top-12 p-5 shadow-2xl"
                  style={{ background: BG2, border: `1px solid rgba(255,255,255,0.08)` }}
                  initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.65 }}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: CR2 }}>
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.24em] font-bold text-white/30" style={{ fontFamily: FONT_BADGE }}>Happy</p>
                      <p className="text-[12px] font-bold text-white" style={{ fontFamily: FONT_BADGE }}>12k+ Clients</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-10 py-3.5 border-t border-white/[0.06]" style={{ background: BG2 }}>
          <Marquee items={marqueeItems} />
        </div>
      </section>



      {/* ══════════════════════════════════════════
          GUIDING PRINCIPLES
      ══════════════════════════════════════════ */}
      <section className="relative py-14 md:py-20 overflow-hidden" style={{ background: BG0 }}>
        <div className="absolute inset-0 opacity-[0.016]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -top-20 right-0 w-[45vw] h-[45vw] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${CR2}, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div className="mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel>Our Guiding Principles</SectionLabel>
            <h2 className="font-bold leading-tight text-white"
              style={{ fontFamily: FONT_HEADING, fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              The Foundation of <span style={{ color: CR2 }}>Our Success</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {principles.map((p, i) => (
              <motion.div key={i}
                className="group relative overflow-hidden cursor-pointer rounded-xl"
                style={{ height: "400px" }}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}>
                <img src={p.image} alt={p.title} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.55) contrast(1.05)' }} />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${BG0}F0 0%, ${BG0}55 55%, transparent 100%)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `${CR}12` }} />

                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-px mb-4 transition-all duration-500 group-hover:w-12"
                      style={{ width: "2rem", background: CR2 }} />
                    <h3 className="text-white font-bold leading-tight mb-2"
                      style={{ fontFamily: FONT_HEADING, fontSize: "1.4rem" }}>{p.title}</h3>
                    <p className="text-white/48 text-[12px] leading-relaxed" style={{ fontFamily: FONT_BODY }}>{p.body}</p>
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
      <section className="relative py-14 md:py-20 overflow-hidden" style={{ background: BG1 }}>
        <div className="absolute inset-0 opacity-[0.016]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionLabel>Our Capabilities</SectionLabel>
              <h2 className="font-bold leading-tight text-white"
                style={{ fontFamily: FONT_HEADING, fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                Enterprise Solutions,{" "}
                <span style={{ color: CR2 }}>Engineered for Excellence</span>
              </h2>
            </motion.div>
            <motion.p className="text-white/38 text-[12px] leading-relaxed max-w-[240px] md:text-right"
              style={{ fontFamily: FONT_BODY }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              Advanced digital ecosystems designed to optimize operations and drive sustainable growth.
            </motion.p>
          </div>

          {/* Clean 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
            {capabilities.map((item, i) => (
              <motion.div key={i}
                className="group relative flex flex-col cursor-default"
                style={{ background: BG1 }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={(e) => { e.currentTarget.style.background = BG2; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = BG1; }}>

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <img src={item.image} alt={item.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.65) saturate(0.7)' }} />
                  {/* subtle red tint on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `${CR}22` }} />
                  {/* number badge */}
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
                  <div className="w-6 h-px mb-3 group-hover:w-10 transition-all duration-400"
                    style={{ background: CR2 }} />
                  <p className="text-white/45 text-[12px] leading-relaxed font-light"
                    style={{ fontFamily: FONT_BODY }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between flex-wrap gap-4 mt-10 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[11px] text-white/25" style={{ fontFamily: FONT_BADGE }}>
              Thirteen years of enterprise delivery across Saudi Arabia
            </p>
            <MagneticButton href="https://wa.me/966535141447">
              <span className="inline-flex items-center gap-3 font-semibold text-[10px] uppercase tracking-[0.18em] px-7 py-3 rounded-full transition-all duration-400"
                style={{ fontFamily: FONT_NAV, color: '#fff', border: `1.5px solid ${CR2}45`, background: `${CR2}0E` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = CR2; e.currentTarget.style.borderColor = CR2; e.currentTarget.style.boxShadow = `0 4px 20px ${CR2}50`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${CR2}0E`; e.currentTarget.style.borderColor = `${CR2}45`; e.currentTarget.style.boxShadow = 'none'; }}>
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
