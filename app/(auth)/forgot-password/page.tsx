"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { authService as supabaseAuth } from "@/lib/supabase/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await supabaseAuth.resetPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <div className="flex items-center justify-center gap-2 mb-10">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#00d992]"
          >
            <path
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
              fill="currentColor"
            />
          </svg>
          <span className="text-lg font-semibold text-[#f2f2f2] font-system-ui">Digital Heroes</span>
        </div>
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d992]/10 mb-6">
            <Mail className="w-8 h-8 text-[#00d992]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#f2f2f2] mb-2 font-system-ui">
            Check your email
          </h1>
          <p className="text-sm text-[#b8b3b0] mb-6">
            If an account exists for <strong className="text-[#f2f2f2]">{email}</strong>, you'll receive a password reset
            link shortly.
          </p>
          <p className="text-sm text-[#8b949e] mb-6">
            The link will expire in 1 hour for security.
          </p>
          <Button asChild variant="outline" className="rounded-lg h-11 border-[#3d3a39] bg-transparent text-[#f2f2f2] hover:bg-[#101010] hover:border-[#00d992]">
            <Link href="/login" className="inline-flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to sign in
            </Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-10">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#00d992]"
        >
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            fill="currentColor"
          />
        </svg>
        <span className="text-lg font-semibold text-[#f2f2f2] font-system-ui">Digital Heroes</span>
      </div>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-[#8b949e] hover:text-[#00d992] mb-6 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-[#f2f2f2] text-center font-system-ui">
        Reset your password
      </h1>
      <p className="mt-2 text-sm text-[#b8b3b0] text-center">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="text-sm text-[#fb565b] bg-[#fb565b]/10 rounded-lg p-3">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#f2f2f2]">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            disabled={loading}
            className="h-11 rounded-lg bg-[#101010] border-[#3d3a39] text-[#f2f2f2] placeholder:text-[#8b949e] focus:border-[#00d992] focus:ring-[#00d992]/20"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-lg bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] text-sm font-semibold transition-colors"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[#8b949e]">
        Remember your password?{" "}
        <Link href="/login" className="text-[#00d992] font-semibold hover:text-[#00ffaa] hover:underline transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}
