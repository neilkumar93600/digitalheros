'use client';

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WordsPullUp } from "@/components/animations/WordsPullUp";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Monthly Hero",
      price: "$10",
      interval: "/month",
      description: "Join the community, track your progress, and support charities.",
      features: [
        "5 entries to the monthly draw",
        "Track up to 5 rolling golf scores",
        "Support your chosen charity",
        "Full dashboard access",
        "Email notifications for draws"
      ],
      buttonText: "Subscribe Monthly",
      isPopular: false,
    },
    {
      name: "Annual Legend",
      price: "$100",
      interval: "/year",
      description: "Get 2 months free and maximize your impact.",
      features: [
        "Everything in Monthly",
        "2 months free (save $20)",
        "Priority charity selection",
        "Exclusive yearly contributor badge",
        "Priority support"
      ],
      buttonText: "Subscribe Annually",
      isPopular: true,
    }
  ];

  return (
    <section id="pricing" className="py-32 px-4 border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm tracking-widest uppercase text-primary/40 mb-4 block">/ Membership</span>
          <WordsPullUp 
            text="Choose Your Impact"
            className="text-4xl md:text-6xl font-light mb-6 justify-center"
          />
          <p className="text-primary/60 font-light text-lg">
            Simple, transparent pricing. A portion of every subscription goes directly to the prize pool and your chosen charities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-[#101010] rounded-3xl p-10 border ${plan.isPopular ? 'border-primary/30 relative' : 'border-primary/10'} flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-xs font-bold tracking-widest uppercase rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-light mb-2">{plan.name}</h3>
              <p className="text-primary/50 text-sm font-light mb-8 h-10">{plan.description}</p>
              
              <div className="mb-8 pb-8 border-b border-primary/10">
                <span className="text-5xl font-serif italic">{plan.price}</span>
                <span className="text-primary/40 font-light ml-2">{plan.interval}</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start text-primary/70 font-light text-sm">
                    <Check className="w-5 h-5 text-primary/40 mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/signup" className="w-full">
                <button className={`w-full py-4 rounded-xl text-sm tracking-widest uppercase font-medium transition-colors ${plan.isPopular ? 'bg-primary text-black hover:bg-primary/90' : 'bg-[#212121] text-primary hover:bg-[#313131]'}`}>
                  {plan.buttonText}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
