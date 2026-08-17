import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/RevealOnScroll";
import { SkillGroup } from "./SkillGroup";
import { skills } from "@/content/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="border-b border-wire bg-surface/30">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading eyebrow="$ cat stack.json" title="Skills & stack" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
