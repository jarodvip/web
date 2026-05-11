import { getSkills } from "@/lib/mdx";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { SkillTag } from "@/components/ui/skill-tag";
import { SectionTitle } from "@/components/ui/section-title";

/** 技能标签云区域 */
export function SkillsSection() {
  const skills = getSkills();

  // 按分类分组
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return (
    <FadeInSection
      delay={0.1}
      className="px-4 py-20 sm:px-8 lg:px-16"
    >
      <SectionTitle title="技术栈" subtitle="持续学习，不断精进" />

      <div className="mx-auto max-w-3xl space-y-8">
        {Object.entries(grouped).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {categorySkills.map((skill) => (
                <SkillTag key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}