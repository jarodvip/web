import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/** MDX 自定义渲染组件，保持整体风格一致 */
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-6 mb-3 text-2xl font-bold text-text-primary">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-5 mb-2 text-xl font-semibold text-text-primary">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 mb-2 text-lg font-semibold text-text-primary">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 list-inside list-disc space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 list-inside list-decimal space-y-1">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      target="_blank"
      className="text-accent underline underline-offset-2 hover:no-underline"
    >
      {children}
    </Link>
  ),
  code: ({ children }) => (
    <code className="rounded bg-accent-light px-1.5 py-0.5 font-mono text-sm text-accent">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-3 overflow-x-auto rounded-lg bg-bg-secondary p-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-3 border-accent pl-4 italic text-text-secondary">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
};