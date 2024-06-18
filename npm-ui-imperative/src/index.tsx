import { useEffect, memo, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, { Events, getCurrentInstance, eventCenter } from '@tarojs/taro'
import { ComponentProps, ComponentApiParams } from '../index.d'
import styles from './index.module.scss'

const events = new Events()
const $instance: Taro.Current = getCurrentInstance()
let currentWebviewId = ''

const InnerComponent = memo(({ data }: { data: ComponentProps }) => {
  const { text, compId = '', ...others } = data
  // @ts-ignore
  const wxWebviewId = $instance?.page?.__wxWebviewId__ || ''
  currentWebviewId = wxWebviewId

  const [outerText, setOuterText] = useState('')

  const doSomething = (options: ComponentApiParams) => {
    setOuterText(options.text)
  }

  const onPageShow = () => {
    currentWebviewId = wxWebviewId
  }

  useEffect(() => {
    // 因为 Taro 的 getCurrentInstance() 会在 onHide 的时候将 router、page 设为null，
    // 所以需要每次 onShow 的时候更新记录下当前 page 的 webviewId
    // 监听page的onshow
    const onShowEventId = $instance?.router?.onShow
    onShowEventId && eventCenter.on(onShowEventId, onPageShow)

    return () => {
      onShowEventId && eventCenter.off(onShowEventId, onPageShow)
    }
  }, [])

  useEffect(() => {
    events.on(wxWebviewId + 'HiTemplate' + compId, doSomething)
    return () => {
      events.off(wxWebviewId + 'HiTemplate' + compId)
    }
  }, [])

  return (
    <View {...others} className={styles.container}>
      {outerText || text}
    </View>
  )
})

/** 组件名称
 * @supported 小程序、H5
 * @see http://legos.wq.jd.com/legosv5/static/docs/jxui/storybook/?path=/story/introduction--page
 */
const HiTemplate = ({ text = '默认文案', compId = '' }: ComponentProps) => {
  // 这里之所以包一层InnerComponent，是为了支持ComponentApi类型
  const data = {
    text,
    compId,
  }

  return <InnerComponent data={data}></InnerComponent>
}

/**
 * API说明
 */
HiTemplate.handleSomething = (options: ComponentApiParams) => {
  // @ts-ignore
  const wxWebviewId = $instance?.page?.__wxWebviewId__ || currentWebviewId || ''
  setTimeout(() => {
    events.trigger(wxWebviewId + 'HiTemplate' + (options.compId || ''), options)
  }, 0)
}

export { HiTemplate }
