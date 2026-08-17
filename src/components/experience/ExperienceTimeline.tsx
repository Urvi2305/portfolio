import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/RevealOnScroll";
import { TimelineEntry } from "./TimelineEntry";
import { experience } from "@/content/experience";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="border-b border-wire">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading eyebrow="$ git log --author=urvi --oneline" title="Experience" />
        <RevealGroup stagger={0.1}>
          {experience.map((job, i) => (
            <TimelineEntry key={job.id} job={job} isCurrent={i === 0} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
