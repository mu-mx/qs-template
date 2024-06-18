import { useState, useEffect, useMemo, useCallback } from 'react'
import { usePageScroll } from '@tarojs/taro'

export function useCustomNavBar(data = {}) {
  const defaultData = useMemo(() => {
    return {
      title: '',
      capsuleType: 'none',
      backgroundValue: 'rgba(255, 255, 255, 0)',
      _bgOp: 0,
    }
  }, [])

  const [navBarInfo, setNavBarInfo] = useState({
    navHeight: 64,
    isSupportNav: true,
  })

  const [navBarData, setNavBarData] = useState(defaultData)

  useEffect(() => {
    setNavBarData({
      ...defaultData,
      title: data.topTitle,
    })
  }, [data.topTitle, defaultData])

  const onGetNavInfo = useCallback((e) => {
    const { isSupportNav, navHeight } = e.detail
    setNavBarInfo({ isSupportNav, navHeight })
  }, [])

  usePageScroll((e) => {
    const { scrollTop } = e
    const height = 100
    const opacity = scrollTop / height
    if (navBarData._bgOp > 1 && opacity > 1) return

    setNavBarData({
      title: data.topTitle,
      capsuleType: 'none',
      _bgOp: opacity,
      backgroundValue: `rgba(255, 255, 255, ${opacity})`,
    })
  })

  return { navBarInfo, onGetNavInfo, navBarData }
}
