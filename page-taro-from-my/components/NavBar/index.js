import { View } from '@tarojs/components'
import { memo, useMemo } from 'react'
import { useCustomNavBar } from './store'

function Comp({ data = {} }) {
  const { onGetNavInfo, navBarInfo, navBarData } = useCustomNavBar(data)

  return useMemo(() => {
    // console.log('NavBar render')
    return (
      process.env.TARO_ENV === 'weapp' && (
        <>
          <nav-bar navBarData={navBarData} onGetnavinfo={onGetNavInfo}></nav-bar>
          <View style={`height: ${navBarInfo.isSupportNav ? navBarInfo.navHeight : 0}px`}></View>
        </>
      )
    )
  }, [navBarData, navBarInfo.isSupportNav, navBarInfo.navHeight, onGetNavInfo])
}

export default memo(Comp)
