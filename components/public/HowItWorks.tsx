'use client';

import { motion } from "framer-motion";
import { CheckCircle2, Ticket, Heart, Trophy } from "lucide-react";
import { WordsPullUp } from "@/components/animations/WordsPullUp";

export default function HowItWorks() {
  const steps = [
    {
      title: "Subscribe & Support",
      description: "Sign up for a monthly subscription. Choose the charity you want to support with a portion of your contribution.",
      icon: <Heart className="w-5 h-5 text-primary/80" />,
    },
    {
      title: "Get Your Numbers",
      description: "As a Digital Hero, you get 5 numbers every month for the grand prize draw based on your performance.",
      icon: <Ticket className="w-5 h-5 text-primary/80" />,
    },
    {
      title: "The Monthly Draw",
      description: "On the 1st of every month, 5 winning numbers are drawn. The more numbers you match, the more you win.",
      icon: <Trophy className="w-5 h-5 text-primary/80" />,
    },
    {
      title: "Everyone Wins",
      description: "Even if you don't match the numbers, your contribution helps fund life-changing charity projects globally.",
      icon: <CheckCircle2 className="w-5 h-5 text-primary/80" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-sm tracking-widest uppercase text-primary/40 mb-4 block">/ Process</span>
            <WordsPullUp 
              text="How It Works"
              className="text-4xl md:text-6xl font-light"
            />
          </div>
          <p className="text-primary/60 max-w-md font-light">
            A simple, transparent way to give to charity while getting a chance to win life-changing prizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#212121] rounded-2xl p-8 border border-primary/5 group hover:border-primary/20 transition-colors relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-black/50 border border-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-light mb-4">{step.title}</h3>
              <p className="text-primary/50 leading-relaxed font-light relative z-10">
                {step.description}
              </p>
              
              <div className="absolute -bottom-4 -right-4 text-8xl font-serif italic text-primary/[0.03] pointer-events-none group-hover:text-primary/[0.08] transition-colors">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
