import { profile } from "@/content/profile";

export function TechStack() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-xs text-ink-faint">$ stack</span>
      {profile.coreStack.map((tech) => (
        <span
          key={tech}
          className="rounded-md border border-wire-strong px-2 py-1 font-mono text-[11px] text-ink-muted"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
