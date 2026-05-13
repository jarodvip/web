import type { Skill } from "@/lib/types";

interface SkillTagProps {
  skill: Skill;
}

/** 单个技能标签 */
export function SkillTag({ skill }: SkillTagProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent hover:text-accent">
      <span className="text-xs text-text-secondary">{skill.category}</span>
      <span>{skill.name}</span>
    </span>
  );
}