import { to } from 'await-to-js'
import Taro from '@tarojs/taro'
import { getHomeData } from './service'
import { isXcx, speedReport } from './common/index'
import * as Actions from './actions'

export const changePageStatusAction = (status, dispatch) => {
  dispatch({
    type: Actions.INIT_PAGE,
    payload: {
      isReady: true,
      isRendered: true,
      pageStatus: status,
    },
  })
}

export async function initPage(dispatch) {
  const startReqTime = Date.now()
  let [err, results = []] = await to(Promise.all([getHomeData()]))
  const [homeData = {}] = results

  const endReqTime = Date.now()

  // 主接口失败
  if (err) return changePageStatusAction('error', dispatch)

  dispatch({
    type: 'INIT_PAGE',
    payload: {
      isReady: true,
      homeData: homeData.data,
    },
  })

  Taro.nextTick(() => {
    const opt = isXcx
      ? { s4: endReqTime - startReqTime, s5: Date.now() - startReqTime }
      : { s4: endReqTime, s5: Date.now() }
    speedReport(opt)
    setTimeout(() => {
      dispatch({
        type: 'INIT_PAGE',
        payload: {
          isRendered: true,
        },
      })
    }, 0)
  })
}
