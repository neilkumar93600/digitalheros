"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { authService as supabaseAuth } from "@/lib/supabase/services/auth";
import { useAuthStore } from "@/lib/stores/auth-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const message = searchParams.get("message");
  const urlError = searchParams.get("error");
  const initialError = urlError && message ? message : urlError ?? null;

  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  function validate(): boolean {
    const err: { email?: string; password?: string } = {};
    if (!email) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = "Please enter a valid email";
    if (!password) err.password = "Password is required";
    setFieldErrors(err);
    return Object.keys(err).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await supabaseAuth.signIn(email, password);
      if (data?.user) setUser(data.user);
      router.push(next);
      router.refresh();
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Invalid email or password. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    await supabaseAuth.signInWithOAuth("google");
  }

  return (
    <>
      {/* Logo */}
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

      <h1 className="text-3xl font-bold tracking-tight text-[#f2f2f2] text-center font-system-ui">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-[#b8b3b0] text-center">
        Sign in to your account to continue
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {message && !urlError && (
          <p className="text-sm text-[#00d992] bg-[#00d992]/10 rounded-lg p-3">
            {message}
          </p>
        )}
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
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="h-11 rounded-lg bg-[#101010] border-[#3d3a39] text-[#f2f2f2] placeholder:text-[#8b949e] focus:border-[#00d992] focus:ring-[#00d992]/20"
          />
          {fieldErrors.email && (
            <p className="text-sm text-[#fb565b]">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#f2f2f2]">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
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
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#3d3a39] bg-[#101010] text-[#00d992] focus:ring-[#00d992]/50"
            />
            <span className="text-sm text-[#8b949e]">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-[#00d992] hover:text-[#00ffaa] hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-lg bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] text-sm font-semibold mt-2 transition-colors"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-lg border-[#3d3a39] bg-transparent text-[#f2f2f2] text-sm font-medium hover:bg-[#101010] hover:border-[#00d992] transition-all"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          <svg className="size-5 mr-2" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[#8b949e]">
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#00d992] font-semibold hover:text-[#00ffaa] hover:underline transition-colors">
          Sign up for free
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-[#8b949e] text-center py-8">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
