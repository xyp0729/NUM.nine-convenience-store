import defaultSettings from '@/settings'

const title = defaultSettings.title || '网吧管理系统服务'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
