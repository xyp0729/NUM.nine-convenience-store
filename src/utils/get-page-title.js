import defaultSettings from '@/settings'

const title = defaultSettings.title || '网吧服务管理云平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
