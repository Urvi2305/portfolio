"use client";

import { m } from "framer-motion";
import { profile } from "@/content/profile";

export function TerminalIntro() {
  return (
    <m.div
      className="rounded-lg border border-wire bg-surface/70 p-4 font-mono text-[13px] leading-relaxed text-ink-muted shadow-2xl shadow-black/40 backdrop-blur sm:text-sm"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
      }}
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-alert/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        <span className="ml-2 text-[11px] text-ink-faint">career.sh</span>
      </div>
      {profile.bootLines.map((line, i) => (
        <m.p
          key={i}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          className={line.startsWith("$") ? "text-signal" : "pl-4 text-ink"}
        >
          {line}
        </m.p>
      ))}
      <m.span
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        className="mt-1 inline-block h-4 w-2 animate-pulse bg-signal/80 align-middle"
      />
    </m.div>
  );
}
