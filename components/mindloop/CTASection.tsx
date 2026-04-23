"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";
import { fadeUp } from "@/lib/animations";

const CTASection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsUrl = "https://stream.mux.com/v69979S02S006xSxlTP9X4W1T00f7uN8A6I.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS (Safari)
      video.src = hlsUrl;
    } else if (Hls.isSupported()) {
      // hls.js (Chrome, Firefox, etc.)
      const hls = new Hls({
        capLevelToPlayerSize: true,
        autoStartLoad: true,
      });
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => hls.destroy();
    }
  }, []);

  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden py-32 px-6">
      {/* HLS Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 brightness-50"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full text-center"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeUp(0)}
          className="text-5xl md:text-7xl font-sans font-bold mb-8"
        >
          Join the <span className="font-serif italic font-normal">loop.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(0.1)}
          className="text-xl text-white/50 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Start your morning with distilled intelligence. Join 10,000+ top readers today.
        </motion.p>

        {/* Email Form */}
        <motion.form 
          variants={fadeUp(0.2)}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="liquid-glass w-full px-6 py-4 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
            />
          </div>
          <button className="bg-white text-black font-bold px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all active:scale-[0.98]">
            Get Access
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default CTASection;
