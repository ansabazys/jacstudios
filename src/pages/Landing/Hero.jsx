import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <video
        src="https://res.cloudinary.com/dpxv43jt9/video/upload/v1762514708/hero_ksmbok.mp4" // 🔁 replace with your own fashion image
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        autoPlay
      />

      {/* Overlay */}
      <div className="absolute inset- bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter"
        >
          Elevate Your Everyday Style
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white/80 max-w-xl text-sm md:text-base mb-8"
        >
          Discover premium quality streetwear and essentials designed for comfort, confidence, and timeless appeal.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/store")}
          className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Shop Now
        </motion.button>
      </div>

    </section>
  );
};

export default Hero;
