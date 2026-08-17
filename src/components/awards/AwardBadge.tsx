import { RevealItem } from "@/components/ui/RevealOnScroll";
import type { Award } from "@/content/types";

export function AwardBadge({ award }: { award: Award }) {
  return (
    <RevealItem className="rounded-lg border border-gold-dim/40 bg-surface p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold text-gold">{award.title}</h3>
        <span className="shrink-0 font-mono text-xs text-ink-faint">{award.period}</span>
      </div>
      <p className="mt-1 text-sm text-ink-muted">{award.org}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{award.description}</p>
    </RevealItem>
  );
}
