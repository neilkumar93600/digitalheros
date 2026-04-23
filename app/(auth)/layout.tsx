import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#050507]">
      {/* Left column — VoltAgent styled panel */}
      <div className="relative hidden shrink-0 flex-col justify-center overflow-hidden rounded-r-3xl border-r border-[#3d3a39] lg:flex lg:w-[55%]">
        <AuthLeftPanel />
      </div>

      {/* Right column — auth form */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-[#050507]">
        <div className="w-full max-w-md px-2">
          {children}
        </div>
      </div>
    </div>
  );
}
