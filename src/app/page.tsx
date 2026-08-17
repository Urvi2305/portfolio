import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { MetricsStrip } from "@/components/metrics/MetricsStrip";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { AwardsSection } from "@/components/awards/AwardsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <MetricsStrip />
        <ExperienceTimeline />
        <ProjectsSection />
        <SkillsSection />
        <AwardsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
