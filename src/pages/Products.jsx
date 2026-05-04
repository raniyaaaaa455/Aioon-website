import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useEffect, memo } from "react";
import products from "../data/productsData";

// ─── TYPOGRAPHY (MATCH ABOUT PAGE) ─────────────────────────
const FONT = '"DM Sans", "Segoe UI", system-ui, sans-serif';

// ─── COLORS ────────────────────────────────────────────────
const ACCENT  = "#2B55C5";
const TEXT1   = "#1A1A1A";
const TEXTM   = "#8A8A8A";
const BORDER  = "#E5E5E5";
const WHT     = "#FFFFFF";
const BG_OFF  = "#FCFCFA";

const ELV_ACCENTS = [
  "#2B55C5","#1E45A8","#5578D4","#3A60C0",
  "#4A6FCE","#2B4FB5","#6380DC","#1C3E9E"
];

// ─── STYLES ────────────────────────────────────────────────
const STYLES = `
.elv-card {
  background: ${WHT};
  border: 1px solid ${BORDER};
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  backdrop-filter: blur(6px);
}

.elv-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
}

.card-img {
  transition: transform 0.6s ease;
}
.elv-card:hover .card-img {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .elv-card {
    transform: none !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04) !important;
  }
}
`;

function injectStyles() {
  if (document.getElementById("products-styles")) return;
  const el = document.createElement("style");
  el.id = "products-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

// ─── CARD ─────────────────────────────────────────────────
const CinematicCard = memo(function CinematicCard({ product, index }) {
  const accent = ELV_ACCENTS[index % ELV_ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link to={`/product/${product.id}`}>
      <div className="elv-card h-full overflow-hidden cursor-pointer flex flex-col">

        {/* Top Accent */}
        <div
          style={{
            height: "4px",
            background: `linear-gradient(90deg, ${accent}, transparent)`
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden h-[200px]">
          <img
            src={product.image}
            alt={product.title}
            className="card-img w-full h-full object-cover"
          />

          {/* Big Number */}
          <div
            className="absolute bottom-[-10px] right-[-10px]"
            style={{
              fontSize: "5rem",
              color: "#00000010",
              fontWeight: "700",
              fontFamily: FONT
            }}
          >
            {num}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2 sm:gap-3">

          {/* Header line */}
          <div className="flex items-center gap-2">
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                fontWeight: 600,
                fontFamily: FONT,
                color: accent
              }}
            >
              {num}
            </span>
            <div className="flex-1 h-px" style={{ background: "#ddd" }} />
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: FONT,
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: TEXT1
            }}
          >
            {product.title}
          </h3>

          <div className="flex-1" />

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                fontWeight: 600,
                fontFamily: FONT,
                color: TEXTM
              }}
            >
              VIEW DETAILS
            </span>

            <div
              style={{
                background: `${accent}20`,
                padding: "6px",
                borderRadius: "6px"
              }}
            >
              <ArrowUpRight size={14} color={accent} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

// ─── MAIN ─────────────────────────────────────────────────
function Products() {
  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <section
      className="pt-20 pb-12"
      style={{ background: BG_OFF, fontFamily: FONT }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 mb-10">

          <div>
<p
  style={{
    marginTop: "28px",   // 👈 THIS moves it down
    marginBottom: "8px", // 👈 space between text and heading
    color: ACCENT,
    letterSpacing: "0.34em",
    fontSize: "10px",
    fontWeight: "700",
    fontFamily: FONT
  }}
>
  OUR PORTFOLIO
</p>

           <h2
  className="font-bold leading-[1.1]"
  style={{
    fontFamily: FONT,
   fontSize: "clamp(1.4rem, 4.5vw, 3rem)", // 👈 smaller
    letterSpacing: "-0.02em",
    color: TEXT1
  }}
>
              ELV Systems <span style={{ color: ACCENT }}>& Solutions</span>
            </h2>
          </div>

          <p
            style={{
              maxWidth: "300px",
              marginTop: "40px",
              color: TEXTM,
              fontSize: "13px",
              lineHeight: "1.8",
              fontFamily: FONT
              
            }}
          >
            Comprehensive low voltage systems designed for modern infrastructure needs.
          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {products.map((p, i) => (
            <CinematicCard key={p.id} product={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Products;