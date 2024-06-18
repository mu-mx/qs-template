const sveltePreprocess = require('svelte-preprocess');
const path = require('path')

const babelLoader = {
    loader: "babel-loader",
    options: {
        presets: [
            [
                "@babel/preset-env",
                {
                    modules: "cjs"
                }
            ],
            "@babel/preset-react"
        ],
        plugins: [
            [
                "@babel/plugin-transform-runtime",
                {
                    corejs: 3
                }
            ]
        ],
        cacheDirectory: true
    }
};

/**
 * 以下所有配置项及钩子函数，若不需要使用，均可删除
 */
module.exports = {
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
    mergeWebpackConfig (webpackConfig, ctx) {
        const rules = webpackConfig.module.rules;
        const rule = rules[0];
        console.log(rule.exclude);
        rules.push({
            test: [/\.mjs$/],
            // exclude: /node_modules[/\\](?!svelte|swiper)/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    modules: 'auto'
                                }
                            ],
                        ],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    corejs: 3
                                }
                            ]
                        ],
                        cacheDirectory: true
                    }
                },
            ]
        });
        rules.push({
            test: /\.(svelte)$/,
            use: [
                babelLoader,
                {
                    loader: "svelte-loader",
                    options: {
                        preprocess: sveltePreprocess({
                            postcss: true,
                        })
                    }
                }
            ]
        });
        return webpackConfig;
    },
    deploy: {
        htmlFullPath: '/export/wxsq/html/hibox/test/index.html',
        onlineUrl: 'https://st.jingxi.com/hibox/test/index.html'
    },
    noEslint: true,
}
