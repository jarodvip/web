import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { HeroData, Skill, ProjectData, ExperienceData } from "./types";

const contentDir = path.join(process.cwd(), "content");

/** 读取 Hero 区内容 */
export function getHero(): { data: HeroData; content: string } {
  const filePath = path.join(contentDir, "hero.mdx");
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  return { data: data as HeroData, content };
}

/** 读取技能列表 */
export function getSkills(): Skill[] {
  const filePath = path.join(contentDir, "skills.mdx");
  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);
  return data.skills as Skill[];
}

/** 读取所有项目（按日期倒序） */
export function getProjects(): { data: ProjectData; content: string }[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((fileName) => {
    const source = fs.readFileSync(path.join(dir, fileName), "utf-8");
    const { data, content } = matter(source);
    return { data: data as ProjectData, content };
  });
  return projects.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** 读取所有经历（按开始日期倒序） */
export function getExperiences(): { data: ExperienceData; content: string }[] {
  const dir = path.join(contentDir, "experience");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const experiences = files.map((fileName) => {
    const source = fs.readFileSync(path.join(dir, fileName), "utf-8");
    const { data, content } = matter(source);
    return { data: data as ExperienceData, content };
  });
  return experiences.sort((a, b) => b.data.start.localeCompare(a.data.start));
}