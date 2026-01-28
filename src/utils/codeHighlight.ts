import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import 'highlight.js/styles/atom-one-dark.css'

hljs.registerLanguage('typescript', typescript)

export function highlightCode(code: string): string {
  return hljs.highlight(code, { language: 'typescript' }).value
}

export function generateNotificationCode(config: {
  type: string
  title: string
  message: string
  duration: number
  position: string
  backgroundColor: string
  textColor: string
  showIcon: boolean
  showCloseButton: boolean
  animation: string
  customIcon?: string
}): string {
  return `const notification = { type: '${config.type}', title: '${config.title}', message: '${config.message}', duration: ${config.duration}, position: '${config.position}', backgroundColor: '${config.backgroundColor}', textColor: '${config.textColor}', showIcon: ${config.showIcon}, showCloseButton: ${config.showCloseButton}, animation: '${config.animation}', customIcon: '${config.customIcon || ''}' };`
}
