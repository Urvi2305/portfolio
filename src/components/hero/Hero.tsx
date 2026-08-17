"use client";

import { m } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { TerminalIntro } from "./TerminalIntro";
import { StatusStrip } from "./StatusStrip";
import { TechStack } from "./TechStack";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-wire">
      <div className="absolute inset-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-void/60 to-void" />
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-12 px-6 pb-20 pt-28 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm text-gold"
          >
            {profile.title}
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
          >
            {profile.name}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {profile.tagline}
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-7"
          >
            <StatusStrip />
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-5"
          >
            <TechStack />
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="#projects">view systems built ↓</Button>
            <Button href={`mailto:${profile.email}`} variant="ghost">
              get in touch
            </Button>
          </m.div>
        </div>

        <TerminalIntro />
      </div>
    </section>
  );
}
