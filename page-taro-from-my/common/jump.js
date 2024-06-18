import { addUrlParam } from '@base/url'
import { goto } from '@base/navigator'
import { throttle } from '@base/function'
import { addPtag, isJdm, isXcx, sleep, isJxApp, fixUrl, isXcxUrl, isJDWxappH5 } from './index'

function getJumpUrl(urls = {}) {
  let h5Url = ''
  let xcxUrl = ''

  if (typeof urls == 'string') {
    if (isXcxUrl(urls)) xcxUrl = urls
    else h5Url = urls
  } else {
    h5Url = urls.h5
    xcxUrl = urls.xcx || urls.weapp
  }

  if (isXcxUrl(xcxUrl)) xcxUrl = xcxUrl
  if (!isXcx) h5Url = window.JD.url.getPageUrl(h5Url)

  return fixUrl(isXcx && xcxUrl ? xcxUrl : h5Url)
}

const jumpFn = async function jump(urls, param = {}, options = {}) {
  if (isJdm) param.sceneval = param.sceneval || 2

  /* #IF(TARO_ENV==='h5') */
  options.jxAppNewWebview = isJxApp && window?.JX_MY_CONFIG?.[0]?.isOpenNewWebview == '1'
  /* #IFEND  */

  if (param.ptag || param.eid) {
    addPtag(param.ptag, param.eid, param.eparam)
    delete param.ptag
    delete param.eid
    delete param.eparam
    await sleep()
  }

  let url = getJumpUrl(urls)

  console.log('jump参数：', urls, url, param, options)

  if ((process.env.APP_NAME === 'jd' || process.env.APP_NAME === 'jdjs') && param.isJump2JDNative) {
    delete param.isJump2JDNative
    // eslint-disable-next-line no-undef
    jd?.navigateToNative({
      dataParam: `{"url":"${
        process.env.APP_NAME === 'jdjs' ? 'openjdlite://virtual' : 'openapp.jdmobile://virtual'
      }?params=${encodeURIComponent(
        JSON.stringify({
          category: 'jump',
          des: 'm',
          url: addUrlParam(url, param),
        })
      )}"}`,
    })
    return
  }

  delete param.isJump2JDNative

  /* #IF(TARO_ENV === 'h5' && APP_NAME === 'h5') */
  if (isJDWxappH5() && !isXcxUrl(url)) {
    url = `/pages/h5/index?encode_url=${encodeURIComponent(addUrlParam(url, param))}`
    param = {}
  }
  /* #IFEND  */

  goto(url, param, options)
}

export const jump = throttle(jumpFn, 1000)
