import type { ResumeData, ResumeItem, ResumeSection } from '~/types'
import type { KeyOfResumeData } from '~/types/editor'

export const formatDate = (input?: string | Date): string => {
  if (!input) return ''
  const d = input instanceof Date ? input : new Date(input)
  if (isNaN(d.getTime())) return ''

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const htmlFromArray = (arr: string[] | undefined) => {
  return `<ul>${arr?.map((item) => `<li>${item}</li>`).join('')}</ul>`
}

export const htmlFromContent = (
  obj: { tag: string; content: string[] } | undefined,
) => {
  if (!obj) return ''
  const { tag, content } = obj
  if (tag === 'p') {
    return `<p>${content.map((item) => `${item}`).join('')}</p>`
  }
  if (tag === 'ul' || tag === 'ol') {
    return `<${tag}>${content
      .map((item) => `<li>${item}</li>`)
      .join('')}</${tag}>`
  }
  return ''
}

export const transformResumeDataContent = (
  data: ResumeData | undefined,
): Record<string, {}> => {
  if (!data) return {}
  const clone = Object.assign({}, data)
  const transformed: ResumeData | Record<string, {}> = {}
  Object.keys(clone).forEach((key) => {
    const section = clone[key as KeyOfResumeData] as ResumeSection

    section.list?.forEach((item: ResumeItem) => {
      type ContentType = { tag: string; content: string[] }
      const content = item.content as ContentType
      if (content && Array.isArray(content.content)) {
        item.content = htmlFromContent(item.content as ContentType)
      }
    })

    if (section && Array.isArray(section)) {
      section.forEach((item: ResumeItem) => {
        if (item.contentHTML && Array.isArray(item.contentHTML)) {
          item.contentHTML = htmlFromArray(item.contentHTML)
        }
      })
    }

    // Если `content` является массивом, конвертируем его в HTML-строку
    if (section.contentHTML && Array.isArray(section.contentHTML)) {
      const convertContentToArray: string[] = section.contentHTML

      transformed[key as KeyOfResumeData] = {
        ...section,
        contentHTML: htmlFromArray(convertContentToArray),
      }
    } else {
      transformed[key as KeyOfResumeData] = section
    }
  })
  return transformed
}

export const compressImage = (
  dataUrl: string,
  quality = 0.7,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      // например, оставляем исходные размеры:
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('No 2d context'))
      ctx.drawImage(img, 0, 0)

      // quality от 0 до 1, лучше 0.6–0.8 для баланса
      const compressed = canvas.toDataURL('image/jpeg', quality)
      resolve(compressed)
    }
    img.onerror = reject
    img.src = dataUrl
  })
}
