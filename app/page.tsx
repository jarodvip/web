import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { Footer } from "@/components/layout/footer";
import { getHero } from "@/lib/mdx";

// 延迟加载非首屏组件
const SkillsSection = dynamic(() => import("@/components/sections/skills").then(m => ({ default: m.SkillsSection })), {
  loading: () => <div className="h-32" />,
});

const ProjectsSection = dynamic(() => import("@/components/sections/projects").then(m => ({ default: m.ProjectsSection })), {
  loading: () => <div className="h-32" />,
});

const ExperienceSection = dynamic(() => import("@/components/sections/experience").then(m => ({ default: m.ExperienceSection })), {
  loading: () => <div className="h-32" />,
});

export default function Page() {
  const { data: heroData } = getHero();

  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
          }
        >
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
        </Suspense>
      </main>
      <Footer social={heroData.social} />
    </>
  );
}