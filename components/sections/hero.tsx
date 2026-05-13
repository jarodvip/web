import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getHero } from "@/lib/mdx";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { SocialLinks } from "@/components/ui/social-links";
import { mdxComponents } from "@/components/mdx/mdx-components";

/** Hero 首屏区域 */
export function HeroSection() {
  const { data, content } = getHero();

  return (
    <FadeInSection className="flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
      {/* 头像 */}
      {data.avatar && (
        <div className="mb-8 overflow-hidden rounded-full border-4 border-border shadow-xl">
          <Image
            src={data.avatar}
            alt={data.name}
            width={140}
            height={140}
            className="h-32 w-32 object-cover sm:h-36 sm:w-36"
            priority
          />
        </div>
      )}

      {/* 姓名 */}
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        {data.name}
      </h1>

      {/* 头衔 - 渐变文字 */}
      <p className="gradient-text mt-4 text-xl font-semibold sm:text-2xl">
        {data.title}
      </p>

      {/* 标语 */}
      <p className="mt-3 text-lg text-text-secondary">{data.slogan}</p>

      {/* MDX 个人简介 */}
      <div className="prose-custom mt-6 max-w-lg text-text-secondary">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {/* 社交链接 */}
      <div className="mt-8">
        <SocialLinks social={data.social} />
      </div>
    </FadeInSection>
  );
}