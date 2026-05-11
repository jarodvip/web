import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { Footer } from "@/components/layout/footer";
import { getHero } from "@/lib/mdx";

export default function Page() {
  // 获取 Hero 数据以复用社交链接到 Footer
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