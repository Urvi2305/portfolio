import Link from "next/link";
import { profile } from "@/content/profile";

const navLinks = [
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#awards", label: "awards" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-wire bg-void/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="#top" className="font-mono text-sm text-ink">
          <span className="text-signal">$</span> urvi_solanki
        </Link>
        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wider text-ink-muted sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-signal">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={profile.resumeHref}
          className="rounded-md border border-wire-strong px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-signal-dim hover:text-signal"
          target="_blank"
          rel="noopener noreferrer"
        >
          resume ↓
        </Link>
      </div>
    </header>
  );
}
