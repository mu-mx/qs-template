import { memo, useCallback, useMemo } from 'react'
import { View } from '@tarojs/components'
import { useMyContext } from '../../context'
import { jump } from '../../common/index'
import styles from './index.module.scss'
import ellipsisStyles from '../../common/styles/ellipsis.module.scss'

function Comp() {
  const { state } = useMyContext()
  const { pageStatus } = state

  const handleClick = useCallback((e) => {
    console.error(e)
    jump(
      {
        xcx: '/pages/switch_location/index/index',
        h5: 'https://st.jingxi.com/switch_location/index.html',
      },
      { ptag: '' }
    )
  }, [])

  return useMemo(() => {
    return (
      <>
        <View className={styles.test} onClick={handleClick}>
          pageStatus:{pageStatus}
        </View>
        <View className={`${styles.test} ${ellipsisStyles.line3}`} onClick={handleClick}>
          state:{JSON.stringify(state.homeData)}
        </View>
      </>
    )
  }, [handleClick, pageStatus, state.homeData])
}

export default memo(Comp)
