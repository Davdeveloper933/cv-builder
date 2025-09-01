import type { ResumeData } from '~/types/index'

export type ThemeColor = {
  name: string
  color: string
  lighter: string
}

export type LabelContent = {
  show?: boolean
  label: string
  subLabel?: string
  content?: string[] | string
  contentHTML?: string[] | string
}

export type Profile = {
  show?: boolean
  label: string
  aboutMe: string
}

export type ExperienceItem = {
  id: number
  title: string
  company: string
  country: string
  dates: { start: Date; end: Date; current: boolean }
  content?: string[] | string | { tag: string; content: string[] }
}

export type ExperienceSection = {
  show?: boolean
  label: string
  list: ExperienceItem[]
}

export type EducationItem = {
  id: number
  title: string
  dates: { start: Date; end: Date; current: boolean }
  location?: string
}

export type EducationSection = {
  show?: boolean
  label: string
  list: EducationItem[]
}

export type Languages = {
  show?: boolean
  label: string
  list: {
    lang: string
    level: string
  }[]
}

export type AdditionalSections = {
  [key: string]: LabelContent
}

export type CustomSections = CustomSectionItem[]
export type LeftColumnSections = LeftColumnSectionItem[]

export type CustomSectionItem = {
  id: number
  title?: string
  description?: string
  dates: { start: Date; end: Date; current: boolean }
  content?: string[] | string
  contentHTML?: string[] | string
}

export type LeftColumnSectionItem = {
  id: number
  title: string
  description?: string
  content?: string[] | string
  contentHTML?: string[] | string
}

export interface EditorFields {
  [key: string]:
    | EducationItem
    | ExperienceItem
    | CustomSectionItem
    | LeftColumnSectionItem
}

export interface HistoryItem {
  resumeData: ResumeData // глубокая копия
  time: string
}

export type History = HistoryItem[]
