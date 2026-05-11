import { GitBranch, X, Mail, Globe } from "lucide-react";
import type { HeroData } from "@/lib/types";

interface SocialLinksProps {
  social: HeroData["social"];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GitBranch,
  twitter: X,
  email: Mail,
  blog: Globe,
};

/** 社交链接图标组 */
export function SocialLinks({ social }: SocialLinksProps) {
  const entries = Object.entries(social).filter(([, url]) => url);

  if (entries.length === 0) return null;

  return (
    <div className="flex gap-4">
      {entries.map(([key, url]) => {
        const Icon = iconMap[key];
        if (!Icon) return null;

        const href =
          key === "email" ? `mailto:${url}` : url;

        return (
          <a
            key={key}
            href={href!}
            target={key === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={key}
            className="rounded-full p-2 text-text-secondary transition-colors hover:bg-accent-light hover:text-accent"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}