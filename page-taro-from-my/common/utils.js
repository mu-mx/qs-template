import { forceHttps } from '@base/url'
import Taro from '@tarojs/taro'

export function isEmpty(input) {
  const strInput = String(input)
  return strInput === 'null' || strInput === 'undefined' || strInput === 'NaN' || strInput.trim() === ''
}

export function sleep(timeout = 200) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

export function fixUrl(url = '') {
  if (isXcxUrl(url)) {
    if (url.startsWith('/')) return url
    else return `/${url}`
  } else {
    return forceHttps(url)
  }
}

export function isXcxUrl(url = '') {
  return !/^(https?:)?\/\//.test(url)
}

// eslint-disable-next-line no-undef
const windowWidth = window && window.screen ? window.screen.availWidth : Taro.getSystemInfoSync().windowWidth
export function rpx2px(size) {
  return size * (windowWidth / 750)
}
