import type { ThemeColor } from '~/types/editor'
import type { ResumeData } from '~/types'

export default function useThemeColor() {
  const changeColor = (color: ThemeColor, resumeData: ResumeData): void => {
    resumeData.themeColor = color.color
    document.documentElement.style.setProperty('--primary', color.color)
    document.documentElement.style.setProperty(
      '--primary-lighter',
      color.lighter,
    )
  }

  const getCurrentColor = (colorValue: string) => {
    return COLORS.find((color) => color.color === colorValue) || COLORS[0]
  }

  return {
    getCurrentColor,
    changeColor,
  }
}
