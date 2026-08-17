import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { KafkaDispatchDiagram } from "./diagrams/KafkaDispatchDiagram";
import { PaymentOrchestrationDiagram } from "./diagrams/PaymentOrchestrationDiagram";
import { PricingBroadcastDiagram } from "./diagrams/PricingBroadcastDiagram";
import { BookingSplitPaymentDiagram } from "./diagrams/BookingSplitPaymentDiagram";
import type { DiagramKey, Project } from "@/content/types";

const diagramComponents: Record<DiagramKey, React.ComponentType> = {
  "kafka-dispatch": KafkaDispatchDiagram,
  "payment-orchestration": PaymentOrchestrationDiagram,
  "pricing-broadcast": PricingBroadcastDiagram,
  "booking-split-payment": BookingSplitPaymentDiagram,
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <RevealOnScroll className="rounded-xl border border-wire bg-surface/60 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
        <span className="font-mono text-xs text-ink-faint">{project.period}</span>
      </div>
      <p className="mt-1 text-sm text-gold">{project.company}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{project.summary}</p>

      <ul className="mt-5 space-y-2">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-wire-strong px-2.5 py-1 font-mono text-[11px] text-ink-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.diagrams && project.diagrams.length > 0 && (
        <div className="mt-6 space-y-4">
          {project.diagrams.map((key) => {
            const Diagram = diagramComponents[key];
            return <Diagram key={key} />;
          })}
        </div>
      )}
    </RevealOnScroll>
  );
}
