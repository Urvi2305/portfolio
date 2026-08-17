import { RevealItem } from "@/components/ui/RevealOnScroll";
import type { SkillGroup as SkillGroupType } from "@/content/types";

export function SkillGroup({ group }: { group: SkillGroupType }) {
  return (
    <RevealItem className="rounded-lg border border-wire bg-surface p-5">
      <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
        {group.category}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-wire-strong px-2.5 py-1 text-xs text-ink-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </RevealItem>
  );
}
