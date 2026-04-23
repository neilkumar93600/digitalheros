"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"
import { BlurText } from "../animations/BlurText"

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-visible bg-black">
      {/* Background Video */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 z-0 h-auto w-full object-contain opacity-60"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-0 bg-black/50" />

        {/* Bottom Gradient Fade */}
        <div className="absolute right-0 bottom-0 left-0 z-0 h-[300px] bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-8 pt-[150px] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="liquid-glass mb-8 flex items-center gap-3 rounded-full px-1 py-1 pr-4"
        >
          <span className="rounded-full bg-[#00d992] px-3 py-1 text-[10px] font-bold tracking-wider text-[#050507] uppercase">
            Live
          </span>
          <span className="font-body text-xs tracking-wide text-white/80">
            Spring Tournament 2026 is now open for registration.
          </span>
        </motion.div>

        <h1 className="mb-8">
          <BlurText
            text="Compete. Score. Make a Difference."
            className="font-heading text-6xl leading-[0.85] tracking-[-3px] text-white italic md:text-7xl lg:text-[5rem]"
            delay={100}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mb-12 max-w-xl font-body text-sm leading-tight font-light text-white/70 md:text-base"
        >
          Track your golf scores. Climb the leaderboard. Every swing contributes
          to charities across America. This is the game, wildly reimagined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 sm:flex-row"
        >
          <button className="liquid-glass-strong group flex items-center gap-2 rounded-full px-5 py-2.5 text-white transition-all hover:scale-105 active:scale-95">
            <span className="font-medium tracking-wide">Enter Leaderboard</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button className="group flex items-center gap-3 text-white/90 transition-colors hover:text-[#00d992]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors group-hover:bg-[#00d992]/10">
              <Play className="h-4 w-4 fill-current" />
            </div>
            <span className="font-body text-sm font-medium tracking-wide">
              Watch Highlights
            </span>
          </button>
        </motion.div>

        {/* Stats Bar */}
        <div className="mt-auto flex flex-col items-center gap-8 pt-16 pb-8">
          <div className="liquid-glass rounded-full border border-white/5 px-6 py-2 font-body text-[10px] tracking-[0.2em] text-white/40 uppercase">
            Trusted by 2,400+ golfers across 38 states
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale transition-all duration-700 hover:grayscale-0 md:gap-16">
            {["PGA", "LPGA", "USGA", " Augusta", "Pebble Beach"].map(
              (partner) => (
                <span
                  key={partner}
                  className="font-heading text-2xl text-white italic transition-opacity hover:opacity-100 md:text-3xl"
                >
                  {partner}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
