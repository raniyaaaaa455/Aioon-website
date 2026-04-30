// src/Contact.jsx
import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiBriefcase } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import contactBgImage from "./assets/contact.png";

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    company: "",
    message: "" 
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Server error. Please try later.");
    }
  };


  const socialMedia = [
    { icon: FaFacebookF, color: "from-[#1877F2] to-[#0a5fd8]", label: "Facebook", url: "#" },
    { icon: FaTwitter, color: "from-[#000000] to-[#1a1a1a]", label: "Twitter", url: "#" },
    { icon: FaInstagram, color: "from-[#f09433] via-[#dc2743] to-[#bc1888]", label: "Instagram", url: "#" },
    { icon: FaLinkedinIn, color: "from-[#0A66C2] to-[#004182]", label: "LinkedIn", url: "#" }
  ];

  // WhatsApp number - replace with your actual business WhatsApp number

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${contactBgImage})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Floating WhatsApp Icon - REMOVED FROM HERE */}

      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Contact Us Heading Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center flex items-center justify-center overflow-hidden">
            {"Contact Us".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`inline-block text-white ${char === " " ? "mr-4" : ""}`}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* CENTERED Contact Form with Neon Border */}
        <div className="flex justify-center mb-20">
          {/* Outer container for the neon border effect */}
          <div className="relative w-full max-w-2xl">
            {/* Moving Neon Border Effect */}
            <div className="absolute -inset-1 rounded-2xl overflow-hidden">
              {/* Top border animation */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1B365D] to-transparent"
                animate={{
                  background: [
                    'linear-gradient(to right, transparent, #1B365D, transparent)',
                    'linear-gradient(to right, transparent, #ffffff, transparent)',
                    'linear-gradient(to right, transparent, #1B365D, transparent)',
                  ],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Right border animation */}
              <motion.div
                className="absolute top-0 right-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#ffffff] to-transparent"
                animate={{
                  background: [
                    'linear-gradient(to bottom, transparent, #ffffff, transparent)',
                    'linear-gradient(to bottom, transparent, #1B365D, transparent)',
                    'linear-gradient(to bottom, transparent, #ffffff, transparent)',
                  ],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5
                }}
              />
              
              {/* Bottom border animation */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1B365D] to-transparent"
                animate={{
                  background: [
                    'linear-gradient(to right, transparent, #ffffff, transparent)',
                    'linear-gradient(to right, transparent, #1B365D, transparent)',
                    'linear-gradient(to right, transparent, #ffffff, transparent)',
                  ],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }}
              />
              
              {/* Left border animation */}
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#ffffff] to-transparent"
                animate={{
                  background: [
                    'linear-gradient(to bottom, transparent, #1B365D, transparent)',
                    'linear-gradient(to bottom, transparent, #ffffff, transparent)',
                    'linear-gradient(to bottom, transparent, #1B365D, transparent)',
                  ],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5
                }}
              />
              
              {/* Glow effect around the border */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#1B365D]/20 to-white/20 blur-xl opacity-50"></div>
            </div>

            {/* Main Form Container - Transparent with blur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-8 relative z-10 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-2 text-center text-white">Send us a Message</h3>
              <p className="text-gray-300 mb-6 text-center">Fill out the form below and we'll get back to you shortly.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-200 mb-2 text-sm font-medium">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-[#1B365D] text-white placeholder-white/50 transition-all duration-300 caret-[#1B365D]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-200 mb-2 text-sm font-medium">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-[#1B365D] text-white placeholder-white/50 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-200 mb-2 text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-[#1B365D] text-white placeholder-white/50 transition-all duration-300"
                  />
                </div>

                {/* Company Name Field */}
                <div>
                  <label className="block text-gray-200 mb-2 text-sm font-medium">
                    Company Name <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="text-white/50" />
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-[#1B365D] text-white placeholder-white/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-200 mb-2 text-sm font-medium">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-[#1B365D] text-white placeholder-white/50 resize-none transition-all duration-300"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#1B365D] to-[#234E8C] hover:from-[#0f172a] hover:to-[#1B365D] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#1B365D]/30 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative z-10">Send Message</span>
                  <FiSend className="w-4 h-4 relative z-10" />
                </motion.button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/20">
  <p className="text-gray-300 text-sm text-center">
    By submitting this form, you agree to our{" "}
    <a href="/privacy-policy" className="text-white underline hover:text-blue-300 transition-colors duration-200">
      Privacy Policy
    </a>{" "}
    and{" "}
    <a href="/terms-and-conditions" className="text-white underline hover:text-blue-300 transition-colors duration-200">
      Terms of Service
    </a>.
    {" "}We'll never share your information with third parties.
  </p>
</div>
            </motion.div>
          </div>
        </div>

        {/* 4 CONTACT BOXES - Updated with WhatsApp icon positioned at bottom right of Business Hours box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20 relative"
        >
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Email */}
            <div className="p-4 hover:bg-white/10 transition-all duration-300 rounded-lg hover:border-l-2 hover:border-l-[#1B365D] bg-white/5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-white/10 to-[#1B365D]/10 rounded-lg">
                  <FiMail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Email Us</h3>
                  <a 
                    href="mailto:info@aioon.sa" 
                    className="text-gray-300 hover:text-[#dc2626] transition-colors block"
                  >
                    info@aioon.sa
                  </a>
                  <p className="text-sm text-[#4277FF] mt-1 font-medium">We'll respond as soon as possible</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="p-4 hover:bg-white/10 transition-all duration-300 rounded-lg hover:border-l-2 hover:border-l-gray-300 bg-white/5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-white/10 to-[#1B365D]/10 rounded-lg">
                  <FiPhone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Call Us</h3>
                  <a 
                    href="tel:+966535141447" 
                    className="text-gray-300 hover:text-[#1B365D] transition-colors block"
                  >
                    +966 53 514 1447
                  </a>
                  <a 
                    href="tel:+966535090840" 
                    className="text-gray-300 hover:text-[#1B365D] transition-colors block"
                  >
                    +966 53 509 0840
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="p-4 hover:bg-white/10 transition-all duration-300 rounded-lg hover:border-l-2 hover:border-l-[#1B365D] bg-white/5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-white/10 to-[#1B365D]/10 rounded-lg">
                  <FiMapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Address</h3>
                  <p className="text-gray-300">Ar Rabwah Dist. Abi Al Fath Al Kateb</p>
                  <p className="text-gray-300">Riyadh, Saudi Arabia</p>
                </div>
              </div>
            </div>

            {/* Business Hours - Now with relative positioning for WhatsApp icon */}
            <div className="relative p-4 hover:bg-white/10 transition-all duration-300 rounded-lg hover:border-l-2 hover:border-l-gray-300 bg-white/5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-white/10 to-[#1B365D]/10 rounded-lg">
                  <FiClock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-white">Business Hours</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-300">Sunday - Thursday</span>
                    <span className="text-[#4277FF] font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-white/20 text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Connect With Us</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Follow us on social media to stay updated with the latest news, updates, and insights about AI automation and digital transformation.
          </p>
          
          <div className="flex justify-center flex-wrap gap-6">
            {socialMedia.map((social, index) => (
              <motion.a 
                key={index}
                href={social.url}
                className="group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-full`}></div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`relative p-4 bg-gradient-to-br ${social.color} rounded-xl border border-white/20 hover:border-[#1B365D]/30 transition-all duration-300 text-white`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.div>
              </motion.a>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm mt-8">
            AIOON Technologies - Driving digital transformation in alignment with Saudi Vision 2030
          </p>
        </motion.div>

        {/* Footer */}
      </div>
    </div>
  );
}

export default Contact;