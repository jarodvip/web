"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import type { ProjectData } from "@/lib/types";

interface ProjectCardProps {
  project: ProjectData;
  children?: React.ReactNode;
}

/** 项目展示卡片 */
export function ProjectCard({ project, children }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-secondary p-6 transition-shadow hover:shadow-xl sm:p-8"
    >
      {/* 右上角渐变角标 */}
      {project.featured && (
        <div className="absolute right-0 top-0 rounded-bl-xl bg-accent px-3 py-1 text-xs font-medium text-white">
          精选
        </div>
      )}

      {/* 日期 */}
      <time className="text-sm text-text-secondary">{project.date}</time>

      {/* 标题 */}
      <h3 className="mt-2 text-xl font-bold text-text-primary">{project.title}</h3>

      {/* 描述 */}
      <p className="mt-2 text-text-secondary leading-relaxed">
        {project.description}
      </p>

      {/* MDX 正文 */}
      {children && (
        <div className="prose-custom mt-4 text-sm text-text-secondary">
          {children}
        </div>
      )}

      {/* 标签 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 链接 */}
      <div className="mt-5 flex gap-4">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            访问项目
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            <GitBranch className="h-4 w-4" />
            源代码
          </a>
        )}
      </div>
    </motion.article>
  );
}