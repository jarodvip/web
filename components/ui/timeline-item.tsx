"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { ExperienceData } from "@/lib/types";

interface TimelineItemProps {
  experience: ExperienceData;
  index: number;
  children?: React.ReactNode;
}

/** 时间线条目（左右交替出现） */
export function TimelineItem({
  experience,
  index,
  children,
}: TimelineItemProps) {
  const isLeft = index % 2 === 0;
  const Icon = experience.type === "education" ? GraduationCap : Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className={`relative flex items-start gap-6 ${
        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
      }`}
    >
      {/* 时间线节点 */}
      <div className="relative flex shrink-0 flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-bg-primary text-accent shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        {/* 连接线 */}
        <div className="mt-1 h-full w-px bg-accent/20" />
      </div>

      {/* 内容卡片 */}
      <div className="flex-1 rounded-xl border border-glass-border bg-glass-bg p-5 backdrop-blur-sm sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-text-primary">
            {experience.role}
          </h3>
          <span className="text-sm text-text-secondary">
            {experience.start} — {experience.end}
          </span>
        </div>
        <p className="mt-0.5 text-sm font-medium text-accent">
          {experience.company}
        </p>
        {children && (
          <div className="prose-custom mt-3 text-sm text-text-secondary">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}