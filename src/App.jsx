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

gsap.registerPlugin(ScrollTrigger);

// Font variables — ALL headings use Clash Display same as hero
const FONT_HERO    = '"Clash Display", "Syne", system-ui, sans-serif';
const FONT_HEADING = '"Clash Display", "Syne", system-ui, sans-serif';
const FONT_BADGE   = '"Clash Display", "Syne", system-ui, sans-serif';
const FONT_BODY    = '"Syne", system-ui, sans-serif';
const FONT_NAV     = '"Syne", system-ui, sans-serif';

function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.025]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '160px 160px' }} />
  );
}

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

function MagneticButton({ children, className, href = '#', onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const hm = (e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); };
  const hl = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={hm} onMouseLeave={hl} className="inline-block">
      <a href={href} onClick={onClick} className={className}>{children}</a>
    </motion.div>
  );
}

function Marquee({ items }) {
  return (
    <div className="flex overflow-hidden select-none">
      {[0, 1].map(i => (
        <motion.div key={i} className="flex gap-8 pr-8 shrink-0" animate={{ x: ['0%', '-100%'] }} transition={{ duration: 22, ease: 'linear', repeat: Infinity }}>
          {items.map((item, j) => (
            <span key={j} className="flex items-center gap-4 text-[11px] font-bold text-white/25 uppercase tracking-[0.2em]" style={{ fontFamily: FONT_BODY }}>
              {item} <span className="w-1 h-1 rounded-full bg-red-500/50 inline-block" />
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const features = [
    {
      num: '01', title: 'Tailored To Your Needs', sub: 'Bespoke Architecture',
      body: 'Every system is engineered around your exact workflows. We begin with deep discovery — understanding how your teams think, move, and decide — then build a platform that feels invented for you alone.',
      metric: '100%', metricLabel: 'Custom Built', color: '#dc2626',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=85',
    },
    {
      num: '02', title: 'Scalable Architecture', sub: 'Cloud-Native Infrastructure',
      body: 'Our microservice architecture scales invisibly — from ten users to ten thousand — without a single line of rewritten code. Zero-downtime deployments mean your operations never pause.',
      metric: '10×', metricLabel: 'Growth Ready', color: '#B9996E',
      img: scalableArchImg,
    },
    {
      num: '03', title: '24/7 Continuous Support', sub: 'Dedicated NOC Team',
      body: 'A dedicated Network Operations Center monitors your systems every hour of every day. Proactive incident response and quarterly roadmap reviews — a partner who knows your environment cold.',
      metric: '24/7', metricLabel: 'Always On', color: '#dc2626',
      img: aboutImg,
    },
    {
      num: '04', title: 'Future-Proof Technology', sub: 'AI-First Design',
      body: 'AI-first architecture and open API standards ensure your investment stays relevant for the next technology generation. We build for the next five years, with a roadmap that evolves beside you.',
      metric: '5yr+', metricLabel: 'Tech Lifespan', color: '#B9996E',
      img: aiBusinessImg,
    },
  ];

  const stats = [
    { val: 13, suf: '+', label: 'Years in KSA' },
    { val: 500, suf: '+', label: 'Projects' },
    { val: 98, suf: '%', label: 'Retention' },
    { val: 100, suf: '+', label: 'Industries' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wcu4-left', { x: '-18%', opacity: 0 }, { x: '0%', opacity: 1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' } });
      gsap.fromTo('.wcu4-right', { x: '18%', opacity: 0 }, { x: '0%', opacity: 1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' } });
      const hTl = gsap.timeline({ scrollTrigger: { trigger: '.wcu4-eyebrow', start: 'top 88%', toggleActions: 'play none none none' } });
      hTl
        .fromTo('.wcu4-ey-txt', { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .fromTo('.wcu4-h2-ch', { opacity: 0, y: '110%', rotateX: -75 }, { opacity: 1, y: '0%', rotateX: 0, stagger: 0.016, duration: 0.8, ease: 'power4.out' }, '-=0.3');
      gsap.fromTo('.wcu4-ring-circle', { strokeDashoffset: 314 }, { strokeDashoffset: 70, duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' } });
      gsap.fromTo('.wcu4-tab', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.55, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' }, delay: 0.5 });
      gsap.fromTo('.wcu4-feature-text > *', { opacity: 0, y: 22 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }, delay: 0.4 });
      gsap.fromTo('.wcu4-stat', { opacity: 0, y: 16, scale: 0.88 }, { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.5, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.wcu4-stats', start: 'top 92%', toggleActions: 'play none none none' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const switchFeature = (idx) => {
    if (idx === active || animating) return;
    setAnimating(true);
    const tl = gsap.timeline({ onComplete: () => { setActive(idx); setAnimating(false); } });
    tl.to('.wcu4-feature-text > *', { opacity: 0, y: -16, stagger: 0.035, duration: 0.25, ease: 'power2.in' });
    tl.to('.wcu4-ring-num', { rotateY: 90, duration: 0.2, ease: 'power2.in' }, 0);
    tl.to('.wcu4-img-wrap', { clipPath: 'inset(0 100% 0 0)', duration: 0.42, ease: 'power3.in' }, 0.08);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.wcu4-img-wrap', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.58, ease: 'power3.out' });
    tl.fromTo('.wcu4-ring-num', { rotateY: -90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.32, ease: 'back.out(2)' }, 0.14);
    tl.fromTo('.wcu4-feature-text > *', { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.48, ease: 'power3.out' }, 0.18);
  }, [active]);

  const f = features[active];

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: '#F7F5F1', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 40px 0' }}>
        <div className="wcu4-eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
          <span className="wcu4-ey-txt" style={{ fontFamily: FONT_BADGE, fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B9996E', opacity: 0 }}>Why Choose Us</span>
        </div>
        <div style={{ overflow: 'hidden', perspective: 1000 }}>
          <h2 style={{ fontFamily: FONT_HEADING, fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '-0.025em', color: '#0D1B2A', margin: 0 }}>
            {'Built Different. '.split('').map((ch, i) => (
              <span key={i} className="wcu4-h2-ch" style={{ display: 'inline-block', willChange: 'transform, opacity', opacity: 0 }}>{ch === ' ' ? '\u00A0' : ch}</span>
            ))}
            {'Proven Better.'.split('').map((ch, i) => (
              <span key={`r${i}`} className="wcu4-h2-ch" style={{ display: 'inline-block', willChange: 'transform, opacity', color: '#dc2626', opacity: 0 }}>{ch === ' ' ? '\u00A0' : ch}</span>
            ))}
          </h2>
        </div>
      </div>

      {/* Split body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 460, margin: '28px 40px 0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 80px rgba(13,27,42,0.13)' }}>
        {/* LEFT */}
        <div className="wcu4-left" style={{ background: '#0D1B2A', position: 'relative', padding: '36px 32px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', width: 84, height: 84, flexShrink: 0 }}>
              <svg width="84" height="84" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                <circle cx="42" cy="42" r="36" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
                <circle className="wcu4-ring-circle" cx="42" cy="42" r="36" fill="none" stroke={f.color} strokeWidth="1.5" strokeDasharray="226" strokeDashoffset="50" strokeLinecap="round" style={{ transition: 'stroke 0.5s ease' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="wcu4-ring-num" style={{ fontFamily: FONT_HEADING, fontWeight: 900, fontSize: 20, color: '#F7F5F1', letterSpacing: '-0.02em', display: 'inline-block' }}>{f.num}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
              {features.map((feat, i) => (
                <button key={i} className="wcu4-tab" onClick={() => switchFeature(i)} style={{
                  fontFamily: FONT_BADGE, fontSize: 8, fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: active === i ? '#F7F5F1' : 'rgba(247,245,241,0.3)',
                  background: active === i ? feat.color : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active === i ? feat.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 99, padding: '5px 12px', cursor: 'pointer',
                  transition: 'all 0.3s ease', opacity: 0,
                }}>{feat.num}</button>
              ))}
            </div>
          </div>

          <div className="wcu4-feature-text" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px 0 14px' }}>
            <span style={{ fontFamily: FONT_BADGE, fontSize: 8, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: f.color, marginBottom: 10, display: 'block' }}>{f.sub}</span>
            <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 900, fontSize: 'clamp(1.25rem, 2.2vw, 1.8rem)', lineHeight: 1.15, color: '#F7F5F1', margin: '0 0 12px', letterSpacing: '-0.02em' }}>{f.title}</h3>
            <p style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 400, color: 'rgba(247,245,241,0.55)', lineHeight: 1.7, margin: '0 0 18px', maxWidth: 360 }}>{f.body}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
              <span style={{ fontFamily: FONT_HEADING, fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: f.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{f.metric}</span>
              <span style={{ fontFamily: FONT_BADGE, fontSize: 9, fontWeight: 700, color: f.color === '#dc2626' ? 'rgba(220,38,38,0.6)' : 'rgba(185,153,110,0.65)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{f.metricLabel}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {features.map((_, i) => (
              <button key={i} onClick={() => switchFeature(i)} style={{ width: active === i ? 18 : 6, height: 6, borderRadius: 99, background: active === i ? f.color : 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }} />
            ))}
            <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: 'rgba(247,245,241,0.22)', marginLeft: 6, letterSpacing: '0.1em' }}>{active + 1} / {features.length}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="wcu4-right" style={{ position: 'relative', overflow: 'hidden', background: '#0a1520' }}>
          <div className="wcu4-img-wrap" key={`wrap-${active}`} style={{ position: 'absolute', inset: 0, clipPath: 'inset(0 0% 0 0)' }}>
            <img src={f.img} alt={f.title} style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'center', marginTop: '-5%' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(13,27,42,0.5) 0%, rgba(13,27,42,0.08) 55%, transparent 100%)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: -10, right: -5, fontFamily: FONT_HEADING, fontWeight: 900, fontSize: 'clamp(5rem, 10vw, 9rem)', lineHeight: 1, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none' }}>{f.num}</div>
          <div style={{ position: 'absolute', bottom: 18, right: 18 }}>
            <span style={{ fontFamily: FONT_BADGE, fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{f.sub}</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="wcu4-stats" style={{ display: 'flex', gap: 0, margin: '12px 40px 0', border: '1px solid rgba(13,27,42,0.09)', borderRadius: 14, overflow: 'hidden', background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)' }}>
        {stats.map((s, i) => (
          <div key={i} className="wcu4-stat" style={{ flex: 1, padding: '13px 18px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid rgba(13,27,42,0.07)' : 'none' }}>
            <div style={{ fontFamily: FONT_HEADING, fontWeight: 900, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#0D1B2A', lineHeight: 1, letterSpacing: '-0.03em' }}>
              <AnimatedCounter target={s.val} suffix={s.suf} />
            </div>
            <div style={{ fontFamily: FONT_BADGE, fontSize: 9, fontWeight: 600, color: 'rgba(13,27,42,0.42)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, padding: '16px 40px 20px', borderTop: '1px solid rgba(13,27,42,0.06)', marginTop: 14 }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 11, color: 'rgba(13,27,42,0.3)', margin: 0 }}>Thirteen years of enterprise delivery across Saudi Arabia.</p>
        <MagneticButton href="#">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: FONT_NAV, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0D1B2A', border: '1.5px solid rgba(185,153,110,0.45)', borderRadius: 99, padding: '10px 22px', background: 'rgba(185,153,110,0.06)', transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(220,38,38,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(185,153,110,0.06)'; e.currentTarget.style.borderColor = 'rgba(185,153,110,0.45)'; e.currentTarget.style.color = '#0D1B2A'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Start a Conversation
            <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid currentColor', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>→</span>
          </span>
        </MagneticButton>
      </div>
    </section>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [isArabic, setIsArabic]             = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showWhatsApp, setShowWhatsApp]     = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollY, setScrollY]               = useState(0);
  const [activeElvIndex, setActiveElvIndex] = useState(0);
  const [elvDragging, setElvDragging]       = useState(false);

  const svcSectionRef = useRef(null);
  const mainRef       = useRef(null);
  const processRef    = useRef(null);
  const elvAutoRef    = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const lang = isArabic ? 'ar' : 'en';
  const t = {
    en: { home:'Home', about:'About', services:'Services', contact:'Contact', heroTitle:['Where Technology','Meets Business Vision'], heroDesc:"Aioon Technologies builds smart, scalable, and fully customized digital ecosystems. As Saudi Arabia's exclusive ENZAPPS support partner, we deliver seamless integration and future-ready solutions.", explore:'Get in touch', viewServices:'View services', wpHeader:'Start a Conversation', wpSub:'Hi! Click below to chat with our Customer Support on WhatsApp', wpCta:'Customer Support Executive' },
    ar: { home:'الرئيسية', about:'من نحن', services:'الخدمات', contact:'اتصل بنا', heroTitle:['حيث تلتقي التكنولوجيا','برؤية الأعمال'], heroDesc:'تبني تقنيات أيون أنظمة رقمية ذكية وقابلة للتطوير ومخصصة بالكامل. كشريك دعم حصري لـ ENZAPPS في المملكة العربية السعودية.', explore:'تواصل معنا', viewServices:'عرض الخدمات', wpHeader:'ابدأ محادثة', wpSub:'مرحبا! انقر أدناه للدردشة مع دعم العملاء', wpCta:'مدير دعم العملاء' },
  }[lang];

  useEffect(() => { const f = () => setScrollY(window.scrollY); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo('.hero-badge-text',{opacity:0,y:10},{opacity:1,y:0,duration:0.6,ease:'power3.out'})
        .fromTo('.hero-line',{opacity:0,y:70,skewY:4},{opacity:1,y:0,skewY:0,stagger:0.14,duration:1,ease:'power4.out'},'-=0.3')
        .fromTo('.hero-desc',{opacity:0,y:30},{opacity:1,y:0,duration:0.8,ease:'power3.out'},'-=0.5')
        .fromTo('.hero-btn',{opacity:0,y:20,scale:0.9},{opacity:1,y:0,scale:1,stagger:0.1,duration:0.5,ease:'back.out(1.5)'},'-=0.4')
        .fromTo('.hero-stat',{opacity:0,y:20},{opacity:1,y:0,stagger:0.1,duration:0.5,ease:'power3.out'},'-=0.3');
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-left').forEach(el => { gsap.fromTo(el,{opacity:0,x:-50},{opacity:1,x:0,duration:0.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',toggleActions:'play none none none'}}); });
      gsap.utils.toArray('.reveal-right').forEach(el => { gsap.fromTo(el,{opacity:0,x:50},{opacity:1,x:0,duration:0.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',toggleActions:'play none none none'}}); });
      gsap.to('.orb-a',{x:40,y:-30,duration:5,ease:'sine.inOut',yoyo:true,repeat:-1});
      gsap.to('.orb-b',{x:-30,y:40,duration:6,ease:'sine.inOut',yoyo:true,repeat:-1,delay:1.2});
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-label-line',{scaleX:0,transformOrigin:'left center'},{scaleX:1,duration:0.7,ease:'power3.out',scrollTrigger:{trigger:svcSectionRef.current,start:'top 82%',toggleActions:'play none none none'}});
      gsap.fromTo('.svc-label-text',{opacity:0,y:12,letterSpacing:'0.7em'},{opacity:1,y:0,letterSpacing:'0.35em',duration:0.8,ease:'power3.out',scrollTrigger:{trigger:svcSectionRef.current,start:'top 82%',toggleActions:'play none none none'},delay:0.15});
      gsap.fromTo('.svc-heading-word',{opacity:0,y:65,skewY:6},{opacity:1,y:0,skewY:0,stagger:0.13,duration:0.95,ease:'power4.out',scrollTrigger:{trigger:svcSectionRef.current,start:'top 80%',toggleActions:'play none none none'},delay:0.2});
      gsap.fromTo('.svc-header-desc',{opacity:0,x:35},{opacity:1,x:0,duration:0.7,ease:'power3.out',scrollTrigger:{trigger:svcSectionRef.current,start:'top 78%',toggleActions:'play none none none'},delay:0.5});
      gsap.fromTo('.svc-divider',{scaleX:0,transformOrigin:'left center'},{scaleX:1,duration:1.2,ease:'power3.inOut',scrollTrigger:{trigger:svcSectionRef.current,start:'top 78%',toggleActions:'play none none none'},delay:0.3});
      gsap.utils.toArray('.svc-row').forEach((el,i)=>{const col=i%3;gsap.fromTo(el,{opacity:0,x:col===0?-55:col===2?55:0,y:col===1?55:28,scale:0.92},{opacity:1,x:0,y:0,scale:1,duration:0.72,ease:'power3.out',scrollTrigger:{trigger:svcSectionRef.current,start:'top 72%',toggleActions:'play none none none'},delay:0.08+i*0.09});});
      gsap.utils.toArray('.svc-card-num').forEach((el,i)=>{gsap.fromTo(el,{scale:2.8,opacity:0},{scale:1,opacity:1,duration:0.55,ease:'back.out(2.2)',scrollTrigger:{trigger:svcSectionRef.current,start:'top 70%',toggleActions:'play none none none'},delay:0.18+i*0.09});});
      gsap.fromTo('.svc-btn',{opacity:0,y:28,scale:0.82},{opacity:1,y:0,scale:1,duration:0.65,ease:'back.out(2)',scrollTrigger:{trigger:'.svc-btn',start:'top 93%',toggleActions:'play none none none'}});
      gsap.fromTo('.svc-stat',{opacity:0,y:30,scale:0.75},{opacity:1,y:0,scale:1,stagger:0.12,duration:0.55,ease:'back.out(1.7)',scrollTrigger:{trigger:'.svc-stat-bar',start:'top 93%',toggleActions:'play none none none'}});
      gsap.fromTo('.svc-stat-sep',{scaleY:0,transformOrigin:'top center'},{scaleY:1,stagger:0.1,duration:0.45,ease:'power2.out',scrollTrigger:{trigger:'.svc-stat-bar',start:'top 93%',toggleActions:'play none none none'},delay:0.45});
      gsap.to('.svc-orb-a',{x:55,y:-45,duration:7,ease:'sine.inOut',yoyo:true,repeat:-1});
      gsap.to('.svc-orb-b',{x:-40,y:55,duration:9,ease:'sine.inOut',yoyo:true,repeat:-1,delay:2.5});
      gsap.utils.toArray('.svc-shimmer').forEach((el,i)=>{gsap.fromTo(el,{x:'-110%'},{x:'210%',duration:1.6,ease:'power1.inOut',repeat:-1,repeatDelay:3.5+i*0.65,delay:2+i*0.45});});
    }, svcSectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {id:1,number:'01',title:'Enterprise Resource Planning',shortDesc:'Comprehensive management of Finance, HR, Inventory, Sales, and Manufacturing.',features:['Finance Management','HR Automation','Inventory Control','Sales Integration'],bgImage:erpBg,tag:'ERP'},
    {id:2,number:'02',title:'Customer Relationship Management',shortDesc:'Intelligent tools for lead management, pipeline tracking, and customer engagement.',features:['Lead Management','Pipeline Tracking','Customer Analytics','Revenue Forecasting'],bgImage:crmBg,tag:'CRM'},
    {id:3,number:'03',title:'HR & Payroll Automation',shortDesc:'Automated workforce management with AI-driven attendance and precise payroll processing.',features:['AI Attendance','Payroll Processing','Leave Management','Compliance Tracking'],bgImage:hrPayrollBg,tag:'HCM'},
    {id:4,number:'04',title:'Project & Construction ERP',shortDesc:'Tailored modules for contractors to manage budgets, resources, and timelines.',features:['Budget Management','Resource Allocation','Progress Tracking','Timeline Control'],bgImage:projectConstructionBg,tag:'PMO'},
    {id:5,number:'05',title:'AI & Business Analytics',shortDesc:'Data-driven dashboards and predictive insights across all business functions.',features:['Predictive Analytics','Interactive Dashboards','Machine Learning','Risk Assessment'],bgImage:aiAnalyticsBg,tag:'AI'},
    {id:6,number:'06',title:'E-Invoicing & Compliance',shortDesc:'Seamless ZATCA-compliant e-invoicing integration with external devices.',features:['ZATCA Compliance','Invoice Automation','Tax Reporting','Device Integration'],bgImage:einvoiceBg,tag:'ZATCA'},
  ];

  const elvProducts = [
    {id:1,number:'01',title:'Passive Networking & Cabling',image:passiveNetworkingImg,category:'Infrastructure',desc:'High-performance cabling for reliable data transmission',features:['Fiber Optics','Copper Cabling','Rack Installation','Patch Panels']},
    {id:2,number:'02',title:'Conferencing Solutions',image:conferencingImg,category:'Communication',desc:'Advanced audio-visual systems for seamless collaboration',features:['Video Conferencing','Wireless Presentation','Room Scheduling','Auto Tracking']},
    {id:3,number:'03',title:'Audio & Visual Systems',image:audioVisualImg,category:'Entertainment',desc:'Immersive audio and visual experiences for any space',features:['Surround Sound','Digital Signage','Video Walls','Pro Audio']},
    {id:4,number:'04',title:'CCTV & Video Management',image:cctvImg,category:'Security',desc:'Intelligent surveillance with AI-powered video analytics',features:['IP Cameras','NVR Systems','AI Analytics','Remote Monitoring']},
    {id:5,number:'05',title:'Integrated Security',image:securitySystemsImg,category:'Security',desc:'Comprehensive security systems for complete protection',features:['Intrusion Detection','Alarm Systems','Security Integration','Perimeter']},
    {id:6,number:'06',title:'Parking Control',image:parkingControlImg,category:'Access',desc:'Smart parking management with real-time guidance',features:['LPR','Space Counting','Payment Systems','Guidance']},
    {id:7,number:'07',title:'Access Control',image:accessControlImg,category:'Access',desc:'Secure entry solutions with biometric authentication',features:['Biometric','RFID Cards','Turnstiles','Time Attendance']},
    {id:8,number:'08',title:'Smart Home',image:smartHomeImg,category:'Automation',desc:'Intelligent home automation for comfort and efficiency',features:['Lighting Control','Climate Control','Voice Control','Energy']},
    {id:9,number:'09',title:'Fire Alarm Systems',image:'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',category:'Safety',desc:'Early detection and emergency response systems',features:['Smoke Detectors','Emergency Lighting','Evacuation','PA System']},
  ];

  const filteredElv = activeCategory === 'All' ? elvProducts : elvProducts.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (elvDragging) return;
    elvAutoRef.current = setInterval(() => { setActiveElvIndex(p => (p + 1) % filteredElv.length); }, 3500);
    return () => clearInterval(elvAutoRef.current);
  }, [filteredElv.length, elvDragging, activeCategory]);

  useEffect(() => { setActiveElvIndex(0); }, [activeCategory]);

  const processSteps = [
    {num:'01',title:'Smart Analyzing',desc:'We assess your business processes, identifying pain points where AI can deliver maximum impact.'},
    {num:'02',title:'AI Development',desc:'Our team builds custom AI solutions tailored to your needs, creating intelligent systems that learn.'},
    {num:'03',title:'Implementation',desc:'We integrate solutions into your existing infrastructure ensuring smooth deployment and minimal disruption.'},
    {num:'04',title:'Support & Scale',desc:'We provide ongoing support and scale your solutions as you grow and your needs evolve.'},
  ];

  const marqueeItems = ['Enterprise ERP','CRM Solutions','AI Analytics','HR Automation','E-Invoicing','ELV Systems','Smart Home','Vision 2030'];
  const aboutStats = [
    {val:13,suf:'+',label:'Years of Legacy',sub:'Trusted expertise'},
    {val:100,suf:'+',label:'Industries Served',sub:'Diverse expertise'},
    {val:500,suf:'+',label:'Projects Delivered',sub:'Successful builds'},
    {val:98,suf:'%',label:'Client Satisfaction',sub:'Exceeding expectations'},
  ];

  const currentElv = filteredElv[activeElvIndex] || filteredElv[0];

  return (
    <div dir={isArabic?'rtl':'ltr'} className={`min-h-screen bg-[#F7F5F1] text-[#0D1B2A] ${isArabic?'font-arabic':''}`} ref={mainRef} style={{ fontFamily: FONT_BODY }}>
      <NoiseOverlay />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-red-600 z-[200] origin-left" style={{ scaleX }} />

      {/* ── NAVBAR ── */}
      <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY>60?'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]':'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          <a href="/"><img src={logo} alt="AIOON" className={`h-8 md:h-9 w-auto transition-all duration-300 ${scrollY>60?'':'brightness-[10]'}`}/></a>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: FONT_NAV }}>
            {[t.home,t.about,t.services,t.contact].map((item,i)=>(
              <li key={i} className={`relative group cursor-pointer transition-colors duration-300 ${scrollY>60?'text-[#0D1B2A]/70 hover:text-[#0D1B2A]':'text-white/80 hover:text-white'}`}>
                {item}<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-red-600 group-hover:w-full transition-all duration-400"/>
              </li>
            ))}
            <li className="relative">
              <button onClick={()=>setShowLangDropdown(!showLangDropdown)} className={`text-sm font-semibold transition-colors duration-300 ${scrollY>60?'text-[#0D1B2A]/60 hover:text-[#0D1B2A]':'text-white/60 hover:text-white'}`} style={{ fontFamily: FONT_NAV }}>{isArabic?'EN':'عر'}</button>
              <AnimatePresence>
                {showLangDropdown&&(
                  <motion.div initial={{opacity:0,y:8,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:0.95}} className="absolute top-full right-0 mt-3 w-32 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden">
                    {[['en','English'],['ar','العربية']].map(([code,label])=>(<button key={code} onClick={()=>{setIsArabic(code==='ar');setShowLangDropdown(false);}} className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${(code==='en')===!isArabic?'bg-red-50 text-red-600 font-semibold':'hover:bg-gray-50 text-gray-700'}`} style={{ fontFamily: FONT_NAV }}>{label}</button>))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
          <MagneticButton href="#" className={`hidden md:inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-400 ${scrollY>60?'bg-[#0D1B2A] text-white hover:bg-red-600 shadow-md':'bg-white/15 text-white border border-white/30 hover:bg-white hover:text-[#0D1B2A] backdrop-blur-sm'}`} style={{ fontFamily: FONT_NAV }}>Book a call <span className="text-xs">↗</span></MagneticButton>
          <button className={`md:hidden text-xl transition-colors ${scrollY>60?'text-[#0D1B2A]':'text-white'}`} onClick={()=>setIsMenuOpen(!isMenuOpen)}>{isMenuOpen?'✕':'☰'}</button>
        </div>
        <AnimatePresence>
          {isMenuOpen&&(
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="md:hidden bg-white border-t border-black/5 overflow-hidden">
              <div className="px-5 py-5 flex flex-col gap-4">
                {[t.home,t.about,t.services,t.contact].map((item,i)=>(<a key={i} href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors py-1" style={{ fontFamily: FONT_NAV }} onClick={()=>setIsMenuOpen(false)}>{item}</a>))}
                <div className="flex gap-2 pt-1">
                  {[['en','English'],['ar','العربية']].map(([code,label])=>(<button key={code} onClick={()=>{setIsArabic(code==='ar');setIsMenuOpen(false);}} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${(code==='en')===!isArabic?'bg-red-600 text-white':'bg-gray-100 text-gray-700'}`} style={{ fontFamily: FONT_NAV }}>{label}</button>))}
                </div>
                <a href="#" className="bg-[#0D1B2A] text-white text-sm font-semibold px-5 py-3 rounded-full text-center" style={{ fontFamily: FONT_NAV }} onClick={()=>setIsMenuOpen(false)}>Book a call ↗</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── pt-24 pushes content below navbar */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src={newBanner} alt="" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#060E18]/95 via-[#060E18]/80 to-[#060E18]/40"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060E18]/70 via-transparent to-transparent"/>
        </div>
        <div className="absolute inset-0 opacity-[0.035]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',backgroundSize:'70px 70px'}}/>
        <div className="orb-a absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/12 rounded-full blur-3xl pointer-events-none"/>
        <div className="orb-b absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl pointer-events-none"/>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            {/* Badge — Syne, uppercase, tracking */}
            <p className="hero-badge-text text-white/55 text-[11px] font-semibold tracking-[0.2em] uppercase mb-5" style={{ fontFamily: FONT_BADGE }}>
              Saudi Arabia's Premier Tech Partner
            </p>
            {/* Hero title — Clash Display + Syne, font-black */}
            <h1 className="font-black leading-[1.04] mb-4 text-white">
              {t.heroTitle.map((line,i)=>(
                <div key={i} className="overflow-hidden">
                  <span
                    className={`hero-line block text-[clamp(2.2rem,5.2vw,4rem)] ${i===1?'text-red-400':''}`}
                    style={{ fontFamily: FONT_HERO }}
                  >{line}</span>
                </div>
              ))}
            </h1>
            {/* Description — system-ui, font-light */}
            <p className="hero-desc text-white/55 text-sm md:text-[14px] leading-relaxed mb-6 max-w-md font-light" style={{ fontFamily: FONT_BODY }}>
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <MagneticButton href="#" className="hero-btn group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-red-600/30 transition-all duration-300" style={{ fontFamily: FONT_NAV }}>
                <span className="relative z-10 flex items-center gap-2">{t.explore}<span className="group-hover:translate-x-1 transition-transform inline-block">→</span></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
              </MagneticButton>
              <a href="#services-section" className="hero-btn group flex items-center gap-3 text-white/60 hover:text-white/90 text-sm font-medium transition-colors duration-300" style={{ fontFamily: FONT_NAV }}>
                <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/10 transition-all text-base">↓</span>
                {t.viewServices}
              </a>
            </div>
            {/* Stats — Syne, font-black */}
            <div className="flex flex-wrap gap-8 pt-5 border-t border-white/10">
              {[{v:'13+',l:'Years Legacy'},{v:'100+',l:'Industries'},{v:'500+',l:'Projects'}].map((s,i)=>(
                <div key={i} className="hero-stat">
                  <div className="text-white font-black text-2xl md:text-3xl" style={{ fontFamily: FONT_HEADING }}>{s.v}</div>
                  <div className="text-white/35 text-[10px] uppercase tracking-widest mt-0.5 font-medium" style={{ fontFamily: FONT_BADGE }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <motion.div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" animate={{scaleY:[1,0.4,1],opacity:[0.7,0.3,0.7]}} transition={{duration:1.8,repeat:Infinity}}/>
          <span className="text-white/25 text-[9px] uppercase tracking-[0.25em] font-medium" style={{ fontFamily: FONT_BADGE }}>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[#0D1B2A] py-3.5 overflow-hidden"><Marquee items={marqueeItems}/></div>

      {/* ── ABOUT ── */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-[#F7F5F1]">
        <div className="absolute inset-0 pointer-events-none">
          <img src={aiAnalyticsBg} alt="" className="w-full h-full object-cover opacity-[0.35]" style={{filter:'grayscale(8%)',objectPosition:'center 20%'}}/>
          <div className="absolute inset-0 bg-[#F7F5F1]/56"/>
        </div>
        <div className="absolute inset-0 opacity-[0.035]" style={{backgroundImage:'radial-gradient(circle, #0D1B2A 1px, transparent 1px)',backgroundSize:'28px 28px'}}/>
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-red-100 rounded-full blur-3xl opacity-35 translate-x-1/3 -translate-y-1/4 pointer-events-none"/>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div className="mb-7" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-px bg-red-500/60"/>
              <span className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: FONT_BADGE }}>About Aioon Technologies</span>
            </div>
            {/* Section header — Syne, font-black */}
            <h2 className="text-3xl md:text-4xl font-black text-[#0D1B2A] leading-tight" style={{ fontFamily: FONT_HEADING }}>
              We're Your <span className="text-red-600">Innovation</span> Partner
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-0 md:divide-x md:divide-[#0D1B2A]/8 mb-8">
            {[
              (<><span className="text-[#0D1B2A] font-semibold" style={{ fontFamily: FONT_BODY }}>Aioon Technologies</span> is a dedicated technology partner for enterprises in KSA, specializing in advanced business software and digital transformation.</>),
              (<>We deliver cutting-edge solutions across software and hardware, with a core focus on total integration and deep customization. Our strength lies in transforming complex business needs into seamless, scalable systems.</>),
              (<>We serve as an exclusive support partner in KSA for <span className="text-red-600 font-semibold">ENZAPPS Software Solutions</span>, with 13+ years of legacy and a vast customer base across industries.</>),
            ].map((para,i)=>(
              <motion.div key={i} className={`pb-6 md:pb-0 ${i>0?'md:px-8 pt-6 md:pt-0':'md:pr-8'}`} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.12}}>
                <div className="w-6 h-0.5 bg-red-600 mb-3"/>
                {/* Body text — system-ui */}
                <p className="text-[#0D1B2A]/60 text-[12px] leading-relaxed" style={{ fontFamily: FONT_BODY }}>{para}</p>
                {i===2&&(<div className="mt-4"><MagneticButton href="#" className="inline-flex items-center gap-2 border border-[#0D1B2A]/15 hover:border-red-500/60 text-[#0D1B2A]/60 hover:text-red-600 font-semibold px-5 py-2 rounded-full text-xs transition-all duration-300" style={{ fontFamily: FONT_NAV }}>Learn More <span>→</span></MagneticButton></div>)}
              </motion.div>
            ))}
          </div>
          <div className="pt-6 border-t border-[#0D1B2A]/8">
            <div className="flex flex-wrap md:flex-nowrap items-stretch divide-x divide-[#0D1B2A]/10">
              {aboutStats.map((stat,i)=>(
                <motion.div key={i} className="flex-1 min-w-[90px] px-4 first:pl-0 last:pr-0 py-1 group cursor-default" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.08}}>
                  {/* Stat numbers — Syne, font-black */}
                  <div className="text-xl font-black text-red-600 group-hover:text-[#0D1B2A] transition-colors duration-300 mb-0.5" style={{ fontFamily: FONT_HEADING }}><AnimatedCounter target={stat.val} suffix={stat.suf}/></div>
                  <div className="text-[#0D1B2A] font-semibold text-[10px] leading-tight" style={{ fontFamily: FONT_BODY }}>{stat.label}</div>
                  <div className="text-[#0D1B2A]/30 text-[9px] uppercase tracking-widest mt-0.5" style={{ fontFamily: FONT_BADGE }}>{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services-section" ref={svcSectionRef} className="relative overflow-hidden bg-[#F7F5F1]">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle, #0D1B2A 1px, transparent 1px)',backgroundSize:'32px 32px'}}/>
        <div className="svc-orb-a absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{background:'radial-gradient(ellipse at top right,rgba(220,38,38,0.07) 0%,transparent 65%)'}}/>
        <div className="svc-orb-b absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none" style={{background:'radial-gradient(ellipse at bottom left,rgba(13,27,42,0.04) 0%,transparent 70%)'}}/>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-10 pb-8 svc-divider border-b border-[#0D1B2A]/[0.07]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="svc-label-line w-6 h-px bg-red-600"/>
                <span className="svc-label-text text-red-600 text-[10px] font-bold tracking-[0.35em] uppercase" style={{ fontFamily: FONT_BADGE }}>Our Services</span>
              </div>
              {/* Section heading — Syne, font-black */}
              <h2 className="font-black text-[#0D1B2A] leading-[1.0]" style={{ fontFamily: FONT_HEADING, fontSize:'clamp(2.2rem,5vw,3.8rem)' }}>
                <span className="svc-heading-word block overflow-hidden">Enterprise</span>
                <span className="svc-heading-word block overflow-hidden text-red-600">Solutions</span>
              </h2>
            </div>
            <p className="svc-header-desc text-[#0D1B2A]/45 text-[12px] leading-relaxed max-w-[260px] md:text-right" style={{ fontFamily: FONT_BODY }}>
              Advanced digital ecosystems designed to optimize operations and drive sustainable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-1">
            {services.map((svc)=>(
              <motion.div key={svc.id} className="svc-row group relative overflow-hidden rounded-xl cursor-pointer border border-transparent hover:border-red-500/40 transition-all duration-400" style={{minHeight:'170px'}} whileHover={{y:-3,scale:1.012}} transition={{duration:0.3,ease:[0.22,1,0.36,1]}}>
                <div className="absolute inset-0 z-0">
                  <img src={svc.bgImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0" style={{background:'linear-gradient(135deg,rgba(247,245,241,0.93) 0%,rgba(247,245,241,0.84) 42%,rgba(247,245,241,0.55) 72%,rgba(247,245,241,0.24) 100%)'}}/>
                  <div className="svc-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] pointer-events-none z-20" style={{left:'-33%'}}/>
                </div>
                <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-500 via-red-400 to-transparent z-10" initial={{width:'0%'}} whileHover={{width:'100%'}} transition={{duration:0.5,ease:[0.22,1,0.36,1]}}/>
                <div className="relative z-10 p-4 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    {/* Card number — Syne, font-black */}
                    <span className="svc-card-num text-[10px] font-black tracking-widest text-[#0D1B2A]/40 group-hover:text-red-600 transition-colors duration-300" style={{ fontFamily: FONT_HEADING }}>{svc.number}</span>
                    {/* Tag badge — Syne, font-black */}
                    <span className="text-[8px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-[#0D1B2A]/8 border border-[#0D1B2A]/15 text-[#0D1B2A]/60" style={{ fontFamily: FONT_BADGE }}>{svc.tag}</span>
                  </div>
                  {/* Card title — Syne, font-black */}
                  <h3 className="font-black text-red-600 group-hover:text-red-700 leading-tight mb-1.5 transition-colors duration-300" style={{ fontFamily: FONT_HEADING, fontSize:'clamp(0.78rem,1.2vw,0.9rem)' }}>{svc.title}</h3>
                  {/* Card desc — system-ui */}
                  <p className="text-[#0D1B2A]/50 text-[10px] leading-relaxed mb-2.5 flex-1" style={{ fontFamily: FONT_BODY }}>{svc.shortDesc}</p>
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {svc.features.slice(0,2).map((f,fi)=>(<span key={fi} className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{background:'rgba(13,27,42,0.06)',border:'1px solid rgba(13,27,42,0.12)',color:'rgba(13,27,42,0.55)',fontFamily:FONT_BODY}}>{f}</span>))}
                    {svc.features.length>2&&(<span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-[#0D1B2A]/5 border border-[#0D1B2A]/10 text-[#0D1B2A]/35" style={{ fontFamily: FONT_BODY }}>+{svc.features.length-2}</span>)}
                  </div>
                  <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-bold group-hover:gap-2.5 transition-all duration-300" style={{ fontFamily: FONT_NAV }}>
                    Explore <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px]" style={{background:'rgba(220,38,38,0.10)',border:'1px solid rgba(220,38,38,0.25)'}}>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="svc-btn flex justify-center mt-6 mb-1">
            <MagneticButton href="#" className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full text-[11px] uppercase tracking-widest transition-all duration-400 shadow-lg shadow-red-600/20 hover:shadow-red-700/30" style={{ fontFamily: FONT_NAV }}>
              View All Services <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-[10px]">→</span>
            </MagneticButton>
          </div>
          <div className="svc-stat-bar flex flex-wrap items-center justify-between gap-4 py-5 border-t border-[#0D1B2A]/[0.07] mt-5">
            {[['06','Core Solutions'],['100+','Industries'],['500+','Projects'],['KSA','Exclusive Partner']].map(([val,label],i)=>(
              <div key={i} className="svc-stat flex items-center gap-3 group cursor-default">
                <span className="text-[18px] md:text-xl font-black text-red-600" style={{ fontFamily: FONT_HEADING }}>{val}</span>
                <span className="text-[9px] text-[#0D1B2A]/50 uppercase tracking-widest font-semibold" style={{ fontFamily: FONT_BADGE }}>{label}</span>
                {i<3&&<span className="svc-stat-sep hidden sm:block w-px h-4 bg-[#0D1B2A]/[0.10] ml-2"/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELV ── */}
      <section className="relative bg-[#0A0F18] py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',backgroundSize:'35px 35px'}}/>
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-red-900/20 rounded-full blur-3xl pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="mb-8">
            <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <span className="inline-block bg-red-600 text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3" style={{ fontFamily: FONT_BADGE }}>ELV Solutions</span>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight" style={{ fontFamily: FONT_HEADING }}>Extra Low <span className="text-red-400">Voltage Systems</span></h2>
                <p className="text-gray-500 text-[11px] leading-relaxed max-w-xs" style={{ fontFamily: FONT_BODY }}>Comprehensive low voltage infrastructure for modern buildings and smart cities.</p>
              </div>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-[1fr_340px] gap-5 items-stretch">
            <div className="relative rounded-2xl overflow-hidden" style={{height:'340px'}} onMouseEnter={()=>setElvDragging(true)} onMouseLeave={()=>setElvDragging(false)}>
              <AnimatePresence mode="wait">
                <motion.div key={`img-${currentElv.id}-${activeCategory}`} className="absolute inset-0" initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.97}} transition={{duration:0.55,ease:[0.22,1,0.36,1]}}>
                  <img src={currentElv.image} alt={currentElv.title} className="w-full h-full object-cover object-center"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050C15]/90 via-[#050C15]/30 to-transparent"/>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050C15]/40 to-transparent"/>
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-4 left-5 text-[5rem] font-black leading-none select-none pointer-events-none" style={{ fontFamily: FONT_HEADING, color:'rgba(255,255,255,0.06)' }}>{currentElv.number}</div>
              <div className="absolute top-4 right-4"><span className="bg-red-600/90 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full" style={{ fontFamily: FONT_BADGE }}>{currentElv.category}</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <AnimatePresence mode="wait">
                  <motion.div key={`info-${currentElv.id}-${activeCategory}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.4,ease:'easeOut'}}>
                    <div className="flex items-center gap-2 mb-1"><span className="text-red-400 text-[10px] font-bold" style={{ fontFamily: FONT_BADGE }}>{currentElv.number}</span><div className="w-4 h-px bg-red-500/50"/></div>
                    <h3 className="text-white text-[17px] font-bold leading-tight mb-1" style={{ fontFamily: FONT_HEADING }}>{currentElv.title}</h3>
                    <p className="text-gray-400 text-[11px] leading-relaxed" style={{ fontFamily: FONT_BODY }}>{currentElv.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button onClick={()=>{setElvDragging(true);setActiveElvIndex(i=>(i-1+filteredElv.length)%filteredElv.length);setTimeout(()=>setElvDragging(false),4000);}} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-red-600/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 text-sm backdrop-blur-sm">‹</button>
              <button onClick={()=>{setElvDragging(true);setActiveElvIndex(i=>(i+1)%filteredElv.length);setTimeout(()=>setElvDragging(false),4000);}} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-red-600/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 text-sm backdrop-blur-sm">›</button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex-1 overflow-y-auto" style={{maxHeight:'340px',scrollbarWidth:'none'}}>
                <div className="flex flex-col gap-1.5">
                  {filteredElv.map((p,i)=>(
                    <motion.button key={`${p.id}-${activeCategory}`} onClick={()=>{setActiveElvIndex(i);setElvDragging(true);setTimeout(()=>setElvDragging(false),4000);}} whileHover={{x:4}} transition={{duration:0.2}}
                      className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-all duration-300 ${activeElvIndex===i?'bg-red-600/15 border border-red-600/25':'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'}`}>
                      <div className="w-10 h-8 rounded-md overflow-hidden shrink-0"><img src={p.image} alt={p.title} className="w-full h-full object-cover"/></div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold text-red-400/70 mb-0.5" style={{ fontFamily: FONT_BADGE }}>{p.number}</div>
                        <div className={`text-[10px] font-semibold leading-tight truncate transition-colors ${activeElvIndex===i?'text-white':'text-gray-500'}`} style={{ fontFamily: FONT_BODY }}>{p.title}</div>
                      </div>
                      {activeElvIndex===i&&<div className="ml-auto w-1 h-4 bg-red-600 rounded-full shrink-0"/>}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 justify-center pt-1">
                {filteredElv.map((_,i)=>(<button key={i} onClick={()=>{setActiveElvIndex(i);setElvDragging(true);setTimeout(()=>setElvDragging(false),4000);}} className={`rounded-full transition-all duration-400 ${i===activeElvIndex?'w-5 h-1.5 bg-red-500':'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'}`}/>))}
                <span className="text-[9px] text-gray-600 ml-2" style={{ fontFamily: FONT_BODY }}>{activeElvIndex+1}/{filteredElv.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section ref={processRef} className="py-12 md:py-16 relative overflow-hidden bg-[#F7F5F1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: FONT_BADGE }}>Our Process</span>
                <span className="w-6 h-px bg-red-500/30"/>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0D1B2A] leading-tight" style={{ fontFamily: FONT_HEADING }}>
                Simple, Smart <span className="text-red-600">&amp; Scalable</span>
              </h2>
            </div>
            <p className="text-gray-400 text-[11px] max-w-xs leading-relaxed" style={{ fontFamily: FONT_BODY }}>We design, develop, and implement automation tools that help you work smarter.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/6 border border-black/6 rounded-2xl overflow-hidden">
            {processSteps.map((step,i)=>(
              <motion.div key={i} className="group relative p-6 bg-white hover:bg-red-600 transition-colors duration-400 cursor-default overflow-hidden"
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.1}}>
                <div className="absolute -right-3 -bottom-4 text-[6rem] font-black leading-none select-none pointer-events-none opacity-[0.03]" style={{ fontFamily: FONT_HEADING }}>{step.num}</div>
                <div className="relative z-10">
                  {/* Step number — Syne, font-bold */}
                  <span className="text-[10px] font-bold text-red-600 group-hover:text-white/60 tracking-widest mb-3 block transition-colors duration-400" style={{ fontFamily: FONT_BADGE }}>{step.num}</span>
                  <div className="w-5 h-0.5 bg-red-600 group-hover:bg-white/50 mb-3 transition-all duration-400 group-hover:w-8"/>
                  {/* Step title — Syne, font-bold */}
                  <h3 className="text-[13px] font-bold text-[#0D1B2A] group-hover:text-white mb-1.5 transition-colors duration-400" style={{ fontFamily: FONT_HEADING }}>{step.title}</h3>
                  {/* Step desc — system-ui */}
                  <p className="text-[11px] text-gray-400 group-hover:text-white/70 leading-relaxed transition-colors duration-400" style={{ fontFamily: FONT_BODY }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <WhyChooseUs />

      {/* ── CONTACT ── */}
      <section className="py-10 md:py-14 relative overflow-hidden bg-[#F7F5F1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{backgroundImage:'radial-gradient(circle, #0D1B2A 1px, transparent 1px)',backgroundSize:'28px 28px'}}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none"/>
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 items-center">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-px bg-red-500/60"/>
                <span className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: FONT_BADGE }}>Contact Us</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#0D1B2A] leading-tight mb-3" style={{ fontFamily: FONT_HEADING }}>
                {isArabic?'مستعد للتحول الرقمي؟':(<>Ready for Digital<br/><span className="text-red-600">Transformation?</span></>)}
              </h2>
              <p className="text-[#0D1B2A]/50 text-[11px] leading-relaxed mb-5 max-w-xs" style={{ fontFamily: FONT_BODY }}>
                {isArabic?'اتصل بنا اليوم.':'Our team is ready to guide you from discovery to deployment.'}
              </p>
              <MagneticButton href="#" className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full text-xs transition-all duration-300 shadow-lg shadow-red-600/15" style={{ fontFamily: FONT_NAV }}>
                {isArabic?'جدولة اجتماع':'Schedule a Meeting'} <span>→</span>
              </MagneticButton>
            </motion.div>
            <motion.div className="grid grid-cols-3 divide-x divide-[#0D1B2A]/8 border border-[#0D1B2A]/8 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm shadow-sm"
              initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.1}}>
              {[
                {icon:'✉',label:'Email',text:'info@aioon.com',href:'mailto:info@aioon.com',sub:'Write to us'},
                {icon:'📞',label:'Phone',text:'+966 535 141 447',href:'tel:+966535141447',sub:'Call anytime'},
                {icon:'📍',label:'Location',text:'Riyadh, KSA',href:'#',sub:'Saudi Arabia'},
              ].map((item,i)=>(
                <motion.a key={i} href={item.href} className="flex flex-col justify-between p-4 hover:bg-red-50/60 group transition-colors duration-300" whileHover={{backgroundColor:'rgba(254,226,226,0.4)'}}>
                  <div className="flex items-center justify-between mb-4"><span className="text-base">{item.icon}</span><motion.span className="text-[#0D1B2A]/25 group-hover:text-red-500 transition-colors text-[10px]" whileHover={{x:1,y:-1}}>↗</motion.span></div>
                  <div>
                    <div className="text-[9px] font-bold text-[#0D1B2A]/40 uppercase tracking-widest mb-1" style={{ fontFamily: FONT_BADGE }}>{item.label}</div>
                    <div className="text-[#0D1B2A] group-hover:text-red-600 text-[11px] font-semibold mb-0.5 transition-colors duration-300 leading-tight" style={{ fontFamily: FONT_BODY }}>{item.text}</div>
                    <div className="text-[#0D1B2A]/35 text-[9px]" style={{ fontFamily: FONT_BODY }}>{item.sub}</div>
                  </div>
                  <div className="w-0 group-hover:w-full h-px bg-red-500/40 transition-all duration-400 mt-3"/>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060E18] border-t border-white/5 py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <img src={logo} alt="AIOON" className="h-9 w-auto mb-5 brightness-[10] opacity-80"/>
              <p className="text-gray-600 text-[12px] leading-relaxed max-w-xs" style={{ fontFamily: FONT_BODY }}>Pioneering digital transformation in Saudi Arabia with innovative technology solutions aligned with Vision 2030.</p>
              <div className="flex gap-2.5 mt-6">
                {['in','tw','fb','ig'].map((s,i)=>(<motion.a key={i} href="#" whileHover={{y:-3,scale:1.1}} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600 flex items-center justify-center text-gray-500 hover:text-white text-[11px] font-bold uppercase transition-colors duration-300" style={{ fontFamily: FONT_BODY }}>{s}</motion.a>))}
              </div>
            </div>
            <div>
              <h4 className="text-white/80 font-bold text-[13px] mb-5" style={{ fontFamily: FONT_HEADING }}>Quick Links</h4>
              <ul className="space-y-2.5">
                {[t.home,t.services,t.about,t.contact].map((item,i)=>(<li key={i}><a href="#" className="text-gray-600 hover:text-red-400 text-[12px] transition-colors duration-300 flex items-center gap-2 group" style={{ fontFamily: FONT_NAV }}><span className="w-0 group-hover:w-2.5 h-px bg-red-500 transition-all duration-300"/>{item}</a></li>))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-bold text-[13px] mb-5" style={{ fontFamily: FONT_HEADING }}>Contact</h4>
              <ul className="space-y-2.5">
                {['Riyadh, Saudi Arabia','info@aioon.com','+966 535 141 447'].map((item,i)=>(<li key={i} className="text-gray-600 hover:text-gray-400 text-[12px] transition-colors duration-300 cursor-pointer" style={{ fontFamily: FONT_BODY }}>{item}</li>))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-700 text-[11px]" style={{ fontFamily: FONT_BODY }}>© {new Date().getFullYear()} AIOON Technologies. All rights reserved.</p>
            <p className="text-gray-700 text-[11px]" style={{ fontFamily: FONT_BODY }}>Proudly supporting Saudi Vision 2030 🇸🇦</p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP ── */}
      <motion.button onClick={()=>setShowWhatsApp(!showWhatsApp)} whileHover={{scale:1.12}} whileTap={{scale:0.95}}
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-[#25D366] hover:bg-[#1dbf5c] rounded-full shadow-xl shadow-green-500/25 transition-colors duration-300">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WhatsApp" className="w-5 h-5"/>
      </motion.button>
      <AnimatePresence>
        {showWhatsApp&&(
          <>
            <motion.div initial={{opacity:0,y:20,scale:0.88}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:0.88}} transition={{type:'spring',stiffness:320,damping:26}}
              className="fixed bottom-20 right-6 z-50 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/5">
              <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] px-4 py-3">
                <h3 className="text-white text-[12px] font-bold" style={{ fontFamily: FONT_HEADING }}>{t.wpHeader}</h3>
                <p className="text-white/70 text-[10px] mt-0.5" style={{ fontFamily: FONT_BODY }}>{t.wpSub}</p>
              </div>
              <div className="p-3">
                <a href="https://wa.me/966535141447" target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 bg-[#F0FBF8] hover:bg-[#DCF8F2] rounded-xl transition-colors border border-[#25D366]/15 duration-200">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" alt="WhatsApp" className="w-8 h-8 mb-2"/>
                  <span className="font-bold text-[#0D1B2A] text-[11px]" style={{ fontFamily: FONT_BODY }}>{t.wpCta}</span>
                  <span className="text-[#075E54] text-[10px] mt-0.5 font-semibold" style={{ fontFamily: FONT_NAV }}>Chat Now →</span>
                </a>
              </div>
              <button onClick={()=>setShowWhatsApp(false)} className="absolute top-2 right-2 text-white/60 hover:text-white bg-black/15 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold transition-colors">×</button>
            </motion.div>
            <div className="fixed inset-0 z-40" onClick={()=>setShowWhatsApp(false)}/>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}