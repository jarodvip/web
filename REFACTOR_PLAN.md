# Jarod Portfolio 前端重构计划

**目标：** 高保真、像素级、响应速度快（<1s 首屏）  
**设计系统：** Minimal & Direct  
**技术栈：** Next.js 16.2.6 + React 19.2.4 + Tailwind CSS 4  

---

## 📋 现状分析（Phase 0）

### 当前系统清单
| 项目 | 现状 | 评估 |
|------|------|------|
| **Next.js** | 16.2.6（最新） | ✅ 已优化 |
| **React** | 19.2.4 | ✅ 已优化 |
| **样式** | Tailwind CSS 4 + 毛玻璃 | ⚠️ 毛玻璃 (backdrop-filter) 影响性能 |
| **字体** | Geist (Google Fonts) | ⚠️ 需优化加载策略 |
| **深色模式** | next-themes | ✅ 完整支持 |
| **图片** | 基础 Image 组件 | ⚠️ 缺少响应式和lazy loading |
| **组件** | 14 个 | ✅ 规模适中 |
| **性能指标** | 未测试 | ❌ 需基准测试 |

### 关键问题
1. **毛玻璃效果** (`backdrop-filter: blur(12px)`) 是高成本操作，可能阻断首屏
2. **渐变文字** (gradient-text) 需确保不导致重排
3. **字体加载** 使用 Google Fonts，缺少 font-display 策略
4. **图像优化** 缺少 WebP/AVIF、响应式、lazy loading
5. **代码分割** 所有 Section 组件都在主包中加载
6. **Lucide 导入** 可能使用 barrel imports，增加包大小

---

## 📦 分阶段实施计划

### **Phase 1: 设计系统更新（Minimal & Direct）**

**目标：** 将设计从 Liquid Glass 迁移到 Minimal & Direct  
**时间估算：** 1-2 小时  
**关键指标：** 移除所有 backdrop-filter

#### 1.1 更新 CSS 变量和主题
**文件：** `app/globals.css`  
**变更内容：**
- ❌ 移除 `.glass` 毛玻璃类（`backdrop-filter: blur(12px)`）
- ✅ 替换为纯色 + 边框方案
- 简化色板（当前有 8 个 CSS 变量，目标保留 6 个核心）

**代码示例：**
```css
/* 移除 */
.glass {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 替换为 */
.surface {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  /* 无模糊、纯渲染 */
}
```

**验证清单：**
- [ ] grep 确认没有 `backdrop-filter` 遗留
- [ ] grep 确认没有 `blur(` 存在于 globals.css
- [ ] 浏览器DevTools 检查样式树，确认无渐变动画

---

#### 1.2 更新 Header 组件（移除毛玻璃）
**文件：** `components/layout/header.tsx`  
**变更：** 
- 当前：scrolled 时添加 `.glass` 类
- 新方案：scrolled 时使用纯色背景 + border-bottom

```tsx
// 现状
className={`sticky top-0 z-50 transition-all duration-300 ${
  scrolled ? "glass shadow-sm" : "bg-transparent"
}`}

// 优化后
className={`sticky top-0 z-50 transition-all duration-300 ${
  scrolled 
    ? "bg-bg-primary border-b border-border" 
    : "bg-transparent"
}`}
```

**验证清单：**
- [ ] 本地运行 `npm run dev`，滚动测试 Header 样式转换
- [ ] 检查 DevTools Performance 标签，渲染时间 < 16ms

---

#### 1.3 更新字体配置（Inter + Space Grotesk）
**文件：** `app/layout.tsx`  
**变更：**
- 导入 Inter（用作 Body，可变字体更轻）
- 保留 Space Grotesk（用作标题）

```tsx
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap", // 防止 FOIT
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
```

**验证清单：**
- [ ] 运行 `npm run build` 检查包大小变化
- [ ] 检查 Lighthouse 报告的 Font loading 评分

---

### **Phase 2: 性能优化（Core Web Vitals）**

**目标：** 达成 <1s 首屏，LCP < 2.5s，CLS < 0.1  
**时间估算：** 2-3 小时  

#### 2.1 图片优化
**文件：** `components/sections/hero.tsx` 及其他包含 Image 的组件  
**变更：**
1. 添加 `width/height` 属性（防止 CLS）
2. 使用 `priority` for hero image
3. 添加响应式 `sizes` 属性

```tsx
// 现状
<Image
  src={data.avatar}
  alt={data.name}
  width={140}
  height={140}
  className="h-32 w-32 object-cover sm:h-36 sm:w-36"
  priority
/>

// 优化后（已符合最佳实践）
/* hero.tsx 已正确使用 width/height/priority，保持现状 */
```

**验证清单：**
- [ ] 运行 `npm run build` 检查 .next 大小
- [ ] 使用 Chrome DevTools Lighthouse 检查 LCP

---

#### 2.2 代码分割（动态导入下面部分）
**文件：** `app/page.tsx`  
**变更：** 使用 `next/dynamic` 延迟加载非首屏组件

```tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SkillsSection = dynamic(() => import("@/components/sections/skills"));
const ProjectsSection = dynamic(() => import("@/components/sections/projects"));
const ExperienceSection = dynamic(() => import("@/components/sections/experience"));

// Hero 保持同步加载
import { HeroSection } from "@/components/sections/hero";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>加载中...</div>}>
          <HeroSection /> {/* 首屏，同步 */}
          <SkillsSection /> {/* 延迟加载 */}
          <ProjectsSection /> {/* 延迟加载 */}
          <ExperienceSection /> {/* 延迟加载 */}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
```

**验证清单：**
- [ ] 运行 `npm run build` 检查 chunk 分割
- [ ] 检查 Network 标签，main chunk 大小 < 100KB

---

#### 2.3 Lucide 图标优化
**文件：** 所有使用 Lucide 的文件  
**变更：** 从 barrel import 改为直接导入

```tsx
// ❌ 避免（导入整个库）
import { Check, Copy } from 'lucide-react';

// ✅ 推荐（仅导入所需图标）
import Check from 'lucide-react/dist/esm/icons/check';
import Copy from 'lucide-react/dist/esm/icons/copy';
```

**验证清单：**
- [ ] grep 所有文件找到 Lucide 导入
- [ ] 使用脚本替换所有 barrel imports
- [ ] 运行 `npm run build` 检查包大小

---

### **Phase 3: 组件优化**

**目标：** 确保所有组件符合 Minimal & Direct 设计规范  
**时间估算：** 2-3 小时  

#### 3.1 移除不必要的动画和效果
**检查清单：**
- [ ] `fade-in-section.tsx` - 确保动画 < 300ms，支持 `prefers-reduced-motion`
- [ ] 所有 hover 效果 - 使用 150-200ms 过渡
- [ ] 移除所有装饰性动画（仅保留功能性过渡）

**验证命令：**
```bash
grep -r "transition-all\|animate-\|@keyframes" components/ --include="*.tsx"
```

#### 3.2 响应式设计审查
**文件：** 所有组件  
**检查项：**
- [ ] 375px 小屏测试（手机）
- [ ] 768px 平板测试
- [ ] 1024px+ 桌面测试
- [ ] 无水平滚动
- [ ] 文字大小最小 16px（避免 iOS 自动放大）

---

### **Phase 4: 测试与验证**

**目标：** 验证所有性能指标达成  
**时间估算：** 1 小时  

#### 4.1 本地性能测试

```bash
# 生产构建
npm run build

# 启动生产服务器
npm run start

# 在浏览器中运行 Lighthouse
# Chrome DevTools → Lighthouse → Generate report
```

**关键指标目标：**
| 指标 | 目标 | 评估方式 |
|------|------|---------|
| **LCP** | < 2.5s | Lighthouse |
| **FID** | < 100ms | Lighthouse |
| **CLS** | < 0.1 | Lighthouse |
| **首屏加载** | < 1s | Network 标签 |
| **包大小** | < 150KB (gzipped) | `npm run build` 输出 |

#### 4.2 视觉测试

```bash
# 浅色模式
npm run dev
# 手动访问 http://localhost:3000
# 检查：Header 滚动效果、所有组件样式、深色模式切换

# 深色模式
# 点击主题切换按钮
# 检查：对比度、所有颜色过渡

# 响应式
# 在不同分辨率下测试（F12 → Toggle device toolbar）
# 375px, 768px, 1440px
```

#### 4.3 可访问性检查

```bash
# 运行 Lighthouse A11y 审计
# 验证：
# - 对比度 4.5:1（亮色）
# - 对比度 4.5:1（深色）
# - 焦点指示器可见
# - 键盘导航完整
```

#### 4.4 性能监控

在 `next.config.ts` 中添加：
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用静态导出（如适用）
  // output: 'export',
  
  // 启用 SWC 最小化
  swcMinify: true,
  
  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

---

## 📊 进度追踪

| Phase | 任务 | 状态 | 责任人 |
|-------|------|------|--------|
| 0 | 现状分析 | ✅ 完成 | Claude |
| 1.1 | CSS 主题更新 | ⏳ 待处理 | - |
| 1.2 | Header 组件优化 | ⏳ 待处理 | - |
| 1.3 | 字体配置更新 | ⏳ 待处理 | - |
| 2.1 | 图片优化 | ⏳ 待处理 | - |
| 2.2 | 代码分割 | ⏳ 待处理 | - |
| 2.3 | Lucide 优化 | ⏳ 待处理 | - |
| 3 | 组件优化 | ⏳ 待处理 | - |
| 4 | 测试验证 | ⏳ 待处理 | - |

---

## 🎯 成功标准

- ✅ Lighthouse 性能评分 ≥ 95
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ 首屏加载 < 1s
- ✅ 无视觉回归（与原始设计一致）
- ✅ 深色/浅色模式都符合 WCAG AAA 对比度
- ✅ 键盘导航完整
- ✅ 移动端响应正确

---

## 📝 关键文件清单

需要修改的文件：
```
app/
  ├── globals.css          # 1. CSS 变量和主题
  ├── layout.tsx           # 2. 字体配置
  └── page.tsx             # 3. 代码分割

components/
  ├── layout/
  │   └── header.tsx       # 4. Header 样式
  ├── sections/
  │   ├── hero.tsx         # 检查 Image 优化
  │   ├── skills.tsx       # Lucide 导入优化
  │   ├── projects.tsx     # Lucide 导入优化
  │   └── experience.tsx   # Lucide 导入优化
  └── ui/
      └── *.tsx            # 检查动画和样式

next.config.ts            # 5. 性能配置
```

---

## 🚀 后续步骤

1. **第一步：** 同意该计划，我将按顺序执行 Phase 1-4
2. **第二步：** 每个 Phase 完成后汇报结果
3. **第三步：** 运行本地测试，验证指标
4. **第四步：** 部署到生产环境

