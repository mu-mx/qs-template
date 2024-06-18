const jxConfig = {
  deploy: {
    htmlFullPath: '/export/wxsq/html/hibox/test/index.html',
    onlineUrl: 'https://st.jingxi.com/hibox/test/index.html'
  },
}

const ppConfig = {
  deploy: {
    htmlFullPath: '/export/wxsq/html/hibox/test/index.html',
    onlineUrl: 'https://st.jingxi.com/hibox/test/index.html'
  },
}

module.exports = process.env.APP_NAME == 'jxweapp' ? jxConfig : ppConfig
