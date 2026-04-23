import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dashboard" | "admin";
}

export function AppShell({
  children,
  className,
  variant = "default",
}: AppShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col",
        variant === "dashboard" && "lg:flex-row",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AppShellHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShellHeader({ children, className }: AppShellHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {children}
    </header>
  );
}

interface AppShellMainProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShellMain({ children, className }: AppShellMainProps) {
  return (
    <main className={cn("flex-1", className)}>{children}</main>
  );
}

interface AppShellSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShellSidebar({
  children,
  className,
}: AppShellSidebarProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-muted/10",
        className
      )}
    >
      {children}
    </aside>
  );
}
