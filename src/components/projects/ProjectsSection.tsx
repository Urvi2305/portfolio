import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-wire bg-surface/30">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="$ ls -la systems/" title="Systems I've built" />
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
