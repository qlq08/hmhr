import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    // return `${pageTitle} - ${title}` // 原来的
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
