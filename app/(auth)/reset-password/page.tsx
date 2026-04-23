"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { authService as supabaseAuth } from "@/lib/supabase/services/auth";
import { getSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Session } from "@supabase/supabase-js";

const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Contains lowercase", test: (p: string) => /[a-z]/.test(p) },
  { label: "Contains number", test: (p: string) => /[0-9]/.test(p) },
];

const LogoBlock = () => (
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
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const supabase = getSupabaseClient();
      const {
        data: { session },
      } = (await supabase.auth.getSession()) as { data: { session: Session | null } };
      setHasSession(!!session);
      if (!session) setTokenExpired(true);
    };
    check();
  }, []);

  function validate(): boolean {
    const err: { password?: string; confirmPassword?: string } = {};
    if (!password) err.password = "Password is required";
    else if (password.length < 8) err.password = "Password must be at least 8 characters";
    if (!confirmPassword) err.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) err.confirmPassword = "Passwords do not match";
    setFieldErrors(err);
    return Object.keys(err).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validate() || !hasSession) {
      if (!hasSession) setTokenExpired(true);
      return;
    }

    setLoading(true);
    try {
      await supabaseAuth.updatePassword(password);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to reset password. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (hasSession === null) {
    return (
      <>
        <LogoBlock />
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d992]/10 mb-6">
            <Loader2 className="w-8 h-8 text-[#00d992] animate-spin" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#f2f2f2] mb-2 font-system-ui">Loading...</h1>
          <p className="text-sm text-[#8b949e]">Checking your reset link.</p>
        </div>
      </>
    );
  }

  if (tokenExpired) {
    return (
      <>
        <LogoBlock />
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ffba00]/10 mb-6">
            <AlertTriangle className="w-8 h-8 text-[#ffba00]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#f2f2f2] mb-2 font-system-ui">
            Link expired
          </h1>
          <p className="text-sm text-[#8b949e] mb-6">
            This password reset link has expired. Please request a new one.
          </p>
          <Button asChild className="w-full h-12 rounded-lg bg-[#00d992] text-[#050507] hover:bg-[#00ffaa]">
            <Link href="/forgot-password">Request new link</Link>
          </Button>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <LogoBlock />
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d992]/10 mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#00d992]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#f2f2f2] mb-2 font-system-ui">
            Password reset successful
          </h1>
          <p className="text-sm text-[#8b949e] mb-6">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <Button
            asChild
            className="w-full h-12 rounded-lg bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] text-sm font-semibold"
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <LogoBlock />

      <h1 className="text-3xl font-bold tracking-tight text-[#f2f2f2] text-center font-system-ui">
        Create new password
      </h1>
      <p className="mt-2 text-sm text-[#b8b3b0] text-center">
        Enter your new password below. Use at least 8 characters.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="text-sm text-[#fb565b] bg-[#fb565b]/10 rounded-lg p-3">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#f2f2f2]">New password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="h-11 rounded-lg bg-[#101010] border-[#3d3a39] text-[#f2f2f2] placeholder:text-[#8b949e] focus:border-[#00d992] focus:ring-[#00d992]/20 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#f2f2f2] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-sm text-[#fb565b]">{fieldErrors.password}</p>
          )}
          {password && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {PASSWORD_REQUIREMENTS.map((req) => (
                <div
                  key={req.label}
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    req.test(password) ? "text-[#00d992]" : "text-[#8b949e]"
                  )}
                >
                  {req.test(password) ? (
                    <Check className="size-3" />
                  ) : (
                    <span className="size-3 rounded-full border border-[#3d3a39]" />
                  )}
                  {req.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[#f2f2f2]">Confirm new password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="h-11 rounded-lg bg-[#101010] border-[#3d3a39] text-[#f2f2f2] placeholder:text-[#8b949e] focus:border-[#00d992] focus:ring-[#00d992]/20 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#f2f2f2] transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-[#fb565b]">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-lg bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] text-sm font-semibold transition-colors"
          disabled={loading}
        >
          {loading ? "Updating..." : "Reset password"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[#8b949e]">
        <Link href="/login" className="text-[#00d992] font-semibold hover:text-[#00ffaa] hover:underline transition-colors">
          Back to sign in
        </Link>
      </p>
    </>
  );
}
