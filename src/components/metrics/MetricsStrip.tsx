import { RevealGroup } from "@/components/ui/RevealOnScroll";
import { MetricTile } from "./MetricTile";
import { metrics } from "@/content/metrics";

export function MetricsStrip() {
  return (
    <section className="border-b border-wire bg-void">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric) => (
            <MetricTile key={metric.id} metric={metric} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
