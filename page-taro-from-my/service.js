import { to } from 'await-to-js'
import * as login from '@base/login'
import { request } from '@base/jd-request'
import { sleep } from './common/index'

export async function getHomeData() {
  const [loginErr] = await to(login.login())

  if (process.env.TARO_ENV == 'h5') {
    // 避免跳登录的情况下继续执行，从而导致主接口被aborted
    // H5login组件reject两种情况：1、无登录态跳走 2、3S内重复登录
    if (loginErr && loginErr.code == 0) await sleep(1000)
  }

  const [err, response] = await to(
    request.get({
      url: 'jx.user.my.page.jx',
      color: true,
      colorAppId: process.env.TARO_ENV == 'weapp' ? 'jx_jxpp' : 'jx_jxpp_h5',
      data: {
        _: Date.now(),
      },
      retryCount: 1,
      ump: {
        key: '',
        bizId: '',
        opId: '',
        errBizId: '',
        errOpId: '',
        reportHook: (data) => {
          if ([0, 13].includes(+data.code)) {
            return { code: 0 }
          } else {
            return { code: data.code, message: data.msg }
          }
        },
      },
    })
  )

  if (err) throw err

  const body = response.body || {}

  switch (+body.code) {
    case 0:
      return body
    case 13:
      const [reLoginErr] = await to(login.forcedLogin())
      if (reLoginErr) throw reLoginErr
      return getHomeData()
    default:
      throw err
  }
}
