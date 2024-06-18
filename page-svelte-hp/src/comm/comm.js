import JsSecurity from '@legos/js-security-v3/dist';
function securityUmp (operation, data) {
    return JD.report.umpBiz({
        bizid: 1959,
        operation,
        result: data.code,
        source: '0',
        message: JSON.stringify(data)
    });
}

function security (params, callback) {
    try {
        if (!window.JSSign) {
            window.JSSign = new JsSecurity({
                appId: 'appid',
                onSign: data => {
                    console.log('js-security-onSign:', data);
                    securityUmp(4, data);
                },
                onRequestToken: data => {
                    console.log('js-security-onRequestToken:', data);
                    securityUmp(5, data);
                },
                onRequestTokenRemotely: data => {
                    console.log('js-security-onRequestTokenRemotely:', data);
                    securityUmp(6, data);
                }
            })
        }
        window.JSSign.sign(params)
            .then(signedParams => {
                params.h5st = signedParams.h5st;
                params._stk = signedParams._stk;
                callback(params)
            }).catch(e => callback(params));
    } catch (e) {
        return callback(params);
    }
}

export function isH5Url (url = '') {
    return /^(http(s?):)?\/\//.test(url);
}

export function isXCXUrl (url = '') {
    return /^\/?pages\//.test(url) || !isH5Url(url);
}

/* 添加https协议头 */
export function fixUrl (url = '') {
    if (!url) return '';
    if (isH5Url(url)) {
        url = url.replace(/^(http:)?\/\//, 'https://')
        if (window.JD) {
            url = window.JD.url.getPageUrl(url);
        }
    } else if (isXCXUrl(url)) {
        if (url.indexOf('/') != 0) {
            url = '/' + url;
        }
    }
    return url;
}

// 微信小程序类型
export const WxappType = {
    Jx: 2, // 京喜小程序
    PP: 17, // 拼拼小程序
}

const XcxH5 = '/pages/h5/index';
const PPXcxH5 = '/jingxi/pages/h5/index';

export function isWxapp (iswxapp) {
    if (!window.JD) {
        return false;
    }
    return Promise.race([new Promise((resolve, reject) => {
        window.JD.wxapp.isWxapp(iswxapp => {
            const wxappType = window.JD.wxapp.wxappType;
            resolve(iswxapp && (wxappType == WxappType.Jx || wxappType == WxappType.PP));
        });
    }), new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(false);
        }, 5000);
    })]);
}

export function isSupportHidden () {
    return typeof document.hidden !== 'undefined' || typeof document.webkitHidden !== 'undefined';
}

/**
 * 页面跳转
 */
async function goto (urls, params, handle, enableXcxH5Goto = true) {
    // 目前只支持h5版本
    if (typeof urls === 'string') {
        urls = urls.split(',');
    }
    let h5 = '';
    let xcx = '';
    urls.forEach(url => {
        url = JD.url.addUrlParam(fixUrl(url), params);
        if (isH5Url(url)) {
            h5 = JD.url.getPageUrl(url);
        } else if (isXCXUrl(url)) {
            xcx = url;
        }
    });
    if (!h5 && !xcx) {
        return;
    }
    const isH5Xcx = await isWxapp();
    if (isH5Xcx && isSupportHidden() && enableXcxH5Goto) {
        // 内嵌h5则使用跳转小程序版本链接
        if (xcx) {
            const xcxPath = xcx.replace(/\?.*$/, '');
            if (['/pages/pingou/index/index'].includes(xcxPath)) {
                window.JD.wxapp.goto(xcx, 'switchTab');
            } else {
                window.JD.wxapp.goto(xcx);
            }
        } else {
            const wxappType = window.JD.wxapp.wxappType;
            const h5Path = wxappType == WxappType.Jx ? XcxH5 : PPXcxH5;
            if (h5.startsWith('https://pro.jingxi.com/')) {
                const PPXcxH53T = '/pages/webview/index';
                h5 = JD.url.addUrlParam(PPXcxH53T, { h5_url: encodeURIComponent(h5) });
                window.JD.wxapp.goto(h5);
            } else {
                h5 = JD.url.addUrlParam(h5Path, { encode_url: encodeURIComponent(h5) });
                window.JD.wxapp.goto(h5);
            }
        }
        return;
    }
    if (window.PGJsSdk && window.PGJsSdk.jumpTo) {
        // 京喜APP使用新开webview跳转
        window.PGJsSdk.jumpTo(JSON.stringify({ url: h5 }));
        return;
    }
    if (handle) {
        await handle();
    }
    window.location.href = h5;
}


export {
    security,
    goto,
}
