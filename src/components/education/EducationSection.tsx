import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { education, languages } from "@/content/education";

export function EducationSection() {
  return (
    <section className="border-b border-wire">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <RevealOnScroll className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">Education</p>
            <p className="mt-2 font-semibold text-ink">{education.degree}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {education.school} · {education.gpa}
            </p>
            <p className="mt-1 font-mono text-xs text-ink-faint">{education.period}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">Languages</p>
            <p className="mt-2 text-sm text-ink-muted">
              {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
