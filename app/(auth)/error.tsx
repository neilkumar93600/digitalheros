"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AuthError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Auth error:", error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 mx-auto rounded-full bg-[#fb565b]/10 flex items-center justify-center"
      >
        <AlertTriangle className="w-8 h-8 text-[#fb565b]" />
      </motion.div>

      {/* Error Message */}
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-[#f2f2f2] font-system-ui">Authentication Error</h1>
        <p className="text-sm text-[#8b949e]">
          We couldn&apos;t complete your request. Please try again.
        </p>
      </div>

      {/* Error Details (development only) */}
      {process.env.NODE_ENV === "development" && error.message && (
        <div className="p-3 rounded-lg bg-[#101010] border border-[#3d3a39] text-left overflow-auto">
          <p className="text-xs font-mono text-[#8b949e] break-all">
            {error.message}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={reset}
          className="w-full bg-[#00d992] text-[#050507] hover:bg-[#00ffaa]"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button
          variant="outline"
          asChild
          className="w-full border-[#3d3a39] bg-transparent text-[#f2f2f2] hover:bg-[#101010] hover:border-[#00d992] hover:text-[#00d992]"
        >
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
