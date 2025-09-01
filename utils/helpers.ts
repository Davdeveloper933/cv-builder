import type { ResumeData, ResumeItem, ResumeSection } from '~/types'

const testingObject1 = {
  tag: 'p',
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  ],
}

const testingObject2 = {
  tag: 'ul',
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  ],
}

const testingObject3 = {
  tag: 'ol',
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  ],
}

export const formatDate = (dateString: string | Date | undefined) => {
  if (!dateString) return ``
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ``
  return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`
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

console.log(htmlFromContent(testingObject1))
console.log(htmlFromContent(testingObject2))
console.log(htmlFromContent(testingObject3))

export const transformResumeDataContent = (
  data: ResumeData | undefined,
): ResumeData | undefined => {
  if (!data) return
  const clone = Object.assign({}, data)
  const transformed: Record<string, {}> = {}
  Object.keys(clone).forEach((key) => {
    const section = clone[key as keyof ResumeData] as ResumeSection

    section.list?.forEach((item: ResumeItem) => {
      if (item.content && Array.isArray(item.content.content)) {
        item.content = htmlFromContent(
          item.content as { tag: string; content: string[] },
        )
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

      transformed[key] = {
        ...section,
        contentHTML: htmlFromArray(convertContentToArray),
      }
    } else {
      transformed[key] = section
    }
  })
  return transformed as ResumeData
}
