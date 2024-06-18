import { SpinLoading } from '@base/ui-loading'
import { useReducer, useRef, useEffect, useMemo } from 'react'
import { View } from '@tarojs/components'
import { getImgUrl } from '@base/url'
import Modal from '@base/ui-modal'
import Toast from '@base/ui-toast'
import classnames from 'classnames'
import { handleVisibilityChange } from '@base/page-util'
import Taro, { useDidShow, usePullDownRefresh, useShareAppMessage } from '@tarojs/taro'
import BackToTop from '@base/ui-back2top'
/* #IF(APP_NAME!=='jxweapp') */
import { getScreenInfo } from '@/jxpp/src/common/utils/screen'
/* #IFEND  */
import Recommend from './components/Recommend'
import Test from './components/Test'
import NavBar from './components/NavBar'
import ErrorBoundary from './common/components/ErrorBoundary'
import { initPage } from './store'
import { MyContext } from './context'
import { reducer } from './reducer'
import styles from './app.module.scss'

function App(props) {
  // 初始化全局数据
  const [state, dispatch] = useReducer(reducer, {
    // 主接口数据
    homeData: {},
    page: props.page,
    isReady: false, // 接口数据请求完成
    isRendered: false, // 首屏渲染完成
    // 页面Loading: loading
    // 页面正常: ok
    // 页面容灾: error
    pageStatus: 'ok',
  })

  // 首次请求提前到外层，大概可提前50-100ms
  const isFirstRequest = useRef(true)
  isFirstRequest.current && initPage(dispatch)

  // 对应 onShow
  useDidShow(() => {
    !isFirstRequest.current && initPage(dispatch)
    isFirstRequest.current = false
  })

  /* #IF(TARO_ENV==='h5') */
  useEffect(() => {
    handleVisibilityChange((isHide) => {
      if (!isHide) initPage(dispatch)
    })
  }, [])
  /* #IFEND */

  usePullDownRefresh(async () => {
    const stop = Taro.stopPullDownRefresh
    const timer = setTimeout(stop, 5000)
    await initPage(dispatch)
    stop()
    clearTimeout(timer)
  })

  useShareAppMessage((e = {}) => {
    console.log(e)
    return {
      title: '',
      desc: '',
      path: '',
      imageUrl: getImgUrl('', { size: '375' }),
    }
  })

  return useMemo(() => {
    console.log('App Render')
    return (
      <MyContext.Provider value={{ state, dispatch }}>
        <View
          className={classnames(styles['page'], {
            [styles['skeleton']]: !state.isReady,
          })}
          style={{
            color: 'red',
            paddingTop:
              process.env.APP_NAME == 'h5'
                ? Taro.pxTransform(20)
                : process.env.APP_NAME !== 'jxweapp'
                ? `${getScreenInfo().navHeight}px`
                : '',
          }}
        >
          {process.env.TARO_ENV === 'weapp' && process.env.APP_NAME === 'jxweapp' && (
            <NavBar data={{ topTitle: '标题' }} />
          )}
          {state.pageStatus == 'loading' && <SpinLoading fullPage />}
          {state.pageStatus == 'error' && <View>错误重试</View>}
          {state.pageStatus == 'ok' && (
            <>
              <Test />
              {state.isRendered && (
                <>
                  <ErrorBoundary render={() => <Recommend />} />
                  <Modal />
                  <BackToTop duration={0} />
                </>
              )}
            </>
          )}
          <Toast />
        </View>
      </MyContext.Provider>
    )
  }, [state])
}

export default App
