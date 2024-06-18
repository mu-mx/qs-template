import { ENV, BASE } from "./../src/constants";

/** 打包发布之后的域名 */
const host: any = {
    dev: "https://cms-access.xiongmaoboshi.com/dev/",
    pre: "https://cms-access.xiongmaoboshi.com/pre/",
    pro: "https://cms-access.xiongmaoboshi.com/pro/",
};

/** 请求接口的前缀地址 */
const apiUrls: any = {
    // debug: "http://cn-debug.xiongmaoboshi.com",
    debug: "http://10.85.73.121:8888",

    dev: "https://cn-dev.xiongmaoboshi.com",
    pre: "https://cms-pre.xiongmaoboshi.com",
    pro: "https://cms-prod.xiongmaoboshi.com",
};

export const IS_LOCAL = process.env.NODE_ENV === "development";
export const base = IS_LOCAL ? BASE : `${host[ENV]}`;

/** 设置 axios 的前缀,本地开发不需要前缀,生产环境需要前缀,服务器直接发起请求 */
export const getBaseURL = (param = "dev") => {
    // const isDebug = true;
    if (IS_LOCAL) {
        return "";
    }
    return apiUrls[param];
};

/** 设置代理地址 */
export const getProxyURL = (param = "debug") => {
    return apiUrls[param];
};

export const proxy = {
    "/rbac-v1/": {
        target: getProxyURL(ENV),
        changeOrigin: true,
    },
};
