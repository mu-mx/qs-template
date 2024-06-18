// import { useDispatch } from "umi";
// import { Modal, notification } from "antd";
import url from "@/utils/url";
import storage from "@/utils/storage";

// const versionReg = /index-(.*)\.js/;

// const isChrome = /Chrome\/(\d+)/.test(navigator.userAgent);
// const notSupport = isChrome && Number(navigator.userAgent.match(/Chrome\/(\d+)/)?.[1]) < 110;

// const getCurrentVersion = () => {
//     return (
//         [...document.scripts]
//             .find((i) => i.src.search(versionReg) > -1)
//             ?.src?.match(versionReg)?.[1] || ""
//     );
// };
// const updateChecker = async () => {
//   if (notSupport) return;

//   const url = new URL("./worker/updateChecker.ts", import.meta.url).href;
//   const blobURL = URL.createObjectURL(await (await fetch(url)).blob());

//   const worker = new Worker(blobURL);

//   worker.postMessage({
//       versionReg,
//       href: location.href,
//       currentVersion: getCurrentVersion(),
//   });

//   worker.onmessage = (e) => {
//       Modal.confirm({
//           title: "发现新版本",
//           content: "是否更新页面?",
//           onOk: () => {
//               worker.terminate();
//               location.reload();
//           },
//           onCancel: () => {
//               worker.terminate();
//           },
//       });
//   };
// };

// const chromeChecker = () => {
//   const noChrome = localStorage.getItem("noChrome");

//   if (!noChrome && (!isChrome || notSupport)) {
//       notification.warning({
//           message: notSupport ? "浏览器版本过低" : "不支持的浏览器内核",
//           description: notSupport
//               ? "请及时更新浏览器，以免影响使用。"
//               : "请使用Edge或Chrome浏览器进行访问",
//       });
//   }
// };

export const logout = () => {
    storage.clear();
    setTimeout(() => {
        location.href = "about:blank";
    }, 100);
};

const login = (sso_appid: string) => {
    const redirect = `https://sso.100tal.com/portal/login/${sso_appid}?redirect=${encodeURIComponent(
        location.href
    )}`;

    location.href = redirect;
};

const loginChecker = (sso_appid: string) => {
    let token = url.getURLParameters("token");

    if (token) {
        token = token.replace(/#.*$/, "");

        const admin = JSON.parse(JSON.parse(window.atob(token.split(".")?.[1]))?.sub);

        storage.set("token", token);
        // cms的用户信息  后续看要不要
        storage.set("admin", admin);

        const U = new URL(location.href);
        U.searchParams.delete("token");
        setTimeout(() => location.replace(U.href), 1000);
    }

    if (!storage.get("token") || !storage.get("admin")) {
        login(sso_appid);
    }
};

const checker = (sso_appid?: string) => {
    if (sso_appid) loginChecker(sso_appid);
};

export default checker;
