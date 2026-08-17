import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealItem } from "@/components/ui/RevealOnScroll";
import type { Metric } from "@/content/types";

export function MetricTile({ metric }: { metric: Metric }) {
  return (
    <RevealItem className="rounded-lg border border-wire bg-surface p-5">
      <AnimatedCounter
        value={metric.value}
        prefix={metric.prefix}
        suffix={metric.suffix}
        className="font-mono text-3xl font-semibold text-signal sm:text-4xl"
      />
      <p className="mt-2 text-sm font-medium text-ink">{metric.label}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-faint">{metric.detail}</p>
    </RevealItem>
  );
}
