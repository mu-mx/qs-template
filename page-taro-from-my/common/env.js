export const isXcx = process.env.TARO_ENV !== 'h5'
export const TARO_ENV = isXcx && process.env.TARO_ENV
export const scene = !isXcx && window.JD.device.scene
export const isWXapp = TARO_ENV == 'weapp'
export const isQQapp = TARO_ENV == 'qq'

export const isJxApp = scene == 'jdpingou'
export const isWeixin = scene == 'weixin'
export const isQQ = scene == 'qq'
export const isJdm = scene == 'jdm'
export const isWQLogin = isWXapp || isQQapp || isWeixin || isQQ
export const isH5Android = !isXcx && window.navigator.userAgent.indexOf('Android') > -1

export const isPPH5 = process.env.APP_NAME == 'h5'
export const isPPXCX = isXcx && process.env.APP_NAME !== 'jxweapp'
export const isPP = isPPXCX || isPPH5

/**
 *  判断是否是小程序内嵌H5
 */
export function isWxappH5() {
  if (!isWeixin) return false
  if (!window?.JD?.wxapp?.isWxapp) return false
  return window.JD.wxapp.isWxappEnv()
}

/**
 *  判断是否是京购小程序内嵌H5
 */
export function isJDWxappH5() {
  if (!isWxappH5()) return false
  return window.JD.wxapp.getWxappType() == 1
}
