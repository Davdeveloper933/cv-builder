import type { Template } from '~/types'
import Template1 from '~/components/Templates/Template1.vue'
import {
  resumeTemplate1,
  resumeTemplate2,
  resumeTemplate3,
} from '~/data/cv-settings'
import Template2 from '~/components/Templates/Template2.vue'
import Template4 from '~/components/Templates/Template4.vue'

export const CHECKBOX_ITEMS = [
  { value: 'languages', label: 'Languages' },
  { value: 'skills', label: 'Skills' },
  { value: 'certificates', label: 'Certification' },
  { value: 'profile', label: 'Summary' },
  { value: 'experience', label: 'Experience' },
  { value: 'education', label: 'Education' },
]

export const COLORS = [
  { name: 'rose', color: '#DB2777', lighter: '#f9a8d4' },
  { name: 'indigo', color: '#4F46E5', lighter: '#a5b4fc' },
  { name: 'emerald', color: '#10B981', lighter: '#6ee7b7' },
  { name: 'amber', color: '#F59E0B', lighter: '#fcd34d' },
  { name: 'black', color: '#1c1a1a', lighter: '#1C1A1AFF' },
]

export const LAYOUTS = ['oneColumn', 'twoColumn']

export const TEMPLATES: Array<Template> = [
  {
    name: 'Template 1',
    component: Template1,
    data: resumeTemplate1,
    img: '/images/tmpl1.jpg',
  },
  {
    name: 'Template 2',
    component: Template2,
    data: resumeTemplate2,
    img: '/images/tmpl3.jpg',
  },

  {
    name: 'Template 4',
    component: Template4,
    data: resumeTemplate3,
    img: '/images/tmpl2.webp',
  },
  {
    name: 'Template 4',
    component: Template4,
    data: resumeTemplate3,
    img: '/images/tmpl2.webp',
  },
  {
    name: 'Template 1',
    component: Template1,
    data: resumeTemplate1,
    img: '/images/tmpl1.jpg',
  },
  {
    name: 'Template 2',
    component: Template2,
    data: resumeTemplate2,
    img: '/images/tmpl3.jpg',
  },
]
