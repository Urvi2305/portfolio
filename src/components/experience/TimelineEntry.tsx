import { RevealItem } from "@/components/ui/RevealOnScroll";
import type { Job } from "@/content/types";

export function TimelineEntry({ job, isCurrent }: { job: Job; isCurrent: boolean }) {
  return (
    <RevealItem className="relative pb-12 pl-8 last:pb-0">
      <span
        className={
          "absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 " +
          (isCurrent ? "border-signal bg-signal" : "border-wire-strong bg-void")
        }
      />
      <span className="absolute left-0 top-4 bottom-0 w-px -translate-x-1/2 bg-wire" />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-semibold text-ink">{job.role}</h3>
        <span className="text-ink-muted">· {job.company}</span>
      </div>
      <p className="mt-1 font-mono text-xs text-ink-faint">
        {job.start} → {job.end === "present" ? "present" : job.end} · {job.location}
      </p>
      <p className="mt-1 font-mono text-xs text-gold">{job.domain}</p>

      <ul className="mt-4 space-y-2">
        {job.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-wire-strong" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </RevealItem>
  );
}
