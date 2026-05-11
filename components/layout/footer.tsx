import { SocialLinks } from "@/components/ui/social-links";
import type { HeroData } from "@/lib/types";

interface FooterProps {
  social: HeroData["social"];
}

/** 页面底部 */
export function Footer({ social }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-glass-border bg-bg-secondary px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-text-secondary">
          &copy; {year} Jarod. All rights reserved.
        </p>
        <SocialLinks social={social} />
      </div>
    </footer>
  );
}