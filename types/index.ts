import type {
  AdditionalSections,
  CustomSectionItem,
  EducationItem,
  EducationSection,
  ExperienceItem,
  ExperienceSection,
  History,
  LabelContent,
  Languages,
  LeftColumnSectionItem,
  Profile,
} from '~/types/editor'

export type ResumeSection = {
  label?: string
  content?: string[] | string
  contentHTML?: string[] | string
  list?: ExperienceItem[] | EducationItem[]
}

export interface ResumeItem {
  id?: number
  title?: string
  company?: string
  location?: string
  dates?: {
    start: Date
    end?: Date
    current?: boolean
  }
  content?: string[] | string | { tag: string; content: string[] }
  contentHTML?: string[] | string

  [key: string]: string | number | string[] | object | object[] | undefined
}

export interface ResumeData {
  id: string
  themeColor: string
  profileImage?: string
  name: string
  lastName: string
  jobTitle?: string
  layout?: string

  contact: {
    label: string
    list: {
      [key: string]: string
    }[]
  }

  skills: LabelContent

  certificates?: LabelContent

  hobbies?: LabelContent

  languages?: Languages

  leftColumnSections: LeftColumnSectionItem[]

  profile: Profile

  experience: ExperienceSection

  education: EducationSection

  awards?: LabelContent

  affiliations?: LabelContent

  customSections: CustomSectionItem[]
  additionalSections?: AdditionalSections
}

export interface Template {
  name: string
  component: Component
  data: ResumeData
  img: string
}

export interface MyResume {
  resume: ResumeData | null
  history: History
}

export interface MyResumes {
  templateResume: MyResume | null
  customResume: MyResume | null
}
