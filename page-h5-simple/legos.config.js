/**
 * 以下所有配置项及钩子函数，若不需要使用，均可删除
 */
module.exports = {
    deploy: {
        htmlFullPath: '/export/wxsq/html/hibox/test/index.html',
        onlineUrl: 'https://st.jingxi.com/hibox/test/index.html'
    },

    noEslint: true,

    // 公共包调试配置
    resolve: {
        // '@legos/wfdata':'~/project/wxsq-common-pkg/wfdata'
    },

    /**
   * @description 自定义配置钩子，可修改默认的webpack配置，使用说明:https://cf.jd.com/pages/viewpage.action?pageId=133253924
   * @param webpackConfig 默认的webpack配置
   * @param ctx legos命令相关上下文
   * @return 若使用此钩子函数修改webpackConfig配置，必须要返回webpackConfig对象
   */
    mergeWebpackConfig: function (webpackConfig, ctx) {
        if (!ctx.rawArgs.includes('release')) {
        // 开发模式使用eval-source-map
            webpackConfig.devtool = 'eval-source-map';

            // babel-loader
            webpackConfig.module.rules[0].use[0].options.presets = ['@babel/preset-react'];
            webpackConfig.module.rules[0].use[0].options.plugins = [];
        }

        return webpackConfig;
    }
}
