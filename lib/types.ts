// 个人主页共享类型定义

export interface HeroData {
  name: string
  title: string
  slogan: string
  avatar: string
  social: {
    github?: string
    twitter?: string
    email?: string
    blog?: string
    [key: string]: string | undefined
  }
}

export interface Skill {
  name: string
  category: string
  level: number
}

export interface ProjectData {
  title: string
  description: string
  tags: string[]
  url?: string
  github?: string
  image?: string
  date: string
  featured: boolean
}

export interface ExperienceData {
  company: string
  role: string
  start: string
  end: string
  type: 'work' | 'education'
}