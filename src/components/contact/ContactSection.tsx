import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";

export function ContactSection() {
  return (
    <section id="contact" className="bg-surface/30">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-wider text-signal">
            $ contact --schedule-call
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Let&rsquo;s build something reliable together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Open to remote roles worldwide, and to relocating for the right team. Based in{" "}
            {profile.location} happy to work across time zones.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={`mailto:${profile.email}`}>{profile.email}</Button>
            <Button href={profile.linkedin} variant="ghost" external>
              LinkedIn ↗
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
