import { cn } from "@/lib/utils";

const toneStyles = {
  neutral: "border-wire-strong text-ink-muted",
  signal: "border-signal-dim text-signal",
  gold: "border-gold-dim text-gold",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneStyles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
