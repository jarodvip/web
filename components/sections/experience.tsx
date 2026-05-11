import { MDXRemote } from "next-mdx-remote/rsc";
import { getExperiences } from "@/lib/mdx";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { TimelineItem } from "@/components/ui/timeline-item";
import { SectionTitle } from "@/components/ui/section-title";
import { mdxComponents } from "@/components/mdx/mdx-components";

/** 经历时间线区域 */
export function ExperienceSection() {
  const experiences = getExperiences();

  if (experiences.length === 0) return null;

  return (
    <FadeInSection
      delay={0.1}
      className="px-4 py-20 sm:px-8 lg:px-16"
    >
      <SectionTitle title="工作经历" subtitle="一路走来的成长轨迹" />

      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-8">
          {experiences.map(({ data, content }, index) => (
            <TimelineItem
              key={`${data.company}-${data.start}`}
              experience={data}
              index={index}
            >
              <MDXRemote source={content} components={mdxComponents} />
            </TimelineItem>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}