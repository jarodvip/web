import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjects } from "@/lib/mdx";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionTitle } from "@/components/ui/section-title";
import { mdxComponents } from "@/components/mdx/mdx-components";

/** 项目展示区域 */
export function ProjectsSection() {
  const projects = getProjects();

  if (projects.length === 0) return null;

  return (
    <FadeInSection
      delay={0.1}
      className="bg-bg-secondary px-4 py-20 sm:px-8 lg:px-16"
    >
      <SectionTitle title="项目作品" subtitle="独立打造，精益求精" />

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        {projects.map(({ data, content }) => (
          <ProjectCard key={data.title} project={data}>
            <MDXRemote source={content} components={mdxComponents} />
          </ProjectCard>
        ))}
      </div>
    </FadeInSection>
  );
}