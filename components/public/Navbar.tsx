import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050507]/80 backdrop-blur-md border-b border-[#3d3a39]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#00d992]"
          >
            <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
          </svg>
          <span className="font-bold text-xl font-system-ui text-[#f2f2f2]">
            Digital Heroes
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#how-it-works" className="text-[#8b949e] hover:text-[#00d992] transition-colors">
            How It Works
          </Link>
          <Link href="#charities" className="text-[#8b949e] hover:text-[#00d992] transition-colors">
            Charities
          </Link>
          <Link href="#faq" className="text-[#8b949e] hover:text-[#00d992] transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-[#f2f2f2] hover:text-[#00d992] transition-colors">
            Log In
          </Link>
          <Link href="/signup">
            <Button className="bg-[#00d992] text-[#050507] hover:bg-[#00d992]/90 font-medium">
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
