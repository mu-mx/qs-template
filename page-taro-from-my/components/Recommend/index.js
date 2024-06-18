import { useEffect, useState, useMemo } from 'react'
import { View } from '@tarojs/components'
import { usePullDownRefresh } from '@tarojs/taro'

/* #IF(TARO_ENV !== 'weapp') */
import TaroRecommond from '@biz/ui-pgrecommend'
/* #IFEND  */

import { useMyContext } from '../../context'
import styles from './index.module.scss'
import { isXcx, isJxApp, isPP } from '../../common'

function Recommend() {
  const { state } = useMyContext()
  const { isReady, homeData = {} } = state
  const { headId } = homeData.common || {}

  const [recommendOpt, setRecommendOpt] = useState({
    appType: 'jd-pingou',
    recId: isPP ? 45009 : isXcx ? 5712 : isJxApp ? 5716 : 5697,
    paging: true,
    title: '大家都在买',
    pageSize: 20,
    //maxPage: 25, 按产品需求，个人中心业务不传。交给猜你喜欢公共组件去维护。他们会根据推荐位设置 pageSize 的值
    autoLoad: false,
    analysis: {
      onExposureReport: (reportData) => {
        return Object.assign(reportData, {
          target: '',
          eid: '',
        })
      },
      onClickReport: (reportData) => {
        return Object.assign(reportData, {
          target: '',
          eid: '',
        })
      },
      onAddCartReport: (reportData) => {
        return Object.assign(reportData, {
          target: '',
          eid: '',
        })
      },
    },
  })

  useEffect(() => {
    console.log('[Recommend] recId', recommendOpt.recId)
  }, [recommendOpt.recId])

  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        setRecommendOpt({ ...recommendOpt, autoLoad: true })
      }, 0)
    }
  }, [isReady])

  usePullDownRefresh(() => {
    setRecommendOpt({ ...recommendOpt, reload: true })
    setTimeout(() => setRecommendOpt({ ...recommendOpt, reload: false }), 0)
  })

  return useMemo(() => {
    console.log('Recommend render')

    return (
      <View className={styles['myrecommend']} key={headId}>
        {/* #IF(TARO_ENV==='weapp') */ <recommend extraProps={recommendOpt} /> /* #IFEND */}
        {/* #IF(TARO_ENV!=='weapp') */ <TaroRecommond {...recommendOpt} /> /* #IFEND */}
      </View>
    )
  }, [recommendOpt, headId])
}

export default Recommend
