import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/RevealOnScroll";
import { AwardBadge } from "./AwardBadge";
import { awards } from "@/content/awards";

export function AwardsSection() {
  return (
    <section id="awards" className="border-b border-wire">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading eyebrow="$ cat awards.log" title="Recognition" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {awards.map((award, i) => (
            <AwardBadge key={i} award={award} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
