import { createClient } from "@/lib/supabase/server";
import { ExternalLink, Heart } from "lucide-react";
import Link from "next/link";
import { WordsPullUp } from "@/components/animations/WordsPullUp";

export default async function CharityShowcase() {
  const supabase = await createClient();
  
  // Get featured charities
  const { data: charities } = await supabase
    .from("charities")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .limit(3);

  return (
    <section id="charities" className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(222,219,200,0.02)_0%,transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="text-sm tracking-widest uppercase text-primary/40 mb-4 block">/ Partners</span>
            <WordsPullUp 
              text="Our Heroic Partners"
              className="text-4xl md:text-6xl font-light"
            />
          </div>
          <Link href="/signup">
            <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-transparent border border-primary/20 text-primary rounded-full overflow-hidden transition-all hover:border-primary">
              <span className="relative z-10 font-medium tracking-wide uppercase text-xs">
                View All Charities
              </span>
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {charities && charities.length > 0 ? (
            charities.map((charity) => (
              <div key={charity.id} className="bg-[#101010] rounded-2xl overflow-hidden border border-primary/10 group flex flex-col hover:border-primary/30 transition-colors">
                <div className="h-48 bg-black relative overflow-hidden">
                  {charity.logo_url ? (
                    <img src={charity.logo_url} alt={charity.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/20">
                      <Heart strokeWidth={1} className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-primary/20 rounded-full text-xs tracking-widest uppercase text-primary/80">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-light text-primary mb-4">{charity.name}</h3>
                  <p className="text-primary/50 mb-8 font-light leading-relaxed flex-1">
                    {charity.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-primary/10">
                    <div className="text-sm tracking-widest uppercase">
                      <span className="text-primary/40">Supported by </span>
                      <span className="text-primary/80 font-medium">Digital Heroes</span>
                    </div>
                    {charity.website && (
                      <a href={charity.website} target="_blank" rel="noreferrer" className="text-primary/40 hover:text-primary transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20 text-primary/40 font-light border border-primary/10 rounded-2xl bg-[#101010]/50 backdrop-blur-sm">
              <Heart strokeWidth={1} className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No featured charities found. Admins can add them in the dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
