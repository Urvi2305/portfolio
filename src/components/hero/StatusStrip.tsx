import { Badge } from "@/components/ui/Badge";
import { profile } from "@/content/profile";

export function StatusStrip() {
  return (
    <div className="flex flex-wrap gap-2">
      {profile.status.map((s) => (
        <Badge key={s.label} tone={s.tone === "signal" ? "signal" : "neutral"}>
          <span
            className={
              s.tone === "signal"
                ? "h-1.5 w-1.5 rounded-full bg-signal"
                : "h-1.5 w-1.5 rounded-full bg-ink-faint"
            }
          />
          {s.label}
        </Badge>
      ))}
    </div>
  );
}
