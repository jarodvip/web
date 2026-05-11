import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="gradient-text text-8xl font-extrabold">404</h1>
      <p className="mt-4 text-xl text-text-secondary">
        这个页面不存在哦
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        返回首页
      </Link>
    </div>
  );
}