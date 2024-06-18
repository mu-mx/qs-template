/* eslint-disable class-methods-use-this */
import request from '@base/jd-request';
import { login } from '@base/login';
import { security } from './comm';

const Ump = {
    bizId: 1959,
}

function error (body) {
    return new Promise((resolve, reject) => {
        const throwError = () => {
            setTimeout(() => {
                reject(body);
            }, 10000);
        }
        switch (+body.code) {
            case 13:
                if (Global.activeType == 1) { // 短链走ptk登入
                    login({ env: 'jdm' });
                } else {
                    login();
                }
                throwError();
                break;
            case 15: // 默认pin跳转绑定
                window.location = JD.url.getPageUrl(JD.url.addUrlParam('//wqs.jd.com/my/bindpopupv2/index.shtml', {
                    returnText: '年底报告',
                    returnUrl: location.href,
                    sceneid: Config.pinSceneId || '', // 场景id，用于统计。可向产品申请
                    ptag: Config.pinPtag || '', // 必须。组件的曝光埋点，用于统计。可向产品申请
                }));
                throwError();
                break;
            default:
                return resolve();
        }
    })
}

export function getSecurity (params) {
    return new Promise(resolve => {
        security(params, data => {
            resolve(data)
        })
    })
}

export function getUserInfo (data) {
    if (Global.activeType == 1) { // 短链走ptk登入
        data.sceneval = 2;
    }
    return request.post({
        url: '//wq.jd.com/prmt_annualreview/annualreview/userinfo',
        ump: {
            ...Ump,
            opId: 1,
        },
        data,
    }).then(async ({ body = {} }) => {
        await error(body);
        return {
            nowTime: body.nowTime,
            ...body.data,
        };
    });
}

