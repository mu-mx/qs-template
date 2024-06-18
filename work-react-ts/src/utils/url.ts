const url = {
    /** 获取url参数 */
    getURLParameters: (key: string): any => {
        const params = new URLSearchParams(location.href.split("?")[1] || "");
        return key ? params.get(key) || "" : Object.fromEntries(params);
    },
};

export default url;
