import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-wire">
      <div className="mx-auto max-w-5xl px-6 py-8 font-mono text-xs text-ink-faint">
        <p>
          © {year} {profile.name} · built with Next.js, Tailwind, and Framer Motion
        </p>
      </div>
    </footer>
  );
}
