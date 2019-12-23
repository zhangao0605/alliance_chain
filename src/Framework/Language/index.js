import { getURLParam, isNullOrEmpty } from '@/utils/tools'
import languagePackage from './package'
import languageDefault from './default'

// 获取系统语言
const getLanguage = function () {
  let lang
  if (!getURLParam('lang')) {
    if (!isNullOrEmpty(localStorage.getItem('lang'))) {
      lang = localStorage.getItem('lang')
    } else {
      lang = languageDefault
      setLanguage(lang)
    }
  } else {
    lang = getURLParam('lang')
    setLanguage(lang)
  }
  return lang
}

// 设置系统语言
const setLanguage = function (lang) {
  localStorage.setItem('lang', lang)
}

let lan = (key) => {
  if (getLanguage() == 'zh_CN') {
    return key
  } else {
    return lan[key] || ''
  }
}

Object.assign(lan, languagePackage[getLanguage()])
lan.getLanguage = getLanguage
lan.setLanguage = setLanguage
export default lan
