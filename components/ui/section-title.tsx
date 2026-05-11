interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

/** 区块标题，带渐变下划线 */
export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-accent" />
      {subtitle && (
        <p className="mt-4 text-text-secondary max-w-lg mx-auto">{subtitle}</p>
      )}
    </div>
  );
}