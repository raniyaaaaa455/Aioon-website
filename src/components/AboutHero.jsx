import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "../assets/abbg.jpeg";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const slides = [
  {
    title: ["Driving Digital", "Transformation"],
  },
  {
    title: ["Intelligent Business", "Systems"],
  },
  {
    title: ["Seamless Integration", "& Automation"],
  },
];

export default function AboutHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* BACKGROUND */}
      <motion.img
        src={heroBg}
        className="absolute inset-0 w-full h-full object-cover z-0"
        animate={{ scale: [1, 1.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-10"></div>

      {/* TEXT */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-4 sm:px-6 overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
           className="flex flex-col items-center"
          >

            {/* TITLE */}
            <h1
              style={{
                padding: "0 10px",
                wordBreak: "break-word",
                fontWeight: 700,
                letterSpacing: "0.05em",
                fontSize: "clamp(2.2rem, 5.3vw, 3.8rem)",
                color: "#D1D5DB", // 👈 soft grey
                lineHeight: 1.2,
                textAlign: "center",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              {current.title[0]} <br />
              {current.title[1]}
            </h1>

            <motion.div
  className="flex justify-center"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  style={{ marginTop: "24px" }}
>
  <Link to="/ai-agents">
    <span
      className="inline-flex items-center gap-2 text-white text-[14px] font-semibold px-8 py-3.5 rounded-xl border border-white/30 transition-all duration-300"
      style={{ fontFamily: "inherit" }}
      onMouseEnter={(e) => {
  e.currentTarget.style.background = "rgba(255,255,255,0.2)";   // stronger soft white
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
  e.currentTarget.style.color = "#F3F4F6"; // soft grey text
  e.currentTarget.style.transform = "translateY(-2px)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.background = "transparent";
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
  e.currentTarget.style.color = "#ffffff"; // back to white
  e.currentTarget.style.transform = "none";
}}
    >
      Explore AI Agents
      <ArrowUpRight className="w-4 h-4" />
    </span>
  </Link>
</motion.div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}