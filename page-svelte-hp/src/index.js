import App from './App.svelte';
import { shareConfig } from './comm/share';
import { Share } from './comm/comm';
import { getUserInfo } from './comm/api'

(async function () {
    // 设置分享信息
    // shareConfig(Share);

    const app = new App({
        target: document.querySelector('.swiper'),
        props: {
        },
    });
    app.init();

    window._PFM_TIMING[5] = new Date();
    window.__SPD_RPT && window.__SPD_RPT.report();
})()
