import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="w-48 h-8 bg-[#101010]" />
        <Skeleton className="w-64 h-5 bg-[#101010]" />
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Skeleton className="w-16 h-4 bg-[#101010]" />
          <Skeleton className="w-full h-12 rounded-lg bg-[#101010]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-4 bg-[#101010]" />
          <Skeleton className="w-full h-12 rounded-lg bg-[#101010]" />
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Skeleton className="w-28 h-4 bg-[#101010]" />
        <Skeleton className="w-32 h-4 bg-[#101010]" />
      </div>

      {/* Submit Button */}
      <Skeleton className="w-full h-12 rounded-lg bg-[#101010]" />

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#3d3a39]" />
        </div>
        <div className="relative flex justify-center">
          <Skeleton className="w-32 h-4 bg-[#050507]" />
        </div>
      </div>

      {/* Social Auth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-11 rounded-lg bg-[#101010]" />
        <Skeleton className="h-11 rounded-lg bg-[#101010]" />
      </div>

      {/* Sign Up Link */}
      <div className="flex justify-center">
        <Skeleton className="w-48 h-4 bg-[#101010]" />
      </div>
    </div>
  );
}
