// src/Services.jsx
import heroVideo from "./assets/hero-video.mp4";
import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowRight, FiCheckCircle, FiUsers, FiPackage, FiBarChart2,
  FiFileText, FiPrinter, FiHome, FiTruck, FiDollarSign,
  FiCreditCard, FiHardDrive, FiGrid, FiTrendingUp, FiShield,
  FiMapPin, FiMail, FiPhone,
} from "react-icons/fi";
import {
  FaServer, FaRegSmile, FaChartLine, FaBrain, FaRegBuilding,
  FaRegFileAlt, FaRegClock, FaRobot, FaCloudUploadAlt, FaHeadset,
} from "react-icons/fa";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import erpImage from "./assets/ERP.png";
import customerImage from "./assets/customer.png";
import payrollImage from "./assets/payroll.png";
import projectImage from "./assets/project.png";
import aiAnalyticsImage from "./assets/ai&analytics.png";
import einvoiceImage from "./assets/einvoice.png";

/* ─── FadeUp ──────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Animated Heading ────────────────────── */
function AnimatedHeading() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const words = ["Core", "Software", "Solutions"];

  return (
    <div ref={ref}>
      

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 flex flex-wrap justify-center gap-x-4 gap-y-1 mt-0">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block" style={{ paddingBottom: "0.05em" }}>
            <motion.span className="inline-block"
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            >{word}</motion.span>
          </span>
        ))}
      </h1>

      {/* Red underline */}
      <div className="flex justify-center mb-6">
        <motion.div className="h-px bg-gradient-to-r from-[#dc2626] to-[#ef4444]"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 0.55, delay: 0.65, ease: "easeOut" }}
        />
      </div>

      <motion.p className="text-xl text-slate-300 leading-relaxed"
        initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        Integrated Services for Digital Transformation
      </motion.p>

      <motion.p className="text-base text-slate-400 mt-4 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        Aioon Technologies offers a complete suite of integrated platforms designed to boost efficiency,
        improve visibility, and streamline your entire business operation.
      </motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
function Services() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => setReady(true));
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });

 

  // ==========================================
  // ALL SERVICES DATA - UNCHANGED
  // ==========================================
  const services = [
    {
      id: 1,
      title: "Enterprise Resource Planning",
      subtitle: "ERP",
      description: "Eliminate operational silos and unlock data-driven insights. Manage your capital, people, and processes from a single, integrated command center.",
      gradient: "from-[#dc2626] to-[#ef4444]",
      imageUrl: erpImage,
      fullDescription: "Unifying Your Business Operations for Scalable Growth. In today's fast-paced market, relying on disconnected spreadsheets and legacy software creates data silos that stifle innovation. Our Enterprise Resource Planning (ERP) solutions bridge these gaps by consolidating your critical business functions into one seamless, intelligent ecosystem. We help organizations transition from fragmented tools to a single 'source of truth.' By integrating Finance, HR, Inventory, Sales, and Manufacturing, we empower your leadership team to make data-driven decisions with absolute confidence. Our ERP systems go beyond simple record-keeping; they automate complex workflows, ensure regulatory compliance, and provide real-time visibility into every corner of your enterprise. Whether you are looking to optimize production costs, streamline payroll, or accelerate growth, our ERP solution is built for scalability.",
      modules: [
        { title: "Finance Management", features: ["Intelligent Accounting","Cash Flow Optimization","Strategic Planning","Regulatory Compliance"] },
        { title: "Human Resource Management (HRMS)", features: ["Core HR & Payroll","Workforce Management","Talent Lifecycle","Employee Development"] },
        { title: "Inventory & Supply Chain", features: ["Smart Stock Control","Procurement Efficiency","Warehouse Optimization","Future-Ready Planning"] },
        { title: "Sales & CRM", features: ["360° Customer View","Order-to-Cash","Pipeline Management","Revenue Analytics"] },
        { title: "Manufacturing & Operations", features: ["Production Control","Bill of Materials (BOM)","Quality Assurance","Resource Planning"] },
      ],
    },
    {
      id: 2,
      title: "Customer Relationship Management",
      subtitle: "CRM",
      description: "Build stronger relationships and drive sales with a complete 360-degree view of every customer interaction.",
      gradient: "from-[#dc2626] to-[#ef4444]",
      imageUrl: customerImage,
      fullDescription: "Transform your customer relationships with our comprehensive CRM solution. Track every interaction, manage leads through the sales pipeline, and automate marketing campaigns. Our AI-powered analytics provide actionable insights to increase conversion rates and customer lifetime value. Whether you're a small business or enterprise, our CRM adapts to your unique sales process.",
      modules: [
        { title: "Sales Management", features: ["Lead & Opportunity Tracking","Sales Pipeline Management","Quotes & Proposals","Forecasting"] },
        { title: "Customer Service", features: ["Ticket Management","Customer Portal","SLA Monitoring","Feedback Collection"] },
        { title: "Marketing Automation", features: ["Email Campaigns","Lead Nurturing","Campaign Analytics","Social Media Integration"] },
        { title: "Analytics", features: ["Sales Reports","Customer Insights","Performance Dashboards","Revenue Forecasting"] },
      ],
    },
    {
      id: 3,
      title: "HR & Payroll Automation",
      subtitle: "HR",
      description: "Streamline your workforce management with AI-powered attendance, automated payroll, and complete HR operations.",
      gradient: "from-[#dc2626] to-[#ef4444]",
      imageUrl: payrollImage,
      fullDescription: "Revolutionize your HR operations with our comprehensive automation platform. From biometric attendance tracking to automated payroll processing with ZATCA compliance, we handle it all. Manage employee records, leave requests, performance reviews, and training in one place. Reduce manual work by 80% and ensure 100% accuracy in payroll calculations with our intelligent system.",
      modules: [
        { title: "Payroll Management", features: ["Automated Salary Processing","Tax Calculations","Bank Integration","Payslip Generation"] },
        { title: "Attendance System", features: ["Face Recognition","Biometric Integration","Mobile Check-in","Overtime Tracking"] },
        { title: "HR Operations", features: ["Employee Database","Leave Management","Performance Reviews","Training Tracking"] },
        { title: "Compliance", features: ["Saudi Labor Law","GOSI Integration","Contract Management","Legal Compliance"] },
      ],
    },
    {
      id: 4,
      title: "Project & Construction ERP",
      subtitle: "construction",
      description: "Master your construction projects with real-time tracking, cost control, and seamless collaboration from tender to handover.",
      gradient: "from-[#dc2626] to-[#ef4444]",
      imageUrl: projectImage,
      fullDescription: "Take control of your construction projects from start to finish. Our specialized Construction ERP provides real-time tracking of project progress, costs, and resources. Manage subcontractors, track equipment usage, monitor labor attendance, and control budgets all in one platform. With mobile accessibility and cloud-based collaboration, your team stays connected whether on-site or in the office.",
      modules: [
        { title: "Project Planning", features: ["Project Scheduling","Resource Allocation","Budget Planning","Risk Management"] },
        { title: "Cost Control", features: ["Budget vs Actual","Expense Tracking","Invoice Management","Profitability Analysis"] },
        { title: "Site Management", features: ["Site Progress Tracking","Equipment Management","Labor Attendance","Material Tracking"] },
        { title: "Subcontractor Management", features: ["Vendor Contracts","Work Orders","Payment Tracking","Performance Rating"] },
      ],
    },
    {
      id: 5,
      title: "AI & Business Analytics",
      subtitle: "AI & Analytics",
      description: "Transform your data into actionable insights with AI-powered analytics and predictive intelligence.",
      gradient: "from-[#dc2626] to-[#ef4444]",
      imageUrl: aiAnalyticsImage,
      fullDescription: "Unlock the power of your data with advanced AI and analytics. Our platform transforms raw data into actionable insights, helping you predict trends, identify opportunities, and mitigate risks. From sales forecasting to customer behavior analysis, our machine learning algorithms continuously improve to deliver increasingly accurate predictions. Make data-driven decisions with confidence and stay ahead of the competition.",
      modules: [
        { title: "Predictive Analytics", features: ["Sales Forecasting","Demand Prediction","Risk Assessment","Market Trends"] },
        { title: "Business Intelligence", features: ["Interactive Dashboards","KPI Tracking","Custom Reports","Data Visualization"] },
        { title: "Machine Learning", features: ["Pattern Recognition","Anomaly Detection","Recommendation Engine","Process Automation"] },
        { title: "Data Integration", features: ["Legacy System Integration","Real-time Sync","Data Cleansing","API Management"] },
      ],
    },
    {
      id: 6,
      title: "E-Invoicing & Compliance",
      subtitle: "E-Invoicing",
      description: "Stay compliant with ZATCA regulations through automated, secure, and audit-ready e-invoicing solutions.",
      gradient: "from-[#dc2626] to-[#ef4444]",
      imageUrl: einvoiceImage,
      fullDescription: "Ensure full compliance with ZATCA e-invoicing regulations through our automated solution. Generate, validate, and submit invoices with cryptographic signatures and QR codes as required by law. Our system integrates seamlessly with your existing POS and accounting software, supporting both Phase 1 and Phase 2 requirements. With real-time validation and secure cloud storage, you can focus on your business while we handle compliance.",
      modules: [
        { title: "ZATCA Compliance", features: ["Phase 1 & 2 Ready","Cryptographic Signatures","QR Code Generation","XML Formatting"] },
        { title: "POS Integration", features: ["Thermal Printer Support","Real-time Validation","Offline Mode","Multiple Branches"] },
        { title: "Invoice Management", features: ["Invoice Generation","Credit/Debit Notes","Bulk Processing","Template Customization"] },
        { title: "Reporting & Archive", features: ["Audit Trail","Secure Storage","Search & Retrieve","Export Options"] },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#06080f] relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", visibility: ready ? "visible" : "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-rev  { to { transform: rotate(-360deg); } }
      `}</style>

      {/* Scroll bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] origin-left z-50" style={{ scaleX }} />

      {/* Background atmosphere */}
      <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-[#dc2626]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#1e3a8a]/[0.12] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#dc2626]/[0.02] rounded-full blur-[80px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      

      {/* Spinning rings — desktop only */}
      <div className="hidden md:block absolute top-[2%] right-[3%] w-72 h-72 opacity-[0.05] pointer-events-none" style={{ animation: "spin-slow 22s linear infinite" }}>
        <div className="w-full h-full rounded-full border-2 border-dashed border-[#dc2626]" />
      </div>
      <div className="hidden md:block absolute top-[6%] right-[7%] w-44 h-44 opacity-[0.04] pointer-events-none" style={{ animation: "spin-rev 15s linear infinite" }}>
        <div className="w-full h-full rounded-full border border-[#ef4444]" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── Hero Heading ── */}
        {/* ── Hero Section with Background Video ── */}
<div className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">

  {/* 🎥 Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

  {/* 🌑 Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#06080f]" />

  {/* ✨ Content */}
  <div className="relative z-10 px-4 max-w-4xl -mt-24">
    <AnimatedHeading />
  </div>

</div>

        {/* ── Service Cards ── */}
        
        <div className="space-y-8 mx-4">
          {services.map((service, index) => (
            <motion.div
  key={service.id}
  initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
  <div className="group relative rounded-3xl overflow-hidden transform transition duration-500 hover:-translate-y-2">
                
                

                <div className={`relative flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

                  {/* Image Section */}
                  <div className="lg:w-2/5 relative overflow-hidden min-h-[280px]">
                    <div className={`absolute inset-0 ${index % 2 === 0 ? "lg:rounded-r-[50px]" : "lg:rounded-l-[50px]"} overflow-hidden`}>
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Dark overlay so image fits dark theme */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      {/* Side fade into card */}
                      <div className={`absolute inset-0 ${
                        index % 2 === 0
                          ? "bg-gradient-to-r from-transparent to-[#06080f]/60"
                          : "bg-gradient-to-l from-transparent to-[#06080f]/60"
                      } hidden lg:block`} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-8 lg:p-10 relative">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:hidden" />

                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 relative inline-block">
                      {service.title}
                      <div className="absolute -bottom-2 left-0 w-16 h-px bg-gradient-to-r from-[#dc2626] to-transparent" />
                    </h2>

                    <p className="text-slate-300 text-base leading-relaxed mb-4 mt-6 text-justify">
                      {service.description}
                    </p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6 border-l-2 border-[#dc2626]/30 pl-4 italic text-justify">
                      {service.fullDescription}
                    </p>

                    {/* CTA Button */}
                    <Link
                      to={`/services/${service.subtitle.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#dc2626]/60 text-[#ef4444] font-medium rounded-xl hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] transition-all duration-300 group/btn text-sm"
                    >
                      <span>Learn More About {service.subtitle}</span>
                      <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
          </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Services;