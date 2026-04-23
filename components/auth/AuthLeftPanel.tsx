"use client";

import { usePathname } from "next/navigation";

const AUTH_PANEL_META: Record<
  string,
  { label: string; headline: string[]; description: string }
> = {
  "/login": {
    label: "Welcome back",
    headline: ["Turn Your Golf Scores", "Into Charitable Impact"],
    description:
      "Sign in to track your scores, support charities, and enter monthly prize draws.",
  },
  "/signup": {
    label: "Get started",
    headline: ["Play Golf.", "Give Back. Win."],
    description:
      "Join thousands of golfers making a difference. Every round counts.",
  },
  "/forgot-password": {
    label: "Reset password",
    headline: ["We'll get you", "back in"],
    description: "Enter your email and we'll send you a link to reset your password.",
  },
  "/reset-password": {
    label: "New password",
    headline: ["Set a new", "password"],
    description: "Choose a strong password to secure your Digital Heroes account.",
  },
  "/verify-email": {
    label: "Verify email",
    headline: ["Check your", "inbox"],
    description: "We've sent a verification link. Click it to activate your account.",
  },
};

const DEFAULT_META = AUTH_PANEL_META["/login"];

/* VoltAgent themed auth panel */
export function AuthLeftPanel() {
  const pathname = usePathname();
  const meta = AUTH_PANEL_META[pathname] ?? DEFAULT_META;

  return (
    <div className="absolute inset-0 overflow-hidden font-sans isolate">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient - VoltAgent abyss */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #050507 0%, #0a0a0c 30%, #101010 60%, #050507 100%)",
          }}
        />

        {/* Emerald glow accents */}
        <div
          className="absolute w-[60%] aspect-square rounded-full blur-3xl opacity-20"
          style={{
            top: "10%",
            left: "-10%",
            background: "rgba(0, 217, 146, 0.5)",
          }}
        />
        <div
          className="absolute w-[50%] aspect-square rounded-full blur-3xl opacity-15"
          style={{
            top: "50%",
            right: "-5%",
            background: "rgba(0, 217, 146, 0.4)",
          }}
        />
        <div
          className="absolute w-[45%] aspect-square rounded-full blur-3xl opacity-10"
          style={{
            bottom: "10%",
            left: "20%",
            background: "rgba(47, 214, 161, 0.3)",
          }}
        />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #3d3a39 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-10 xl:px-16 py-12">
        {/* Label - top */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#00d992]"
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#00d992] whitespace-nowrap">
            {meta.label}
          </p>
        </div>

        {/* Headline + description - bottom */}
        <div>
          <h2 className="text-5xl xl:text-6xl 2xl:text-7xl font-normal text-[#f2f2f2] leading-[1.0] tracking-[-0.65px] font-system-ui">
            {meta.headline.map((line, i) => (
              <span key={i} className="block">
                {line.includes("Impact") || line.includes("Win") ? (
                  <span className="text-[#00d992]">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-sm text-sm xl:text-base text-[#b8b3b0] leading-relaxed">
            {meta.description}
          </p>
        </div>
      </div>
    </div>
  );
}
