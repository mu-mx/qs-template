import { NativeConfig } from './comm';

export function shareConfig (shareConfig, sharePost = '') {
    const activeType = JD.url.getUrlParam('activeType') || 0;
    const homeUrl = 'https://' + (location.host || 'st.jingxi.com') + '/pingou_active/back_in_2021/index.html'
    const indexUrl = JD.url.addUrlParam(homeUrl, {
        activeType
    });

    const indexUrlNative = JD.url.addUrlParam(homeUrl, {
        activeType,
        nativeConfig: JSON.stringify(NativeConfig)
    });

    const channel = sharePost ? 'Wxfriends,QQfriends,jCommandWX,QRCode' : 'Wxfriends,QQfriends,jCommandWX';

    JD && JD.wxapi && JD.wxapi.ready(() => {
        JD && JD.wxapp && JD.wxapp.isWxapp && JD.wxapp.isWxapp(iswxapp => {
            // const wxappType = window.JD.wxapp.wxappType;
            if (iswxapp) {
                window.wxappShareConfig({
                    url: indexUrl, // 小程序分享url
                    title: shareConfig.share_title, // 小程序分享标题
                    imgurl: shareConfig.share_img_xcx, // 小程序分享图片(图片宽高比为5:4)
                    rurl: '', // 小程序分享回调链接
                }, {
                    cancel (res) {},
                    fail (res) {},
                });
            }
        })
    })

    window.shareConfig = {
        path: indexUrl, // 分享链接
        timelineDesc: shareConfig.share_desc,
        link: indexUrl,
        img_url: shareConfig.share_img_h5,
        title: shareConfig.share_title, // 分享标题
        desc: shareConfig.share_desc,
        imageUrl: shareConfig.share_img_h5, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        mpId: 'gh_d227644b6f7c', // 拼购小程序
        iconUrl: '', // 小程序分享图片
        mpIconUrl: shareConfig.share_img_xcx, // 小程序分享图片
        channel,
        mpPath: '/pages/h5/index?encode_url=' + encodeURIComponent(indexUrl),
        content: shareConfig.share_desc,
        shareUrl: indexUrl,
        koulingparam: {
            keyTitle: shareConfig.share_title,
            url: indexUrlNative,
            keyEndTime: Date.now() + 24 * 60 * 60 * 1000,
            keyChannel: 'jXi',
            keyId: indexUrl,
            sourceCode: 'jinshusongjin',
            keyImg: shareConfig.share_img_kl,
            keyContent: shareConfig.share_desc_kl, // desc
            acrossClient: 0,
        },
        qrparam: {
            base64Image: sharePost,
            imageContentMode: 'width_mode',
            top_pic: '', // 频道名
            mid_pic: sharePost, // 大图
            slogan: '', // 口号
            qr_title: '', // 标题
            qr_content: '', // 运营语
            qr_direct: '', // 自定义二维码图片,优选级最高
        },
    }
}
