import React from "react";
import Navbar from "@/components/public/Navbar";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Charities | Digital Heroes",
  description: "Explore the charities supported by the Digital Heroes platform.",
};

export default async function CharitiesPage() {
  const supabase = createClient();
  const { data: charities } = await supabase
    .from("charities")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true });

  return (
    <main className="bg-[#050507] text-[#f2f2f2] min-h-screen font-system-ui selection:bg-[#00d992]/30 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Causes We <span className="text-[#00d992]">Support</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto">
              Every subscription contributes to these amazing charities. You choose where your percentage goes, and we make sure it gets there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charities && charities.length > 0 ? (
              charities.map((charity) => (
                <div key={charity.id} className="group relative overflow-hidden rounded-2xl border border-[#3d3a39] bg-[#101010] flex flex-col hover:border-[#00d992]/50 transition-colors">
                  <div className="aspect-video w-full overflow-hidden bg-[#1a1a1c] relative">
                    {charity.logo_url ? (
                      <img 
                        src={charity.logo_url} 
                        alt={charity.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Heart className="w-12 h-12 text-[#3d3a39]" />
                      </div>
                    )}
                    {charity.is_featured && (
                      <div className="absolute top-4 left-4 bg-[#00d992] text-[#050507] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#00d992] transition-colors">{charity.name}</h3>
                    <p className="text-[#8b949e] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {charity.description || "No description available."}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-sm font-medium text-[#f2f2f2]">
                        <span className="text-[#00d992] font-bold">${(charity.total_contributions || 0).toLocaleString()}</span> raised
                      </div>
                      <Link 
                        href={`/signup?charity=${charity.id}`}
                        className="text-sm font-semibold text-[#050507] bg-[#f2f2f2] px-4 py-2 rounded-lg hover:bg-[#00d992] transition-colors"
                      >
                        Support
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-[#3d3a39] border-dashed rounded-2xl bg-[#0a0a0c]">
                <Heart className="w-12 h-12 text-[#3d3a39] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Charities Found</h3>
                <p className="text-[#8b949e]">We are currently updating our charity partners. Please check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-[#3d3a39] bg-[#0a0a0c] py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="border-t border-[#3d3a39] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#8b949e] text-sm">
              &copy; {new Date().getFullYear()} Digital Heroes. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#8b949e]">
              <span>Made with</span>
              <svg className="w-4 h-4 text-[#fb565b]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>for golfers and charities</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
