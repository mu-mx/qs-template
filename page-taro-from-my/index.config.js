const config = {
  navigationBarTitleText: '',
  enablePullDownRefresh: process.env.TARO_ENV !== 'h5',
  enableShareAppMessage: true,
  navigationStyle: 'custom',
}

if (process.env.TARO_ENV === 'weapp') {
  if (process.env.APP_NAME === 'jxweapp') {
    Object.assign(config, {
      usingComponents: {
        ...config.usingComponents,
        'nav-bar': '@/wxapp/components/nav-bar/nav-bar',
        recommend: '@/wxapp/pages/taro/components/recommend/index',
      },
    })
  }

  if (process.env.APP_NAME == 'weapp') {
    Object.assign(config, {
      usingComponents: {
        recommend: '../../async-components/recommend/index',
      },
      componentPlaceholder: {
        recommend: 'view',
      },
    })
  }
}

export default config
