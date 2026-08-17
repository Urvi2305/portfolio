import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "primary", className, external }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-mono text-sm transition-colors duration-150";
  const styles =
    variant === "primary"
      ? "bg-signal text-void hover:bg-signal/90"
      : "border border-wire-strong text-ink hover:border-signal-dim hover:text-signal";

  return (
    <Link
      href={href}
      className={cn(base, styles, className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
